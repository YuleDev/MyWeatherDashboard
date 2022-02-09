var searchbarEl = document.getElementById("searchBtn");
var innerSearchText = document.getElementById("searchfield").value;
var savedCities = localStorage.getItem("cities") ? JSON.parse(localStorage.getItem("cities")) : [];

function displayOldSearch() {
	var unorderedListEl = document.querySelector("#weatherlist");
	unorderedListEl.innerHTML = "";

	for (let i = 0; i < savedCities.length; i++) {

		var cityListEl = document.createElement("li");
		var cityButton = document.createElement("button");
		cityButton.classList.add('cityButton');
		cityButton.innerHTML = savedCities[i];
		cityButton.addEventListener("click", function () { typedWeatherData(savedCities[i]) });
		cityListEl.appendChild(cityButton);
		unorderedListEl.appendChild(cityListEl);
	}
};

displayOldSearch();

var getNewCity = function () {
	event.preventDefault();
	var innerSearchText = document.getElementById("searchfield").value;
	typedWeatherData(innerSearchText);
	innerSearchText = innerSearchText.toLowerCase().trim()
	if (!savedCities.includes(innerSearchText)) {
		savedCities.push(innerSearchText);
		localStorage.setItem("cities", JSON.stringify(savedCities));
		displayOldSearch();
	}
};

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

		for (i = 1; i <= 5; i++) {
			var forDay = "#day" + [i];
			var dayElement = document.querySelector(forDay);
			const listwind = document.createElement("li");
			const listhumid = document.createElement("li");
			let weatherIcon = document.createElement("img");
			let uviDisplay = document.createElement("li");
			var iconCode = data.daily[i].weather[0].icon;
			var cityCounty = data.timezone;
			var cityCountyEl = document.createElement("li");

			dayElement.appendChild(cityCountyEl).textContent = cityCounty;
			dayElement.innerHTML = "daily temperature: " + data.daily[i].temp.day;
			dayElement.appendChild(listwind).textContent = "wind speed " + data.daily[i].wind_speed + " miles per hour";
			dayElement.appendChild(listhumid).textContent = "humidty: " + data.daily[i].humidity + " wetness per air";
			dayElement.appendChild(uviDisplay).textContent = "UVI: " + data.daily[i].uvi + " sunlight per UV";
			dayElement.appendChild(weatherIcon).src = "http://openweathermap.org/img/w/" + iconCode + ".png";
		}
	};
};

var typedWeatherData = function (buttonContent) {
	var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + buttonContent + "&appid=6896502a9c81dd1ca7e7e719e1d786a0";

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
					CurrentDay(dataOneCall);
					console.log(dataOneCall);
				})
		});

	function CurrentDay(data) {
			var currentDayDisplay = document.querySelector("#currentDayDisplay");
			currentDayDisplay.innerHTML = "";
			var currTemp = data.current.temp;
			var currUvi = data.current.uvi;
			var currHumidity = data.current.humidity;
			var currIcon = data.current.weather[0].icon;
			var currWind = data.current.wind_speed;
			var cityDataName = data.timezone;

			var cityNameEl = document.createElement("li");
			var currIconEl = document.createElement("img");
			var currTempEl = document.createElement("li");
			var currUviEl = document.createElement("li");
			var currHumidityEl = document.createElement("li");
			var currWindEl = document.createElement("li");
			
			if (data.current.uvi < 3) {
				currUviEl.classList.add("greenUV");
			}
			if (data.current.uvi > 2) {
				currUviEl.classList.add("yellowUV");
			}
			if (data.current.uvi > 6) {
				currUviEl.classList.add("orangeUV");
			}
			if (data.current.uvi > 7) {
				currUviEl.classList.add("redUV");
			}
			if (data.current.uvi > 10) {
				currUviEl.classList.add("purpleUV");
			};

			currentDayDisplay.appendChild(cityNameEl).textContent = cityDataName;
			currentDayDisplay.appendChild(currTempEl).textContent = currTemp + " degrees";
			currentDayDisplay.appendChild(currUviEl).textContent = currUvi + " UV per UVI";
			currentDayDisplay.appendChild(currHumidityEl).textContent = currHumidity + " wetness per air";
			currentDayDisplay.appendChild(currWindEl).textContent = currWind + " wind per windiness";
			currentDayDisplay.appendChild(currIconEl).src = "http://openweathermap.org/img/w/" +  currIcon + ".png";
	}

	function render(data) {

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
			
			if (data.current.uvi < 3) {
				uviDisplay.classList.add("greenUV");
			}
			if (data.current.uvi > 2) {
				uviDisplay.classList.add("yellowUV");
			}
			if (data.current.uvi > 6) {
				uviDisplay.classList.add("orangeUV");
			}
			if (data.current.uvi > 7) {
				uviDisplay.classList.add("redUV");
			}
			if (data.current.uvi > 10) {
				uviDisplay.classList.add("purpleUV");
			};
		}
	};
};