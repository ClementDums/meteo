import Vue from 'vue';
import App from './App.vue';

const meteoKey = '774e096c1c894c02b0a95400180210';

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
                if (response.data.address.city_district) {
                    fillAddress(response.data.address.city_district);
                    //sinon on prend la ville
                } else {
                    fillAddress(response.data.address.city);
                }

            })
    }
}

const fillAddress = (address) => {
    let el = document.querySelector('.meteoSection');
    el.querySelector('p').innerHTML = address;
}

getMyLocation();