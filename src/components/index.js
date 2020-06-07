import React from 'react';
import Table from './Table';
import Paginations from './Paginations';
import TimeLine from './TimeLine';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news:[],
            pageNumber:1
        }
    }

    updateNews(data, pageNumber){
        this.setState({
            news:data,
            pagenumber:pageNumber
        })
        this.updateStorage(data, pageNumber);
    }

    updateStorage(data, pageNumber){
        let obj = {
            news:data,
            pageNumber:pageNumber
        }
        localStorage.setItem('hackerNews',JSON.stringify(obj));
    }

    getStorageData(data){
        let {news, pageNumber} = JSON.parse(localStorage.getItem('hackerNews'));
        this.updateNews(news, pageNumber);
    }

    fetchNews(pageNumber){
        let url = `https://hn.algolia.com/api/v1/search?page=${pageNumber}`;
        let options = {
            method:'GET'
        }
        let promise = fetch(url, options);
        promise.then((res)=>{
            return res.json();
        }).then((result)=>{
            this.updateNews(result.hits, pageNumber);
        })
    }

    componentDidMount() {
        let pageNumber = 1;
        if(this.props.match && this.props.match.params){
            pageNumber = this.props.match.params.pageNumber;
        }
        let hackerNews = JSON.parse(localStorage.getItem('hackerNews'));
        if(hackerNews && hackerNews.hasOwnProperty('pageNumber') && Number(pageNumber)  === Number(hackerNews.pageNumber)){
            this.getStorageData();
        } else{
            this.fetchNews(pageNumber);
        }
    }


    setPage(pageNumber){
        if(this.state.pageNumber !== pageNumber){
            this.fetchNews(pageNumber);
            this.setState({
                pageNumber:pageNumber
            })
            if(this.props.history){
                this.props.history.push('/page/'+pageNumber);
            }
        }
    }

    handleUpvoteClick(objectId){
        let { news } = this.state;
        let index = news.findIndex(item => item.objectID === objectId);
        if(index >= 0){
            news[index].points++;
            this.updateNews(news, this.state.pageNumber);
        }
    }

    handleHideClick(objectID){
        let { news } = this.state;
        let index = news.findIndex(item => item.objectID === objectID);
        if(index >= 0){
            news.splice(index, 1);
            this.updateNews(news, this.state.pageNumber);
        }
    }
    render() {
        return (
            <div>
                <Table handleHideClick={this.handleHideClick.bind(this)} news={this.state.news} handleUpvoteClick={this.handleUpvoteClick.bind(this)} />
                <Paginations history={this.props.history} setPage={this.setPage.bind(this)} page={this.state.pageNumber} />
                <TimeLine chartData={getChartData(this.state.news)} axisValues={['Votes', 'ID']} />
            </div>
        )
    }
}

function getChartData(news){
    let data = {
        labels:[],
        data:[]
    }
    news.map((item)=>{
        data.labels.push(item.objectID);
        data.data.push(item.points);
    })

    return data
}