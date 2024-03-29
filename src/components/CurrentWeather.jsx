// import React, { useState, useEffect } from 'react';
// import { fetchCurrentWeather } from '../Services/WeatherServices';
// import { RiSunFill, RiCloudyFill, RiFoggyFill, RiRainyFill, RiSnowyFill, RiThunderstormsFill, RiQuestionFill } from 'react-icons/ri';
// import { MapPin } from 'react-feather';
// import { FaWind } from "react-icons/fa";
// import { FaTemperatureHigh } from "react-icons/fa";
// import { WiHumidity } from "react-icons/wi";


// function CurrentWeather({ location }) {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [weatherDate, setWeatherDate] = useState('');

//   const currentWeather = weatherData?.data?.timelines[0]?.intervals[0]?.values;
//   const weatherCode = currentWeather?.weatherCode;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (location) {
//           const data = await fetchCurrentWeather(location);
//           setWeatherData(data);
//           setLoading(false);
//           console.log(data);
//         }
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [location]);

//   useEffect(() => {
//     // Update currentDateTime every second
//     const interval = setInterval(() => {
//       const newDate = new Date().toLocaleString();
//       setWeatherDate(newDate);
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, []);

//   if (loading) return <div>Loading current weather...</div>;
//   if (error) return <div>Error: {error}</div>;

//   // Function to get weather icon and description based on weather code
//   const getWeatherInfo = (code) => {
//     const iconSize = 60;
//     switch (code) {
//       case 1100:
//       case 1000:
//         return { icon: <RiSunFill size={iconSize} />, description: 'Clear' };
//       case 1001:
//       case 1101:
//       case 1102:
//         return { icon: <RiCloudyFill size={iconSize} />, description: 'Cloudy' };
//       case 2000:
//       case 2001:
//         return { icon: <RiFoggyFill size={iconSize} />, description: 'Fog' };
//       case 3000:
//       case 3001:
//       case 3002:
//         return { icon: <RiRainyFill size={iconSize} />, description: 'Rain' };
//       case 4000:
//       case 4001:
//       case 4200:
//       case 4201:
//         return { icon: <RiSnowyFill size={iconSize} />, description: 'Snow' };
//       case 5000:
//       case 5001:
//         return { icon: <RiThunderstormsFill size={iconSize} />, description: 'Thunderstorm' };
//       default:
//         return { icon: <RiQuestionFill size={iconSize} />, description: 'Unknown' };
//     }
//   };

//   const { icon, description } = getWeatherInfo(weatherCode);

//   return (
//     <div>
//       {currentWeather && (
//         <div className='content gap-2'>

//           <div className='location d-flex items-baseline gap-2'>
//             <p className='font-extrabold text-2xl'>{location}</p>
//             <MapPin />
//           </div>

//           <p className='datetext'>{weatherDate}</p>
//           <div className='weatherdesc'>
//             {icon}{description}
//           </div>

//         <div className='flex gap-3 m-2 w-[80%]'>
          
//           <div className='stats d-flex flex-c gap-2'>
//             <div className='flex justify-center items-center'>
//               <FaTemperatureHigh />
//               <p>Temp: {currentWeather.temperature}°C </p>
//             </div>
//           </div>

//           <div className='stats d-flex flex-c'>
//             <div className='flex justify-center items-center gap-2'>
//               <FaWind />
//               <p>Wind Speed: {currentWeather.windSpeed} m/s</p>
//             </div>
//           </div>

          
//           <div className='stats d-flex flex-c'>
//             <div className='flex justify-center items-center gap-2'>
//               <WiHumidity />
//               <p>Humidity: {currentWeather.humidity}%</p>
//             </div>
//           </div>

//         </div>

//       </div>          
//       )}
//     </div>
//   );
// }

// export default CurrentWeather;

import React, { useState, useEffect } from 'react';
import { fetchCurrentWeather } from '../Services/WeatherServices';
import {
  RiSunFill,
  RiCloudyFill,
  RiFoggyFill,
  RiRainyFill,
  RiSnowyFill,
  RiThunderstormsFill,
  RiQuestionFill
} from 'react-icons/ri';
import { MapPin } from 'react-feather';
import { FaWind } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

function CurrentWeather({ location }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherDate, setWeatherDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location) {
          const data = await fetchCurrentWeather(location);
          setWeatherData(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [location]);

  useEffect(() => {
    // Update currentDateTime every second
    const interval = setInterval(() => {
      const newDate = new Date().toLocaleString();
      setWeatherDate(newDate);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  if (loading) return <div>Loading current weather...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentWeather = weatherData?.data?.timelines[0]?.intervals[0]?.values;
  const weatherCode = currentWeather?.weatherCode;

  // Function to get weather icon and description based on weather code
  const getWeatherInfo = (code) => {
    const iconSize = 60;
    switch (code) {
      case 1100:
      case 1000:
        return { icon: <RiSunFill size={iconSize} />, description: 'Clear' };
      case 1001:
      case 1101:
      case 1102:
        return { icon: <RiCloudyFill size={iconSize} />, description: 'Cloudy' };
      case 2000:
      case 2001:
        return { icon: <RiFoggyFill size={iconSize} />, description: 'Fog' };
      case 3000:
      case 3001:
      case 3002:
        return { icon: <RiRainyFill size={iconSize} />, description: 'Rain' };
      case 4000:
      case 4001:
      case 4200:
      case 4201:
        return { icon: <RiSnowyFill size={iconSize} />, description: 'Snow' };
      case 5000:
      case 5001:
        return { icon: <RiThunderstormsFill size={iconSize} />, description: 'Thunderstorm' };
      default:
        return { icon: <RiQuestionFill size={iconSize} />, description: 'Unknown' };
    }
  };

  const { icon, description } = getWeatherInfo(weatherCode);

  return (
    <div className='flex flex-col items-center gap-4'>
      {currentWeather && (
        <div className='flex flex-col items-center gap-4'>
          <div className='flex items-center gap-2'>
            <MapPin />
            <p className='font-bold text-2xl mt-4'>{location}</p>
          </div>

          <p className='text-lg'>{weatherDate}</p>
          <div className='flex items-center gap-2'>
            {icon}
            <p className='text-xl'>{description}</p>
          </div>
          <div className='flex gap-4'>

            <div className='bg-[rgba(0,0,0,0.3)] p-1 md:p-2 lg:p-3 rounded-md flex items-center gap-2'>
              <FaTemperatureHigh />
              <p>Temp: <span className='text-lg'>{currentWeather.temperature}°C</span></p>
            </div>

            <div className='bg-[rgba(0,0,0,0.3)] p-1 md:p-2 lg:p-3 rounded-md  flex items-center gap-2'>
              <FaWind />
              <p>Wind Speed: {currentWeather.windSpeed} m/s</p>
            </div>

            <div className='bg-[rgba(0,0,0,0.3)] p-1 md:p-2 lg:p-3 rounded-md flex items-center gap-2'>
              <WiHumidity />
              <p>Humidity: {currentWeather.humidity}%</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;
