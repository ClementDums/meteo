/****MISE EN PLACE PRÉVISIONS MÉTÉO****/
const EVENT_MANAGER = document.createElement('div');
const meteoKey = '774e096c1c894c02b0a95400180210';
var moment = require('moment');
moment.locale('fr');
const Forecast = {
    el: document.querySelector('.forecast-list'),
    init() {
        EVENT_MANAGER.addEventListener('setMeteo', (event) => this.setMeteo(event));
    },
    MeteoRequest(e) {
        const address = e;
        const daysNb = 7;// nombre de jours en prévision a afficher en comptant aujourd'hui
        let i = 0;
        const axios = require('axios');
        axios.get('http://api.apixu.com/v1/forecast.json?', {
            params: {
                key: meteoKey,
                q: address,
                lang: 'fr',
                days: daysNb
            }
        })
            .then(function (response) {
                EVENT_MANAGER.dispatchEvent(new CustomEvent('setMeteo', {detail: response.data.forecast}));
            })


    },
    setMeteo(e) {

        this.removeForecast();
        let i = 1;
        let newForecast;
        for (i; i < e.detail.forecastday.length; i += 1) {
            let day = new Date();
            day = day.getDay();
            day =day+i;

            newForecast =new ForecastDay();
            newForecast.build(e.detail.forecastday[i], day)
            this.el.appendChild(newForecast.el);
        }
    },
    removeForecast(){
        let listRemove = this.el.querySelectorAll('.forecast-item');
        listRemove.forEach((value) => {
            value.parentNode.removeChild(value);
        });
    }

}

class ForecastDay {
    constructor() {
        this.el = null;
    }

    build(meteo, day) {
        const days=['Lundi','Mardi','Mercredi'];
        this.el = document.createElement('li');
        this.el.classList.add('forecast-item');

        console.log(day);
        let date =document.createElement('p');

        date.classList.add('date-fc');
        date.innerHTML =day;

        let weather =document.createElement('p');
        weather.classList.add('weather-fc');
        weather.innerHTML =meteo.day.condition.text;

        let minmax =document.createElement('p');
        minmax.classList.add('minmax-fc');
        minmax.innerHTML =meteo.day.mintemp_c+" / " + meteo.day.maxtemp_c+"°C";

        this.el.appendChild(date);
        this.el.appendChild(weather);
        this.el.appendChild(minmax);
    }
}

export default Forecast;