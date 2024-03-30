import React, { useState, useEffect } from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';


function App() {
  const [currentLocation, setCurrentLocation] = useState('');

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
              .then(response => response.json())
              .then(data => setCurrentLocation(data.locality))
              .catch(error => console.error('Error fetching current location:', error));
          },
          (error) => {
            console.error('Error getting current location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser');
      }
    };

    if (currentLocation === '') {
      fetchLocation();
    }
  }, []);

  const handleSearch = (location) => {
    setCurrentLocation(location);
  };

  if (currentLocation) {
    return (
      <div className='app'>
        <div className="container">
          <h1 className='mb-6 text-lg font-extrabold'>Weather App</h1>
          <SearchBar onSearch={handleSearch} />
          <div className="weather-card">
            <CurrentWeather location={currentLocation} />
          </div>
          <div className="weather-card">
            <Forecast location={currentLocation} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col justify-center items-center p-16 gap-5 '>
        <div className='loader'></div>
        <div className='flex justify-center items-center'>
          <h3 className='text-white text-2xl font-semibold'>
            Detecting your location
          </h3>
        </div>
      </div>
    );
  }
}

export default App;
