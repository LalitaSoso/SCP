function displayTime(now) {
	let hour = now.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let minute = now.getMinutes();
	if (minute < 10) {
		minute = `0${minute}`;
	}
	let days = ["Sun", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
	let day = days[now.getDay()];

	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let month = months[now.getMonth()];

	let date = now.getDate();

	return `on ${day} ${month} ${date} ${hour}:${minute}.`;
}

function getForecast(coordinates) {
	console.log(coordinates);
	let apiKey = "d1a86552de255334f6117b348c4519bd";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
	console.log(apiUrl);
	axios.get(apiUrl).then(displayForecast);
}

function displayCityTempAndDescription(response) {
	let iconElement = document.querySelector("#weather-icon");

	fahrenheitTemperature = response.data.main.temp;

	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#just-the-temp").innerHTML = `It is ${Math.round(fahrenheitTemperature)}°`;
	document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
	iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	iconElement.setAttribute("alt", response.data.weather[0].description);

	getForecast(response.data.coord);
}

function displayForecast(response) {
	console.log(response.data.daily);
	let forecastElement = document.querySelector("#weather-forecast");

	let forecastHTML = "";
	let days = ["SUN", "MON", "TUES", "WED", "THURS"];
	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			`<div class="card">
						<div class="card-header forecast-day">${day}</div>
						<div class="card-body">
							<h5 class="card-title forecast-description">
								Sunny Rain
								<br /><i class="fa-solid fa-cloud-sun-rain forecast-weather-icon"></i>
							</h5>
							<p class="card-text forecast-temperatures">
								<span class="forecast-low"> Low: 25° </span>
								<br />
								<span class="forecast-high"> High: 66°</span>
							</p>
						</div>
						</div>
			`;
	});

	forecastElement.innerHTML = forecastHTML;
}

function search(city) {
	let apiKey = "d1a86552de255334f6117b348c4519bd";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(displayCityTempAndDescription);
}

function searchInput(event) {
	event.preventDefault();
	let city = document.querySelector("#search-input").value;
	search(city);
}

function searchGeolocation(position) {
	let apiKey = "d1a86552de255334f6117b348c4519bd";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(displayCityTempAndDescription);
}

function geolocate(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchGeolocation);
}

function convertToCelsius(event) {
	event.preventDefault();
	let celsius = ((fahrenheitTemperature - 32) * 5) / 9;
	let temperature = document.querySelector("#just-the-temp");
	fahrenheitLink.classList.remove("active");
	celsiusLink.classList.add("active");
	temperature.innerHTML = `It is ${Math.round(celsius)}°`;
}

function displayFahrenheit(event) {
	event.preventDefault();
	let temperature = document.querySelector("#just-the-temp");
	fahrenheitLink.classList.add("active");
	celsiusLink.classList.remove("active");
	temperature.innerHTML = `It is ${Math.round(fahrenheitTemperature)}°`;
}

let fahrenheitTemperature = null;

let timeAndDay = document.querySelector("#red-line-time");
let now = new Date();
timeAndDay.innerHTML = displayTime(now);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchInput);

let geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", geolocate);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("Bronx County");
