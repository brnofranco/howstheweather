import { useState } from 'react';
import axios from 'axios';

import { Card } from './components/Card';

import './styles/home.sass';
import './styles/loading.sass';
import './styles/weather.sass';

import cloudImg from './images/Cloud.svg';
import fogImg from './images/Fog.svg';
import sunImg from './images/Sun.svg';


export default function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, lon) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: lon,
        appid: process.env.REACT_APP_OPEN_WHEATER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }

  async function handleGetWeatherByName(e){
    e.preventDefault();

    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        appid: process.env.REACT_APP_OPEN_WHEATER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
    setLocation(true);
  }
  
  function handleLocationTrue() {
    return navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }


  if(location === false) {
    return(
      <>
      <div className="home-title">
          <h1> How's the Weather? </h1>
      </div>
      <div className="home-content">
        <aside>
          <div className="aside-content">
            <h1> Ver clima em sua localização atual </h1>
            <button onClick={handleLocationTrue}> Ative sua Localização </button>
          </div>
        </aside>
        <div className="divider">
          <div className="line"></div>
        </div>
        <main>
          <div className="main-content">
            <h1> Digite a cidade: </h1>
            <form onSubmit={handleGetWeatherByName}>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              <button type="submit"> Ver </button>
            </form>
          </div>
        </main>
      </div>
      </>
    );
  } else if(weather === false) {
    return (
      <div className="loading">
        <h4> Loading... </h4>
      </div>
    );
  } else {

    function handleWeatherTheme() {
      if(weather['weather'][0]['description'].includes("nevoeiro")){
        return fogImg;
      } else if(weather['weather'][0]['description'].includes("nu")){
        return cloudImg;
      } else if(weather['weather'][0]['description'].includes("limpo")){
        return sunImg;
      }
    }

    /* function handleBack() {
      setWeather(false);
      setLocation(false);
    } */

    return (
      <div className="weather">
        <section className="main-info">
          <div className="city-content">
            <h1> {weather['name']}, {weather['sys']['country']} </h1>
            <span> {weather['weather'][0]['description']} </span>
          </div>
          <div className="temp-content">
            <img src={handleWeatherTheme()} alt="Weather" /> 
            <h2> {Math.round(JSON.stringify(weather['main']['temp']))}° </h2>
            <span>Sensação: {Math.round(JSON.stringify(weather['main']['feels_like']))}° </span>
          </div>
        </section>
        <section className="other-info">
          <div className="weather-content">
            <Card text="Temperatura máxima do dia" value={Math.round(JSON.stringify(weather['main']['temp_max']))} type="°" />
            <Card text="Temperatura mínima do dia" value={Math.round(JSON.stringify(weather['main']['temp_min']))} type="°" />
            <Card text="Umidade" value={JSON.stringify(weather['main']['humidity'])} type="%" />
            <Card text="Pressão" value={JSON.stringify(weather['main']['pressure'])} type=" hPa" />
          </div>
        </section>
      </div>
    );
  }
}
