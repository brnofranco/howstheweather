import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { useWeatherContext } from '../../context/WeatherContext';

import './styles.sass';

export default function Home() {
    const history = useHistory();

    const [city, setCity] = useState('');
    const [location, setLocation] = useState(false);
    
    const { weather, setWeather } = useWeatherContext();

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
        });
    }

    useEffect(() => {
        if(weather){
            console.log(history, weather);
            const cityNameTag = weather['name'].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            history.push(`/clima/${cityNameTag}`);
        }
    }, [weather, history])


    if(location === false){
        return(
            <>
            <div className="home-title">
                <h1> How's the Weather? </h1>
            </div>
            <div className="home-content">
                <aside>
                <div className="aside-content">
                    <h1> Ver clima em sua localização atual </h1>
                    <button onClick={handleLocationTrue}> Ative sua localização </button>
                </div>
                </aside>
                <div className="divider">
                <div className="line"></div>
                </div>
                <main>
                <div className="main-content">
                    <h1> Ver o clima na cidade que quiser </h1>
                    <form onSubmit={handleGetWeatherByName}>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Cidade (ex: Jundiaí, São Paulo, Rio de Janeiro)" />
                    <button type="submit"> Ver </button>
                    </form>
                </div>
                </main>
            </div>
            </>
        );
    } else {
        return (
            <div className="loading">
                <h4> Loading... </h4>
            </div>
        );
    }
}
