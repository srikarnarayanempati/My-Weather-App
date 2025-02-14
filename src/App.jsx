import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faTint } from "@fortawesome/free-solid-svg-icons";


import clearImg from "./assets/weather/clear.jpg";
import cloudsImg from "./assets/weather/clouds.jpg";
import rainImg from "./assets/weather/rain.jpg";
import snowImg from "./assets/weather/snow.jpg";
import thunderstormImg from "./assets/weather/thunderstorm.jpg";
import drizzleImg from "./assets/weather/drizzle.jpg";
import mistImg from "./assets/weather/mist.jpg";
import defaultImg from "./assets/weather/default.jpg";

const API_KEY = "6dbe27ce6ddf1f2044c795a444b87757"; 
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const getWeatherImage = (condition) => {
  const images = {
    Clear: clearImg,
    Clouds: cloudsImg,
    Rain: rainImg,
    Snow: snowImg,
    Thunderstorm: thunderstormImg,
    Drizzle: drizzleImg,
    Mist: mistImg,
    Default: defaultImg
  };
  return images[condition] || images["Default"];
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);  
  
    try {
      const response = await axios.get(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);
      setWeather(response.data);
      setError("");  
    } catch (err) {
      setWeather(null);  
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={{
      textAlign: "center", 
      padding: "20px",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
      color: "white"
    }}>
      <Typography variant="h3" color="black" gutterBottom style={{ fontWeight: "525" }}>Weather App</Typography>
      
      <TextField
        label="Enter City"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginBottom: "10px", width: "300px", background: "white", borderRadius: "10px" }}
      />
      <br />
      <Button variant="contained" color="primary" onClick={fetchWeather}>Get Weather</Button>
      <br />

      {loading && <CircularProgress style={{ marginTop: "20px" }} />}
      {error && <Typography color="error" style={{ marginTop: "10px", fontWeight: "bold" }}>{error}</Typography>}

      {weather && !error && ( 
        <Card className="card-container">
          <CardContent>
            <Typography variant="h5" className="title">Weather Report</Typography>
            <Typography variant="h3" className="weather-info">{weather.name}, {weather.sys.country}</Typography>
            <Typography variant="h5" className="weather-info">{weather.weather[0].description}</Typography>

            
            <img 
              src={getWeatherImage(weather.weather[0].main)} 
              alt="Weather Condition" 
              className="weather-image"
            />

            <Typography variant="h4" className="weather-info">Temperature: {weather.main.temp}°C</Typography>
            <Typography className="weather-info"><FontAwesomeIcon icon={faTint} /> Humidity: {weather.main.humidity}%</Typography>
            <Typography className="weather-info"><FontAwesomeIcon icon={faWind} /> Wind Speed: {weather.wind.speed} m/s</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default App;
