var searchButton = document.querySelector(".btn");
var inputValue = document.querySelector(".inputValue");
var cityList = document.querySelector("ul");
var cityName = document.querySelector("#cityName");
var temperature = document.querySelector("#temperature");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uv");
var mainContainer = document.querySelector(".mainContainer");
mainContainer.style.display = "none";

// this allows the current date to be displayed
var currentDate = moment().format("MMM Do, YYYY");
$("#currentDate").text(currentDate);
console.log(currentDate);

// this fetches the weather variables of each city searched for
function fetchWeather(value) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    value +
    "&units=imperial&appid=d17c96a1a86617a84172ad6511200e3a";

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var nameValue = data["name"];
      var tempValue = "Temperature: " + data.main.temp + " F";
      var windValue = "Wind: " + data.wind.speed + " MPH";
      var humidityValue = "Humidity: " + data.main.humidity + " %";
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      $("#wicon").attr("src", iconurl);

      cityName.innerHTML = nameValue;
      temperature.innerHTML = tempValue;
      wind.innerHTML = windValue;
      humidity.innerHTML = humidityValue;
      getWeather(data.coord);
    });
}
// this saves our city data and name in local storage
function getApi() {
  if (localStorage.getItem("inputValue")) {
    var cities = JSON.parse(localStorage.getItem("inputValue")); // convert to array
    cities.push(inputValue.value);
    localStorage.setItem("inputValue", JSON.stringify(cities));
  } else {
    // save the new value to localstorage
    localStorage.setItem("inputValue", JSON.stringify([inputValue.value]));
  }

  var lastCity = inputValue.value;
  console.log(lastCity);

  var li = document.createElement("li");
  document.getElementById("history").appendChild(li);
  var button = document.createElement("button");
  button.textContent = lastCity;
  li.appendChild(button);

  fetchWeather(inputValue.value);
}

// this fetches our coordinates and forecast data
function getWeather(coord) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    coord.lat +
    "&lon=" +
    coord.lon +
    "&exclude=hourly&units=imperial&appid=d17c96a1a86617a84172ad6511200e3a";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // add forecast
      showForecast(data.daily);
      // add weather details - uvi
      uvIndex.textContent = "UV index: " + data.current.uvi;
      console.log(data.current.uvi);
      var uvEl = parseFloat(data.current.uvi);
      console.log(uvEl);
      var uvColor = "green";
      if (uvEl <= 2) {
        uvColor = "green";
        uvIndex.classList.add("bg-success");
        console.log("green");
      } else if (uvEl <= 5) {
        uvColor = "yellow";
        uvIndex.classList.add("bg-warning");
      } else if (uvEl <= 7) {
        uvColor = "orange";
        uvIndex.classList.add("bg-warning");
      } else if (uvEl <= 11) {
        uvColor = "red";
        uvIndex.classList.add("bg-danger");
      }
    });
}

function showForecast(data) {
  var day = 1;
  for (let index = 1; index <= 5; index++) {
    const element = data[index];
    //weather element created dynamically
    var iconcode = element.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    var imageIcon = $("<img>").attr("src", iconurl);
    var title = $("<h4>");
    title.text(moment().add(day, "days").format("MMM D"));
    day += 1;
    var windEl = $("<li>").text("Wind: " + element.wind_speed + " MPH");
    windEl.attr("class", "list-group-item", "list-style:none");
    var tempEl = $("<li>").text("Temp: " + element.temp.day + " F");
    tempEl.attr("class", "list-group-item");
    var humidityEl = $("<li>").text("Humidity: " + element.humidity + " %");
    humidityEl.attr("class", "list-group-item ");
    var uvEl = $("<li>").text("Uv Index: " + element.uvi);
    uvEl.attr("class", "list-group-item");
    var ulEl = $("<ul class='list-group list-group-flush'>");

    ulEl.append(title);
    ulEl.append(imageIcon);
    ulEl.append(windEl);
    ulEl.append(tempEl);
    ulEl.append(humidityEl);
    ulEl.append(uvEl);

    // add these elements to html
    $("#forecast-" + index).append(ulEl);
  }
}

searchButton.addEventListener("click", function (event) {
  console.log(event.target);
  event.preventDefault();
  mainContainer.style.display = "block";
  getApi();
  //if statement for if data is there clear
});

$("#history").on("click", "button", function (event) {
  var cityName = $(this).text();
  console.log("cityName", cityName);
  fetchWeather(cityName);
});

function showHistory() {
  /// from localstorage get the values and create buttons
  var cities = JSON.parse(localStorage.getItem("inputValue")); // convert to array
  for (let index = 0; index < cities.length; index++) {
    const element = cities[index];

    // create button
    var li = document.createElement("li");
    document.getElementById("history").appendChild(li);
    var button = document.createElement("button");
    button.textContent = element;
    li.appendChild(button);
  }
}

showHistory();

//To-Do:

// Get the forecast to appear in the box
// Get data to reappear once the city button is clicked (local storage)
// Hide the weather icon that label that pops
// Get UV Index from API & color code the data
