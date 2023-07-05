import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../styles/MyCustomWidget.css"

export default function MyCustomWidget() {

    const [weatherData, setWeatherData] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [language, setLanguage] = useState()
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${language}`
                const response = await axios.get(apiURL);
                setLanguage(response.data.sys.country)
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        if (latitude !== null && longitude !== null) {
            fetchData();
        }
    }, [latitude, longitude, apiKey, language]);

    useEffect(() => {
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                    },
                    (error) => {
                        console.error('Error retrieving location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        fetchLocation();
    }, []);

    const weatherImageMap = {
        Rain: 'https://img.icons8.com/officel/40/cloud-lighting.png',
        Clear: 'https://img.icons8.com/fluency/48/sun.png',
        Clouds: 'https://img.icons8.com/clouds/100/clouds.png',
        Snow: 'https://img.icons8.com/doodle/48/snow--v2.png'
    };

    const weatherMain = weatherData?.weather?.[0]?.main;
    const imageUrl = weatherImageMap[weatherMain] || "https://img.icons8.com/plasticine/100/sky.png";
    const weatherImage = (
        <img width="80" height="80" src={imageUrl} alt={weatherMain || "sky"} />
    );

    return (
        <div className='weather-container'>
            <div className='weather-info'>
                {weatherData ? (
                    <div className='weather-text'>
                        <h2>{weatherData.name}</h2>
                        <p>Temp: {((weatherData.main.temp - 273.15) * 10 / 10).toFixed(1)} °C</p>
                        <p>Feels: {((weatherData.main.feels_like - 273.15) * 10 / 10).toFixed(1)} °C</p>
                        <p>{weatherData.weather[0].description}</p>
                    </div>
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
            {weatherImage}
        </div>
    );
}

