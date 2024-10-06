import { useState, useEffect} from "react";
import "./App.css";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [apiWeather, getApiWeather] = useState({});

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

          // ...responseToJson,
        };
      }
    };

    fetchWeather(latitude, longitude).then((data) => {
      if (latitude & longitude) {
        getApiWeather(data);
      }
    });
  }, [latitude, longitude]);

  return (
    <>
      <header>
        <h1>WEATHER CONDITIONS</h1>
      </header>
      <nav>
        <NavLink to=" ">Home</NavLink>
        <NavLink to="forecast">5-day Forecast</NavLink>
        <NavLink to="cities">Cities Overview</NavLink>
        <NavLink to="cities-forecast">Cities 5-day forecast</NavLink>
      </nav>

      <section className="localizer">
        <p>
          {" "}
          You are in: {apiWeather.name} | latitude: {latitude} | longitude:{" "}
          {longitude}{" "}
        </p>
      </section>

      <main>
      
          <Outlet />
         
      </main>
    </>
  );
}

export default App;
