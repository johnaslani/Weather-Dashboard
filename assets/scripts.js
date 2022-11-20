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
var today_date = document.getElementById("today_date");
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
    // console.log(response);
    if (!response.ok) {
      // console.log("Please select a city name");
      return;
    }
    // displayWeather(response.json());
    response.json().then((data) => {
      console.log(data);
      today.textContent = data.name;

      console.log(data);
      var cityToSave = {
        city: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
      };
      saveToLocalStorage(cityToSave);
      getWeather(cityToSave.lat, cityToSave.lon);
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
      console.log(data);
      const milliseconds = data.current.dt * 1000; // 1575909015000
      const dateObject = new Date(milliseconds);
      const humanDateFormat = dateObject.toLocaleString().split(","); //2019-12-9 10:30:15
      const icon = document.createElement("img");
      icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
      );
      // current.weather.icon (Weather icon id.) =>
      today_date.textContent = " (" + humanDateFormat[0] + ") ";
      today.appendChild(icon);
      // today_date.appendChild(icon);
      displayWeather(data);
    });
  });
}

// Reacal Latitude and loingitude from Local storage and recall the getWeather
function recallWeather(e) {
  today.textContent = e.target.textContent;
  getWeather(e.target.dataset.lat, e.target.dataset.lon);
}

function displayWeather(data) {
  console.log(data);
  const weather = data.current;
  const forcast = data.daily;
  temp.textContent = weather.temp;
  humidity.textContent = weather.humidity;
  wind.textContent = weather.wind_speed;
  uvIndex.textContent = weather.uvi;
  if (weather.uvi < 3) {
    uvIndex.style.background = "green";
  } else if (weather.uvi < 6) {
    uvIndex.style.background = "yellow";
  } else if (weather.uvi < 8) {
    uvIndex.style.background = "orange";
  } else {
    uvIndex.style.background = "red";
  }
  for (let i = 1; i <= 5; i++) {
    // date[i] = Symbol[i] = day[i].temp.textContent = forcast[i].temp.day;
    // day[i].humidity.textContent = forcast[i].humidity;
    // day[i].wind.textContent = forcast[i].wind_speed;

    // daily.weather.icon (Weather icon id)
    const forCastDay = data.daily[i];
    console.log(forCastDay);
    const milliseconds = forCastDay.dt * 1000; // 1575909015000
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString().split(","); //2019-12-9 10:30:15
    // console.log(forCastDay.temp.day);
    // console.log(forCastDay.wind_speed);
    // console.log(forCastDay.humidity);
    // document.getElementById(`day${i}`).temp;
    document.getElementById(`temp${i}`).textContent = forCastDay.temp.day;
    document.getElementById(`wind${i}`).textContent = forCastDay.wind_speed;
    document.getElementById(`humidity${i}`).textContent = forCastDay.humidity;
    document
      .getElementById(`img${i}`)
      .setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${forCastDay.weather[0].icon}.png`
      );
  }
}

function createButton(cityInfo) {
  // for (var i = 0; i < data.length; i++) {
  var listItem = document.createElement("button");
  //listItem.textContent = data[i].git html_url;
  listItem.textContent = cityInfo.city;
  // listItem.dataset.coord = JSON.stringify(data.coord);
  listItem.dataset.lat = cityInfo.lat;
  listItem.dataset.lon = cityInfo.lon;
  cityList.appendChild(listItem);
  //}
}

//Save city name to local storage in button format + recall function

// present current weather in the middle page

//Present 5-day forcast

// Based on the provided information, save the contents to
//  local storage if the city is not already stored.
function saveToLocalStorage(cityInfo) {
  // Save to local storage if the city hasn't already been saved
  var history = JSON.parse(localStorage.getItem("city")) || [];
  console.log(history);
  for (i = 0; i < history.length; i++) {
    console.log(history[i].city, cityInfo.city);
    if (history[i].city == cityInfo.city) return;
  }
  history.push(cityInfo);
  localStorage.setItem("city", JSON.stringify(history));
  createButton(cityInfo);
  // Ensure the city isn't already in storage.
  // var cityAlreadySaved = savedCity.includes(city); // returns bool
  // if (!cityIsAlreadySaved) {
  //   localStorage.setItem(city, JSON.stringify(data));
  // }
}

function getHistory() {
  var history = JSON.parse(localStorage.getItem("city")) || [];
  // console.log(history);
  for (let i = 0; i < history.length; i++) {
    createButton(history[i]);
  }
}

getHistory();

searchButton.addEventListener("click", getApi);
cityList.addEventListener("click", recallWeather);
