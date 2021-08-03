import React from 'react';
import { useHistory } from 'react-router-dom';

import { useWeatherContext } from '../../context/WeatherContext';

import { Card } from "../../components/Card";

import './styles.sass';

import cloudImg from '../../images/Cloud.svg';
import fogImg from '../../images/Fog.svg';
import sunImg from '../../images/Sun.svg';


export default function Weather() {
  const history = useHistory();
  
  const {weather}  = useWeatherContext();

  if(weather === false){
      return (
          <div className="loading">
              <h4> Loading... </h4>
          </div>
      );
  } else {
    function handleWeatherTheme() {
        if(weather['weather'][0]['main'] === "Mist"){
          return fogImg;
        } else if(weather['weather'][0]['main'] === "Clear"){
          return sunImg;
        } else if(weather['weather'][0]['main'] === "Clouds"){
          return cloudImg;
        }
      }
  
      function handleBack() {
        history.push('/');
      }
  
      return (
        <div className="weather">
          <section className="main-info">
            <div className="city-content">
              <h1> {weather['name']}, {weather['sys']['country']} </h1>
              <span> {weather['weather'][0]['description']} </span>
            </div>
              <img src={handleWeatherTheme()} alt="Weather" />
            <div className="temp-content">
              <h2> {Math.round(JSON.stringify(weather['main']['temp']))}° </h2>
              <span>Sensação: {Math.round(JSON.stringify(weather['main']['feels_like']))}° </span>
            </div>
            <div>
              <span> Clique no botão da lateral direito para voltar </span>
            </div>
          </section>
          <section className="back-button">
            <button onClick={handleBack}> {'<'} </button>
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