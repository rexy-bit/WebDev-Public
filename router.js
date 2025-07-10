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