import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            setIsAuthenticated(!!token);  // ✅ Ensures it only updates once
            setLoading(false);
        };

        checkAuth();
    }, []);  // ✅ Added an empty dependency array to prevent infinite re-renders

    if (loading) return <p>Loading...</p>;

    return isAuthenticated ? children : <Navigate to="/auth"/>;
};

export default ProtectedRoute;
