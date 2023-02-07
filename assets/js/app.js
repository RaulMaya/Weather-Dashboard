var inputCity = document.querySelector("input");
var searchBtn = document.querySelector("button");

var cityTitle = document.getElementById("city");
var date = document.querySelectorAll(".date");
var forecast = document.querySelectorAll(".forecast");
var feels = document.querySelectorAll(".feels");
var max = document.querySelectorAll(".maximum");
var min = document.querySelectorAll(".minimum");
var wind = document.querySelectorAll(".wind");
var pressure = document.querySelectorAll(".pressure");
var condition = document.querySelectorAll(".status");

var paris = document.getElementById("paris");
var ny = document.getElementById("newyork");
var rome = document.getElementById("rome");
var amsterdam = document.getElementById("amsterdam");
var london = document.getElementById("london");

var currTemp = document.querySelector(".currentTemp");
var currMax = document.querySelector(".currentMax");
var currMin = document.querySelector(".currentMin");
var currDt = document.querySelector(".currentDt");
var currPlace = document.querySelector(".currentPlace");
var currFl = document.querySelector(".currentFl");
var sunset = document.querySelector(".sunset");
var sunrise = document.querySelector(".sunrise");

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
      var lat = data.city.coord.lat;
      var lon = data.city.coord.lon;
      additionalStats(lat, lon);
      for (var i = 0; i < 5; i++) {
        cityTitle.textContent = data.city.name;
        date[i].textContent = data.list[counter].dt_txt;
        forecast[i].textContent = data.list[counter].main.temp + " C° ☀️";
        feels[i].textContent = `(${data.list[counter].main.feels_like} C°)`;
        max[i].textContent = data.list[counter].main.temp_max + " C° 🔺";
        min[i].textContent = data.list[counter].main.temp_min + " C° 🔻";
        wind[i].textContent = data.list[counter].wind.speed + "mph 🌬️";
        pressure[i].textContent = data.list[counter].main.pressure + "psi 😮‍💨";
        var descArr = data.list[counter].weather[0].description.split(" ");
        for (var j = 0; j < descArr.length; j++) {
          descArr[j] = descArr[j].charAt(0).toUpperCase() + descArr[j].slice(1);
        }
        condition[i].innerHTML = `<div>${descArr.join(" ")}</div>
                                  <img class="wheatherLogo" src="http://openweathermap.org/img/wn/${
                                    data.list[counter].weather[0].icon
                                  }@2x.png"
                                  alt="weatherCondition">`;
        counter = counter + 8;
      }
      // console.log(data.list[11].dt_txt)
      // console.log(data.list[19].dt_txt)
      // console.log(data.list[27].dt_txt)
      // console.log(data.list[35].dt_txt)
    });
}

function additionalStats(lat, lon) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currTemp.textContent = data.main.temp + " C°";
      var dateObj = new Date(parseInt(data.dt + "000"));
      currDt.textContent =
        dateObj.getMonth() +
        "-" +
        dateObj.getDate() +
        "-" +
        dateObj.getFullYear();
      // currDt.innerHTML = `<div>${
      //   dateObj.getMonth() +
      //   "-" +
      //   dateObj.getDate() +
      //   "-" +
      //   dateObj.getFullYear()
      // }</div>
      // <img class="wheatherLogo" src="http://openweathermap.org/img/wn/${
      //   data.weather[0].icon
      // }@2x.png"
      // alt="weatherCondition">`;
      currMax.textContent ="Max: " +  data.main.temp_max + " C° 🔻";
      currMin.textContent ="Min: " +   data.main.temp_min + " C° 🔻";
      currPlace.textContent = data.name + ", " + data.sys.country;
      currFl.textContent = "Feels like: " + data.main.feels_like + " C°";
      var sunriseObj = new Date(parseInt(data.sys.sunrise + "000"));
      sunrise.textContent =
        "Sunrise: " +
        sunriseObj.getMonth() +
        "-" +
        sunriseObj.getDate() +
        "-" +
        sunriseObj.getFullYear() +
        "  " +
        sunriseObj.getUTCHours() +
        ":" +
        sunriseObj.getUTCMinutes() +
        ":" +
        sunriseObj.getUTCSeconds() +
        " 🌅";
      var sunsetObj = new Date(parseInt(data.sys.sunset + "000"));
      sunset.textContent =
        "Sunset: " +
        sunsetObj.getMonth() +
        "-" +
        sunsetObj.getDate() +
        "-" +
        sunsetObj.getFullYear() +
        "  " +
        sunsetObj.getUTCHours() +
        ":" +
        sunsetObj.getUTCMinutes() +
        ":" +
        sunsetObj.getUTCSeconds() +
        " 🌇";
    });
}

searchBtn.addEventListener("click", sendCity);
paris.addEventListener("click", function () {
  cityData("Paris");
});
rome.addEventListener("click", function () {
  cityData("Rome,It");
});
ny.addEventListener("click", function () {
  cityData("New York");
});
london.addEventListener("click", function () {
  cityData("London");
});
amsterdam.addEventListener("click", function () {
  cityData("Amsterdam");
});
