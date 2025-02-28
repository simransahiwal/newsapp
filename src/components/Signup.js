import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Signup = ({ toggleForm }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const { name, email, password } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, formData); 
            localStorage.setItem("token", response.data.token); // Save token to localStorage
            alert("Signup successful!");
            // Redirect to home or another page after successful signup
            navigate("/auth/login");
        } catch (err) {
            setError(err.response?.data?.msg || "Something went wrong");
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
            <h3>Signup</h3>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <button onClick={() => navigate("/auth/login")}>Login</button></p>
        </div>
        </div>
        </div>
    );
};

export default Signup;
