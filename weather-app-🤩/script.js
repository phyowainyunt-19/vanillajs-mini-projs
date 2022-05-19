// Openweathermap API

import { key, geoKey } from "./API.js";

const wrapper = document.querySelector(".wrapper"),
  inputSec = wrapper.querySelector(".input-section"),
  infoTxt = inputSec.querySelector(".info-text"),
  inputField = inputSec.querySelector("input"),
  locationBtn = inputSec.querySelector("button");

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
}

//! Error for geolocation
function onError(error) {
  infoTxt.innerHTML = error.message;
  infoTxt.classList.add("deny");
}

//* Request API function
function requestApi(city) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
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
  console.log(info);
}
