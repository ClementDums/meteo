const addFav = {
    el: document.querySelector("#fav"),
    favList: [],
    init() {

    },
    addItem(e) {
        let test = -1;
        test = this.favList.indexOf(e);
        if (test === -1) {
            this.favList.push(e);
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
    init(el){
        this.el = el;//recuperation de l'élément du dom
        this.el.querySelector('.delete-item').addEventListener('click', (event) => this.remove(event));
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

        this.init(this.el);

    }
    remove(e){
        this.el.parentNode.removeChild(this.el);
        let address = this.el.querySelector('p').innerHTML;
        addFav.deleteItem(address);
        delete this;
    }
}

export default addFav;

