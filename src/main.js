import { weatherTypeCodeDisplay } from "./data.js";

async function getWeather() {
        const cityName = document.getElementById('cityInput').value;
        const weatherInfo = document.getElementById('weather-info');
        
        if (!cityName) {
          weatherInfo.innerHTML = '<p class="error">Please enter a city name</p>';
          return;
        }

        try {
          const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`);
          const geoData = await geoResponse.json();
          
          console.log(geoData);
          if (!geoData.results || geoData.results.length === 0) {
            weatherInfo.innerHTML = '<p class="error">City not found. Please try another city.</p>';
            return;
          }

          const { latitude, longitude, name, country } = geoData.results[0];
          

          const weatherType = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode`);
          const weatherTypeData = await weatherType.json();
          
          const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
          const weatherData = await weatherResponse.json();
          
          

          weatherInfo.innerHTML = `
            <h2>Current Weather in ${name}, ${country}</h2>
            <P>Weather Type: ${weatherTypeCodeDisplay[String(weatherTypeData.hourly.weathercode[0])]}</p>
            <p>Temperature: ${weatherData.current_weather.temperature} °C</p>
            <p>Wind Speed: ${weatherData.current_weather.windspeed} km/h</p>
            
          `;
        } catch (error) {
          console.error('Error:', error);
          weatherInfo.innerHTML = '<p class="error">Error fetching weather data. Please try again.</p>';
        }
      }