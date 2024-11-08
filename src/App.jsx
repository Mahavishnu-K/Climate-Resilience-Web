import React, { useState } from 'react';
import TemperatureGraph from './Temp';
import './App.css';
import cloudy from './assets/cloudy.svg'
import lightning from './assets/lightning.svg'
import rainy from './assets/rainy.svg'
import sunny from './assets/sunny.svg'
import night from './assets/night.svg'
import humidityImg from './assets/humidityImg.svg'
import windspeed from './assets/windspeed.svg'


const API_KEY = '122e8ec29bcbc4efa86ad1d20c8f51ec';
const App = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [temperatureData, setTemperatureData] = useState([]);
    const [dates, setDates] = useState([]);
    const [error, setError] = useState(null);
    const fetchWeatherData = async () => {
        const url = location.includes(',')
            ? `https://api.openweathermap.org/data/2.5/weather?lat=${location.split(',')[0]}&lon=${location.split(',')[1]}&appid=${API_KEY}&units=imperial`
            : `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod === 200) {
                setWeatherData(data);
                setError(null);
                const todayTemp = Math.round(data.main.temp);
                const todayDate = new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                });
                setTemperatureData([todayTemp]);
                setDates([todayDate]);
            } else {
                setError(data.message);
                setWeatherData(null);
                setTemperatureData([]); 
                setDates([]);
            }
        } catch (err) {
            setError("Failed to retrieve weather data. Please try again.");
            setTemperatureData([]);
            setDates([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    const getWeatherIcon = () => {
      const temp = weatherData?.main?.temp;
      const humidity = weatherData?.main?.humidity;

      if (temp && humidity) {
          if (temp > 85) {
              return sunny;
          } else if (temp > 70 || humidity > 70) {
              return rainy;
          } else if (temp > 50 || humidity > 50) {
              return cloudy;
          } else if (temp < 50 || humidity < 30) {
              return night;
          } else if (humidity > 80) {
              return lightning;
          }
      }
      return cloudy;
    };

    return (
        <div className="weather-app">
          <h1>Climate Resilience</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your city:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder='Search your city'
                    />
                </label>
                <button type="submit">Get Weather</button>
            </form>

            <div className='temp-container'>
              <div className='title'>
                <h1>Weather Forecast for {location}</h1>
                {weatherData && (
                        <img
                            src={getWeatherIcon()}
                            alt="weather icon"
                            width="250"
                            height="150"
                            className="weather-icon"
                        />
                )}
              </div>
              <div className='graph'>

                {temperatureData.length > 0 && (
                    <TemperatureGraph temperatureData={temperatureData} labels={dates} />
                )}
                {error && <p>{error}</p>}
              </div>
            </div>
            {weatherData && (
                <div className="weather-summary">
                    <h1>Atmospheric Temperature is {Math.round(weatherData.main.temp)}°F</h1>
                    <div className="weather-cards">
                        <div className="weather-sum-card">
                            <h4>Weather Summary</h4>
                            <h2>{weatherData.weather[0].description}</h2>
                        </div>
                        <div className="weather-card-hum">
                            <div className='hum-text'>
                              <h3>Humidity:</h3>
                              <h1> {weatherData.main.humidity}%</h1>
                            </div>
                            <img
                              src={humidityImg}
                              alt="humidity Image"
                              width="70"
                              height="150"
                              className="humidity-icon"
                            />
                        </div>
                        <div className="weather-card">
                          <div>
                            <h3>Wind Speed: </h3>
                            <h1>{weatherData.wind.speed} km/h</h1>
                          </div>
                          <img
                              src={windspeed}
                              alt="windspeed Image"
                              width="70"
                              height="150"
                              className="windspeed-icon"
                          />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
