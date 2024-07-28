const loader = document.querySelector(".loader");
const container = document.querySelector(".container");

window.addEventListener("load", () => {

    loader.classList.add("hidden");

    loader.addEventListener("transitionend", () => {
        // document.body.removeChild("loader");
        container.classList.add("active1");
    })
})

let apiKey;
let api;

const text = document.querySelector(".input input");
const infotext = document.querySelector(".input h4")

//for city enter button
text.addEventListener("keyup", e => {
    if (e.key == "Enter" && text.value != "") {
        requestAPI(text.value);
    }
    else if (text.value == "") {
        infotext.innerText = "enter city name";
        infotext.classList.add("msg");
    }
    else {

    }
})

//location fetch
locationbt = document.querySelector(".location");
locationbt.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
    //if location supported by your device
    else {
        alert("your device does not support geolocation api");
    }
})

function onSuccess(position) {
    //console.log(position);
    const { latitude, longitude } = position.coords;
    //fetching latitude and longitude
    console.log(latitude, longitude);
    apiKey = `0ee5e9c54fe3ee3f71b8ce481c3b2746`;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetchData();


}

function onError(error) {
    //console.log(error);
    infotext.innerText = error.message;
    infotext.classList.add("msg");
}

//city name fetch
function requestAPI(city) {
    //here text.value will be equal to city
    console.log(city);
    //let api=`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;
    apiKey = `0ee5e9c54fe3ee3f71b8ce481c3b2746`;
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetchData();


}

function fetchData() {
    //before fetching
    infotext.innerText = "Getting weather details"
    infotext.classList.add("msg")
    //fetch(api).then(response => console.log(response.json()));
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
    //here we fetch api response and return it in json format then we call weatherDetails function and pass result as an argument
    //here result stores all the weather data
}

const goBtn = document.querySelector(".back");
const weCon = document.querySelector(".wimg");

function weatherDetails(info) {
    //here info is same as result
    if (info.cod == "404") {
        infotext.innerText = `${text.value} is not a valid city name`;
    }
    else {
        infotext.classList.remove("msg");
        container.classList.add("active2");
        let city1 = info.name;
        let temp = info.main.temp;
        let wdetails = info.weather[0].description;
        let wid = info.weather[0].id;
        let feel = info.main.feels_like;
        let sun_rise = info.sys.sunrise;
        let sun_set = info.sys.sunset;
        let pressure = info.main.pressure;
        let humidity = info.main.humidity;
        let windspeed = info.wind.speed;

        const sunriseDate = new Date(sun_rise * 1000); // Multiply by 1000 to convert seconds to milliseconds
        const sunsetDate = new Date(sun_set * 1000);

        // Format the Date objects to readable strings
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };

        const sunriseTimeString = sunriseDate.toLocaleTimeString('en-IN', options);
        const sunsetTimeString = sunsetDate.toLocaleTimeString('en-IN', options);

        //console.log(`Sunrise: ${sunriseTimeString}`);
        //console.log(`Sunset: ${sunsetTimeString}`);

        if (wid == 800) {
            //clear
            weCon.src = "clear.svg";
        }
        else if (wid > 800) {
            //cloud
            weCon.src = "cloud.svg";
        }
        else if (wid == 721) {
            //haze
            weCon.src = "haze.svg";
        }
        else if (wid == 701) {
            //mist
            weCon.src = "mist-removebg-preview.png";
        }
        else if (wid == 711) {
            //smoke
            weCon.src = "smoke-removebg-preview.png";
        }
        else if (wid == 731 && wid == 761) {
            //dust
            weCon.src = "dust-removebg-preview.png";
        }
        else if (wid == 741) {
            //fog
            weCon.src = "fog.svg";
        }
        else if (wid == 751) {
            //sand
            weCon.src = "sand-removebg-preview.png";
        }
        else if (wid == 762) {
            //ash
            weCon.src = "ash-removebg-preview.png";
        }
        else if (wid == 771) {
            //squall
            weCon.src = "squall-removebg-preview.png";
        }
        else if (wid == 781) {
            //tornado
            weCon.src = "tornado-removebg-preview.png";
        }
        else if (wid >= 600 && wid <= 622) {
            //snow
            weCon.src = "snow.svg";
        }
        else if (wid >= 500 && wid <= 531) {
            //rain
            weCon.src = "rain.svg";
        }
        else if (wid >= 200 && wid <= 232) {
            //storm
            weCon.src = "storm.svg";
        }
        else if (wid >= 300 && wid <= 321) {
            //drizzle
            weCon.src = "drizzle-removebg-preview.png";
        }
        else {
            weCon.src = "";
        }


        document.querySelector(".place").innerText = `${city1}`;
        document.querySelector(".degree").innerText = `${Math.floor(temp - 273.15)}°C`;
        document.querySelector(".w_details").innerText = `${wdetails}`;

        document.querySelector(".Feels_like").innerText = `${Math.floor(feel - 273.15)}°C`;
        document.querySelector(".Sunrise").innerText = `${sunriseTimeString}`;
        document.querySelector(".Sunset").innerText = `${sunsetTimeString}`;
        document.querySelector(".pressure").innerText = `${pressure}p`;
        document.querySelector(".Humidity").innerText = `${humidity}%`;
        document.querySelector(".Wind_speed").innerText = `${windspeed}km/h`;

        let celsius = document.querySelector(".c");
        let kelvin = document.querySelector(".k");
        let farenheit = document.querySelector(".fa");

        celsius.addEventListener("click", () =>{
            document.querySelector(".degree").innerText = `${Math.floor(temp - 273.15)}°C`;
            document.querySelector(".Feels_like").innerText = `${Math.floor(feel - 273.15)}°C`;
        })

        kelvin.addEventListener("click", ()=>{
            document.querySelector(".degree").innerText = `${Math.floor(temp)}K`;
            document.querySelector(".Feels_like").innerText = `${Math.floor(feel)}K`;
        })

        farenheit.addEventListener("click", ()=>{
            document.querySelector(".degree").innerText = `${Math.floor((temp - 273.15)*(9/5))+32}°F`;
            document.querySelector(".Feels_like").innerText = `${Math.floor((feel - 273.15)*(9/5))+32}°F`;
        })

    }
    console.log(info);
}
goBtn.addEventListener("click", () => {
    container.classList.remove("active2");
})



