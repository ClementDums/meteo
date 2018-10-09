import Forecast from "./Forecast";
import CurrentMeteo from "./CurrentMeteo";

/****RENVOIE L'ADDRESSE ACTUELLE A CURRENT METEO ET FORECAST****/
const EVENT_MANAGER = document.createElement('div');
const meteoKey = '774e096c1c894c02b0a95400180210';
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
            CurrentMeteo.fillAddress(response.city_district);
            Forecast.MeteoRequest(response.city_district);
        } else if (response.city) {
            CurrentMeteo.fillAddress(response.city);
            Forecast.MeteoRequest(response.city);
        } else if (response.village) {
            CurrentMeteo.fillAddress(response.village);
            Forecast.MeteoRequest(response.village);
        }
    },
    sendAddressSearch(response){
        CurrentMeteo.fillAddress(response);
        Forecast.MeteoRequest(response);
    }
}

export default Position;