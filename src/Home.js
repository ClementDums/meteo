const Home = {
    el:document.querySelector("#home"),
    init() {

    },
    build(){
        this.el.style.display='block';
    },
    hide(){
        this.el.style.display='none';
    }
}

export default Home;