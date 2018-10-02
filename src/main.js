import Vue from 'vue';
import App from './App.vue';


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
    address : '',
    init(location) {
        this.location = location;
        this.searchLocation();
    },

    searchLocation() {
        const axios = require('axios');
        console.log(this.location.lat);
        console.log(this.location.lon);
        axios.get('https://nominatim.openstreetmap.org/reverse?format=json', {
            params: {
                lat: this.location.lat,
                lon: this.location.lon
            }
        })
            .then(function (response) {
                this.address=response.data.address.city_district;
            })
    }
}


getMyLocation();