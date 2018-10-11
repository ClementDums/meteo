import Position from "./Position";
import addFav from "./addFav";

const meteoKey = '774e096c1c894c02b0a95400180210';
const EVENT_MANAGER = document.createElement('div');
const SearchCity = {
    el: document.querySelector('#search'),
    init() {
        this.form = this.el.querySelector('form');
        this.city = this.el.querySelector('.search-city');
        this.form.addEventListener('submit', (event) => this.newAddress(event));
        this.city.addEventListener('keyup', (event) => this.completeAutoQuery(event));
        EVENT_MANAGER.addEventListener('completeAutoFill', (event) => this.completeAutoFill(event));
        this.el.querySelector('.addfav').addEventListener('click', () => addFav.addItem(this.el.querySelector('.search-city').value));
    },
    completeAutoQuery(e) {
        let input = e.target.value;
        let itemsList = this.el.querySelector('#itemsList');
        let min_char = 0; //nombre de lettres minimum avant autocompletion
        if (input.length < min_char) {
            return;
        } else {
            itemsList.innerHTML = "";
            const axios = require('axios');
            axios.get('http://api.apixu.com/v1/search.json', {
                params: {
                    q: input,
                    key: meteoKey
                }
            })
                .then(function (response) {
                    response.data.forEach((item) => {
                        let option = document.createElement('option');
                        option.value = item.name;
                        itemsList.appendChild(option);
                    })
                })
        }
    },

    newAddress(e) {
        e.preventDefault();
        let input = e.target.querySelector('.search-city');
        Position.sendAddressSearch(input.value);
    },


}

export default SearchCity;