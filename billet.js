let billet = JSON.parse(localStorage.getItem('billet')) || [
    {
        nom : 'Rezgui',
        prenom : 'Yanis',
        numero : 0,
        prix : 12000

    }
];

dispBillet();


function dispBillet(){


  /*
    let billetHtml = '';

    for(let i = 0;i<billet.length;i++){

    let html = `
    
       <div class="billet">
          <p classs="nom">
             ${billet[i].nom}
          </p>

          <p class="prenom">${billet[i].prenom}</p>
          <p class="numero">${billet[i].numero}</p>
          <p class="prix">${billet[i].prix}</p>

          <button class="delete-button" onclick="
             billet.splice(${i}, 1);
             dispBillet();
          ">
             Supprimer
          </button>
       </div>
    
    `;

    billetHtml += html;

    }

    document.querySelector(".display-content").innerHTML = billetHtml;
    localStorage.setItem('billet', JSON.stringify(billet));

    */

    const container = document.querySelector(".display-content");
    container.innerHTML = '';

    for(let i = 0;i<billet.length;i++){

        const billetDiv = document.createElement("div");
        billetDiv.className = "billet";

        const nomP = document.createElement("p");
        nomP.className = "nom";
        nomP.textContent = billet[i].nom;

        const prenomP = document.createElement("p");
        prenomP.className = "prenom";
        prenomP.textContent = billet[i].prenom;

        const numeroP = document.createElement("p");
        numeroP.className = "numero";
        numeroP.textContent = billet[i].numero;

        const prixP = document.createElement("p");
        prixP.className = "prix";
        prixP.textContent = billet[i].prix;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener('click', ()=>{
            billet.splice(i, 1);
            dispBillet();
        });

        billetDiv.appendChild(nomP);
        billetDiv.appendChild(prenomP);
        billetDiv.appendChild(numeroP);
        billetDiv.appendChild(prixP);
        billetDiv.appendChild(deleteButton);

        container.appendChild(billetDiv);
    }

    localStorage.setItem('billet', JSON.stringify(billet));
}

function addBillet(){

    let nomInput = document.querySelector(".input-nom");
    let prenomInput = document.querySelector(".input-prenom");
    let numeroInput = document.querySelector(".input-numero");
    let prixInput = document.querySelector(".input-prix");

    let nom = nomInput.value;
    let prenom = prenomInput.value;
    let numero = numeroInput.value;
    let prix = prixInput.value;

    let trouve = false;
    let i = 0;

    while(i<billet.length && (!trouve)){

        if(billet[i].numero === Number(numero)){
            trouve = true;
        }else{
            i++;
        }
    }

    if(nom === '' || prenom === '' || numero === '' || prix ===''){
      document.querySelector(".display-error-message").innerHTML = 'Please enter all the necessary information';
    }else if(trouve){
        document.querySelector(".display-error-message").innerHTML = 'The number you entered already exists';
    }else if(Number(numero) < 0 ||Number(prix) < 0){
        document.querySelector(".display-error-message").innerHTML = 'Please the price and the air number must be positive';
    }else if(isNaN(prix) || isNaN(numero)){

        document.querySelector(".display-error-message").innerHTML = 'The price and the number must contain only numbers';
    }else{

        document.querySelector(".display-error-message").innerHTML = '';

        billet.push({
            nom,
            prenom,
            numero : Number(numero),
            prix : Number(prix)
        });

        dispBillet();

        document.querySelector(".display-success-message").innerHTML = 'Billet ajouter avec succes';

        setTimeout(()=>{
            document.querySelector(".display-success-message").innerHTML = '';
        }, 3000);

        nomInput.value = '';
        prenomInput.value =  '';
        numeroInput.value = '';
        prixInput.value = '';

    }

}

document.querySelector(".add-button").addEventListener('click', ()=>{
    addBillet();
});


function rechercheBillet(){

    let numeroInput = document.querySelector(".search-numero");
    let numero = numeroInput.value;

    let i =0;
    let trouve = false;

    while(i<billet.length && (!trouve)){

        if(billet[i].numero === Number(numero)){
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){
        document.querySelector(".search-result").innerHTML = 'Billet trouve';

        setTimeout(()=>{
            document.querySelector(".search-result").innerHTML = '';
        }, 3000);

        document.querySelector(".se-nom").innerHTML = `${billet[i].nom}`;
        document.querySelector(".se-prenom").innerHTML = `${billet[i].prenom}`;
        document.querySelector(".se-numero").innerHTML = `${billet[i].numero}`;
         document.querySelector(".se-prix").innerHTML = `${billet[i].prix}`;

         setTimeout(()=>{
                    document.querySelector(".se-nom").innerHTML = '';
        document.querySelector(".se-prenom").innerHTML = '';
        document.querySelector(".se-numero").innerHTML = '';
         document.querySelector(".se-prix").innerHTML = '';
         }, 5000);

         numeroInput.value = '';

    }else{
        document.querySelector(".search-result").innerHTML = 'Billet non trouve';
    }
}

document.querySelector(".search-button").addEventListener('click', ()=>{
    rechercheBillet();
});


function modifBillet(){

        let nomInput = document.querySelector(".modif-nom");
    let prenomInput = document.querySelector(".modif-prenom");
    let numeroInput = document.querySelector(".modif-numero");
    let prixInput = document.querySelector(".modif-prix");

    let nom = nomInput.value;
    let prenom = prenomInput.value;
    let numero = numeroInput.value;
    let prix = prixInput.value;

    let trouve = false;
    let i = 0;

    while(i<billet.length && (!trouve)){
        if(billet[i].numero === Number(numero)){
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){

        if(nom === '' || prenom === '' || prix === ''){
            document.querySelector(".modif-message").innerHTML = 'Please enter all the necessary information';
        }else if(Number(prix) < 0){
           document.querySelector(".modif-message").innerHTML = 'Please the price must be positive';
        }else{

            let trouve = false;
            let i = 0;

            while(i<billet.length && (!trouve)){

                if(billet[i].numero === Number(numero)){
                    trouve  = true;
                    billet[i].nom = nom;
                    billet[i].prenom = prenom;
                    billet[i].prix = Number(prix);
                }else{
                    i++;
                }
            }

            dispBillet();

            document.querySelector(".modif-message").innerHTML = 'Modification faite avec succes';

            setTimeout(()=>{
                document.querySelector(".modif-message").innerHTML = '';
            }, 3000);
        
            
        }
    }

}

document.querySelector(".modif-button").addEventListener('click', ()=>{
    modifBillet();
});