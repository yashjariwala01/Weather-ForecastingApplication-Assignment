import React, { useState, useEffect } from 'react';
import { fetchWeatherForecast } from '../Services/WeatherServices';
import {
  RiSunFill,
  RiCloudyFill,
  RiFoggyFill,
  RiRainyFill,
  RiSnowyFill,
  RiThunderstormsFill,
  RiQuestionFill
} from 'react-icons/ri';

function getWeatherIcon(code, iconSize) {
  switch (code) {
    case 1100:
    case 1000:
      return <RiSunFill size={iconSize} />;
    case 1001:
    case 1101:
    case 1102:
      return <RiCloudyFill size={iconSize} />;
    case 2000:
    case 2001:
      return <RiFoggyFill size={iconSize} />;
    case 3000:
    case 3001:
    case 3002:
      return <RiRainyFill size={iconSize} />;
    case 4000:
    case 4001:
    case 4200:
    case 4201:
      return <RiSnowyFill size={iconSize} />;
    case 5000:
    case 5001:
      return <RiThunderstormsFill size={iconSize} />;
    default:
      return <RiQuestionFill size={iconSize} />;
  }
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function formatDateInWords(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const suffix = getOrdinalSuffix(day);
  return `${day}${suffix} ${month} ${year}`;
}

function Forecast({ location }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location) {
          const data = await fetchWeatherForecast(location);
          setForecastData(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [location]);

  if (loading) return <div>Loading weather forecast...</div>;
  if (error) return <div>Error: {error}</div>;

  const forecastIntervals = forecastData?.data?.timelines[0]?.intervals;

  return (
    <div className='m-4'>
      {forecastIntervals && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
          {forecastIntervals.slice(1).map((interval, index) => (
            <div className='transition-transform transform hover:scale-105 border-2 border-solid border-black p-5 rounded-xl shadow-2xl gap-2' key={index}>
              <div className='flex flex-col items-center gap-1'>
                <div className='weather-icon mb-3'>
                  {getWeatherIcon(interval.values.weatherCode, 60)}
                </div>
                <p>Temp: {interval.values.temperature}°C</p>
                <p>Wind: {interval.values.windSpeed} m/s</p>
                <p>Humidity: {interval.values.humidity}%</p>
                <p className='mt-3 font-bold text-lg'>{formatDateInWords(interval.startTime)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Forecast;
