import SearchCity from './SearchCity.js';
const Search = {
    el:document.querySelector("#search"),
    init() {
        SearchCity.init();

    },
    build(){
        this.el.style.display='block';
    },
    hide(){
        this.el.style.display='none';
    }
}

export default Search;