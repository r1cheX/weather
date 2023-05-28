const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const spinner = document.querySelector(".spinner-box");
const arrayTemperature = {
  CLEAR: "images/clear.png",
  RAIN: "images/rain.png",
  SNOW: "images/snow.png",
  CLOUDS: "images/cloud.png",
  HAZE: "images/haze.png",
};


search.addEventListener("click", () => {
  const ApiKey = "ce960b9ab1933d7f96974f76496b8df5";
  const city = document.querySelector(".search-box input")?.value;


  if (city === "") return;


  container.style.height = ( container.style.height === "590px" ) ? "590px" : "300px" ;
  spinner.style.display = "block";
  spinner.classList.add("fadeOut");
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log("debugging -->", json);

      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = "block";
        error404.classList.add("fadeIn");
		spinner.style.display = "none";
        return;
      }

	  spinner.style.display = "none";
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

	  const image = document.querySelector('.weather-box img');
	  const temperature = document.querySelector('.weather-box .temperature');
	  const description = document.querySelector('.weather-box .description');
	  const humidity = document.querySelector('.weather-details .humidity span');
	  const wind = document.querySelector('.weather-details .wind span');

      image.src = arrayTemperature[json.weather[0].main.toUpperCase()] || "images/404.png";

	  temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
	  description.innerHTML = `${json.weather[0].description}`;
	  humidity.innerHTML = `${json.main.humidity}%`;
	  wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";	
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
