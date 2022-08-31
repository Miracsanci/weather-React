import axios from "axios";
import { useEffect, useState } from "react";
import { usePosition } from "use-position";
import HavaDurumu from "./components/HavaDurumu";
import './App.css';

const App = () => {
  const [weather, setWeather] = useState();
  const { latitude, longitude } = usePosition();

  const getWeatherData = async (lat, lon) => {
    const key = process.env.REACT_APP_WEATHER_API_KEY;
    const lang = navigator.language.split("-")[0];

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}&units=metric`
      );
      setWeather(data);
    } catch {
      alert("Veri alinirken hata olustu.");
    }
  };

  useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div id="body">
      <img id = "resim" src="https://thumbs.dreamstime.com/b/weather-forecast-background-climate-change-concept-weather-forecast-background-climate-change-concept-collage-sky-image-120764591.jpg"></img>
      <div className="container text-center" >
      <h2 className="border-blank" id="havadurumu">Hava Durumu</h2>
      <div className="border-blank " id="sonuclar">
      <HavaDurumu weather={weather} />
      </div>
    </div>
    </div>
  );
};

export default App;
