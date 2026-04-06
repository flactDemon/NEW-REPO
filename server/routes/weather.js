import express from 'express';

const router = express.Router();

const getWeatherCondition = (code) => {
  if (code === 0) return 'Clear';
  if (code >= 1 && code <= 3) return 'Cloudy'; // partly cloudy
  if (code >= 45 && code <= 48) return 'Fog';
  if (code >= 51 && code <= 67) return 'Light Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Heavy Rain';
  if (code >= 95) return 'Thunderstorm';
  return 'Clear';
};

router.get('/', async (req, res) => {
  const { location } = req.query;
  try {
    const cityName = (location || 'Pune').split(',')[0].trim();
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`);
    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }
    
    const { latitude, longitude, name, country } = geoData.results[0];
    
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max&timezone=auto`);
    const weatherData = await weatherResponse.json();
    
    res.json({
      temp: Math.round(weatherData.current.temperature_2m),
      humidity: weatherData.current.relative_humidity_2m,
      condition: getWeatherCondition(weatherData.current.weather_code),
      tomorrow: Math.round(weatherData.daily.temperature_2m_max[1]),
      day3: Math.round(weatherData.daily.temperature_2m_max[2]),
      day4: Math.round(weatherData.daily.temperature_2m_max[3]),
      resolvedLocation: `${name}, ${country}`
    });
  } catch (error) {
    console.error("Error fetching weather:", error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

export default router;
