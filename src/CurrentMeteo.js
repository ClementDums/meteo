var moment = require('moment');
moment.locale('fr');
const EVENT_MANAGER = document.createElement('div');
const meteoKey = '774e096c1c894c02b0a95400180210';

//Renvoyer la météo actuelle en fonction de la ville
const CurrentMeteo = {
    el: document.querySelector('.current-meteo'),
    init() {
        this.getMyLocation();
        EVENT_MANAGER.addEventListener('setMeteo', (event) => this.setMeteo(event));
        EVENT_MANAGER.addEventListener('fillAddress', (event) => this.fillAddress(event));
        EVENT_MANAGER.addEventListener('displayMeteo', (event) => this.displayMeteo(event));
    },
    getMyLocation() {
        navigator.geolocation.getCurrentPosition((location) => {
            const myLocation = {
                lat: location.coords.latitude,
                lon: location.coords.longitude
            };
            this.getAddress(myLocation);
        });
    },
    getAddress(location) {
        const axios = require('axios');
        axios.get('https://nominatim.openstreetmap.org/reverse?format=json', {
            params: {
                lat: location.lat,
                lon: location.lon
            }
        })
            .then(function (response) {
                EVENT_MANAGER.dispatchEvent(new CustomEvent('fillAddress', {detail: response}));
            })
    },
    fillAddress(response) {
        let cityAddress;

        if (response.detail.data.address.city_district) {
            cityAddress = response.detail.data.address.city_district;
            this.el.querySelector('.address').innerHTML = cityAddress;
            this.el.querySelector('.date').innerHTML = moment().format('dddd Do MMMM');
            EVENT_MANAGER.dispatchEvent(new CustomEvent('setMeteo', {detail: cityAddress}));
        }
        else {
            cityAddress = response.detail.data.address.city;
            this.el.querySelector('.address').innerHTML = cityAddress;
            this.el.querySelector('.date').innerHTML = new Date;
            EVENT_MANAGER.dispatchEvent(new CustomEvent('setMeteo', {detail: cityAddress}));
        }
    },

    setMeteo(e) {
        const address = e.detail;
        const axios = require('axios');
        axios.get('http://api.apixu.com/v1/current.json', {
            params: {
                key: meteoKey,
                q: address,
                lang: 'fr'
            }
        })
            .then(function (response) {
                EVENT_MANAGER.dispatchEvent(new CustomEvent('displayMeteo', {detail: response.data.current}));
            })
    },
    displayMeteo(response){
        console.log(response.detail);
        this.el.querySelector('.weather').innerHTML = response.detail.condition.text;
        this.el.querySelector('.temp').innerHTML = response.detail.temp_c+'°C';
        this.el.querySelector('.wind').innerHTML = response.detail.wind_kph+' km';
        this.el.querySelector('.humidity').innerHTML = response.detail.humidity+'%';

    }
}

export default CurrentMeteo;