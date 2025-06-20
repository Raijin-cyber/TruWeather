let base_URL = "https://api.weatherapi.com/v1/forecast.json?key=338a502dc46d4f6fb1a180839251606&q=";
let city_input = document.querySelector("input");
let humidity = document.querySelector(".humidity");
let visibility = document.querySelector(".visibility");
let dir_arrow = document.querySelector(".dir_arrow");
let day = document.querySelector(".day");
let wind_speed = document.querySelector(".wind_speed");
let feel_temp = document.querySelector(".ftemp");
let day_date_time = document.querySelector(".day_date_time");
let uv = document.querySelector(".uv_index");
let sunrise = document.querySelector(".sun_rise");
let sunset = document.querySelector(".sun_set");
let fore_time = document.querySelectorAll(".fore_time");
let fore_day = document.querySelectorAll(".fore_day");
let fore_arrow = document.querySelectorAll(".fore_arrow");
let fore_speed = document.querySelectorAll(".fore_speed");
let fore_feel_temp = document.querySelectorAll(".fore_feel_temp");
let fore_humid = document.querySelectorAll(".fore_humid");
let fore_uv_index = document.querySelectorAll(".fore_uv_index");
let fore_visibility = document.querySelectorAll(".fore_visibility");

document.body.style.backgroundImage = "url(images/mist_day.jpg)";
let current_time;

function getHour(str) {
    return Number.parseInt(str, 10); // Ensures it’s treated as an integer
}

// function for Day date and time
function updateDateTime() {
    const now = new Date();
    const time = new Date();

    const options = {
        weekday: 'long',    // e.g., Monday
        // year: 'numeric',
        // month: 'long',      // e.g., June
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: false        // for AM/PM
    };

    const formatted = now.toLocaleString('en-IN', options);
    day_date_time.innerText = formatted;
    const new_options = {
        hour : '2-digit',
        hour12: false
    }
    current_time =  time.toLocaleString('en-IN', new_options);
}

async function find_weather() {
    let URL = `${base_URL}${city_input.value}&days=2&aqi=no&alerts=yes&lang=en`;
    let promise = await fetch(URL);
    let data = await promise.json();
    let code = data.current.condition.code;
    let image = weatherImages[code][0];
    document.body.style.backgroundImage = `url("images/${image}")`;
    day.innerHTML = `${weatherImages[code][1]} ${weatherImages[code][2]}`;
    feel_temp.innerText = `${data.current.feelslike_c }°C`;
    humidity.innerHTML = `${data.current.humidity }<i class="fa-solid fa-droplet"></i>`;
    visibility.innerHTML = `${data.current.vis_km} km <i class="fa-regular fa-eye"></i>`;
    dir_arrow.style.transform = `rotate(${data.current.wind_degree}deg)`;
    wind_speed.innerHTML = `${data.current.wind_kph} kph <i class="fa-solid fa-gauge"></i>`;
    sunrise.innerHTML = `${data.forecast.forecastday[0].astro.sunrise}<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-sunrise-fill" viewBox="0 0 16 16">
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                        </svg>`;
    sunset.innerHTML = `${data.forecast.forecastday[0].astro.sunset}<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-sunset-fill" viewBox="0 0 16 16">
                        <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                        </svg>`;
                        
    // Update every second
    setInterval(updateDateTime, 60000);
    updateDateTime(); // initial call

    // now doing forecasting
    /* Logic is that we will take 2 days forecating. We will show forecast for next 2 hrs only
        we will add 2 hours to current time if(current_time + 2 > 24){show_weather((current_time + 2) - 24)} else{show_weather(Current_time)} */

    let temp_time = current_time;
    temp_time = getHour(current_time); // storing converted form(integer) of current_time in temp_time 

    //UV
    uv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
                    <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
                    <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
                    </svg>UV: ${data.forecast.forecastday[0].hour[temp_time].uv}`;

    // FORECASTING STARTS FROM HERE

    for(let i = 0; i < 4; i++) {
        if(temp_time + 2 > 24) {
            temp_time = (temp_time + 2) - 24;
        }
        else {
            temp_time += 2;
        }

        fore_time[i].innerText = `Time: ${temp_time}`;
        fore_day[i].innerHTML = `${weatherImages[data.forecast.forecastday[1].hour[2].condition.code][2]}`;
        fore_arrow[i].style.transform = `rotate(${data.forecast.forecastday[1].hour[temp_time].wind_degree}deg)`;
        fore_speed[i].innerHTML = `${data.forecast.forecastday[1].hour[temp_time].wind_kph} kph <i class="fa-solid fa-gauge"></i>`;
        fore_feel_temp[i].innerText = `Will feel like: ${data.forecast.forecastday[0].hour[temp_time].feelslike_c} °C`;
        fore_humid[i].innerHTML = `Humidity <i class="fa-solid fa-droplet"></i>: ${data.forecast.forecastday[1].hour[temp_time].humidity}`;
        fore_uv_index[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
                                    <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
                                    <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
                                    </svg>UV: ${data.forecast.forecastday[1].hour[temp_time].uv}`;
        fore_visibility[i].innerHTML = `${data.forecast.forecastday[1].hour[temp_time].vis_km} km <i class="fa-regular fa-eye"></i>`;
    }

    console.log(data);
}

city_input.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        find_weather();
    }
});

city_input.addEventListener("blur", function (event) {
    find_weather();
});

