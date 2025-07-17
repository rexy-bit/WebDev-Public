const humburger = document.querySelector(".humburger");
const nav = document.querySelector("nav");

let display = JSON.parse(localStorage.getItem('display')) || "none";

nav.style.display = display;

humburger.addEventListener("click", ()=>{

    if(nav.style.display === "none"){
        nav.style.display = "flex";
    }else{
        nav.style.display = "none";
    }

    display = nav.style.display;

    localStorage.setItem('display', JSON.stringify(display));

});



function showPage(pageId){

    let sections = document.querySelectorAll("section");

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