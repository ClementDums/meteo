const addFav = {
    el:document.querySelector("#fav"),
    favList:[],
    init(){

    },
    setFav(e){
        let test = -1;
        test = this.favList.indexOf(e);
        if(test === -1){
            this.favList.push(e);

        }

        console.log(this.favList);
    },
    addItem(e){
        let newItem = new ListFav();
        newItem.build(e.detail);
        this.el.appendChild(newItem.el);
        console.log(newItem);
    },
}

class ListFav{

    build(){
        this.el = document.createElement('article');
    }
}

export default addFav;