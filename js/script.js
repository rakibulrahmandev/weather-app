//? weather app -------------------------------------------------------------->

// weather app - API from openWeather ---------------------------->
const apiKeys = 'accf0950cc846a8a09cdf50dbe86bc2b';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// get html element----------------------------------------------->
const searchBtn = document.getElementById('btn');
const searchBox = document.getElementById('input');

const tempDis = document.getElementById('temp');
const cityDis = document.getElementById('city');
const humidityDis = document.getElementById('humidity');
const windDis = document.getElementById('wind');
const weatherImg = document.getElementById('weather-img');

const errMsg = document.getElementById('err-msg');
const displayData = document.getElementById('display-data');

// event listener ------------------------------------------------>
searchBtn.addEventListener('click', () => {

    let searchBoxValue = String(searchBox.value).toLowerCase().trim();

    if (!searchBoxValue && searchBoxValue !== ' ') {
        checkWeather(searchBoxValue);
    };

});

searchBox.addEventListener('keypress', (e) => {

    let searchBoxValue = String(searchBox.value).toLowerCase().trim();

    if (e.key === 'Enter' && searchBoxValue !== ' ') {
        checkWeather(searchBoxValue);
    };

});

// function ------------------------------------------------------>

// display image function -------->
const imgDis = (data) => {

    // data destructure:
    const {weather} = data

    // change image based on weather condition:
    if (weather[0]?.main === 'Clouds') {
        weatherImg.src = './img/clouds.png';
    } else if (weather[0]?.main === 'Clear') {
        weatherImg.src = './img/clear.png';
    } else if (weather[0]?.main === 'Rain') {
        weatherImg.src = './img/rain.png';
    } else if (weather[0]?.main === 'Drizzle') {
        weatherImg.src = './img/drizzle.png';
    } else if (weather[0]?.main === 'Mist') {
        weatherImg.src = './img/mist.png';
    } else if (weather[0]?.main === 'Snow') {
        weatherImg.src = './img/snow.png';
    };

};

// display data function --------->
const dataDis = (data) => {

    // data destructure:
    const {main, name, wind} = data;

    // data show in html:
    tempDis.textContent = `${Math.round(main?.temp)}°C`;
    cityDis.textContent = name;
    humidityDis.textContent = `${main?.humidity}%`;
    windDis.textContent = `${wind?.speed} km/h`;

};

// data fetching function -------->
const checkWeather = async function(city) {

    // try-catch block:
    try {
        // fetching data from API:
        const response = await fetch(apiUrl + city + `&appid=${apiKeys}`);
        const data = await response.json();

        // handling message based on response status:
        if (response.status === 200) {
            displayData.classList.remove('hidden');
            errMsg.classList.add('hidden');
        };

        if (response.status === 404) {
            displayData.classList.add('hidden');
            errMsg.classList.remove('hidden');
        };

        // call some functions:
        dataDis(data);
        imgDis(data);

    } catch (err) {

        // handling error message:
        if (err) {
            errMsg.classList.remove('hidden');
        };
    };

};