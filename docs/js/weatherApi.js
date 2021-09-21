var apiKey = "rwwHjEYvXSeymqIdMcbTbUALxuTpivIX";
var weatherContainerEl = document.querySelector("#weatherZone");

var getLocationKey = function (location) {
    var city = location.trim().split(",")[0].toLowerCase();
    var state = location.trim().split(" ")[1].toLowerCase();
    var apiUrl = "http://dataservice.accuweather.com/locations/v1/cities/US/search?apikey=" + apiKey + "&q=" + city + "%2C%20" + state;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                locationKey = data[0].Key;
                getForecast(locationKey, location);
            });
        } else {
            //remove this later /////////
            alert("error: no response for city")
        }
    })
        .catch(function (error) {
            /// remove this later /////////
            alert("unable to connect to accuweather")
        })
}

var getForecast = function (key, city) {
    var apiUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + key + "?apikey=" + apiKey;
    var forecastDays = [];
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                for (var i = 0; i < 5; i++) {
                    forecastDays[i] = {
                        date: data.DailyForecasts[i].Date.split("T")[0],
                        highTemp: data.DailyForecasts[i].Temperature.Maximum.Value,
                        lowTemp: data.DailyForecasts[i].Temperature.Minimum.Value,
                        forecast: data.DailyForecasts[i].Day.IconPhrase
                    }
                }
                displayForecast(forecastDays, city)
            })
        } else {
            alert("error no response for location key")
        }
    })
        .catch(function (error) {
            alert("unable to connect to accuweather")
        })
}

var displayForecast = function (forecast, city) {
    if (forecast.length == 0) {
        displayDefaultWeather();
        return;
    }
    weatherContainerEl.setAttribute("style", "background-color: white");
    var cityTitleEl = document.createElement("span");
    cityTitleEl.classList = "flex-row align-center justify-space-between";
    cityTitleEl.textContent = "5-Day Weather Forecast for " + city;
    weatherContainerEl.appendChild(cityTitleEl);

    for (var i=0; i < 5; i++) {
        var dayForecastEl = document.createElement("span")
        dayForecastEl.classList = "list-item flex-row justify-space-between align-center";
        var day = moment(forecast[i].date).format("ddd M/D");
        dayForecastEl.textContent = day + "  " + forecast[i].highTemp + "/" + forecast[i].lowTemp + "  " + forecast[i].forecast;
        weatherContainerEl.appendChild(dayForecastEl);
    }

}

var displayDefaultWeather = function () {

}
getLocationKey("Portland, OR");

