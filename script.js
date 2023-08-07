function displayTime(now) {
	let hour = now.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let minute = now.getMinutes();
	if (minute < 10) {
		minute = `0${minute}`;
	}
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let day = days[now.getDay()];

	return `It is currently ${hour}:${minute} on a ${day} afternoon,`;
}

// week 5 submission ⬇️

function displayCityTempAndDescription(response) {
	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#just-the-temp").innerHTML = Math.round(response.data.main.temp);
	document.querySelector("#weather-description").innerHTML = `with ${response.data.weather[0].description}.`;
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

// week 5 submission ⬆️

// function sayFahrenheit(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#just-the-temp");
//   temp.innerHTML = "77°";
// }

// function sayCelsius(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#just-the-temp");
//   temp.innerHTML = "25°";
// }

let timeAndDay = document.querySelector("#red-line-time");
let now = new Date();
timeAndDay.innerHTML = displayTime(now);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchInput);

let geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", geolocate);

search("Bronx County");

// let fahrenheitlink = document.querySelector("#fahrenheit-link");
// fahrenheitlink.addEventListener("click", sayFahrenheit);

// let celsiuslink = document.querySelector("#celsius-link");
// celsiuslink.addEventListener("click", sayCelsius);
