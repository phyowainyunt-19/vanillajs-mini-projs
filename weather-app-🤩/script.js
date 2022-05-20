// Openweathermap API

import { key, geoKey } from "./API.js";

const wrapper = document.querySelector(".wrapper"),
  inputSec = wrapper.querySelector(".input-section"),
  infoTxt = inputSec.querySelector(".info-text"),
  inputField = inputSec.querySelector("input"),
  locationBtn = inputSec.querySelector("button"),
  wIcon = document.querySelector(".weather-section img");

let api;

//* For Enter button and validation
inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

//* For user geo location
locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser does not support!");
  }
});
//* Successfully fetch geolocation from user input
function onSuccess(position) {
  let { latitude, longitude } = position.coords;
  // console.log(latitude, longitude);
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
  fetchData();
}

//! Error for geolocation
function onError(error) {
  infoTxt.innerHTML = error.message;
  infoTxt.classList.add("deny");
}

//* Request API function
function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  fetchData();
}

//* Fetch Weather Data from Api
function fetchData() {
  infoTxt.innerHTML = "Getting weather details...";
  infoTxt.classList.add("pending");
  //* getting api and parsing into js obj
  //* then function call WeatherDetails function with api result as an arg
  fetch(api)
    .then((response) => response.json())
    .then((result) => WeatherDetails(result));
}

//* Weather Details function
function WeatherDetails(info) {
  if (info.cod == "404") {
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerHTML = `${inputField.value} is not a valid city name.`;
  } else {
    //* get required values from the info object
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;

    //* For weather icons according to id
    let icon =
      id == 800
        ? (wIcon.src = "icons/clear.svg")
        : id >= 200 && id <= 232
        ? (wIcon.src = "icons/storm.svg")
        : id >= 600 && id <= 622
        ? (wIcon.src = "icons/snow.svg")
        : id >= 701 && id <= 781
        ? (wIcon.src = "icons/haze.svg")
        : id >= 801 && id <= 804
        ? (wIcon.src = "icons/snow.svg")
        : (id >= 300 && id <= 321) || (id >= 500 && id <= 531)
        ? (wIcon.src = "icons/rain.svg")
        : "";

    //* Pass these values to a particular html element
    wrapper.querySelector(".temp .number").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city} , ${country}`;
    wrapper.querySelector(".temp .number-2").innerText = feels_like;
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
    console.log(info);
  }
}
