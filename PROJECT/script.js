const apikey = '5a13721d4f9300f0d0afeac7d1cb5fcf';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

let map;
let marker;

function initMap(lat, lon) {
    const zoomLevel = 13;
    
    if (map) {
        map.setView([lat, lon], zoomLevel);
        marker.setLatLng([lat, lon]);
    } else {
        map = L.map('map').setView([lat, lon], zoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);
        marker = L.marker([lat, lon]).addTo(map);
    }
}

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === 200) {
                locationElement.textContent = `Location: ${data.name}`;
                temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
                descriptionElement.textContent = `Condition: ${data.weather[0].description}`;

                const { lat, lon } = data.coord;
                initMap(lat, lon);
            } else {
                locationElement.textContent = 'Location not found';
                temperatureElement.textContent = 'Temperature: -';
                descriptionElement.textContent = 'Condition: -';
            }
        })
        .catch((error) => {
            console.error('Error fetching the weather data:', error);
            locationElement.textContent = 'Error fetching weather data';
            temperatureElement.textContent = 'Temperature: -';
            descriptionElement.textContent = 'Condition: -';
        });
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});
