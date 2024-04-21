const testBtn = document.querySelector('#test')
const sectionEl = document.querySelector('#city-display')

testBtn.addEventListener('click', LatLon)

function LatLon(event){
    event.preventDefault()
    const city = document.getElementById('city')
    const cityValue = city.value
    
    console.log(cityValue)

    const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=024581bdd94ff8a08d079fac8b68ab5d`;
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data[0].name)

    const lat = data
    const titleEl = document.createElement('h2')

    titleEl.textContent = data[0].name
    

    sectionEl.appendChild(titleEl)
    
    function Forecast (){
        const requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=024581bdd94ff8a08d079fac8b68ab5d'
        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)})
    }
    })
    }


