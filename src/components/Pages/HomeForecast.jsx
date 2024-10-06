import { useEffect, useState, Suspense } from "react";

const HomeForecast = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [forecast, getForecast] = useState({ list: [] });

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
        // console.log("Imported data:");
        // console.log(data);
        getForecast(data);
      }
    });
  }, [latitude, longitude]);

  return (
    <div>
      <ul>
        <Suspense fallback={<h2>Retreving data ...</h2>}>
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
          </Suspense>
      </ul>
    </div>
  );
};

export default HomeForecast;
