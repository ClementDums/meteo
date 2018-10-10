const addFav = {
    el:document.querySelector("#fav"),
    favList:[],
    init(){

    },
    setFav(e){
        this.favList.push(e);
        console.log(this.favList);
    }
}

export default addFav;