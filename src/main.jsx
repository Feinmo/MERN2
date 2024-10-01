import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Home from "./components/Pages/Home.jsx";
import CitiesWeather from "./components/Pages/CitiesWeather.jsx";
import HomeForecast from "./components/Pages/HomeForecast.jsx";
import CitiesWeatherForecast from "./components/Pages/CitiesWeatherForecast.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path="forecast" element={<HomeForecast />}></Route>
          <Route path="cities" element={<CitiesWeather />}></Route>
          <Route path="cities-forecast" element={<CitiesWeatherForecast />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
