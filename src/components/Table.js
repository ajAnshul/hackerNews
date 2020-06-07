import React from 'react';
import PropTypes from 'prop-types';

function getBaseUrl(url) {
    if(!url) return '';
    const parts = `${url}`.split('/');
    return parts[2];
}


function timeAgo(dateString) {

    let date = new Date(dateString);

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    getHeader() {
        return (
            <tr className="table-header">
                <th className="number-col">comments</th>
                <th className="number-col"> vote counts</th>
                <th className="number-col">up votes</th>
                <th className="left-align">news details</th>
            </tr>
        )
    }

    getIcon() {
        return (
            <svg className="bi bi-caret-up-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg>
        )
    }

    getUrl(url){
        let baseUrl = getBaseUrl(url);
        if(!baseUrl) return '';
        return(
            <a href={url} target="_blank" className="blog-link">
                {`{${baseUrl}}`}
            </a>
        )
    }

    getBody() {
        let { news } = this.props;
        return news.map((item, key) => {
            return (
                <tr key={key}>
                    <td>{item.num_comments}</td>
                    <td>{item.points}</td>
                    <td onClick={() => {
                        this.props.handleUpvoteClick(item.objectID)
                    }}>{this.getIcon()}</td>
                    <td className="left-align">{item.title}
                        <span className="extra-info">
                            {this.getUrl(item.url)} by
                            <span className="author-name">{item.author}</span>
                            <span className="created-time">{timeAgo(item.created_at)} ago</span>
                            [<span className="hide-link" onClick={() => {
                                this.props.handleHideClick(item.objectID);
                            }}>hide</span>]
                        </span>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="table-responsive ">
                <table className="table table-wrapper table-striped">
                    <thead>
                        {this.getHeader()}
                    </thead>
                    <tbody>
                        {this.getBody()}
                    </tbody>
                </table>
            </div>
        )
    }
}


Table.propTypes = {
    news: PropTypes.array,
    handleUpvoteClick: PropTypes.func,
    handleHideClick: PropTypes.func
};