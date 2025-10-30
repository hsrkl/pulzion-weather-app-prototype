import React, { useEffect, useState } from "react";
import bg from "./assets/pixil-frame-0.png";


function Window() {
    const [isRaining, setIsRaining] = useState(false);
    const [isSnowing, setIsSnowing] = useState(false);

    useEffect(() => {
        if (!isRaining) return;

        // Create rain drops
        const makeRain = () => {
            const rainContainer = document.querySelector('.weather-container');
            if (!rainContainer) return;

            rainContainer.innerHTML = ''; // Clear existing drops
            let drops = '';

            for (let i = 0; i < 100; i++) {
                const left = Math.floor(Math.random() * 100);
                const animationDelay = Math.random() * 2;
                const animationDuration = Math.random() * 1 + 0.5;

                drops += `<div class="drop" style="left: ${left}%; animation-delay: ${animationDelay}s; animation-duration: ${animationDuration}s;"></div>`;
            }

            rainContainer.innerHTML = drops;
        };

        makeRain();
    }, [isRaining]);

    
    useEffect(() => {
        if (!isSnowing) return;

        // Create rain drops
        const makeSnow = () => {
            const snowContainer = document.querySelector('.weather-container');
            if (!snowContainer) return;

            snowContainer.innerHTML = ''; // Clear existing drops
            let particles = '';

            for (let i = 0; i < 100; i++) {
                const left = Math.floor(Math.random() * 100);
                const animationDelay = Math.random() * 2;
                const animationDuration = Math.random() * 1 + 0.5;

                particles += `<div class="snow-particle" style="left: ${left}%; animation-delay: ${animationDelay}s; animation-duration: ${animationDuration}s;"></div>`;
            }

            snowContainer.innerHTML = particles;
        };

        makeSnow();
    }, [isSnowing]);

    const toggleRain = () => {
        setIsRaining(prev => !prev);
    };

    const toggleSnow = () => {
        setIsSnowing(prev => !prev);
    };  

    return (
        <div
            className={`image-wrapper ${isRaining ? 'rainy-sky' : ''}`}
        >
        {isRaining && <div className="weather-container"></div>}
            {(isRaining || isSnowing) && <div className="weather-container"></div>}
        <div className={`image-wrapper ${isRaining ? 'rainy-sky' : isSnowing ? 'snowy-sky' : ''}`}>
            {isRaining && <div className="weather-container rain-container"></div>}
            {isSnowing && <div className="weather-container snow-container"></div>}
             <img src={bg} alt="bg" />
             <button className="sidebar-button" onClick={toggleSnow}>
                 {isSnowing ? 'Stop Snow' : 'Start Snow'}
             </button>
             <button className="sidebar-button" onClick={toggleRain}>
                 {isRaining ? 'Stop Rain' : 'Start Rain'}
             </button>
         </div>
        </div>
    );
}
// 27/120 123/175

export default Window;
