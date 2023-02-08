var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

var inputText = document.getElementById("searchText");
var backdropSection = document.getElementById('backdrop');
var modal = document.getElementById('modal');
var closeBtn = document.querySelector(".close");

var currStatus =  document.getElementById("currentStatus");
var about =  document.getElementById("about");

function sendCity(event) {
  event.preventDefault();
  cityData(inputCity.value);
}

function cityData(city) {
  //var requestUrl = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=metric`;
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var counter = 3;
      console.log(data.cod);
      if (data.cod == 400) {
        backdropSection.classList.toggle('visible');
        modal.classList.toggle('visible');
        modal.querySelector("h3").textContent = "ERROR 400: You didn't enter anything."
        return
      } else if (data.cod == 404) {
        backdropSection.classList.toggle('visible');
        modal.classList.toggle('visible');
        modal.querySelector("h3").textContent= "ERROR 404: Sorry! We didn't find the city you were looking for."
        return
      }
      currStatus.classList.add('visible');
      about.classList.add('hide');
      var lat = data.city.coord.lat;
      var lon = data.city.coord.lon;
      additionalStats(lat, lon);
      for (var i = 0; i < 5; i++) {
        cityTitle.textContent = " for " + data.city.name;
        date[i].textContent = data.list[counter].dt_txt;
        if (data.list[counter].main.temp < 20) {
          var weatherEmoji = "❄️";
        } else {
          var weatherEmoji = "☀️";
        }
        forecast[i].textContent = data.list[counter].main.temp + " C° " + weatherEmoji;
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
      if (data.main.temp < 20) {
        var weatherFace = "🥶";
      } else if (data.main.temp > 28) {
        var weatherFace = "🥵";
      } else {
        var weatherFace = "😎";
      }
      currTemp.textContent = data.main.temp + " C°";
      var dateObj = new Date(parseInt(data.dt + "000"));
      currDt.textContent =
        months[dateObj.getMonth()] +
        "-" +
        dateObj.getDate() +
        "-" +
        dateObj.getFullYear() + " " +weatherFace; 
      currMax.textContent = "Max: " + data.main.temp_max + " C° 🔻";
      currMin.textContent = "Min: " + data.main.temp_min + " C° 🔻";
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

function toggleBackdrop() {
  backdropSection.classList.toggle('visible');
  modal.classList.toggle('visible');
}

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
inputText.addEventListener("keydown", function handle(e) {  
  console.log(e.key)
  if (e.key == "Enter") {
    console.log(e.key)
    console.log(this.value)
    e.preventDefault()
    cityData(this.value)
  }

  return false;
});
backdropSection.addEventListener('click', toggleBackdrop)
closeBtn.addEventListener("click", toggleBackdrop)