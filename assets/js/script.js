// main.js

// Retrieve references to DOM elements
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherEl = document.getElementById('current-weather');
const forecastEl = document.getElementById('forecast');
const searchHistoryEl = document.getElementById('search-history');

// Load search history from localStorage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

document.addEventListener('DOMContentLoaded', function () {
    displaySearchHistory();
});

// Event listener for form submission
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        cityInput.value = '';
    }
});
