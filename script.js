var latitude
var longitude
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

window.onload=function(){
	
	  const date = new Date();
	  const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
	  document.getElementById("date").innerHTML = dateString


	if ("geolocation" in navigator) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		console.log("Latitude: " + latitude + ", Longitude: " + longitude);
	  });
	  
	} else {
	  console.log("Geolocation is not available in your browser.");
	}

	const btn = document.getElementById("getWeatherBtn")
	btn.addEventListener("click", () => {
	  const lat = latitude;
	  const lon = longitude;
	  const xhr = new XMLHttpRequest();
	  xhr.open("GET", `http://localhost:3000/weather/${lat}/${lon}`);
	  xhr.send();

	  xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
		console.log(response)
        const temperature = response.temperature;
        const weatherStatus = response.weatherStatus;

        document.getElementById("temperature").innerHTML = `Temperature: ${temperature}°F`;
        document.getElementById("weatherStatus").innerHTML = `Weather Status: ${weatherStatus}`;
	  };
	  const xhr2 = new XMLHttpRequest();
	  xhr2.open("GET", `http://localhost:3000/weather/forecast/${lat}/${lon}`);
	  xhr2.send();
	  xhr2.onload = function () {
	  if (xhr2.status === 200) {
		  var response = JSON.parse(xhr2.responseText);
		  var forecast = response.forecast;
		  var forecastElements = document.getElementsByClassName("forecast");
		  for (var i = 0; i < forecast.length; i++) {
			forecastElements[i].innerHTML = forecast[i].dayName + ": " + forecast[i].temp + "°F";
      }
    } else {
      console.error(xhr2.responseText);
    }
  };

	  
	});
}
