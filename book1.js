
function showPage(pageId){

    const sections = document.querySelectorAll("section");
     
     
    sections.forEach((section)=>{
        if(section.id === pageId){
            section.style.display = "flex";
            
        }else{
            section.style.display = "none";
        }

    });

}

function router(){

    const hash = window.location.hash.slice(1) || "home";
    showPage(hash);
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);


window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);



const humburger = document.querySelector(".humburger");
const nav = document.querySelector("nav");

let style = JSON.parse(localStorage.getItem('style')) || "none";

nav.style.display = style;
humburger.addEventListener('click', ()=>{

    if(nav.style.display === "none"){
        nav.style.display = "flex";
    }else{
        nav.style.display = "none";
    }

    style = nav.style.display;

    localStorage.setItem('style', JSON.stringify(style));

});

