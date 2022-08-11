var searchButton = document.querySelector(".btn");
var inputValue = document.querySelector(".inputValue");
var cityList = document.querySelector("ul");
var name = document.querySelector("#cityName");
var temperature = document.querySelector("#temperature");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uv");

function getApi() {
  localStorage.setItem("inputValue", JSON.stringify(inputValue.value));
  var lastCity = JSON.parse(localStorage.getItem("inputValue"));
  console.log(lastCity);
  var li = document.createElement("li");
  li.textContent = lastCity;
  document.getElementById("history").appendChild(li);

  //create Li append Li add text content to li append li to ul

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
    });
}

searchButton.addEventListener("click", getApi);
