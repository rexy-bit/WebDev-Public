let etud = JSON.parse(localStorage.getItem('etud')) || [{
    code : '0',
    nom : 'Mourad',
    prenom : 'Hemsi',
    annee : 'L1',
    moy : '13.7'
}];


displayEtud();

function displayEtud(){

    let etudHtml = '';

    for(let i = 0;i<etud.length;i++){

        let html = `
        
         <div class="etudiant">
             <p class="code">${etud[i].code}</p>
             <p class="nom">${etud[i].nom}</p>
             <p class="prenom">${etud[i].prenom}</p>
               <p class="annee">${etud[i].annee}</p>
                 <p class="moyenne">${etud[i].moy}</p>

                 <button class="delete-button" onclick="
                    etud.splice(${i}, 1);
                    displayEtud();
                 ">
                    Delete
                 </button>
         </div>
        `;

        etudHtml += html;
    }

    document.querySelector(".display-content").innerHTML = etudHtml;
    localStorage.setItem('etud', JSON.stringify(etud));

}

const addButton = document.querySelector(".add-button");
addButton.addEventListener('click', ()=>{
    addEtud();
});
function addEtud(){

    let codeInput = document.querySelector(".input-code");
    let inputNom = document.querySelector(".input-nom");
    let inputPrenom = document.querySelector(".input-prenom");
    let inputAnnee = document.querySelector(".input-annee");
    let inputMoy = document.querySelector(".input-moy");

    let code = codeInput.value;
    let nom = inputNom.value;
    let prenom = inputPrenom.value;
    let annee = inputAnnee.value;
    let moy = inputMoy.value;

    let trouve = false;
    let i = 0;

    while(i<etud.length && (!trouve)){
        if(etud[i].code === code){
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve ){
        document.querySelector(".display-error-message").innerHTML = 'Le code que vous avez choisit existe deja veillez en choisir un autre';
    }else if(code === '' || nom === '' || prenom === '' || annee === ''|| moy === ''){
        document.querySelector(".display-error-message").innerHTML = 'Please make sure you entered all the student\'s information';

    }else if(isNaN(moy)){

        document.querySelector(".display-error-message").innerHTML = 'La moyenne doit etre un nombre !';
    
     }else if(moy < 0 || moy > 20){
        document.querySelector(".display-error-message").innerHTML  = 'La moyenne que vous avez entree n\'est pas valide [0, 20] !';
    }else{

        document.querySelector(".display-error-message").innerHTML  = '';

        etud.push({
            code,
            nom,
            prenom,
            annee,
            moy
        });

        displayEtud();
        
        inputAnnee.value = '';
        inputMoy.value = '';
        inputPrenom.value = '';
        inputNom.value = '';
        codeInput.value = '';

        document.querySelector(".display-success-message").innerHTML = 'Ajout fait avec succes';

        setTimeout(()=>{
            document.querySelector(".display-success-message").innerHTML = '';
        }, 5000);

    }
    

}

function calculateMoy(){
    let moy;
    let S = 0;
    let cpt = 0;
    for(let i = 0;i<etud.length;i++){
        S += Number(etud[i].moy);
        cpt++;
    }

    moy = S/cpt;

    return moy.toFixed(2);
}

function displayMoy(){
    let moy = calculateMoy();
   if(moy === NaN){
    document.querySelector(".display-moy-error").innerHTML = 'Error !';
   }else{
      document.querySelector(".display-moy").innerHTML = `${moy}`;

      setTimeout(()=>{
        document.querySelector(".display-moy").innerHTML = '';
      }, 5000);

   }
    
}

const moyButton = document.querySelector(".moy-button");

moyButton.addEventListener('click', ()=>{
    displayMoy();
});


function findMax(){

    let max = etud[0];

    for(let i = 1;i<etud.length;i++){
        if(Number(max.moy) < Number(etud[i].moy)){
           max = etud[i];
        }
    }

    return max;

}

function displayMax(){

    let max = findMax();
    if(isNaN(max)){

        
        document.querySelector(".display-max-code").innerHTML = `${max.code}`;
        document.querySelector(".display-max-nom").innerHTML = `${max.nom}`;
        document.querySelector(".display-max-prenom").innerHTML = `${max.prenom}`;
        document.querySelector(".display-max-annee").innerHTML = `${max.annee}`;
        document.querySelector(".display-max-moy").innerHTML = `${max.moy}`;


        setTimeout(()=>{
                    document.querySelector(".display-max-code").innerHTML = '';
        document.querySelector(".display-max-nom").innerHTML = '';
        document.querySelector(".display-max-prenom").innerHTML = '';
        document.querySelector(".display-max-annee").innerHTML = '';
        document.querySelector(".display-max-moy").innerHTML = '';
        }, 5000);
    }
}

const maxButton = document.querySelector(".display-max-button");

maxButton.addEventListener('click', ()=>{
    displayMax();
});

function findMin(){

    let min = etud[0];

    for(let i = 1;i<etud.length;i++){
        if(Number(min.moy) > Number(etud[i].moy)){
            min = etud[i];
        }
    }

    return min;
}

function displayMin(){

    let min = findMin();

    if(isNaN(min)){
        document.querySelector(".display-min-code").innerHTML = `${min.code}`;
        document.querySelector(".display-min-nom").innerHTML = `${min.nom}`;
        document.querySelector(".display-min-prenom").innerHTML = `${min.prenom}`;
        document.querySelector(".display-min-annee").innerHTML = `${min.annee}`;
        document.querySelector(".display-min-moy").innerHTML = `${min.moy}`;


        setTimeout(()=>{
             document.querySelector(".display-min-code").innerHTML = '';
        document.querySelector(".display-min-nom").innerHTML = '';
        document.querySelector(".display-min-prenom").innerHTML = '';
        document.querySelector(".display-min-annee").innerHTML = '';
        document.querySelector(".display-min-moy").innerHTML ='';
        }, 5000);

    }
}

const minButton =  document.querySelector(".display-min-button");

minButton.addEventListener('click', ()=>{
    displayMin();
});

function displayTri(){

    let triHtml = '';


    let objectEtud;

    for(let i = 0;i<etud.length - 1;i++){
        for(let j = i+1;j<etud.length;j++){
            if(Number(etud[i].moy) > Number(etud[j].moy)){
                objectEtud = etud[i];
                etud[i] = etud[j];
                etud[j] = objectEtud;
            }
        }
    }

    for(let i = 0;i<etud.length;i++){

        let html = `
            <div class="etudiant">
             <p class="code">${etud[i].code}</p>
             <p class="nom">${etud[i].nom}</p>
             <p class="prenom">${etud[i].prenom}</p>
               <p class="annee">${etud[i].annee}</p>
                 <p class="moyenne">${etud[i].moy}</p>

                
         </div>
        `;

        triHtml += html;
    }

    document.querySelector(".tri-content").innerHTML = triHtml;
}

let triButton = document.querySelector(".tri-button");

triButton.addEventListener('click', ()=>{
    displayTri();
});