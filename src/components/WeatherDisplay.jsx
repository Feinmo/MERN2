
const WeatherDisplay = ( {apiWeather} ) => {

  const iconUrl = `http://openweathermap.org/img/w/${apiWeather.icon}.png`
  
  return (
    <div className="weather_card">
      <section>
        <img src={iconUrl} alt="weather" />
      </section>
      <section>
      <h3>Place: {apiWeather.name}</h3>
      <h3> {apiWeather.main}</h3>
      <h3>Description: {apiWeather.description}</h3>
      </section>
      
    </div>
  );
};

export default WeatherDisplay;
