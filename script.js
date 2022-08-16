var searchButton = document.querySelector(".btn");
var inputValue = document.querySelector(".inputValue");
var cityList = document.querySelector("ul");
var name = document.querySelector("#cityName");
var temperature = document.querySelector("#temperature");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uv");

var currentDate = moment().format("MMM Do, YYYY");
$("#currentDate").text(currentDate);
console.log(currentDate);

function getApi() {
  localStorage.setItem("inputValue", JSON.stringify(inputValue.value));
  var lastCity = JSON.parse(localStorage.getItem("inputValue"));
  console.log(lastCity);
  var li = document.createElement("li");
  var button = document.createElement("button");
  button.textContent = lastCity;
  li.appendChild(button);
  document.getElementById("history").appendChild(li);
  //create button, text xontent of inputValue.value, append button to li
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    inputValue.value +
    "&units=imperial&appid=d17c96a1a86617a84172ad6511200e3a";

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var nameValue = data["name"];
      var tempValue = "Temperature:" + data.main.temp + "F";
      var windValue = "Wind:" + data.wind.speed + "MPH";
      var humidityValue = "Humidity:" + data.main.humidity + "%";

      cityName.innerHTML = nameValue;
      temperature.innerHTML = tempValue;
      wind.innerHTML = windValue;
      humidity.innerHTML = humidityValue;
      dailyForecast();
    });
}

searchButton.addEventListener("click", getApi);

function dailyForecast() {
  console.log("hello");
  var dailyUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    inputValue.value +
    "&units=imperial&exclude=hourly,minutely,alerts&appid=d17c96a1a86617a84172ad6511200e3a";

  fetch(dailyUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })

    .then(function (data) {
      console.log(data);
    });
}

//creating icon beside text with it inline with text - call another url
// UV box index - is that a box-border and if statement type of thing? // cant find UV index
// creating 5 columns inside of the weather forecast instead of outside of the box
// do the cities need to become buttons so that you can retain information? How would you retain that specific city?
