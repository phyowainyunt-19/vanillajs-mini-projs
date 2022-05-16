// https://opencagedata.com/ (geo api)

import key from "./API.js";

const button = document.querySelector("button");

button.addEventListener("click", () => {
  if (navigator.geolocation) {
    // if your browser supports goeolocation api
    /*
     *geolocation.getCurrentPosition method is used to get current position of the device
     *it takes three parameters (success,error,options). If everything is right, then
     *success callback function will get called, else, error callback function will get called. We don't need third parameter for this project.
     */
    button.innerHTML = "Allow to detect your location.";
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    button.innerHTML = "You browser does not support geolocation";
  }
});

function onSuccess(position) {
  button.innerHTML = "Detecting your location...";
  let { latitude, longitude } = position.coords;
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}`
  )
    // parsing json data into JavaScript object and returning it and another then function receiving the object that is sent by the api
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      let allDetails = result.results[0].components;
      let { county, country, postcode, city, road } = allDetails;
      button.innerHTML = `${county} , ${postcode} , ${country}`;
      console.table(allDetails);
    })
    .catch((error) => {
      button.innerHTML = "Something went wrong :(";
    });
}

function onError(error) {
  if (error.code == 1) {
    button.innerHTML = "You denied the request.";
  } else if (error.code == 2) {
    button.innerHTML = "Location not available.";
  } else {
    button.innerHTML = "Something went wrong.";
  }
  // if user denied => button disabled
  button.setAttribute("disabled", "true");
}
