import React, { useEffect } from "react";
import bg from "./assets/pixil-frame-0.png";
import rainyCloud1 from "./assets/rainy_cloud_1.png";
import rainyCloud2 from "./assets/rainy_cloud_2.png";
import sunnyCloud1 from "./assets/sunny_cloud_1.png";

function Window({ weather }) {
    useEffect(() => {
        const container = document.querySelector('.weather-container');
        if (!container) return;

        if (weather === 'rainy') {
            container.innerHTML = '';
            let drops = '';
            for (let i = 0; i < 100; i++) {
                const left = Math.floor(Math.random() * 100);
                const animationDelay = Math.random() * 2;
                const animationDuration = Math.random() * 1 + 0.5;
                drops += `<div class="drop" style="left: ${left}%; animation-delay: ${animationDelay}s; animation-duration: ${animationDuration}s;"></div>`;
            }
            container.innerHTML = drops;
        } else if (weather === 'snowy') {
            container.innerHTML = '';
            let particles = '';
            for (let i = 0; i < 100; i++) {
                const left = Math.floor(Math.random() * 100);
                const animationDelay = Math.random() * 2;
                const animationDuration = Math.random() * 1 + 0.5;
                particles += `<div class="snow-particle" style="left: ${left}%; animation-delay: ${animationDelay}s; animation-duration: ${animationDuration}s;"></div>`;
            }
            container.innerHTML = particles;
        } else {
            container.innerHTML = '';
        }
    }, [weather]);

    const cloudStyle = {
        width: '125px',  // Set a very small base size
        height: 'auto', // Maintain aspect ratio
        imageRendering: 'pixelated' // Keep pixel art crisp
    };

    return (
        <div className={`image-wrapper ${weather}-sky`}>
            <div className="clouds-container">
                {weather === 'rainy' && (
                    <>
                        <img style={cloudStyle} src={rainyCloud1} alt="rainy cloud" className="cloud rainy-cloud-1" />
                        <img style={cloudStyle} src={rainyCloud2} alt="rainy cloud" className="cloud rainy-cloud-2" />
                        <img style={cloudStyle} src={rainyCloud1} alt="rainy cloud" className="cloud rainy-cloud-3" />
                    </>
                )}
                {weather === 'snowy' && (
                    <>
                        <img style={cloudStyle} src={rainyCloud1} alt="rainy cloud" className="cloud rainy-cloud-1" />
                        <img style={cloudStyle} src={rainyCloud2} alt="rainy cloud" className="cloud rainy-cloud-2" />
                        <img style={cloudStyle} src={sunnyCloud1} alt="sunny cloud" className="cloud sunny-cloud-1" />
                    </>
                )}
            </div>
            {(weather === 'rainy' || weather === 'snowy') &&
                <div className="weather-container"></div>
            }
            <img src={bg} alt="bg" className="background-image" />
        </div>
    );
}

export default Window;
