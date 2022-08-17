import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Weather from './pages/Weather';

import WeatherContextProvider from './context/WeatherContext';

export default function App() {
	return (
		<BrowserRouter>
			<WeatherContextProvider>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/clima" component={Weather} />
				</Switch>
			</WeatherContextProvider>
		</BrowserRouter>
	);
}
