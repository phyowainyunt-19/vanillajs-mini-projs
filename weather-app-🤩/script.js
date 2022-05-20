// Openweathermap API

import { key, geoKey } from "./API.js";

const wrapper = document.querySelector(".wrapper"),
  inputSec = wrapper.querySelector(".input-section"),
  infoTxt = inputSec.querySelector(".info-text"),
  inputField = inputSec.querySelector("input"),
  locationBtn = inputSec.querySelector("button");

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
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetchData();
}

//! Error for geolocation
function onError(error) {
  infoTxt.innerHTML = error.message;
  infoTxt.classList.add("deny");
}

//* Request API function
function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
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

    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
    console.log(info);
  }
}
