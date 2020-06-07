import React from 'react';
import Table from './Table';
import Paginations from './Paginations';
import { useParams } from 'react-router-dom'
import TimeLine from './TimeLine';


function usePagenumber() {
    let { pageNumber } = useParams();
  
    return pageNumber;
  }

  

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news:[],
            pageNumber:1
        }
    }

    componentWillMount(){
        let { pageNumber } = this.props.match.params;
        let { history } = this.props;
        console.log("componentWillMount called")
        if(!pageNumber){
            history.push(`/page/${1}`);
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
        console.log("page to update", obj);
        localStorage.setItem('hackerNews',JSON.stringify(obj));
    }

    getStorageData(data){
        let {news, pageNumber} = JSON.parse(localStorage.getItem('hackerNews'));
        this.updateNews(news, pageNumber);
    }

    fetchNews(pageNumber){
        console.log("got page to fetch", pageNumber);
        let url = `https://hn.algolia.com/api/v1/search?page=${pageNumber}`;
        let options = {
            method:'GET'
        }
        let promise = fetch(url, options);
        promise.then((res)=>{
            return res.json();
        }).then((result)=>{
            console.log("got res", result);
            this.updateNews(result.hits, pageNumber);
        })
    }

    componentDidMount() {
        // console.log("got pagenumber from router", pageNumber)
        let { pageNumber } = this.props.match.params;
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
            this.props.history.push('/page/'+pageNumber);

        }
    }

    handleUpvoteClick(objectId){
        let { news } = this.state;
        console.log("handleUpvoteClick called", objectId)
        let index = news.findIndex(item => item.objectID === objectId);
        if(index >= 0){
            news[index].points++;
            this.updateNews(news, this.state.pageNumber);
        }
    }

    handleHideClick(objectID){
        let { news } = this.state;
        console.log("handleHideClick called", objectID)
        let index = news.findIndex(item => item.objectID === objectID);
        if(index >= 0){
            news.splice(index, 1);
            this.updateNews(news, this.state.pageNumber);
        }
    }




    render() {

        console.log(this.props.params);
        console.log("", this.props)
        return (
            <>
                <Table handleHideClick={this.handleHideClick.bind(this)} news={this.state.news} handleUpvoteClick={this.handleUpvoteClick.bind(this)} />
                <Paginations history={this.props.history} setPage={this.setPage.bind(this)} page={this.state.pageNumber} />
                <TimeLine chartData={getChartData(this.state.news)} axisValues={['Votes', 'ID']} />
            </>
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