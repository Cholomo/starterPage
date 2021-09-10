
NASAData();

//weather fetch from API
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        const APIKey = 'b21f9cad3a877272a8f800a1f58ea3a4'
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`)
      .then(res => res.json()).then(data => {
              showWeatherData(data)
              changeWeatherIcon(data) 
              setUVIColor(data)
            })
            getWeather()
            
      });
    } 
    //show weather data from API
function showWeatherData(data){
    let {clouds, feels_like, sunset, temp, uvi, wind_speed, id} = data.current;
    let descr = data.current.weather['0'].description 
    var weatherinnerHTML = document.getElementById("weather").innerHTML = 
    `
    <div id = "clouds">
    <div id="temp">Temperature: </div>
    <div>${temp}</div>
    <div id="feels_like">Feels like: </div> 
    <div>${feels_like}</div>
    <div>UVI:</div>
    <div id ="uvi">${uvi}</div>
    <div id="description">Weather condition:</div>
    <div>${descr}<img  id="weather-icon"></div> 
    </div>`
}
//Change font color for uvi
function setUVIColor(data){
var colorUVI; 
let uvi= data.current.uvi
var setColorUVI = document.getElementById("uvi");

if(uvi<2){
    ColorUVI = "green"
}else if(uvi>3 && uvi<=5){
    ColorUVI = "yellow"
}else if(uvi>6 && uvi <= 7){
    colorUVI = "orange"
}else if( uvi>8 && uvi <=10){
    colorUVI = "red"
}else if(uvi>=11){
    colorUVI = "purple"
}
setColorUVI.style.color = colorUVI
 
 
}
//Change background depending on weather
function changeWeatherIcon(data){
    let idDesc = data.current.weather['0'].id 

    //getting system time
    let date = new Date();
    var hour = date.getHours()
    //getting sunrise time
    let sunriseUNIX =  data.current.sunrise
    let sunrise = new Date(sunriseUNIX*1000).getHours();
    
    //getting sunset time
    let sunsetUNIX =  data.current.sunset;
    let sunset = new Date(sunsetUNIX*1000).getHours();
    
    //setting letter for icon
    var letter;
    if(hour > sunrise && hour < sunset){
         letter = "d";
    }
    else if(hour < sunrise && hour > sunset){
         letter = "n";
    }
//setting image code
var icon;
if(idDesc >= 200 && idDesc <= 232){
    icon = "11d"
}
else if(idDesc >= 300 && idDesc <= 321){
    icon = "09d"
}
else if(idDesc >= 500 && idDesc <= 504){
    icon="10d"
}else if(idDesc >= 520 && idDesc <= 531){
    icon = "09d"
}else if(idDesc >= 600 && idDesc <= 622){
    icon = "13d"
}else if(idDesc >= 700 && idDesc <= 781){
    icon = "50d"
}
else{
   switch(idDesc){
        case 501:
            icon = "13d" 
            break;
        case 800:
            icon= `01${letter}`
            break;
        case 801:
            icon = `02${letter}`
            break;
        case 802:
             icon = `03${letter}`
            break;
        case 803:
        case 804:
            icon = `04${letter}`
            break;
   }        
    
   }
    var weatherIcon = document.getElementById("weather-icon").src = 
    `http://openweathermap.org/img/wn/${icon}@2x.png`
}

//Código para el reloj
setInterval(showTime, 1000)
function showTime(){
    let time = new Date();
    let hour = time.getHours()
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm= "AM"
    //you can also substract 12 to have a 12hr style
    if(hour > 12){
        am_pm = "PM"
    }
    if(hour == 0){
        am_pm= "AM"
    }
    //to add the 0 at the beginning of the time, e.x: 03:09
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
//adding to html
    let currentTime = hour + ":" + min + ":" + sec + am_pm
    document.getElementById("clock").innerHTML = currentTime;

}
showTime();

//Código para el background

async function NASAData(){
    let NASA_KEY = "e5x6eg2mRPlwSw9hVezu4P2pCBFzJvVH5YJTYmSs"
    var response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`);
    var responseJSON = await response.json();
    console.log(responseJSON.url)
    setBackground(responseJSON)
}

function setBackground(data){
    //document.getElementById("NASA").innerHTML = `<img id="NASAImg" src = "${data.url}">`
    document.body.style.backgroundImage = `url("${data.url}")`
}


