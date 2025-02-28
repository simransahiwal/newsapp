import React, { useState, useEffect } from "react";
import "./Home.css";
const TimeWeather = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
//   const [location, setLocation] = useState(null);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Get user's location and fetch weather
    getUserLocation();

    // Cleanup function to clear interval
    return () => clearInterval(timer);
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User Location:", latitude, longitude);
          fetchWeather(latitude, longitude);
        },
        (err) => {
          console.error("Error getting location:", err);
          setError("Location access denied. Unable to fetch weather.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    const API_KEY = "148c54b3e513907917b666d61863fb72"; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
          city: data.name,
          country: data.sys.country,
        });
      } else {
        setError(`Weather API error: ${data.message}`);
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data");
    }
  };

  return (
    <div className="text-center">
      <div className="alert d-inline-block px-4 py-2 rounded timeweather">
        🕒 {time} |{" "}
        {error ? (
          <span>❌ {error}</span>
        ) : weather ? (
          <>
            📍 {weather.city}, {weather.country} | 🌤️ {weather.temp}°C,{" "}
            {weather.description}
          </>
        ) : (
          <> Loading weather...</>
        )}
      </div>
    </div>
  );
};

export default TimeWeather;
