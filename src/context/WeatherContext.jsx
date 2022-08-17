import React, { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export default function WeatherContextProvider({ children }) {
	const [weather, setWeather] = useState(false);

	return <WeatherContext.Provider value={{ weather, setWeather }}>{children}</WeatherContext.Provider>;
}

export function useWeatherContext() {
	const context = useContext(WeatherContext);
	if (!context) {
		throw new Error('useWeatherContext must be used within a WeatherContextProvider');
	}
	const { weather, setWeather } = context;

	return { weather, setWeather };
}
