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

	return `on ${day} ${month} ${date} at ${hour}:${minute}`;
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	return days[day];
}

function getForecast(coordinates) {
	let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(displayForecast);
}

function displayCityTempAndDescription(response) {
	let iconElement = document.querySelector("#weather-icon");

	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#just-the-temp").innerHTML = `${Math.round(response.data.main.temp)}°`;
	document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
	iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	iconElement.setAttribute("alt", response.data.weather[0].description);

	getForecast(response.data.coord);
}

function displayForecast(response) {
	let forecast = response.data.daily;

	let forecastElement = document.querySelector("#weather-forecast");

	let forecastHTML = "";
	forecast.forEach(function (forecastDay, index) {
		if (index < 5) {
			forecastHTML += `
			<div class="card">
						<div class="card-header forecast-day">${formatDay(forecastDay.dt)}</div>
						<div class="card-body">
							<h5 class="card-title forecast-description">
								${forecastDay.weather[0].description}
								<br />  <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="50"
        />
							</h5>
							<p class="card-text forecast-temperatures">
								<span class="forecast-high" id="forecast-high"> ${Math.round(forecastDay.temp.max)}° </span>
				
								|
								<span class="forecast-low"> ${Math.round(forecastDay.temp.min)}°</span>
							</p>
						</div>
						</div>
			`;
		}
	});

	forecastElement.innerHTML = forecastHTML;
}

function search(city) {
	let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(displayCityTempAndDescription);
}

function searchInput(event) {
	event.preventDefault();
	let city = document.querySelector("#search-input").value;
	search(city);
}

function searchGeolocation(position) {
	let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(displayCityTempAndDescription);
}

function geolocate(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchGeolocation);
}

function getBronxWeather(event) {
	event.preventDefault();
	search("Bronx");
}

let bronxCity = document.querySelector("#theBronx");
bronxCity.addEventListener("click", getBronxWeather);

function getGironaWeather(event) {
	event.preventDefault();
	search("Girona");
}

let gironaCity = document.querySelector("#girona");
gironaCity.addEventListener("click", getGironaWeather);

function getPDXWeather(event) {
	event.preventDefault();
	search("Portland");
}

let portlandCity = document.querySelector("#pdx");
portlandCity.addEventListener("click", getPDXWeather);

function getPhillyWeather(event) {
	event.preventDefault();
	search("Philadelphia");
}

let philadelphiaCity = document.querySelector("#philly");
philadelphiaCity.addEventListener("click", getPhillyWeather);

let timeAndDay = document.querySelector("#red-line-time");
let now = new Date();
timeAndDay.innerHTML = displayTime(now);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchInput);

let geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", geolocate);

search("Bronx County");
