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
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data.list[3].dt_txt)
        console.log(data.list[11].dt_txt)
        console.log(data.list[19].dt_txt)
        console.log(data.list[27].dt_txt)
        console.log(data.list[35].dt_txt)
    });
}

searchBtn.addEventListener("click", sendCity);
