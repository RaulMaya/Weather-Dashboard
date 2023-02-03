var inputCity = document.querySelector("input");
var searchBtn = document.querySelector("button");

var cityTitle = document.getElementById("city")
var date = document.querySelectorAll(".date")
var forecast = document.querySelectorAll(".forecast")
var feels = document.querySelectorAll(".feels")
var max = document.querySelectorAll(".maximum")
var min = document.querySelectorAll(".minimum")
var wind = document.querySelectorAll(".wind")
var pressure = document.querySelectorAll(".pressure")
var condition = document.querySelectorAll(".status")

function sendCity(event) {
  event.preventDefault();
  cityData(inputCity.value);
}

// function gettingCoords(city) {
//   var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`;

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       getTemperatures(data[0].lat, data[0].lon)
//     });
// }

function cityData(city) {
  //var requestUrl = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=metric`;
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var counter = 3;
      console.log(data);
      console.log("STATUS", data.list[3].weather[0].description, `http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`);
      for (var i = 0; i < 5; i++) {
        cityTitle.textContent = city
        date[i].textContent = data.list[counter].dt_txt
        forecast[i].textContent = data.list[counter].main.temp
        feels[i].textContent = data.list[counter].main.feels_like
        max[i].textContent = data.list[counter].main.temp_max
        min[i].textContent = data.list[counter].main.temp_min
        wind[i].textContent = data.list[counter].wind.speed
        pressure[i].textContent = data.list[counter].main.pressure
        condition[i].textContent = data.list[counter].weather[0].description
        console.log(counter)
        counter = counter + 8
      }
      // console.log(data.list[11].dt_txt)
      // console.log(data.list[19].dt_txt)
      // console.log(data.list[27].dt_txt)
      // console.log(data.list[35].dt_txt)
    });
}

searchBtn.addEventListener("click", sendCity);
