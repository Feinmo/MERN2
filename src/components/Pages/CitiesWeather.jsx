import { useEffect, useState } from "react";
import WeatherDisplay from "../WeatherDisplay";
import CITIES from "../Cities";

const CitiesWeather = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [apiWeather, getApiWeather] = useState({});



  const citySelect = (ev) => {
    const selectedCity = ev.target.value;
    // console.log("OnChange output:");
    // console.log(selectedCity);
    const city = CITIES.filter((city) => city.name === selectedCity);
    const chosenCityDetails = city[0];

    setLatitude(chosenCityDetails.latitude);
    setLongitude(chosenCityDetails.longitude);       
      }

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
              temp: responseToJson.main.temp,
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
    <div>
      <select name="cities" id="city-select" onChange={citySelect}>
        {CITIES.map((city, index) => (
          <option value={city.name} key={index}>{city.name}</option>
        ))}
      </select>
      <WeatherDisplay apiWeather={apiWeather} />
    </div>
  );
};

export default CitiesWeather;
