import './App.css';
import Search from './components/search/search';
import Forecast from './components/forecast/forecast';
import CurrentWeather from './components/current-weather/current-weather';
import { Weather_API_URL, Weather_API_KEY } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${Weather_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${Weather_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${Weather_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();
      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setforecast({ city: searchData.label, ...forecastResponse });
    })
      .catch((err) => console.log(err));

  }

  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchCange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}

      {forecast && <Forecast data={forecast} />}

    </div>
  );
}

export default App;
