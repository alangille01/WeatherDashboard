// history.js

// Save search history to localStorage
function saveSearchHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        displaySearchHistory();
    }
}

// Display search history on the page
function displaySearchHistory() {
    searchHistoryEl.innerHTML = '<h2>Search History</h2>';
    searchHistory.forEach(city => {
        searchHistoryEl.innerHTML += `<button onclick="fetchWeather('${city}')">${city}</button>`;
    });
}
