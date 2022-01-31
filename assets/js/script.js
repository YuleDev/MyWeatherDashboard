var searchbarEl = document.getElementById("searchBtn");
var innerSearchText = document.getElementById("searchfield").value;

var getNewCity = function() {
	event.preventDefault();
	var innerSearchText = document.getElementById("searchfield").value;
	console.log(innerSearchText);
	typedWeatherData(innerSearchText);
	localStorage.setItem("city", innerSearchText);
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
					render(dataOneCall)
				})
		});

	function render(data) {
		console.log(data.daily)

		for (i = 1; i <= 5; i++) {
			var forDay = "#day" + [i];
			var dayElement = document.querySelector(forDay);
			const listwind = document.createElement("li");
			const listhumid = document.createElement("li");
			let weatherIcon = document.createElement("img");
			let uviDisplay = document.createElement("li");
			var iconCode = data.daily[i].weather[0].icon;
			
			dayElement.innerHTML = "daily temperature: " + data.daily[i].temp.day;
			dayElement.appendChild(listwind).textContent = "wind speed " + data.daily[i].wind_speed + " miles per hour";
			dayElement.appendChild(listhumid).textContent = "humidty: " + data.daily[i].humidity + " wetness per air";
			dayElement.appendChild(uviDisplay).textContent = "UVI: " + data.daily[i].uvi + " sunlight per UV";
			dayElement.appendChild(weatherIcon).src = "http://openweathermap.org/img/w/" + iconCode + ".png";
		}
	};
};

function displayOldSearch() { 
var unorderedListEl = document.querySelector("#weatherlist");
var cityListEl = document.createElement("li");
var searchedCities = localStorage.getItem("city");
			
unorderedListEl.appendChild(cityListEl);
cityListEl.innerHTML = searchedCities;

cityListEl.addEventListener("click", typedWeatherData(cityListEl.innerHTML))

};

displayOldSearch();