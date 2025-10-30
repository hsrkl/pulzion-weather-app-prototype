import React, { useState } from 'react';
import './App.css';
import Window from "./Window"

function App() {
  const [weather, setWeather] = useState('sunny');
  const [location, setLocation] = useState('');
  const [inputValue, setInputValue] = useState('');

  const toggleWeather = () => {
    setWeather(current => {
      switch (current) {
        case 'sunny': return 'rainy';
        case 'rainy': return 'snowy';
        case 'snowy': return 'sunny';
        default: return 'sunny';
      }
    });
  };

  const handleRefresh = () => {
    setLocation(inputValue);
    setInputValue('');
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo-container">
          <h2>Logo</h2>
        </div>
        <button className="sidebar-button" onClick={handleRefresh}>
          Refresh
        </button>
        <input
          type="text"
          placeholder="City"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="sidebar-input"
        />
        <button className="sidebar-button" onClick={toggleWeather}>
          Weather: {weather}
        </button>
      </aside>
      <main className="main-content">
        <div className="image-wrapper-wrapper">
          <div className="overlay-text-temperature">27 C</div>
          <div className="overlay-text-general-info">27 C</div>
          <Window weather={weather} />
        </div>
      </main>
    </div>
  );
}

export default App;