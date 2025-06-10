let com = JSON.parse(localStorage.getItem('com')) || [{
    nom :  'Rezgui',
    prenom : 'Yanis',
    nbrCom : 1,
    quantite : 2,
    prix  : 0
}];

displayCom();
function displayCom(){

    let comHtml = '';

    for(let i = 0;i<com.length;i++){

        let html = `
        
          <div class="monPlat">
             <p class="nom">
                ${com[i].nom}
             </p>

             <p class="prenom">${com[i].prenom}</p>
             <p class="numero">${com[i].nbrCom}</p>
             <p class="quantite">${com[i].quantite}</p>

             <button class="delete-button"  onclick="
                 com.splice(${i}, 1);
                 displayCom();
             ">
                Delete
             </button>
          </div>
        `;

        comHtml += html;
    }

    document.querySelector(".display-content").innerHTML = comHtml;
    localStorage.setItem('com', JSON.stringify(com));
}
function commander(){

    let nomInput = document.querySelector(".input-nom");
    let prenomInput = document.querySelector(".input-prenom");
    let nbrInput = document.querySelector(".input-commande");
    let quantiteInput = document.querySelector(".input-quantite");

    let nom = nomInput.value;
    let prenom = prenomInput.value;
    let nbrCom = nbrInput.value;
    let quantite = quantiteInput.value;

    if(nom === '' || prenom === '' || nbrCom === '' || quantite ===''){
        document.querySelector(".display-error-message").innerHTML = 'Please enter all the necessary information';
    }else if(isNaN(nbrCom) || isNaN(quantite)){
        document.querySelector(".display-error-message").innerHTML = 'La quantite et le numero de commande doivent etre des nombres';
    }else if(nbrCom < 1 || quantite < 0|| nbrCom > 5){
      document.querySelector(".display-error-message").innerHTML = 'Les numeros de commandes doivent etre strictement positifs et les numeros de commandes ne deppassant pas les nombres de commandes disponibles dans le menu.';
    }else{

        document.querySelector(".display-error-message").innerHTML ='';
        let prix;
        switch(Number(nbrCom)){
            case 1 : 
              prix = 950;
              break;

            case 2 : 
               prix = 350;
               break;

            case 3 : 
              prix = 350;
              break;
            case 4 : 
              prix = 750;
              break;

            case 5 : 
               prix = 850;
               break;
               
        }

        com.push({
            nom,
            prenom,
            nbrCom : Number(nbrCom),
            quantite : Number(quantite),
            prix
        });

        displayCom();
        
        document.querySelector(".display-success-message").innerHTML = 'Commande added with success';

        setTimeout(()=>{
             document.querySelector(".display-success-message").innerHTML = '';
        }, 3000);

        nomInput.value = '';
        prenomInput.value = '';
        nbrInput.value = '';
        quantiteInput.value = '';
    }


    
}

document.querySelector(".commande-button").addEventListener('click', ()=>{
    commander();
});