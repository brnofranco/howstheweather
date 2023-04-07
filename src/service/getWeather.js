import axios from 'axios';

async function getWeatherData(params) {
	const openWeatherUrl = process.env.REACT_APP_OPEN_WEATHER_URL;

	const result = await axios.get(openWeatherUrl, {
		params: {
			...params,
			appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
			lang: 'pt',
			units: 'metric',
		},
	});

	return result.data;
}

export default getWeatherData;
