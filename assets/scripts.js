var APIKey =5c524c69a77c6b72f3b7282bee372d1d
var city;

//to create input for city name

//URL associated with Current Weather Data.

//api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}

// accept user input, to store in the city variable that you've created.


var repoList = document.querySelector("ul");
var fetchButton = document.getElementById("fetch-button");

function getApi() {
  // replace `octocat` with anyone else's GitHub username
  var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = data[i].html_url;
        repoList.appendChild(listItem);
      }
    });
}

fetchButton.addEventListener("click", getApi);
