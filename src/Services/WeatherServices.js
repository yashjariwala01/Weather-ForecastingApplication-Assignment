
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://api.tomorrow.io/v4/timelines`;

async function fetchCurrentWeather(location) {
  try {
    const response = await fetch(`${API_URL}?location=${location}&fields=temperature,precipitationIntensity,weatherCode,windSpeed,humidity&units=metric&timesteps=current&apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch current weather data');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    throw error;
  }
}

async function fetchWeatherForecast(location) {
  try {
    const response = await fetch(`${API_URL}?location=${location}&fields=temperature,weatherCode,windSpeed,humidity&units=metric&timesteps=1d&apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather forecast data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather forecast data:', error);
    throw error;
  }
}

export { fetchCurrentWeather, fetchWeatherForecast };
