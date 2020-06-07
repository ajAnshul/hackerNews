import React from 'react';


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
        return(
            <svg className="bi bi-caret-up-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
            <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg>
        )
    }

    getBody() {
        let { news } = this.props;
        return news.map((item, key) => {
            return (
                <tr key={key}>
                    <td>{item.num_comments}</td>
                    <td>{item.points}</td>
                    <td onClick={()=>{
                        this.props.handleUpvoteClick(item.objectID)
                    }}>{this.getIcon()}</td>
                    <td className="left-align">{item.title}
                        <span className="extra-info">{item.url} {`{${item.author}}`} 
                        <span onClick={()=>{
                            this.props.handleHideClick(item.objectID);
                        }}>[hide]</span>
                        </span>
                    </td>
                </tr>
            )
        })
    }

    render() {
        console.log("got props", this.props)
        return (
            <div className="table-responsive">
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