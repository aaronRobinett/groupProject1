var apiKey = "rwwHjEYvXSeymqIdMcbTbUALxuTpivIX";
var getLocationKey = function(location) {
    var city = "portland";
    var state = "or"
    var apiUrl = "http://dataservice.accuweather.com/locations/v1/cities/US/search?apikey=" + apiKey + "&q=" + city +"%2C%20" + state;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function(data) {
                locationKey = data[0].Key;
                console.log(locationKey);
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

getLocationKey("Portland, OR");