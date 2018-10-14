import Forecast from "./Forecast";
import CurrentMeteo from "./CurrentMeteo";

/****RENVOIE L'ADDRESSE ACTUELLE A CURRENT METEO ET FORECAST****/
const EVENT_MANAGER = document.createElement('div');
const meteoKey = '8bc2895294024765b5181112181010';
const Position = {
    init() {
        EVENT_MANAGER.addEventListener('sendAddress', (event) => this.sendAddress(event));
        this.getMyLocation();
        CurrentMeteo.init();
        Forecast.init();
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
                EVENT_MANAGER.dispatchEvent(new CustomEvent('sendAddress', {detail: response}));
            })
    },
    sendAddress(response) {
        response=response.detail.data.address;
        if (response.city_district) {
            this.dispatchAddress(response.city_district);
        } else if (response.city) {
            this.dispatchAddress(response.city);
        } else if (response.village) {
            this.dispatchAddress(response.village);
        }
    },
    dispatchAddress(address){
        CurrentMeteo.getAddress(address);
        Forecast.MeteoRequest(address);
    },

    sendAddressSearch(response){
        CurrentMeteo.getAddress(response);
        Forecast.MeteoRequest(response);
    }
}

export default Position;