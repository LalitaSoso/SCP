function displayTime(now) {
	let hour = now.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let minute = now.getMinutes();
	if (minute < 10) {
		minute = `0${minute}`;
	}
	let days = ["Sun", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."];
	let day = days[now.getDay()];

	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let month = months[now.getMonth()];

	let date = now.getDate();

	return `on ${day} ${month} ${date} ${hour}:${minute}.`;
}

// week 5 submission ⬇️

function displayCityTempAndDescription(response) {
	let iconElement = document.querySelector("#weather-icon");

	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#just-the-temp").innerHTML = `It's ${Math.round(response.data.main.temp)}°F`;
	document.querySelector("#weather-description").innerHTML = `${response.data.weather[0].description}`;
	iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	iconElement.setAttribute("alt", response.data.weather[0].description);
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
