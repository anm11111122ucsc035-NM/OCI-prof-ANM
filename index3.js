const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your API key

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDisplay = document.getElementById('weather-display');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('weather-icon');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data');
    }
}

function displayWeatherData(data) {
    const { name, weather, main } = data;
    cityName.textContent = name;
    weatherDescription.textContent = weather[0].description;
    temperature.textContent = `${main.temp}°C`;
    humidity.textContent = `Humidity: ${main.humidity}%`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    weatherDisplay.style.display = 'block';
}

