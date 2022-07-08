// API Key 

let searchBtn = document.getElementById("search-button");
let result = document.getElementById("result");
let cityRef = document.getElementById("city");
var today = new Date();
var day = today.getDay();
var daylist = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"]
var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
var dateTime = date;
var months = month[today.getMonth()]
var date = (today.getDate()) + ' ' + months;


let getWeather = () => {
    let cityValue = cityRef.value;
    //Checks if theres no input
    if (cityValue.length == 0) {
        result.innerHTML = `<h3 class="blank-input">Please enter a city name</h3>`
    }
    else {
        // let photo = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${cityValue}&fields=photo&key=${photokey}`;
        // let photo_ref = `https://maps.googleapis.com/maps/api/place/photo?&photoreference=PHOTO_REFERENCE&key=${photokey}`;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric `;
        //Resets the input field
        cityRef.value = "";
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                console.log(data.weather[0].icon);//cloud icon
                console.log(data.weather[0].main); //weather parameters
                console.log(data.weather[0].description) //specific weather description
                console.log(data.weather[0].name) //City name
                console.log(data.weather[0].main.temp_min)
                console.log(data.weather[0].main.temp_max)
                console.log(data.main.feels_like)//human perception 
                console.log(data.sys.country)
                console.log(data.main.humidity)
                console.log(data.weather[0].main.humidity)
                result.innerHTML = `
                <div class="country">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>
                    <h2>${data.name}</h2>
                </div>
                <h4 class="weather">${data.weather[0].main}</h4>
                <h4 class="desc">${data.weather[0].description}</h4>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                <h1>${data.main.temp} &#176;</h1>
                <div class="temp-container">
                    <div>
                        <h4 class="title">Min</h4>
                        <h4 class="temp">${data.main.temp_min}&#176;</h4>
                    </div>
                    <div>
                        <h4 class="title">Max</h4>
                        <h4 class="temp">${data.main.temp_max}&#176;</h4>
                    </div>
                    <div>
                        <h4 class="title">Feels like</h4>
                        <h4 class="temp">${data.main.feels_like}&#176;</h4>
                    </div>
                    <div id="current_date"></div>
                </div>
                `;
                document.getElementById("current_date").innerHTML = daylist[day] + ',' + date;
            })
            .catch(() => {
                result.innerHTML =`<h3 class="blank-input">City Not Found</h3>`;
            });
    }
};




searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);