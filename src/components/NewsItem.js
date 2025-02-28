import React, { Component,useState } from 'react'
import "./Home.css";

export class NewsItem extends Component {

  handleShare = () => {
    const { title, description, newsUrl } = this.props;
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: description,
          url: newsUrl,
        })
        .then(() => console.log("News shared successfully"))
        .catch((error) => console.error("Error sharing news:", error));
    } else {
      navigator.clipboard.writeText(newsUrl)
        .then(() => alert("News URL copied to clipboard!"))
        .catch((error) => console.error("Error copying URL:", error));
    }
  };

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source, onNewsClick,onSave, isSaved, onDelete, onShare, onToggleSave } = this.props;
    let defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6NLM4vr992L4GcsGhiQixziu-esQ-a7Mo6A&s";
    


    return (
      <div className='my-3'>
        <div className="card news-card" style={{borderRadius: "20px" ,overflow:"hidden" }}>
        
            <img src={imageUrl && imageUrl.trim() !== "" ?imageUrl : defaultImage} className="card-img-top" alt="news" style={{ height: "200px", objectFit: "cover" }}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">by {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <div className="btn badge text-bg-secondary mb-1">{source}</div> <br/>
                <hr/  >
                <div className="btn-group">
                  <div className='left-group'>
                <button className="btn btn-sm btn-dark mx-2" onClick={onNewsClick}>
                            View More
                        </button>
                        </div>
                        <div className='left-group'>
                        {!isSaved ? (
                    <button className="btn btn-sm btn-primary mx-2" onClick={onSave}>
                      Save
                    </button>
                ) : (
                    <button className="btn btn-sm btn-danger mx-2" onClick={onDelete}>
                       Delete
                    </button>
                )}
                  
                 <button
              className="btn btn-sm btn-success mx-2"
              onClick={onShare ? onShare : this.handleShare}
            >
              Share
            </button>
          </div>
            </div>

            </div>
        </div> 
      </div>
    )
  }
}

export default NewsItem