setInterval(() => {
    let date = new Date();
    //console.log(date);

    let hrs = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    hrs = hrs < 10 ? "0" + hrs : hrs;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let time24 = `${hrs} : ${min} : ${sec}`

    document.querySelector(".time24").innerText = time24;


}, 1000);



let timebt = document.querySelector(".timebt");
let timebtre = document.querySelector(".timebtre");
let time = document.querySelector(".time");

timebt.addEventListener("click", () => {
    time.classList.add("show");
});

timebtre.addEventListener("click", () => {
    time.classList.remove("show");
});

setInterval(() => {
    let date = new Date();
    //console.log(date);

    let hrs = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();


    let ampm = "AM"

    if (hrs >= 12) {
        hrs = hrs - 12;
        ampm = "PM"
    }

    if (hrs == 0)
        hrs = 12;

    hrs = hrs < 10 ? "0" + hrs : hrs;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    let time12 = `${hrs} : ${min} : ${sec} ${ampm}`;


    document.querySelector(".time12").innerText = time12;


}, 1000);

let d = new Date();
//console.log(date.getDate());
//console.log(date.getDay());

console.log(d);
let day = d.getDay();

if (day == 1)
    day = "Monday";
else if (day == 2)
    day = "Tuesday";
else if (day == 3)
    day = "Wednesday";
else if (day == 4)
    day = "Thursday";
else if (day == 5)
    day = "Friday";
else if (day == 6)
    day = "Saturday";
else
    day = "sunday";

console.log(day);
document.querySelector(".day").innerText = day;

let date = d.getDate();
console.log(date);
let month = d.getMonth();
if (month == 0)
    month = "Jan";
else if (month == 1)
    month = "Feb";
else if (month == 2)
    month = "Mar";
else if (month == 3)
    month = "Apr";
else if (month == 4)
    month = "May";
else if (month == 5)
    month = "Jun";
else if (month == 6)
    month = "Jul";
else if (month == 7)
    month = "Aug";
else if (month == 8)
    month = "Sep";
else if (month == 9)
    month = "Oct";
else if (month == 10)
    month = "Nov";
else
    month = "Dec";
console.log(month);
let year = d.getFullYear();
console.log(year);

fullDay = `${date} ${month} ${year}`;
console.log(fullDay)
document.querySelector(".date").innerText = fullDay;


