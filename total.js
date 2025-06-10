
function dispTotal(){

    let total = 0;

    let nom = (document.querySelector(".total-nom")).value;
    let prenom = (document.querySelector(".total-prenom")).value;

    for(let i = 0;i<com.length;i++){

        if((nom.toLowerCase() === com[i].nom.toLowerCase()) && (prenom.toLowerCase() === com[i].prenom.toLowerCase())){
              
            total += com[i].prix*com[i].quantite;
        }
    }

    document.querySelector(".total").innerHTML = `${total} Da`;
}

document.querySelector(".total-button").addEventListener('click', ()=>{
    dispTotal();
});