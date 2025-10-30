import React, { useState } from 'react';
import './App.css';
import Window from "./Window";
import { weatherTypeCodeDisplay } from "./data.js";

function App() {
  const [isRaining, setIsRaining] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [weatherInfo, setWeatherInfo] = useState('');

  const toggleRain = () => setIsRaining(prev => !prev);

  async function getWeather() {
    if (!inputValue) {
      setWeatherInfo('<p class="error">Please enter a city name</p>');
      return;
    }

    try {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(inputValue)}&count=1`);
      const geoData = await geoResponse.json();

      if (!geoData.results?.length) {
        setWeatherInfo('<p class="error">City not found. Please try another city.</p>');
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];
      const weatherType = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode`);
      const weatherTypeData = await weatherType.json();
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherData = await weatherResponse.json();

      setWeatherInfo(`
        <h2>${name}</h2>
        <p>${weatherTypeCodeDisplay[String(weatherTypeData.hourly.weathercode[0])]}</p>
        <p>${weatherData.current_weather.temperature} °C</p>
        <p>Wind Speed: ${weatherData.current_weather.windspeed} km/h</p>
      `);
    } catch (error) {
      console.error('Error:', error);
      setWeatherInfo('<p class="error">Error fetching weather data. Please try again.</p>');
    }
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo-container">
          <h2>Logo</h2>
        </div>
        <button className="sidebar-button" onClick={getWeather}>
          Refresh
        </button>
        <input
          id="sidebar-input"
          type="text"
          placeholder="City"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="sidebar-input"
        />
      </aside>
      <main className="main-content">
        <div className="image-wrapper-wrapper">
          <div
            className="overlay-text"
            id="overlay-text"
            dangerouslySetInnerHTML={{ __html: weatherInfo }}
          />
          <Window isRaining={isRaining} onToggleRain={toggleRain} />
        </div>
      </main>
    </div>
  );
}

export default App;
