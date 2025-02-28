import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import "./Home.css";
const SavedNews = () => {
    const [savedNews, setSavedNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null); // For modal

    useEffect(() => {
        fetchSavedNews();
    }, []);

    const fetchSavedNews = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/savedNews/get`);
            const data = await response.json();
            setSavedNews(data);
        } catch (error) {
            console.error("Error fetching saved news:", error);
        }
    };

    const handleDeleteNews = async (newsId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/savedNews/delete/${newsId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                // alert("News deleted successfully!");
                fetchSavedNews(); // Refresh saved news
            } else {
                alert("Failed to delete news.");
            }
        } catch (error) {
            console.error("Error deleting news:", error);
        }
    };

     // For saved news, clicking View More will set the selected news and open a modal
  const handleViewMore = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

    return (
      <div className="background-video">
        <video autoPlay loop muted playsInline className="video">
        <source src="/Homegif.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
        <div className="container content-wrapper">
            <h2 className="text-center category-news">My Saved News</h2>
            <div className="row">
                {savedNews.length > 0 ? (
                    [...savedNews].reverse().map((news) => (
                        <div className="col-md-4" key={news._id}>
                            <NewsItem 
                                title={news.title}
                                description={news.description}
                                imageUrl={news.imageUrl}
                                newsUrl={news.newsUrl}
                                author={news.author}
                                date={news.date}
                                source={news.source}
                                isSaved={true}
                                onDelete={() => handleDeleteNews(news._id)}
                                onNewsClick={() => handleViewMore(news)} // Add this handler
                           />
                        </div>
                    ))
                ) : (
                    <p className="text-center saved-news" >No saved news yet.</p>
                )}
            </div>

             {/* Modal for "View More" */}
      {selectedNews && (
        <div
          className="modal show"
          tabIndex="-1"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(5px)"
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ borderRadius: "20px", overflow: "hidden" }}>
              <div className="modal-header">
                <h5 className="modal-title text-center w-100 d-block">{selectedNews.title}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedNews.imageUrl ? selectedNews.imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6NLM4vr992L4GcsGhiQixziu-esQ-a7Mo6A&s"}
                  className="img-fluid mb-3"
                  style={{
                    maxHeight: '300px',
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: "20px",
                    overflow: 'hidden'
                  }}
                  alt="news"
                />
              </div>
              <p className="px-2">{selectedNews.description}</p>
              <p className="px-2">
                {selectedNews.content ? selectedNews.content.replace(/\[\+\d+\schars\]/, '') : ""}
              </p>
              <p className="px-2">
                <small className="text-muted">
                  By {selectedNews.author || "Unknown"} on {new Date(selectedNews.date || selectedNews.publishedAt).toGMTString()}
                </small>
              </p>
              <a
                href={selectedNews.newsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-dark px-2"
              >
                Read Full Article
              </a>
            </div>
          </div>
        </div>
      )}
        </div>
        </div>
    );
  
};

export default SavedNews;
