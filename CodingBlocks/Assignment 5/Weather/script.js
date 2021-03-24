//link and api-key
const api = {
    key: "e8eb47f42cf412a5d4efb81a3d098884",
    base: "https://api.openweathermap.org/data/2.5/"
}


//search logic
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}



//api calls
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
                return weather.json();
        }).then(displayResults);
}

function getCard(name,country,date,temprature,weather,feels_like,temp_min,temp_max){
    return `<div class="col"> <div class="card mb-3" style="width: 22rem; "> <div class="card-body"> <h5 class="card-title">Weather in ${name},${country}</h5> <p class="card-text">On ${date}</p> <p class="card-text">${temprature}°c</p> <h5 class="card-title">${weather}</h5> <h5 class="card-title">Feels Like:${feels_like}</h5> <p class="card-text">Min Temp = ${temp_min}°c / Max Temp = ${temp_max} °c</p> </div> </div> </div>`;
}



//weather and data change logic
function displayResults(weather) {
    console.log(weather);
    if(weather.message){
        $("#error").text(weather.message);
        return;
    }else{
        $("#error").text("");
    }

    $("#cards").append(getCard(weather.name, weather.sys.country, dateBuilder(new Date()), weather.main.temp, weather.weather[0].main,weather.main.feels_like, weather.main.temp_min, weather.main.temp_max));
}




//date logic
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${d.toLocaleTimeString()} ${day} ${date} ${month} ${year}`;
}

