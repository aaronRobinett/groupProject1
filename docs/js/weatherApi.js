var apiKey = "rwwHjEYvXSeymqIdMcbTbUALxuTpivIX";
var weatherContainerEl = document.querySelector("#weatherZone");
var searchContainerEl = document.querySelector("#search-form");
var userInputEl = document.querySelector("#userInput");

var goodLocation = function (input) {
    if (input) {
        input = input.trim().toLowerCase();
        if (input.split(", ").length === 2) {
            if (input.split(", ")[1].length === 2)
                return true;
        }
    }
    return false;
}

var formSubmitHandler = function (event) {
    event.preventDefault();
    var location = userInputEl.value.trim();
    console.log(location);
    if (goodLocation(location)) {
        getLocationKey(location);
    } else {
        displayDefaultWeather(location);
    }
};

// gets the location key for a city in the format city, state (ex: Portland, OR). Calls displayDefaultWeather
// if location is not found.
var getLocationKey = function (location) {
    var city = location.split(",")[0].toLowerCase();
    var state = location.split(" ")[1].toLowerCase();
    var locationKey = "";
    if (location === localStorage.getItem("search-city")) {
        locationKey = localStorage.getItem("locationKey");
        getForecast(locationKey, location);
    }
    else {
        var apiUrl = "http://dataservice.accuweather.com/locations/v1/cities/US/search?apikey=" + apiKey + "&q=" + city + "%2C%20" + state;

        fetch(apiUrl).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    locationKey = data[0].Key;
                    localStorage.setItem("search-city", location);
                    localStorage.setItem("locationKey", locationKey);
                    getForecast(locationKey, location);
                });
            } else {
                displayDefaultWeather(location);
            }
        })
        .catch(function() {
            displayDefaultWeather(location);
        });
            
    }
}

// Uses the location key found in getLocationKey to find the 5-day forecast for the city
var getForecast = function (key, city) {
    var apiUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + key + "?apikey=" + apiKey;
    var forecastDays = [];
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
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
            displayDefaultWeather(city);
        }
    })
        .catch(function (error) {
            displayDefaultWeather(city);
        })
}

// Displays the 5 day forcast for the given city
var displayForecast = function (forecast, city) {
    if (forecast.length == 0) {
        displayDefaultWeather(city);
        return;
    }
    weatherContainerEl.textContent = "";
    weatherContainerEl.setAttribute("style", "background-color: white");
    var cityTitleEl = document.createElement("h3");
    cityTitleEl.textContent = "5-Day Weather Forecast for " + city;
    weatherContainerEl.appendChild(cityTitleEl);

    for (var i = 0; i < 5; i++) {
        var dayForecastEl = document.createElement("h4")
        var day = moment(forecast[i].date).format("ddd M/D");
        dayForecastEl.textContent = day + "  High: " + forecast[i].highTemp + "  Low: " + forecast[i].lowTemp + "  " + forecast[i].forecast;
        weatherContainerEl.appendChild(dayForecastEl);
    }

}

//If the API doesn't work or the user enters the city incorrectly this will display a question mark and 
// a message that no weather info is found
var displayDefaultWeather = function (city) {
    weatherContainerEl.textContent = "";
    weatherContainerEl.setAttribute("style", "background-color: white");
    var weatherPictureEl = document.createElement("img");
    weatherPictureEl.setAttribute("src", "http://www.clipartbest.com/cliparts/jix/6KA/jix6KA6AT.png");
    var warningText = document.createElement("h2");
    warningText.textContent = "No weather info found for " + city;
    warningText.classList = "weather-flex-row align-center justify-space-between";
    weatherContainerEl.appendChild(warningText);
    weatherContainerEl.appendChild(weatherPictureEl);
}

if (localStorage.getItem("locationKey")) {
    getForecast(localStorage.getItem("locationKey"), localStorage.getItem("search-city"));
} else {
    displayDefaultWeather("location");
}

searchContainerEl.addEventListener("submit", formSubmitHandler);