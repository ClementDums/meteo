import Position from "./Position";
const addFav = {
    el: document.querySelector("#fav"),
    favList: [],
    init() {
        for (let key in localStorage){
            console.log(key)
        }
    },
    addItem(e) {
        let test = -1;//valeur par défaut
        test = this.favList.indexOf(e);
        if (test === -1) {//si pas déja en favoris
            this.favList.push(e);
            localStorage.setItem('city'+e, e);
            let newItem = new ListFav();
            newItem.build(e);
            this.el.querySelector('.fav-list').appendChild(newItem.el);

        }
    },
    deleteItem(e){
        this.favList.forEach((value, index) => {
            if(value === e){
                this.favList.splice(index, 1);
            }
        });
    }
}

class ListFav {
    init(el, address){
        this.address = address;
        this.el = el;//recuperation de l'élément du dom
        this.el.querySelector('.delete-item').addEventListener('click', () => this.remove());
        this.el.addEventListener('click', () => this.setHome());

    }
    build(e) {
        this.el = document.createElement('li');
        let container = document.createElement('div');
        let p = document.createElement('p');
        let remove = document.createElement('span');
        remove.classList.add('delete-item');
        p.innerHTML = e;
        container.appendChild(p);
        container.appendChild(remove);
        this.el.appendChild(container);

        this.init(this.el, e);

    }
    remove(){
        this.el.parentNode.removeChild(this.el);
        addFav.deleteItem(this.address);
        localStorage.removeItem('city'+this.address);
        delete this;
    }
    setHome(){
        Position.dispatchAddress(this.address);
    }
}

export default addFav;

