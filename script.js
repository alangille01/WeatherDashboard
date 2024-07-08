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

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        cityInput.value = '';
    }
});
