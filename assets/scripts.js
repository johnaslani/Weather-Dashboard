var APIKey = "5c524c69a77c6b72f3b7282bee372d1d";
var city;

// accept user input, to store in the city variable that you've created.

var cityList = document.querySelector("#cityHistory");
var searchButton = document.getElementById("search-button");
var searchInput = document.getElementById("search-input");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uvIndex = document.getElementById("uvIndex");

function getApi(event) {
  event.preventDefault();
  city = searchInput.value;

  //URL associated with Current Weather Data
  // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  //api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  fetch(requestUrl).then(function (response) {
    console.log(response);
    if (!response.ok) {
      console.log("Please select a city name");
      return;
    }
    // displayWeather(response.json());
    response.json().then((data) => {
      createButton(data);
      getWeather(data);
    });
  });
}

function getWeather(data) {
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/onecall?lat=" +
    data.coord.lat +
    "&lon=" +
    data.coord.lon +
    "&units=imperial&appid=" +
    APIKey;
  fetch(requestUrl).then(function (response) {
    console.log(response);
    if (!response.ok) {
      console.log("Please select a city name");
      return;
    }
    // displayWeather(response.json());
    response.json().then((data) => {
      displayWeather(data);
    });
  });
}

function displayWeather(data) {
  console.log(data);
  const weather = data.current;
  temp.textContent = weather.temp;
  humidity.textContent = weather.humidity;
  wind.textContent = weather.wind_speed;
  uvIndex.textContent = weather.uvi;
}

function createButton(data) {
  // for (var i = 0; i < data.length; i++) {
  var listItem = document.createElement("button");
  //listItem.textContent = data[i].html_url;
  listItem.textContent = data.name;
  listItem.dataset.coord = JSON.stringify(data.coord);
  cityList.appendChild(listItem);
  //}
}
searchButton.addEventListener("click", getApi);
//"cityList.addEventListener("click");
//Save city name to local storage in button format + recall function

// present current weather in the middle page

//Present 5-day forcast
