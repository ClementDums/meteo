import CurrentMeteo from './CurrentMeteo.js';

const Home = {
    el:document.querySelector("#home"),
    init() {
        CurrentMeteo.init();
    },
    build(){
        this.el.style.display='block';
    },
    hide(){
        this.el.style.display='none';
    }
}

export default Home;