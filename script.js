const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const apiKey = '3a24ec4e34a52df95b5b20f3ad0469ff';

const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.seacrh-city');
const weatherInfoSection = document.querySelector('.weather-info');

const countryTxt = document.querySelector('.country-txt');
const dateTxt = document.querySelector('.current-date-text');
const conditionTxt = document.querySelector('.condition-txt');
const humidityTxt = document.querySelector('.humidity-value-txt');
const windTxt = document.querySelector('.wind-value-txt');
const tempTxt = document.querySelector('.temp-text');
const weatherSummaryImage = document.querySelector('.weather-summary-img');

const forcastItemContainer = document.querySelector('.focast-item-container');


searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }

})

cityInput.addEventListener('keydown', () => {
    if (event.key == 'Enter' && cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }

})

async function getFletchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(apiUrl)
    return response.json()
}

function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg'
    if (id <= 321) return 'drizzle.svg'
    if (id <= 531) return 'rain.svg'
    if (id <= 622) return 'snow.svg'
    if (id <= 781) return 'atmosphere.svg'
    if (id <= 800) return 'clear.svg'
    else return 'clouds.svg'
}

function getCurrentDate() {
    const currentData = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentData.toLocaleDateString('en-GB', options)
}

async function updateWeatherInfo(city) {
    const weatherData = await getFletchData('weather', city)

    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection)
        return
    }

    showDisplaySection(weatherInfoSection)

    const {
        name: country,
        main: {
            temp,
            humidity
        },
        weather: [{
            id,
            main
        }],
        wind: {
            speed
        }
    } = weatherData

    countryTxt.textContent = country
    tempTxt.textContent = Math.round(temp) + ' °C'
    conditionTxt.textContent = main
    humidityTxt.textContent = humidity + ' %'
    windTxt.textContent = speed + 'M/s'

    weatherSummaryImage.src = `assets/weather/${getWeatherIcon(id)}`
    dateTxt.textContent = getCurrentDate()

    await updateForecastInfo(city)
}

async function updateForecastInfo(city) {

    const forecastsData = await getFletchData('forecast', city)
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]

    forcastItemContainer.innerHTML=''
    forecastsData.list.forEach(forecastWeather => {

        if (forecastWeather.dt_txt.includes(timeTaken) &&
            !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastItems(forecastWeather)
        }

    })
}

function updateForecastItems(weatherData) {

}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection]
    .forEach(section => section.style.display = 'none')
    section.style.display = 'flex'
}