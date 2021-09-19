var apiKey = "rwwHjEYvXSeymqIdMcbTbUALxuTpivIX";
var getLocationKey = function (location) {
    var city = location.trim().split(",")[0].toLowerCase();
    var state = location.trim().split(" ")[1].toLowerCase();
    var apiUrl = "http://dataservice.accuweather.com/locations/v1/cities/US/search?apikey=" + apiKey + "&q=" + city + "%2C%20" + state;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                locationKey = data[0].Key;
                getForecast(locationKey);
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

var getForecast = function (key) {
    console.log(key);
}

getLocationKey("Portland, OR");

