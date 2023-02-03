function getApi(city) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude, longitude);
    // var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.city.name);
        console.log(data.list[0].main.temp);
        var temperature = parseFloat(data.list[0].main.temp);
        var city = data.city.name;
        var country = data.city.country;
        if (temperature > 20) {
          var emoji = "☀️";
        } else {
          var emoji = "🥶";
        }
        statusEl.innerHTML =
          city + ", " + country + " | " + temperature + " C° " + emoji;
      });
  }