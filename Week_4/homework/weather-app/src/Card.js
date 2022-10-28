import React, { useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar";

const Card = (city, i) => {
  // USE YOUR OWN API KEY
  const apiKey = "482077a69851b3a52657d892f35a699b";
  //getData(city);

  // variable that stores the weather and forecast for the city
  let weather;
  // the variable that stores the air quality index for the city
  let aqi;

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

  const [results, setResults] = useState([]);

  function getData() {
    // let apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=imperial&appid=${apiKey}`;
    let apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&appid=${apiKey}`;

    // calls the API
    fetch(apiCall)
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        console.log(city + " " + results);
      });
  }

  return (
    <div class="card">
      <div class="container"></div>
    </div>
  );
};

export default Card;
