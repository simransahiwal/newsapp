import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
export class Navbar extends Component {
    state = {
        query: "",
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
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NewsApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/" onClick={this.handleCategoryClick}>General</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/business" onClick={this.handleCategoryClick}>Business</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/entertainment" onClick={this.handleCategoryClick}>Entertainment</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/health" onClick={this.handleCategoryClick}>Health</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/science" onClick={this.handleCategoryClick}>Science</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/sports" onClick={this.handleCategoryClick}>Sports</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/technology" onClick={this.handleCategoryClick}>Technology</Link>
                    </li>

                    {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li> */}
                    {/* <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li> */}
                </ul>
                <form className="d-flex" role="search" onSubmit={this.handleSubmit}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={this.state.query} onChange={this.handleInputChange}/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
            </nav>
      </div>
    )
  }
}

export default Navbar;
