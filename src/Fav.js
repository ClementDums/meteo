const Fav = {
    el:document.querySelector("#fav"),
    init() {

    },
    build(){
        this.el.style.display='block';
    },
    hide(){
        this.el.style.display='none';
    }
}

export default Fav;