import React, { Component } from 'react'
import "./Home.css";
import {
  Link
} from "react-router-dom";
export class Navbar extends Component {
    state = {
        query: "",
        showNavbar: false,
      };
    
      handleInputChange = (event) => {
        this.setState({ query: event.target.value });
      };
    
      handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSearch(this.state.query); // Pass search query to App.js
      };
      handleCategoryClick = () => {
        this.setState({ query: "" }); // Clear search input
        this.props.onSearch(""); // Reset search results
    };

  

  render() {

    return (
      <div className='fixed-top'>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand nav" to="/"><img src="/logo.png"/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link nav" aria-current="page" to="/" onClick={this.handleCategoryClick}>General</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link nav" to="/business" onClick={this.handleCategoryClick}>Business</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link nav" to="/entertainment" onClick={this.handleCategoryClick}>Entertainment</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link nav" to="/health" onClick={this.handleCategoryClick}>Health</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link nav" to="/science" onClick={this.handleCategoryClick}>Science</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link nav" to="/sports" onClick={this.handleCategoryClick}>Sports</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link nav" to="/technology" onClick={this.handleCategoryClick}>Technology</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link nav" to="/saved-news">Saved News</Link>
                    </li>

               
                </ul>
                <form className="d-flex" role="search" onSubmit={this.handleSubmit}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={this.state.query} onChange={this.handleInputChange}/>
                    <button className="btn nav" type="submit">Search</button>
                </form>
                {this.props.onLogout && (
            <button onClick={this.props.onLogout} className='btn btn-danger logoutbtn'>
              Logout
            </button>
          )}

                </div>
            </div>
            </nav>
      </div>
    )
  }
}

export default Navbar;
