import Home from './Home.js';
import Search from './Search.js';
import Fav from './Fav.js';

//ROUTING
const App = {
    nav: [{
        name: 'home',
        url: '#home',
        component: Home
    }, {
        name: 'search',
        url: '#search',
        component: Search
    }, {
        name: 'fav',
        url: '#fav',
        component: Fav
    }
    ],
    initApp() {
        /*******A l'arrivée sur la page**********/
        Home.init();
        Search.init();
        Fav.init();
        let currentPage =location.hash;
        let i =0;
        var pageFound = false;
        for(i;i<this.nav.length;i+=1){
            if(this.nav[i].url===currentPage){
                document.querySelector('.'+this.nav[i].name+'-nav').classList.add('active');
                this.nav[i].component.build();
                pageFound=true;
            }
        }
        //si url != page existante : redirect page home
        if(!pageFound){
            location.hash= "#home";
            this.nav[0].component.build();
        }

        window.addEventListener("hashchange", () => this.changeDisplay());
    },
    /*******Au changement de page**********/
    changeDisplay() {
        document.querySelector('.valid').classList.remove('active');
        document.querySelector('.valid-fav').classList.remove('active');
        this.nav.forEach(function (item) {
            item.component.hide();
        });
        let i = 0;
        var pageFound=false;
        for (i; i < this.nav.length; i += 1) {
            document.querySelector('.'+this.nav[i].name+'-nav').classList.remove('active');
            if (this.nav[i].url === location.hash) {
                this.nav[i].component.build();
                document.querySelector('.'+this.nav[i].name+'-nav').classList.add('active');
                pageFound=true;
            }
        }
        if(!pageFound){
            location.hash="#home";
            this.nav[0].component.build()
        }
    }
}
export default App;