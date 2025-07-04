
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



const humburger = document.querySelector(".humburger");
const navComponent = document.querySelector("nav");

let display = JSON.parse(localStorage.getItem('display')) || "none";
navComponent.style.display = display;

humburger.addEventListener('click', ()=>{

    if(navComponent.style.display === "none"){
        navComponent.style.display = "flex";
    }else{
        navComponent.style.display = "none";
    }

    display = navComponent.style.display;

    localStorage.setItem('display', JSON.stringify(display));

});