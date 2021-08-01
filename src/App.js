import { useState } from 'react';
import axios from 'axios';

import './styles/home.sass';
import './styles/loading.sass';
import './styles/weather.sass';

import cloudImg from './images/Cloud.svg';


export default function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  const hoje = new Date();

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
    return (
      <>
        <div className="title"> 
          <h1> Clima atual de {JSON.stringify(weather['name'])} às {hoje.getHours()} horas </h1>
        </div>
        <div className="weather-content">
          <div className="card">
            <h3> Descrição: </h3>
            <img src={cloudImg} alt="Cloud" /> 
            <p> {JSON.stringify(weather['weather'][0]['description'])} </p>
          </div>
          <div className="card">
            <h3> Temperatura atual: </h3>
            <p> {Math.round(JSON.stringify(weather['main']['temp']))}° </p>
          </div>
          <div className="card">
            <h3> Sensação Térmica: </h3>
            <p> {Math.round(JSON.stringify(weather['main']['feels_like']))}° </p>
          </div>
          <div className="card">
            <h3> Temperatura máxima: </h3>
            <p> {Math.round(JSON.stringify(weather['main']['temp_max']))}° </p>
          </div>
          <div className="card">
            <h3> Temperatura mínima: </h3>
            <p> {Math.round(JSON.stringify(weather['main']['temp_min']))}° </p>
          </div>
          <div className="card">
            <h3> Umidade: </h3>
            <p> {JSON.stringify(weather['main']['humidity'])}% </p>
          </div>
        </div>
      </>
    );
  }
}
