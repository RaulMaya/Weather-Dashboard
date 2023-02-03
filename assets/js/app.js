var inputCity = document.querySelector("input");
var searchBtn = document.querySelector("button");

function sendCity(event) {
  event.preventDefault();
  console.log(inputCity.value);
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
      console.log(data.list[3]);
      console.log(data.list[3].main);
      console.log("DATE", data.list[3].dt_txt);
      console.log("FORECAST", data.list[3].main.temp);
      console.log("FEELS LIKE", data.list[3].main.feels_like);
      console.log("MAX", data.list[3].main.temp_min);
      console.log("MIN", data.list[3].main.temp_max);
      console.log("WIND", data.list[3].wind.speed);
      console.log("PRESSURE", data.list[3].main.pressure);
      console.log("STATUS", data.list[3].weather[0].description, `http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`);
      // console.log(data.list[11].dt_txt)
      // console.log(data.list[19].dt_txt)
      // console.log(data.list[27].dt_txt)
      // console.log(data.list[35].dt_txt)
    });
}

searchBtn.addEventListener("click", sendCity);
