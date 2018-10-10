import Position from "./Position";
import addFav from './addFav.js';

/****MISE EN PLACE METEO ACTUELLE****/
var moment = require('moment');
moment.locale('fr');
const EVENT_MANAGER = document.createElement('div');
const meteoKey = '774e096c1c894c02b0a95400180210';

//Renvoyer la météo actuelle en fonction de la ville
const CurrentMeteo = {
    el: document.querySelector('.current-meteo'),
    currentAddress :"",
    init() {

        EVENT_MANAGER.addEventListener('sendAddress', (event) => this.setMeteo(event));
        EVENT_MANAGER.addEventListener('displayMeteo', (event) => this.displayMeteo(event));
        this.el.querySelector('.addfav').addEventListener('click', () => addFav.setFav(this.currentAddress));
    },
    fillAddress(response) {
        let cityAddress;
        cityAddress = response;
        this.el.querySelector('.address').innerHTML = cityAddress;
        EVENT_MANAGER.dispatchEvent(new CustomEvent('sendAddress', {detail: cityAddress}));
        this.currentAddress=cityAddress;
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
            .catch(error => {
                if(error.response.status ===400 ){
                    console.log('Non trouvé');
                }
        });
    },
    displayMeteo(response) {
        this.el.querySelector('.weather').innerHTML = response.detail.condition.text;
        let myClass=response.detail.condition.text.replace(/\s/g, '');
        myClass = myClass.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        myClass = myClass.toLowerCase();

        this.el.querySelector('#weather-img').className='';
        this.el.querySelector('#weather-img').classList.add(myClass);


        this.el.querySelector('.temp').innerHTML = response.detail.temp_c;
        this.el.querySelector('.date').innerHTML = moment().format('dddd Do MMMM');
        this.el.querySelector('.wind').innerHTML = response.detail.wind_kph + ' km/h';
        this.el.querySelector('.humidity').innerHTML = response.detail.humidity + '%';

    }
}

export default CurrentMeteo;