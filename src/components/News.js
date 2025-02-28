import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import TimeWeather from './TimeWeather';
import "./Home.css";
import Footer from "./Footer"; // Import the Footer component


export class News extends Component {
    // state = {
    //     // savedNews: JSON.parse(localStorage.getItem("savedNews")) || [],
    //     articles: [],
    //     loading: false,
    //     page: 1,
    //     savedNews: [],
    //     selectedNews: null
    // };
    static defaultProps = {
        country : 'us',
        pageSize: 12,
        category : 'general'

    };

    static propTypes = {
        country: PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
        searchQuery: PropTypes.string
    };
    
    constructor(props){
        super(props);
        this.state={
                articles:[],
                loading: false,
                page:1,
                savedNews: [], 
                selectedNews: null
        };
        document.title = `${this.capitalize(this.props.category)} News`;
    }

    async fetchNews() {
        let url;
        if (this.props.searchQuery) {
          url = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&language=en&apiKey=4dcf51578dda449e8728278c467cfade&pageSize=${this.props.pageSize}`;
        } else {
          url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&language=en&apiKey=4dcf51578dda449e8728278c467cfade&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        }
        
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          articles: parsedData.articles || [],
          totalResults: parsedData.totalResults,
          loading: false
        });
      }
    componentDidMount() //life cycle method and run after render method
    {
        this.fetchNews();
    }
     handlePrevClick = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&language=en&apiKey=4dcf51578dda449e8728278c467cfade&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        if (this.props.searchQuery) {
            url = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&language=en&apiKey=4dcf51578dda449e8728278c467cfade&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        }
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading : false
        })
    }
     handleNextClick = async() =>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
        {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&language=en&apiKey=4dcf51578dda449e8728278c467cfade&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        if (this.props.searchQuery) {
            url = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&language=en&apiKey=4dcf51578dda449e8728278c467cfade&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        }
        
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page+1,
            articles: parsedData.articles,
            loading : false
        })
    }
    }
    capitalize = (words) =>
        {
            if (!words) return "";
                const lower = words.toLowerCase();
                return lower.charAt(0).toUpperCase() + lower.slice(1);
        }

        componentDidUpdate(prevProps) {
            if (prevProps.searchQuery !== this.props.searchQuery) {
                this.setState({ page: 1 }, () => this.fetchNews());
            }
          }

          handleNewsClick = (newsItem) => {
            this.setState({ selectedNews: newsItem });
        };
        handleCloseModal = () => {
            this.setState({ selectedNews: null });
        };




        handleSaveNews = async (news) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/savedNews/save`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: news.title,
                        description: news.description,
                        imageUrl: news.urlToImage,
                        newsUrl: news.url,
                        author: news.author,
                        date: news.publishedAt,
                        source: news.source.name
                    })
                });

                const data = await response.json(); // Get server response
                if (response.ok) {
                    // alert("News saved successfully!");
                } else {
                    alert(`Failed to save news: ${data.error}`);
                }
            } catch (error) {
                console.error("Error saving news:", error);
                alert("Something went wrong. Please try again.");
            }
        };
        


  render() {
    let defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6NLM4vr992L4GcsGhiQixziu-esQ-a7Mo6A&s";
    return (
        <div className="background-video">
        <video autoPlay loop muted playsInline className="video">
        <source src="/Homegif.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
       <div className="container pb-3 content-wrapper">
        <TimeWeather/>
         <h1 className='text-center category-news' style={{margin:'30px 0px'}}>{this.props.searchQuery ? `Search results for "${this.props.searchQuery}"` :this.capitalize(this.props.category)} News</h1>
         {this.state.loading && <Spinner/>}
        <div className="row news-grid">
        {!this.state.loading && this.state.articles && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
             <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author = {element.author} date={element.publishedAt} source={element.source.name} onSave={() => this.handleSaveNews(element)} onNewsClick={() => this.handleNewsClick(element)}/>
         </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>

        {this.state.selectedNews && (
                    <div className="modal show" tabIndex="-1" style={{ display: "block", background: "rgba(0,0,0,0.5)",backdropFilter: "blur(5px)" }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content pop-up">
                                <div className="modal-header">
                                    <h5 className="modal-title text-center w-100 d-block">{this.state.selectedNews.title}</h5>
                                    <button type="button" className="btn-close" onClick={this.handleCloseModal}></button>
                                </div>

                                <div className="modal-body">
                                    <img src={this.state.selectedNews.urlToImage?this.state.selectedNews.urlToImage:defaultImage} className="img-fluid mb-2" 
                                    style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' ,borderRadius: "20px",overflow: 'hidden'}}  alt="news" />
                                    </div>
                                    <p className="px-2">{this.state.selectedNews.description}</p> 
                                    <p className="px-2">
                                        {this.state.selectedNews.content? this.state.selectedNews.content.replace(/\[\+\d+\schars\]/, '') : ""}
                                    </p>
                                    <p className="px-2">
                                        <small className="text-muted">
                                            By {this.state.selectedNews.author || "Unknown"} on {new Date(this.state.selectedNews.publishedAt).toGMTString()}
                                        </small>
                                    </p>
                                    <a href={this.state.selectedNews.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark px-2">
                                        Read Full Article
                                    </a>
                                </div>
                            </div>
                        </div>
                )}

        </div>
        <div className="container-fluid p-0">
    <Footer />
  </div>
        </div>
       

                
    )
  }
}

export default News
