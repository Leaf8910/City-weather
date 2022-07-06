// API Key
// 

let result = document.ElementById("result");
let searchBtn = document.getElementById("search-button");
let city = document.getElementById("city");

let getWeather = () => {
    let cityVal = city.value;
    //Checks if theres no input
    if (cityVal.length == 0) {
        result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`
    }
    else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
        //Resets the input field
        city.value = "";
        fetch(url)
            .then((data) => {
                console.log(data);
            }
            
            )
    }
}

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);