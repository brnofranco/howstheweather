import cloudImg from '../../assets/weatherIcons/Cloud.svg';
import fogImg from '../../assets/weatherIcons/Fog.svg';
import sunImg from '../../assets/weatherIcons/Sun.svg';
import rainImg from '../../assets/weatherIcons/Rain.svg';
import moonImg from '../../assets/weatherIcons/Moon.svg';
import snowImg from '../../assets/weatherIcons/Snow.svg';
import thunderImg from '../../assets/weatherIcons/Thunder.svg';
import hailImg from '../../assets/weatherIcons/Hail.svg';
import windImg from '../../assets/weatherIcons/Wind.svg';

export function WeatherIcon({ weatherName }) {
	const icons = {
		Mist: () => fogImg,
		Clear: () => sunImg,
		Clouds: () => cloudImg,
		Rain: () => rainImg,

		Hail: () => hailImg,
		Moon: () => moonImg,
		Snow: () => snowImg,
		Thunder: () => thunderImg,
		Wind: () => windImg,
	};

	const icon = icons?.[weatherName]() || cloudImg;

	return <img src={icon} alt="Icone do tempo" />;
}
