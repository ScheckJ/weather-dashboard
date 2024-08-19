const testBtn = document.querySelector("#test");
const sectionEl1 = document.querySelector("#city-display");
const sectionEl2 = document.querySelector('#forecast')
const sectionEl3 = document.querySelector('#city-list')
const apiKey = "024581bdd94ff8a08d079fac8b68ab5d";

// create function that will capture the value of the input the user typed in
function start(event) {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const citys = JSON.parse(localStorage.getItem('citys')) || []
  citys.push(city)
  localStorage.setItem('citys', JSON.stringify(citys))
  
  fetchCurrentData(city);
  fetchForecastData(city);
  cityHistory(city);
  
}

function cityHistory(city){
  
  const cityTab = JSON.parse(localStorage.getItem('citys')) || []
  let i = 0
  for (; i < cityTab.length; i++) {
        localStorage.removeItem('citys')
        const cityName  = cityTab[i];

        const cityDiv = document.createElement('div')
        const cityBtn = document.createElement('button')
      
        cityBtn.textContent = cityName
        cityBtn.setAttribute('id', 'save')
    
        cityDiv.appendChild(cityBtn)
        sectionEl3.appendChild(cityDiv)
        cityBtn.addEventListener('click', function(){fetchCurrentData(`${city}`)})
        cityBtn.addEventListener('click', function(){currentWeatherCard(`${city}`)})
        cityBtn.addEventListener('click', function(){fetchForecastData(`${city}`)})
        cityBtn.addEventListener('click', function(){forecastCard(`${city}`)})
       
      }
      
}

function fetchCurrentData(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //   console.log('Current Weather Data: ',data);
        currentWeatherCard(data)
    });
}

function currentWeatherCard(cityData){
    console.log(cityData);
    sectionEl1.innerHTML = ""
    const divEl = document.createElement('div')
    const titleEl = document.createElement('h2')
    const temp = document.createElement('p')
    const wind = document.createElement('p')
    const humidity = document.createElement('p')

    titleEl.textContent = cityData.name
    temp.textContent = cityData.main.temp
    wind.textContent = cityData.wind.speed
    humidity.textContent = cityData.main.humidity

    divEl.append(titleEl, temp, wind, humidity)
    sectionEl1.appendChild(divEl)


}


function fetchForecastData(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        forecastCard(data)
      });
  }

  function forecastCard (forecastData){
    console.log(forecastData)
    sectionEl2.innerHTML = ''
    for (let i = 2; i < forecastData.list.length; i += 8) {
        const element = forecastData.list[i];
        console.log(element);  
        
    const divEl2 = document.createElement('div')
    divEl2.setAttribute('id', 'days')
    const dateEl = document.createElement('h3')
    const temp = document.createElement('p')
    const wind = document.createElement('p')
    const humidity = document.createElement('p')
        
    console.log(forecastData.list[i].main);
    dateEl.textContent = forecastData.list[i].dt_txt
    temp.textContent = forecastData.list[i].main.temp
    wind.textContent = forecastData.list[i].wind.speed
    humidity.textContent = forecastData.list[i].main.humidity

    divEl2.append(dateEl, temp, wind, humidity)
    sectionEl2.appendChild(divEl2)

      }
  }


testBtn.addEventListener("submit", start);
