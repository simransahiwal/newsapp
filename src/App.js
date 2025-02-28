import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import Signup from './components/Signup';  // Import Signup component
import Login from './components/Login';  // Import Login component
// import Profile from './components/Profile';  // Import Profile page component
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute component
// import FetchData from "./FetchData";
// import MySavedNews from './components/MySavedNews';
import SavedNews from "./components/SavedNews";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export default class App extends Component {

  state = {
    searchQuery: "",  // Store search query
    isAuthenticated: !!localStorage.getItem("token"),
    // showLogin: true
    showSignup: false,
    showNavbar: false, // Added new state property
  };

  pagesize = 12;

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ isAuthenticated: false });
    // window.location.href = "/login"; 
    window.location.href = "/auth/login";
  };

  setIsAuthenticated = (status) => {
    this.setState({ isAuthenticated: status });
  };

  toggleSignupLogin = () => {
    this.setState({ showSignup: !this.state.showSignup });
  };

  // toggleAuthPage = () => {
  //   this.setState({ showLogin: !this.state.showLogin });
  // };
  componentDidMount() {
    // Once mounted, show the Navbar.
    this.setState({ showNavbar: true });
    // Optionally, perform any other initializations such as fetchNews
  }
  
  render() {
    const { isAuthenticated, searchQuery, showSignup  } = this.state;
    //  Hide Navbar on any auth routes (login or signup) 
    const hideNavbar = window.location.pathname.startsWith("/auth");
   
    return (
      <div>
         <Router>
         
       {this.state.showNavbar && !hideNavbar && <Navbar onSearch={this.handleSearch} onLogout={this.handleLogout}/> }

       

        <Routes>
        

<Route path="/auth/*" element={
              isAuthenticated ? (
                <Navigate to="/" /> // Redirect to homepage if already logged in
              ) : (
                <div>
                    <Routes>
                    <Route path="login" element={<Login setIsAuthenticated={this.setIsAuthenticated}/>} />  {/* Login route */}
                    <Route path="signup" element={<Signup toggleForm={this.toggleSignupLogin}/>} /> {/* Signup route */}
                  </Routes>
                  </div>
              )
            } />

          <Route
              path="/"
              element={
                isAuthenticated ? (
                  <News key="general" pageSize={this.pagesize} country='us' category="general" searchQuery={this.state.searchQuery}/>
                ) : (
                  <Navigate to="/auth/login" /> // Redirect to login/signup if not logged in
                )
              }
            />
        {/* <Route path="/" element={<ProtectedRoute><News key="general" pageSize={this.pagesize} country='us' category="general" searchQuery={this.state.searchQuery}/></ProtectedRoute>} /> */}
          <Route path="/business" element={<ProtectedRoute><News key="business" pageSize={this.pageSize} country='us' category="business" searchQuery={this.state.searchQuery}/></ProtectedRoute>}/>
          <Route path="/entertainment" element={<ProtectedRoute><News key="entertainment" pageSize={this.pageSize} country='us' category="entertainment" searchQuery={this.state.searchQuery}/></ProtectedRoute>}/>
          {/* <Route path="/general" element={<News key="general" pageSize={6} country='us' category="general"/>}/> */}
          <Route path="/health" element={<ProtectedRoute><News key="health" pageSize={this.pageSize} country='us' category="health" searchQuery={this.state.searchQuery}/></ProtectedRoute>}/>
          <Route path="/science" element={<ProtectedRoute><News key="science" pageSize={this.pageSize} country='us' category="science" searchQuery={this.state.searchQuery}/></ProtectedRoute>}/>
          <Route path="/sports" element={<ProtectedRoute><News key="sports" pageSize={this.pageSize} country='us' category="sports" searchQuery={this.state.searchQuery}/></ProtectedRoute>}/>
          <Route path="/technology" element={<ProtectedRoute><News key="technology" pageSize={this.pageSize} country='us' category="technology" searchQuery={this.state.searchQuery}/></ProtectedRoute>}/>
          {/* <Route path="/signup" element={<Signup />} />  {/* Route for Signup page */}
          {/* <Route path="/login" element={<Login />} />  {/*Add Login Route */}
          {/* <Route path="/mysavednews" element={<ProtectedRoute><MySavedNews /></ProtectedRoute>} /> */}
          
            <Route path="/saved-news" element={<ProtectedRoute><SavedNews /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </Router>
        {/* <FetchData /> */}
      </div>
    )
  }
}
