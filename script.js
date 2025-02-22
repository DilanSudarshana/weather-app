const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const apiKey = '3a24ec4e34a52df95b5b20f3ad0469ff';

const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.seacrh-city');
const weatherInfoSection = document.querySelector('.weather-info');


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

async function updateWeatherInfo(city) {
    const weatherData = await getFletchData('weather', city)

    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection)
        return
    }

    showDisplaySection(weatherInfoSection)

    console.log(weatherData);
}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none')
    section.style.display = 'flex'
}