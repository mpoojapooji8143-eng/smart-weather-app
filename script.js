const apiKey="d786316630c5d4e5a09d72a0ae43903e";

function getWeather(){

let city=document.getElementById("cityInput").value.trim();

if(city===""){
alert("Enter city name");
return;
}

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

.then(res=>res.json())

.then(data=>{

if(data.cod!==200){

document.getElementById("weatherResult").innerHTML="City not found";

return;

}

showWeather(data);

});

}

function getLocationWeather(){

navigator.geolocation.getCurrentPosition(pos=>{

let lat=pos.coords.latitude;

let lon=pos.coords.longitude;

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)

.then(res=>res.json())

.then(data=>showWeather(data));

});

}

function showWeather(data){

let city=data.name;

let temp=data.main.temp;

let desc=data.weather[0].description;

let icon=data.weather[0].icon;

let humidity=data.main.humidity;

let wind=data.wind.speed;

let main=data.weather[0].main;

changeBackground(main,icon);

document.getElementById("weatherResult").innerHTML=

`<h2>${city}</h2>

<img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@4x.png">

<div class="temp">${temp}°C</div>

<p>${desc}</p>

<p>💧 Humidity : ${humidity}%</p>

<p>🌬 Wind : ${wind} m/s</p>`;

}

function changeBackground(weather,icon){

let body=document.getElementById("body");

/* NIGHT */

if(icon.includes("n")){

body.style.backgroundImage="url('images/night.jpeg')";

}

/* RAIN */

else if(weather==="Rain"){

body.style.backgroundImage="url('images/rain.jpg')";

}

/* CLOUDS */

else if(weather==="Clouds"){

body.style.backgroundImage="url('images/clouds.jpeg')";

}

/* SUNNY */

else{

body.style.backgroundImage="url('images/sunny.jpeg')";

}

}

document.getElementById("cityInput").addEventListener("keypress",function(e){

if(e.key==="Enter"){

getWeather();

}

});