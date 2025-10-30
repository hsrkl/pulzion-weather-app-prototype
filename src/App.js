import React, { useState } from 'react';
import './App.css';
import Window from "./Window"

function App() {
  const [isRaining, setIsRaining] = useState(false);
  const [location, setLocation] = useState('');
  const [inputValue, setInputValue] = useState('');

  const toggleRain = () => {
    setIsRaining(prev => !prev);
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
      </aside>
      <main className="main-content">
        <div className="image-wrapper-wrapper">
          <div className="overlay-text-temperature">27 C</div>
          <div className="overlay-text-general-info">27 C</div>
          <Window isRaining={isRaining} onToggleRain={toggleRain} />
        </div>
      </main>
    </div>
  );
}

export default App;