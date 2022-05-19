// Openweathermap API

import key from "./API.js";

const wrapper = document.querySelector(".wrapper"),
  inputSec = wrapper.querySelector(".input-section"),
  infoTxt = inputSec.querySelector(".info-text"),
  inputField = inputSec.querySelector("input");

//* For Enter button and validation
inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

//* Request API function
function requestApi(city) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
}
