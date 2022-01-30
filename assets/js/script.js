var searchbarEl = document.getElementById("searchBtn");
var innerSearchText = document.getElementById("searchfield").value;
/* var newCity = innerSearchText.value; */

var getNewCity = function() {
	event.preventDefault();
	var innerSearchText = document.getElementById("searchfield").value;
	console.log(innerSearchText);
}

searchbarEl.addEventListener("click", getNewCity);

var typedWeatherData = function (innerSearchText) {
	var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + innerSearchText + "&appid=6896502a9c81dd1ca7e7e719e1d786a0";

	fetch(apiUrl)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
		}).then(function (data) {
			fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=6896502a9c81dd1ca7e7e719e1d786a0`)
				.then(response => response.json())
				.then(dataOneCall => {
					/* console.log(dataOneCall) */
					render(dataOneCall)
				})
		});

	function render(data) {
		console.log(data.daily)

		for (i = 1; i <= 5; i++) {
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


	/* previously used code that could become helpful */

/* var formSubmitHandler = function (event) {
	var searchbarEl = document.getElementById("searchBtn");
	var innerSearchText = document.getElementById("searchfield").value;
	var newCity = innerSearchText.value;

	event.preventDefault();

	var searchedCity = newCity.trim();
	var cityName = searchedCity.toLowerCase();

	if (!cityName) {
		return;
		/* typedWeatherData(cityName);
	}

	e.preventDefault();
  var search =  // get the value of the text in the search bar input field in your html
  //call the function that fetches the weather
  //set the value of the search box text input to an empty string
};

 look at search button
when search button is clicked look at previous element "textarea"
take value of text area and pass it into cityName
run fetch request with new variable of searched city */



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