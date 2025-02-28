import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";  // if you put the CSS in a separate file

const Login = ({setIsAuthenticated}) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();  // useNavigate hook
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token); // Store JWT token in local storage
            setIsAuthenticated(true); 
            // alert("Login successful!");
            navigate("/");  // Redirect to home (or any other page) after successful login
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="video-background">
        <video autoPlay loop muted playsInline className="video">
        <source src="/Logingif.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
        <div className="login-container">
            
        <div className="login-card">
        <h1>Welcome to NewsApp</h1>
        <h2>Please Login for full experience</h2>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <button onClick={() => navigate("/auth/signup")}>Sign Up</button></p>
        </div>
        </div>
        </div>
    );
};

export default Login;
