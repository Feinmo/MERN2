import { useEffect, useState} from "react";
import CITIES from "../Cities";

const CitiesWeatherForecast = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [forecast, getForecast] = useState({ list: [] });

  const citySelect = (ev) => {
    const selectedCity = ev.target.value;
    // console.log("OnChange output:");
    // console.log(selectedCity);
    const city = CITIES.filter((city) => city.name === selectedCity);
    const chosenCityDetails = city[0];

    setLatitude(chosenCityDetails.latitude);
    setLongitude(chosenCityDetails.longitude);
  };

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      const apiKey = "d7b0a1249bc975101cfd6b468b200e27";
      if (latitude & longitude) {
        console.log("Fetching Data");

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        const responseToJson = await response.json();

        return {
          list: responseToJson.list,
          // ...responseToJson,
        };
      }
    };

    fetchWeather(latitude, longitude).then((data) => {
      if (latitude & longitude) {
        getForecast(data);
      }
    });
  }, [latitude, longitude]);

  return (
    <div>
      <select name="cities" id="city-select" onChange={citySelect}>
        <option value=""> -Select a city-</option>
        {CITIES.map((city, index) => (
          <option value={city.name} key={index}>
            {city.name}
          </option>
        ))}
      </select>

      <ul>
        {forecast.list.map((position, index) => (
          <li key={index}>
            {position.dt_txt} {(position.main.temp - 273).toFixed(1)} &deg;C{" "}
            {position.weather[0].description}{" "}
            <img
              src={`http://openweathermap.org/img/w/${position.weather[0].icon}.png`}
              alt={`http://openweathermap.org/img/w/${position.weather[0].icon}.png`}
            />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitiesWeatherForecast;
