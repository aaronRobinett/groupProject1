var apiKey = "rwwHjEYvXSeymqIdMcbTbUALxuTpivIX";
var weatherContainerEl = document.querySelector("#weatherZone");

var searchForm = document.getElementById("search-form"); 
console.log(searchForm); 

// gets the location key for a city in the format city, state (ex: Portland, OR). Calls displayDefaultWeather
// if location is not found.
var getLocationKey = function (event) {
    //prevents page from reloading 
    event.preventDefault(); 
    //grbs value from the input search bar created 
    var cityName = document.getElementById("search-text").value; 
    // var city = location.trim().split(",")[0].toLowerCase();
    // var state = location.trim().split(" ")[1].toLowerCase();
    var apiUrl = "http://dataservice.accuweather.com/locations/v1/cities/US/search?apikey=" + apiKey + "&q=" + cityName ; 
    //+ "%2C%20" + state;
    
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                locationKey = data[0].Key;
                getForecast(locationKey, location);
            });
        } else {
            displayDefaultWeather(location);
        }
    })
        .catch(function (error) {
            displayDefaultWeather(location);
        })
}

// Uses the location key found in getLocationKey to find the 5-day forecast for the city
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
            displayDefaultWeather(city);
        }
    })
        .catch(function (error) {
            displayDefaultWeather(city);
        })
}

// Displays the 5 day forcast for the given city
var displayForecast = function (forecast, city) {
    console.log(forecast);
    if (forecast.length == 0) {
        displayDefaultWeather(city);
        return;
    }
    weatherContainerEl.setAttribute("style", "background-color: white");
    var cityTitleEl = document.createElement("span");
    cityTitleEl.classList = "weather-flex-row align-center justify-space-between";
    cityTitleEl.textContent = "5-Day Weather Forecast for " + city;
    weatherContainerEl.appendChild(cityTitleEl);

    for (var i = 0; i < 5; i++) {
        var dayForecastEl = document.createElement("span")
        dayForecastEl.classList = "weather-flex-row justify-space-between align-center";
        var day = moment(forecast[i].date).format("ddd M/D");
        dayForecastEl.textContent = day + "  " + forecast[i].highTemp + "/" + forecast[i].lowTemp + "  " + forecast[i].forecast;
        weatherContainerEl.appendChild(dayForecastEl);
    }

}

//If the API doesn't work or the user enters the city incorrectly this will display a question mark and 
// a message that no weather info is found
var displayDefaultWeather = function (city) {
    weatherContainerEl.setAttribute("style", "background-color: white");
    var weatherPictureEl = document.createElement("img");
    weatherPictureEl.setAttribute("src", "http://www.clipartbest.com/cliparts/jix/6KA/jix6KA6AT.png");
    var warningText = document.createElement("h2");
    warningText.textContent = "No weather info found for " + city;
    warningText.classList = "weather-flex-row align-center justify-space-between";
    weatherContainerEl.appendChild(warningText);
    weatherContainerEl.appendChild(weatherPictureEl);
}

//getLocationKey("Seattle, WA");

//Add Event listiner on click of submit of the search form 
searchForm.addEventListener("submit", getLocationKey)

