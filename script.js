const apiKey = '4f85309e9c88dd09ba2aec8b3161bf78';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        cityInput.value = '';
    }
});
