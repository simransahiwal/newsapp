import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import TimeWeather from './TimeWeather';

export class News2 extends Component {
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
                selectedNews: null
        };
        document.title = `${this.capitalize(this.props.category)} News`;
    }

    async fetchNews() {
        let url;
        if (this.props.searchQuery) {
          url = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&language=en&apiKey=ce22d7960bfc4c76981bbf052bb32ce2&pageSize=${this.props.pageSize}`;
        } else {
          url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&language=en&apiKey=ce22d7960bfc4c76981bbf052bb32ce2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ce22d7960bfc4c76981bbf052bb32ce2&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading : true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     articles: parsedData.articles || [], 
        //     totalResults:parsedData.totalResults,
        //     loading : false
        // });
        this.fetchNews();
    }
     handlePrevClick = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&language=en&apiKey=ce22d7960bfc4c76981bbf052bb32ce2&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        if (this.props.searchQuery) {
            url = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&language=en&apiKey=ce22d7960bfc4c76981bbf052bb32ce2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
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
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&language=en&apiKey=ce22d7960bfc4c76981bbf052bb32ce2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        if (this.props.searchQuery) {
            url = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&language=en&apiKey=ce22d7960bfc4c76981bbf052bb32ce2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
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
  render() {
    let defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6NLM4vr992L4GcsGhiQixziu-esQ-a7Mo6A&s";
    return (
        
       <div className="container my-3">
        <TimeWeather/>
         <h1 className='text-center' style={{margin:'30px 0px'}}>{this.props.searchQuery ? `Search results for "${this.props.searchQuery}"` :this.capitalize(this.props.category)} News</h1>
         {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
             <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author = {element.author} date={element.publishedAt} source={element.source.name} onNewsClick={() => this.handleNewsClick(element)}/>
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
                            <div className="modal-content" style={{ borderRadius: "20px",overflow: 'hidden' }}>
                                <div className="modal-header">
                                    <h5 className="modal-title text-center w-100 d-block">{this.state.selectedNews.title}</h5>
                                    <button type="button" className="btn-close" onClick={this.handleCloseModal}></button>
                                </div>

                                <div className="modal-body">
                                    <img src={this.state.selectedNews.urlToImage?this.state.selectedNews.urlToImage:defaultImage} className="img-fluid mb-3" 
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
    )
  }
}

export default News2
