import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useWeatherContext } from '../../context/WeatherContext';
import './styles.sass';
import { Toaster, toast } from 'react-hot-toast';
import getWeatherData from '../../service/getWeather';

export default function Home() {
	const history = useHistory();

	const [city, setCity] = useState('');

	const { weather, setWeather } = useWeatherContext();

	const handleGetWeatherData = async (params) => {
		try {
			const data = await getWeatherData(params);
			setWeather(data);
		} catch (error) {
			toast.error('Cidade não encontrada.');
		}
	};

	const handleGetWeatherByName = async (e) => {
		e.preventDefault();
		await handleGetWeatherData({
			q: city,
		});
	};

	const handleLocationTrue = async () => {
		return navigator.geolocation.getCurrentPosition(async (position) => {
			await handleGetWeatherData({
				lat: position.coords.latitude,
				lon: position.coords.longitude,
			});
		});
	};

	useEffect(() => {
		if (weather) {
			history.push('/clima');
		}
	}, [weather, history]);

	return (
		<>
			<Toaster position="bottom-center" reverseOrder={false} />
			<div className="home-title">
				<h1> How's the Weather? </h1>
			</div>
			<div className="home-content">
				<section className="aside-container">
					<div className="aside-content">
						<h1> Ver clima em sua localização atual </h1>
						<button onClick={handleLocationTrue}> Ative sua localização </button>
					</div>
				</section>

				<div className="divider">
					<div className="line"></div>
				</div>

				<section className="main-container">
					<div className="main-content">
						<h1> Ver o clima na cidade que quiser </h1>
						<form onSubmit={handleGetWeatherByName}>
							<input
								type="text"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								placeholder="Cidade (ex: Jundiaí, São Paulo etc.)"
							/>
							<button type="submit"> Ver </button>
						</form>
					</div>
				</section>
			</div>
		</>
	);
}
