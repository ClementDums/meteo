import Vue from 'vue';
import Appvue from './App.vue';
import App from './App.js';

const EVENT_MANAGER = document.createElement('div');
const meteoKey = '774e096c1c894c02b0a95400180210';

App.initApp();

//Renvoyer la météo actuelle en fonction de la ville
const currentMeteo = {
    init() {
        EVENT_MANAGER.addEventListener('setMeteo', (event) => this.setMeteo(event));
    },
    setMeteo(e) {
        const address = e.detail;
        const axios = require('axios');
        axios.get('http://api.apixu.com/v1/current.json', {
            params: {
                key: meteoKey,
                q: address
            }
        })
            .then(function (response) {
                EVENT_MANAGER.dispatchEvent(new CustomEvent('displayMeteo', {detail: response.data.current}));
            })
    }
}

const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition((location) => {
        const myLocation = {
            lat: location.coords.latitude,
            lon: location.coords.longitude
        };
        getAddress.init(myLocation);
    });
}

const getAddress = {
    location: {},
    init(location) {
        this.location = location;
        this.searchLocation();
    },

    searchLocation() {
        const axios = require('axios');
        axios.get('https://nominatim.openstreetmap.org/reverse?format=json', {
            params: {
                lat: this.location.lat,
                lon: this.location.lon
            }
        })
            .then(function (response) {
                //si il y a quartier
                let cityAddress;
                if (response.data.address.city_district) {
                    cityAddress = response.data.address.city_district;
                    fillAddress(cityAddress);
                    EVENT_MANAGER.dispatchEvent(new CustomEvent('setMeteo', {detail: cityAddress}));
                    //sinon on prend la ville
                } else {
                    cityAddress = response.data.address.city;
                    fillAddress(cityAddress);
                    EVENT_MANAGER.dispatchEvent(new CustomEvent('setMeteo', {detail: cityAddress}));
                }

            })
    }
}

const fillAddress = (address) => {
    let el = document.querySelector('.meteoSection');
    el.querySelector('p').innerHTML = address;
}

getMyLocation();
currentMeteo.init();