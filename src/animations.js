import TweenLite from "gsap/TweenLite";
import TweenMax from "gsap/TweenMax";
const animations ={
    init(){
        let addFav= document.querySelector('.addfav');
        let addFavText= document.querySelector('.addfavText');
        addFav.addEventListener('mouseenter', () => {
            TweenMax.staggerTo([addFavText], 0.25,{transform:'translate3D(0,7px,0)', opacity:1}, 0.25);
        })
        addFav.addEventListener('mouseleave', () => {
            TweenMax.staggerTo([addFavText], 0.25,{transform:'translate3D(0,-7px,0)', opacity:0}, 0.25);
        })
    },

}

export default animations;