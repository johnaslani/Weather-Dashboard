var APIKey = "5c524c69a77c6b72f3b7282bee372d1d";

// accept user input, to store in the city variable that you've created.
var city;
var cityList = document.querySelector("#cityHistory");
var searchButton = document.getElementById("search-button");
var searchInput = document.getElementById("search-input");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uvIndex = document.getElementById("uvIndex");
var today = document.getElementById("today");
var todayDate = new Date();

function getApi(event) {
  event.preventDefault();
  city = searchInput.value;
  // today.textContent = city + " (" + todayDate + ")"; // + Symbol

  //URL associated with Current Weather Data
  // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  //api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  var requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  fetch(requestUrl).then(function (response) {
    console.log(response);
    if (!response.ok) {
      console.log("Please select a city name");
      return;
    }
    // displayWeather(response.json());
    response.json().then((data) => {
      console.log(data);

      const milliseconds = data.dt * 1000; // 1575909015000
      const dateObject = new Date(milliseconds);
      const humanDateFormat = dateObject.toLocaleString().split(","); //2019-12-9 10:30:15

      today.textContent = data.name + " (" + humanDateFormat[0] + ")";
      console.log(data);
      createButton(data);
      getWeather(data.coord.lat, data.coord.lon);
    });
  });
}

function getWeather(lat, lon) {
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=" +
    APIKey;
  fetch(requestUrl).then(function (response) {
    // console.log(response);
    // if (!response.ok) {
    //   console.log("Please select a city name");
    //   return;
    // }
    // displayWeather(response.json());
    response.json().then((data) => {
      displayWeather(data);
    });
  });
}

// Reacal Latitude and loingitude from Local storage and recall the getWeather
function recallWeather(e) {
  console.log(e);
  console.log(e.target);
  console.log(e.target.value);
  console.log(e.target.dataset);
  const coordinates = JSON.parse(e.target.dataset.coord);
  console.log(coordinates);
  getWeather(coordinates.lat, coordinates.lon);
}

function displayWeather(data) {
  console.log(data);
  const weather = data.current;
  const forcast = data.daily;
  temp.textContent = weather.temp;
  humidity.textContent = weather.humidity;
  wind.textContent = weather.wind_speed;
  uvIndex.textContent = weather.uvi;
  for (let i = 1; i <= 5; i++) {
    // date[i] = Symbol[i] = day[i].temp.textContent = forcast[i].temp.day;
    // day[i].humidity.textContent = forcast[i].humidity;
    // day[i].wind.textContent = forcast[i].wind_speed;
    const forCastDay = data.daily[i];
    console.log(forCastDay);
    const milliseconds = forCastDay.dt * 1000; // 1575909015000
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString().split(","); //2019-12-9 10:30:15
    console.log(forCastDay.temp.day);
    console.log(forCastDay.wind_speed);
    console.log(forCastDay.humidity);
    // document.getElementById(`day${i}`).temp;
    document.getElementById(`temp${i}`).textContent = forCastDay.temp.day;
    document.getElementById(`wind${i}`).textContent = forCastDay.wind_speed;
    document.getElementById(`humidity${i}`).textContent = forCastDay.humidity;
  }
}

function createButton(cityname, lat, lon) {
  // for (var i = 0; i < data.length; i++) {
  var listItem = document.createElement("button");
  //listItem.textContent = data[i].git html_url;
  listItem.textContent = cityname;
  listItem.dataset.coord = JSON.stringify(data.coord);
  cityList.appendChild(listItem);
  saveToLocalStorage(city, data.coord.lat, data.coord.lon);
  //}
}

//Save city name to local storage in button format + recall function

// present current weather in the middle page

//Present 5-day forcast

// Based on the provided information, save the contents to
//  local storage if the city is not already stored.
function saveToLocalStorage(city, lat, lon) {
  // Save to local storage if the city hasn't already been saved
  var history = JSON.parse(localStorage.getItem("city")) || [];

  var cityToSave = { city: city, lat: lat, lon: lon };

  history.push(cityToSave);
  localStorage.setItem("city", JSON.stringify(history));

  // Ensure the city isn't already in storage.
  // var cityAlreadySaved = savedCity.includes(city); // returns bool
  // if (!cityIsAlreadySaved) {
  //   localStorage.setItem(city, JSON.stringify(data));
  // }
}

function getHistory() {
  var history = JSON.parse(localStorage.getItem("city")) || [];
  console.log(history);
  for (let i = 0; i < history.lenght; i++) {
    createButton(cityname);
  }
}

getHistory();

searchButton.addEventListener("click", getApi);
cityList.addEventListener("click", recallWeather);
