import { useEffect, useState, lazy, Suspense } from "react";
const WeatherDisplay = lazy(() => import( "../WeatherDisplay"));

const Home = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [visible, setVisible] = useState(false);
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
        setVisible(true);
      }
    });
  }, [latitude, longitude]);
  return (
    <Suspense fallback={<h2>Loading ...</h2>}>
    <div>
    {visible && <WeatherDisplay apiWeather={apiWeather} />}
    </div>
    </Suspense>
  );
};

export default Home;
