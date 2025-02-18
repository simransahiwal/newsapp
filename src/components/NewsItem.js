import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source, onNewsClick} = this.props;
    let defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6NLM4vr992L4GcsGhiQixziu-esQ-a7Mo6A&s";
    return (
      <div className='my-3'>
        <div className="card" style={{borderRadius: "20px", overflow: 'hidden'}}>
        
            <img src={imageUrl && imageUrl.trim() !== "" ?imageUrl : defaultImage} className="card-img-top" alt="news" style={{ height: "200px", objectFit: "cover" }}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">by {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <div className="btn badge text-bg-secondary mb-1">{source}</div> <br/>
                {/* <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a> */}
                <button className="btn btn-sm btn-dark mx-2" onClick={onNewsClick}>
                            View More
                        </button>
            </div>
        </div> 
      </div>
    )
  }
}

export default NewsItem

