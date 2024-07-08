const apiKey = '4f85309e9c88dd09ba2aec8b3161bf78';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherEl = document.getElementById('current-weather');
const forecastEl = document.getElementById('forecast');
const searchHistoryEl = document.getElementById('search-history');

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

document.addEventListener('DOMContentLoaded', function () {
    displaySearchHistory();
});

function fetchWeather(city) {
    // Fetch city coordinates first
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            
            // Use coordinates to fetch current weather
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(currentData => {
                    displayCurrentWeather(currentData);
                    saveSearchHistory(city);
                    // Use the same coordinates to fetch forecast
                    fetchForecast(lat, lon);
                })
                .catch(error => console.error('Error fetching current weather:', error));
        })
        .catch(error => console.error('Error fetching city coordinates:', error));
}

function fetchForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error('Error fetching forecast:', error));
}

function displayCurrentWeather(data) {
    const date = new Date().toLocaleDateString();
    currentWeatherEl.innerHTML = `
        <h2>Current Weather:   ${data.name}</h2>
        <div class="weather-card">
            <h3>Today (${date})</h3>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
}

function displayForecast(data) {
    forecastEl.innerHTML = '<h2>5-Day Forecast</h2>';
    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt_txt ).toLocaleDateString();

        // Create forecast card element
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('weather-card');
        forecastCard.innerHTML = `
            <h3>${date}</h3>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                alt="${forecast.weather[0].description}">
            <p>Temperature: ${forecast.main.temp}°C</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
            <p>Wind Speed: ${forecast.wind.speed} m/s</p>
        `;

        // Append forecast card to forecastEl
        forecastEl.appendChild(forecastCard);
    }
}


function saveSearchHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        displaySearchHistory();
    }
}

function displaySearchHistory() {
    searchHistoryEl.innerHTML = '<h2>Search History</h2>';
    searchHistory.forEach(city => {
        searchHistoryEl.innerHTML += `<button onclick="fetchWeather('${city}')">${city}</button>`;
    });
}

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        cityInput.value = '';
    }
});
