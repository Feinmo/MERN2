import { useState, useEffect } from "react";
import "./App.css";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
  

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [weather, getWeather] = useState([]);
  const [visible, setVisible] = useState(false);

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

useEffect(() => {localize()}, []);

useEffect(() => {


  const fetchWeather = async (latitude, longitude) => {
    const apiKey = "d7b0a1249bc975101cfd6b468b200e27";

    console.log("Fetching Data");
    // console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    );
    const responseToJson = await response.json();

    return {
      ...responseToJson,
    };
  };

fetchWeather(latitude, longitude).then((data) => getWeather(data.weather));
console.log(weather)

}, [longitude]);

  

  

  return (
    <>
      <h1>WEATHER CONDITIONS</h1>

      

      <h3>latitude: {latitude}</h3>
      <h3>longitude: {longitude}</h3>

      {/* <WeatherDisplay id={weather.id} main={weather.main} description={weather.description} icon={weather.icon}></WeatherDisplay> */}
      <WeatherDisplay/>

      <br />
    </>
  );
}

// useEffect(() => {
//   if (imgDate > date) {
//     console.log("Date!");
//     setVisible(false);
//   } else setVisible(true);

//   const fetchImg = async () => {
//     console.log("Fetching Data");
//     const response = await fetch(
//       `${NASA_URL}/planetary/apod?date=${imgDate}&api_key=${NASA_API_KEY}`
//     );

//     const responseToJson = await response.json();
//     return {
//       ...responseToJson,
//     };
//   };

//   fetchImg().then((data) => setImageDetails(data));
// }, [imgDate, NASA_URL]);

export default App;
