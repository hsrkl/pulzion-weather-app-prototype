import React, { useState } from 'react';
import './App.css';
import Window from "./Window"


function App() {
  const [isRaining, setIsRaining] = useState(false);

  const toggleRain = () => {
    setIsRaining(prev => !prev);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo-container">
          <h2>Logo</h2>
        </div>
        <button className="sidebar-button" onClick={() => alert("refresh")}>
          Refresh
        </button>
      </aside>
      <main className="main-content">
        <div className="image-wrapper-wrapper">
          <Window isRaining={isRaining} onToggleRain={toggleRain} />
        </div>
      </main>
    </div>
  );
}


export default App;