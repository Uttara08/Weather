let day1 = document.getElementById('day1');
let day2 = document.getElementById('day2');
let day3 = document.getElementById('day3');
let day4 = document.getElementById('day4');
let day5 = document.getElementById('day5');


let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
setInterval(() => {
    const obj = new Date();
    const day = obj.getDay();
    day1.innerHTML = days[day];
    day2.innerHTML = days[day + 1];
    day3.innerHTML = days[day + 2];
    day4.innerHTML = days[day + 3];
    day5.innerHTML = days[day + 4];
}, 1000);

window.addEventListener("load", () => {
    var lat;
    var lon;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            let obj = new Date();
            hour = obj.getHours();
            let api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6de77d968c2ca3b338bf09fa09c4d05e`
            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    for (i = 0; i < 5; i++) {
                        const { feels_like } = data.list[i].main;
                        const { id, main } = data.list[i].weather[0]
                        document.getElementById("temp" + (i + 1)).innerHTML = Math.round(feels_like - 273) + "°C";
                        document.getElementById("desc" + (i + 1)).innerHTML = main;

                        // setting icons

                        if (id >= 200 && id <= 232) {
                            document.getElementById("icon" + (i + 1)).src = "images/thunderstorm.png";
                        }
                        else if (id >= 300 && id <= 321) {
                            document.getElementById("icon" + (i + 1)).src = "images/rain.png";
                        }
                        else if (id >= 500 && id <= 531) {
                            document.getElementById("icon" + (i + 1)).src = "images/rain.png";
                        }
                        else if (id >= 600 && id <= 622) {
                            document.getElementById("icon" + (i + 1)).src = "images/snowy.png";
                        }
                        else if (id >= 701 && id <= 781) {
                            document.getElementById("icon" + (i + 1)).src = "images/mist.png";
                        }
                        else if (id >= 801 && id <= 804) {
                            document.getElementById("icon" + (i + 1)).src = "images/cloudy.png";
                        }
                        else if (id == 800) {
                            if (hour >= 6 && hour <= 19) {
                                document.getElementById("icon" + (i + 1)).src = "images/sunny.png";
                            }
                            else {
                                document.getElementById("icon" + (i + 1)).src = "images/moon.png";
                            }
                        }
                    }
                    console.log(data);
                })
                .catch((reason) => {
                    console.log("Reason here:" + reason);
                })
        })


    }
});

