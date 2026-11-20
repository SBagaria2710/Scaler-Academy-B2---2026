const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".city");
const timeField = document.querySelector(".localtime");
const conditionField = document.querySelector(".condition");
const conditionIcon = document.querySelector(".weather-icon");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const API_KEY = "7f3d45bdcc5d455a92c22655262011";

async function fetchWeatherData(city) {
    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&api=no`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found or invalid response");
        }

        const data = await response.json();
        console.log("Fetched Data: ", data);

        updateDOM(data);
    } catch (err) {
        console.error("Error fetching data: ", err.message);
        alert("Unable to fetch weather data. Please try another city name.");
    }
}

function updateDOM(data) {
    // const { current, location } = data;
    const current = data.current;
    const location = data.location;

    temperatureField.textContent = `${current.temp_c}\u00B0C`;
    cityField.textContent = location.name;
    timeField.textContent = formatTime(location.localtime);
    conditionField.textContent = current.condition.text;
    conditionIcon.src = `https:${current.condition.icon}`;
    conditionIcon.alt = current.condition.text;
}

function formatTime(localtime) {
    const [date, time] = localtime.split(" ");
    const day = getDayName(date);
    return `${time} ${day},${date}`;
}

function getDayName(dateString) {
    const dayIndex = new Date(dateString).getDay();
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return days[dayIndex];
}

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const city = searchInput.value.trim();

    if (city === "") {
        alert("Please, enter a city name.");
        return;
    }

    fetchWeatherData(city);
    searchInput.value = "";
});