import React, { Component } from 'react';
export class NewsItem extends Component{
    constructor() {
        super();
    }

    setDefaultImage = (event)=>{
        event.target.src="news-placeholder-img.png"
    }
    render () {
        let {title,description,imageUrl,newsUrl} = this.props;
        return (
            <div className="card my-3" style={{minHeight:'520px'}}>
                <img onError={this.setDefaultImage} src={imageUrl} className="card-img-top" alt={title} style={{maxHeight:'215px'}} />
                <div className="card-body">
                    <h5 className="card-title">{ title }</h5>
                    <p className="card-text">{ description }</p>
                    <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
                </div>
            </div>
        )
    }
}

export default NewsItem;