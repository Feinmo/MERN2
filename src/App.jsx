import { useState, useEffect } from "react";
import "./App.css";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [apiWeather, getApiWeather] = useState({});
  // const [visible, setVisible] = useState(false);

  const localize = () => {
    function success(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  // localize();

  useEffect(() => {
    localize();
  }, []);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      const apiKey = "d7b0a1249bc975101cfd6b468b200e27";
      if (latitude & longitude) {
        console.log("Fetching Data");
        // console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        const responseToJson = await response.json();

        return {
          name: responseToJson.name,
          description: responseToJson.weather[0].description,
          main: responseToJson.weather[0].main,
          id: responseToJson.weather[0].id,
          icon: responseToJson.weather[0].icon,
          // ...responseToJson,
        };
      }
    };

    fetchWeather(latitude, longitude).then((data) => {
      if (latitude & longitude) {
        console.log("Imported data:");
        console.log(data);
        getApiWeather(data);
      }
    });
  }, [latitude, longitude]);

  return (
    <>
      <h1>WEATHER CONDITIONS</h1>
      
      <section className="localizer">
        <p> You are in: {apiWeather.name} | latitude: {latitude} | longitude: {longitude} </p>
      </section>

      <WeatherDisplay apiWeather={apiWeather}/>

    </>
  );
}

export default App;
