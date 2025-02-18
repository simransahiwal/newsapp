import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setIsAuthenticated}) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();  // useNavigate hook
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch("http://localhost:5000/auth/login", { //local
        const response = await fetch("https://newsapp-xmx1.onrender.com/auth/login", { // render
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token); // Store JWT token in local storage
            setIsAuthenticated(true); 
            alert("Login successful!");
            navigate("/");  // Redirect to home (or any other page) after successful login
        } else {
            alert(data.message);
        }
    };

    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <button onClick={() => navigate("/auth/signup")}>Sign Up</button></p>
        </div>
    );
};

export default Login;
