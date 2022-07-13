let searchBtn = document.getElementById("search-button");
let input = document.querySelector("input");
let result = document.getElementById("result");
var unsplash_key = config.unsplash_key;
var key = config.key;
var openCage = config.openCage;
let locationBtn = document.querySelector("#location");
let cityEle = document.querySelector(".city");
let geo = document.querySelector("#geo");
let feelEle = document.querySelector(".feelTemp");
let maxEle = document.querySelector(".maxTemp");
let minEle = document.querySelector(".minTemp");
let currentTemp = document.querySelector(".current-temp");
let currentDate = document.getElementById("current_date");
let weatherIcon = document.querySelector(".weather-icon");
let weatherDesc = document.querySelector(".desc");
let weatherMain = document.querySelector(".weather");
let bodyImg = document.querySelector("body");
let wind = document.querySelector(".wind-speed");


resetDOM = () => {
    weatherMain.innerHTML = "";
    weatherDesc.innerHTML = "";
    weatherIcon.src = "";
    currentTemp.innerHTML = "";
    minEle.innerHTML = "";
    maxEle.innerHTML = "";
    feelEle.innerHTML = "";
    cityEle.innerHTML = "";
    currentDate.innerHTML = "";
    currentTemp.innerText = "";
    wind.innerHTML = "";
}

//Get user location coordinates
getCoords = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            getWeatherByCoord(lat, long);
        }, () => {
            resetDOM();
            result.innerText = "Location access is turned off\nPlease reset the permission";
        });
    }
    else {
        document.querySelector('#result').innerText = "GeoLocation not available"
    }
};
getCoords();


//Get the API by User's Location
getWeatherByCoord = (lat, long) => {
    resetDOM();
    currentTemp.innerText = "Loading...";
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`)
        .then((res) => res.json())
        .then((data) => showWeather(data))
    }
;





//Get the API by City Name
getWeatherByName = (cityName) => {
    resetDOM();
    currentTemp.innerText = "Loading";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${key}`)
        .then((res) => res.json())
        .then((data) => showWeather(data))
        .catch(() => {
            resetDOM();
            result.innerHTML =`<h3 class="blank-input">City Not Found</h3>`
        }
    )
};


showWeather = (data) => {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    var today = new Date();
    var day = today.getDay();
    var dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
    var dateTime = date;
    var months = month[today.getMonth()]
    var date = (today.getDate()) + ' ' + months;
    console.log(data);


    wind.innerHTML = `Wind speed: ${data.wind.speed}m/s`    
    weatherMain.innerHTML = `${data.weather[0].main}`
    weatherDesc.innerHTML = `${data.weather[0].description}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    currentTemp.innerHTML = `${temperature}&#176C`;
    minEle.innerHTML = `Min: ${data.main.temp_min}&#176;`
    maxEle.innerHTML = `Max: ${data.main.temp_max}&#176;`
    feelEle.innerHTML = `Feels Like: ${data.main.feels_like}&#176;`
    cityEle.innerHTML = `${cityName}, ${data.sys.country}`
    currentDate.innerHTML = dayList[day] + ',' + date;
    bodyImg.style.backgroundImage = `url("https://source.unsplash.com/random/${window.innerWidth}x${window.innerHeight+200}/?${cityName}")`;
}




// Event Listener on Location Button
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        getCoords();
    }
});





//Event Listener on Search Bar
input.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        if (input.value === "") {
            //pass
        }
        else {
            getWeatherByName(input.value);
            input.value = "";
        }

    }
});

//Event Listener on Search Button
searchBtn.addEventListener('click', () => {
    if (input.value === "") {
        //pass
    }
    else {
        getWeatherByName(input.value);
        input.value = "";
    }
});

// Event Listener on Location Button
// locationBtn.addEventListener('click', getCoords);
searchBtn.addEventListener("click", getWeatherByName);
window.addEventListener("load", getCoords);
