const button = document.getElementById("search-button");
const input = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");
const cityHumidity = document.getElementById("city-humidity");
const cityWindSpeed = document.getElementById("city-windspeed");

const loading = document.getElementById("loading");
const weatherInfo = document.getElementById("weather-info");

// Fetch weather data based on city name
async function getData(cityName) {
    try {
        // Show loading spinner
        loading.style.display = 'block';
        weatherInfo.style.display = 'none';
        
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=d54290515cdb4d4aa3d145440242210&q=${cityName}&aqi=yes`
        );
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        alert(error.message);
        return null;
    } finally {
        // Hide loading spinner
        loading.style.display = 'none';
    }
}

// Event listener for search button
button.addEventListener('click', async () => {
    const value = input.value;
    const result = await getData(value);
    
    if (result) {
        // Display the data on the UI
        cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
        cityTime.innerText = `Local Time: ${result.location.localtime}`;
        cityTemp.innerText = `Temperature: ${result.current.temp_c}°C`;
        cityHumidity.innerText = `Humidity: ${result.current.humidity}%`;
        cityWindSpeed.innerText = `Wind Speed: ${result.current.wind_kph} kph`;

        weatherInfo.style.display = 'block';
    }
});

// Function to get geolocation and fetch weather based on current location
function fetchWeatherByLocation() {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const result = await getData(`${latitude},${longitude}`);
            if (result) {
                cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
                cityTime.innerText = `Local Time: ${result.location.localtime}`;
                cityTemp.innerText = `Temperature: ${result.current.temp_c}°C`;
                cityHumidity.innerText = `Humidity: ${result.current.humidity}%`;
                cityWindSpeed.innerText = `Wind Speed: ${result.current.wind_kph} kph`;

                weatherInfo.style.display = 'block';
            }
        }, (error) => {
            console.error("Error getting location:", error);
            alert("Could not get your location. Please check your browser settings.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Add event listener to fetch weather by location when the page loads
document.addEventListener("DOMContentLoaded", fetchWeatherByLocation);
