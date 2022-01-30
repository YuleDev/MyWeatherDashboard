var searchbarEl = document.querySelector("#searchfield");

var formSubmitHandler = function (event) {
    event.preventDefault();

    var searchedCity = searchbarEl.value.trim();
    var cityName = searchedCity.toLowerCase();

    if (cityName) {
        typedWeatherData(cityName);
    }
};



var typedWeatherData = function (cityName) {

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=6896502a9c81dd1ca7e7e719e1d786a0";

fetch(apiUrl)
.then(function (response) {
	if (response.ok) {
		return response.json();
	} 
}).then(function (data) {
	/* console.log(data) */
	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=6896502a9c81dd1ca7e7e719e1d786a0`)
	.then(response => response.json())
	.then(dataOneCall => {
		/* console.log(dataOneCall) */
		render(dataOneCall)
	})
});

function render(data) {
	/* var dailyData = data.daily; */
	console.log(data.daily)

	for(i=1; i<=5; i++){
		var forDay = "#day" + [i];
        var dayElement = document.querySelector(forDay);
        dayElement.innerHTML = "daily temperature: " + data.daily[i].temp.day;
		const listwind = document.createElement("li");
		const listhumid = document.createElement("li");
		let weatherIcon = document.createElement("img");

		dayElement.appendChild(weatherIcon).textContent = data.daily[i].weather[0].icon;
		dayElement.appendChild(listwind).textContent = "wind speed " + data.daily[i].wind_speed + " miles per hour";
		dayElement.appendChild(listhumid).textContent = "humidty: " + data.daily[i].humidity + " wetness per air";
	}
};
};




/* var userSearch = document.querySelector("#searchfield").value;


/* search weather data fetch */
/* var fetchSearch = function () {
fetch("https://community-open-weather-map.p.rapidapi.com/find?q=london&cnt=0&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "f112fe985emsh7fd3ffcf23a79fbp14c66djsnd4ab259a0c95"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
}; */