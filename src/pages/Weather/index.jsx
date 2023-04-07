import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useWeatherContext } from '../../context/WeatherContext';
import { Card } from '../../components/Card';
import { WeatherIcon } from '../../components/WeatherIcon';
import './styles.sass';

export default function Weather() {
	const history = useHistory();

	const { weather, setWeather } = useWeatherContext();

	const handleBack = () => {
		setWeather(false);
		history.push('/');
	};

	useEffect(() => {
		if (!weather) {
			handleBack();
		}
	}, [weather]);

	return (
		<div className="weather">
			{weather && (
				<>
					<section className="main-info">
						<div className="city-content">
							<h1>{`${weather.name}, ${weather.sys.country}`}</h1>
							<span> {weather.weather[0].description} </span>
						</div>
						<WeatherIcon weatherName={weather.weather[0].main} />
						<div className="temp-content">
							<h2> {`${Math.round(JSON.stringify(weather.main.temp))}°`}</h2>
							<span>{`Sensação: ${Math.round(JSON.stringify(weather.main.feels_like))}°`}</span>
						</div>
						<div>
							<span>Clique no botão lateral roxo para voltar</span>
						</div>
					</section>
					<section className="back-button">
						<button onClick={handleBack}> {'<'} </button>
					</section>
					<section className="other-info">
						<div className="weather-content">
							<Card text="Temperatura máxima do dia" value={Math.round(JSON.stringify(weather.main.temp_max))} type="°" />
							<Card text="Temperatura mínima do dia" value={Math.round(JSON.stringify(weather.main.temp_min))} type="°" />
							<Card text="Umidade" value={JSON.stringify(weather.main.humidity)} type="%" />
							<Card text="Pressão" value={JSON.stringify(weather.main.pressure)} type=" hPa" />
						</div>
					</section>
				</>
			)}
		</div>
	);
}
