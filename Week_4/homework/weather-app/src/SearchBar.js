import React, { useState, useEffect } from "react";
import "./App.css";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [city, setCity] = useState([]);
  const [card, setCard] = useState([]);
  const [aqi, setAqi] = useState("");

  const [dataLoaded, setDataLoaded] = useState(false);

  // weekdays
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const days = [1, 2, 3, 4, 5];

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const apiKey = "a27d769dcbc9a6f9c06314f228efc100";
  // variable that stores the city that is chosen
  // the variable that stores the air quality index for the city

  // function that uses OpenWeatherMap's geocoding API to find locations
  function search() {
    if (searchInput) {
      // creates the API call with the value from the search input as a query
      let apiCall = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput},,US&limit=5&appid=${apiKey}`;
      // calls the API
      fetch(apiCall)
        .then((response) => response.json())
        .then((data) => {
          setResults(data);
        });
    }
  }

  // function that renders the search results as a unordered list
  function saveCity(result) {
    //console.log(result);

    setCity({
      fullName: result.name,
      name: result.name,
      state: result.state,
      lat: result.lat,
      lon: result.lon
    });

    console.log(city.lat);
  }

  useEffect(() => {
    // let apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.01&units=imperial&appid=396b57b412e2e85115f9385a9656e2c7`;

    let apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.01&units=imperial&appid=482077a69851b3a52657d892f35a699b`;
    // calls the API
    fetch(apiCall)
      .then((response) => response.json())
      .then((data) => {
        setCard(data);
        setDataLoaded(true);
        // console.log(card);
        //console.log(city);
      });
  }, [city]);

  useEffect(() => {
    let aqiCall = `https://api.openweathermap.org/data/2.5/air_pollution?lat=33.44&lon=-94.01&units=imperial&appid=396b57b412e2e85115f9385a9656e2c7`;
    // let aqiCall = `http://api.openweathermap.org/data/2.5/air_pollution?lat=33.44&lon=-94.01&appid=482077a69851b3a52657d892f35a699b`;
    // calls the API

    fetch(aqiCall)
      .then((response) => response.json())
      .then((data) => {
        setAqi(data.list[0].main.aqi);
      });
  }, [city]);

  /*day = new Date(data.daily[0].dt * 1000);
						date = weekday[day.getDay()] + ' ' + day.getDate();*/

  return (
    <div>
      {dataLoaded == true && (
        <div id="main-container">
          <div class="head">
            <h4 class="date" id="today">
              {weekday[new Date(card.daily[0].dt * 1000).getDay()] +
                " " +
                new Date(card.daily[0].dt * 1000).getDate()}
            </h4>
            <h1 id="location">
              Weather for {city.fullName}, {city.state}
            </h1>
          </div>

          <div class="current">
            <div class="flex-container">
              <div>
                <div>
                  <h4 id="weather">{card.current.weather[0].main}</h4>
                  <h2 id="temp">{card.current.temp}°</h2>
                  <h5 id="aqi">AQI: {aqi}</h5>
                </div>
                <div>
                  <img id="image" src={card.current.weather[0].icon} />
                </div>
              </div>
            </div>
          </div>

          <div id="weather-container">
            <div class="flex-container">
              {days.map((i) => (
                <div class="daily">
                  <div class="container">
                    <h4 class="date" id="day">
                      {weekday[new Date(card.daily[i].dt * 1000).getDay()] +
                        " " +
                        new Date(card.daily[0].dt * 1000).getDate()}
                    </h4>
                    <img id="image" src={card.daily[i].weather[0].icon}></img>
                    <h2 id="low-hi">
                      {card.daily[i].temp.min.toFixed(0)}° to{" "}
                      {card.daily[i].temp.max.toFixed(0)}°
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div id="side-container">
        <div>
          <input
            id="search-input"
            type="search"
            placeholder="search for a city"
            onChange={handleChange}
            value={searchInput}
          />

          <button id="search-button" onClick={() => search()}>
            search
          </button>
        </div>

        <ul>
          {results.map((result) => (
            <li onClick={() => saveCity(result)}>
              {result.name}, {result.state}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
