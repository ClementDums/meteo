import Position from './Position.js';

const Home = {
    el:document.querySelector("#home"),
    init() {
        Position.init();
    },
    build(){
        this.el.style.display='block';
    },
    hide(){
        this.el.style.display='none';
    }
}

export default Home;