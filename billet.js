let billet = JSON.parse(localStorage.getItem('billet')) || [{
    nom : 'Rezgui',
    prenom : 'Yanis',
    age : 19,
    numero : '123',
    prix : 22000
}];


displayBillet();

function displayBillet(){

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

        const ageP = document.createElement("p");
        ageP.className = "age";
        ageP.textContent = billet[i].age;

        const numeroP = document.createElement("p");
        numeroP.className = "numero";
        numeroP.textContent = billet[i].numero;

        const prixP = document.createElement("p");
        prixP.className = "prix";
        prixP.textContent = `${billet[i].prix} Da`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener('click', ()=>{
            billet.splice(i, 1);
            displayBillet();
        });

        billetDiv.appendChild(nomP);
        billetDiv.appendChild(prenomP);
        billetDiv.append(ageP);
        billetDiv.appendChild(numeroP);
        billetDiv.appendChild(prixP);
        billetDiv.append(deleteButton);

        container.appendChild(billetDiv);
    }

    localStorage.setItem('billet', JSON.stringify(billet));

}


function addBillet(){

    let nomInput = document.querySelector(".input-nom");
    let prenomInput = document.querySelector(".input-prenom");
    let ageInput = document.querySelector(".input-age");
    let numeroInput = document.querySelector(".input-numero");
    let prixInput = document.querySelector(".input-prix");

    let nom = nomInput.value;
     let prenom = prenomInput.value;
      let age = ageInput.value;
       let numero = numeroInput.value;
        let prix = prixInput.value;

    
    let trouve = false;
    let i = 0;

    while(i<billet.length && (!trouve)){

        if(billet[i].numero === numero){
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){
        document.querySelector(".display-error-message").innerHTML = 'The Flight Number enter you entered already exists';
    }else if(nom === '' || prenom === '' || age === '' || numero === '' || prix ===''){
        document.querySelector(".display-error-message").innerHTML = 'Please enter all the necessary information';
    }else if(Number(age) < 0 || Number(prix) < 0){
              document.querySelector(".display-error-message").innerHTML = 'The price and the age must be positive';
    }else if(isNaN(age) || isNaN(prix) || isNaN(numero)){
        document.querySelector(".display-error-message").innerHTML = 'Please the price,The flight number & the age must contain only numbers' ;
    }else{

              document.querySelector(".display-error-message").innerHTML = '';

              billet.push({
                nom, 
                prenom,
                age : Number(age),
                numero,
                prix : Number(prix)
              });

              displayBillet();

                    document.querySelector(".display-success-message").innerHTML = 'Ticket added with success';

                setTimeout(()=>{
                    document.querySelector(".display-success-message").innerHTML = '';
                }, 3000);

                nomInput.value = '';
                prenomInput.value = '';
                ageInput.value = '';
                numeroInput.value = '';
                prixInput.value = '';

            }


}


document.querySelector(".add-button").addEventListener('click', ()=>{
    addBillet();
});


function searchBillet(){

    let numeroInput = document.querySelector(".search-numero");
    let numero = numeroInput.value;

    let trouve = false;
    let i = 0;

    while(i<billet.length && (!trouve)){

        if(billet[i].numero === numero){
            trouve = true;

        }else{
           i++;
        }

    }

    if(!trouve){
        document.querySelector(".search-message").innerHTML = 'Flight number not found';

        setTimeout(()=>{
               document.querySelector(".search-message").innerHTML ='';
        }, 3000);

    }else{

           document.querySelector(".search-message").innerHTML = 'Flight number found !';

                   setTimeout(()=>{
               document.querySelector(".search-message").innerHTML ='';
        }, 3000);

        document.querySelector(".se-nom").innerHTML = `${billet[i].nom}`;
        document.querySelector(".se-prenom").innerHTML = `${billet[i].prenom}`;
        document.querySelector(".se-age").innerHTML = `${billet[i].age}`;
        document.querySelector(".se-numero").innerHTML = `${billet[i].numero}`;
        document.querySelector(".se-prix").innerHTML = `${billet[i].prix}`;

          numeroInput.value = '';

        setTimeout(()=>{
          document.querySelector(".se-nom").innerHTML = '';
        document.querySelector(".se-prenom").innerHTML = '';
        document.querySelector(".se-age").innerHTML = '';
        document.querySelector(".se-numero").innerHTML = '';
        document.querySelector(".se-prix").innerHTML = '';
          
        }, 5000);

    }

}

document.querySelector(".search-button").addEventListener('click', ()=>{
    searchBillet();
});



function calculateMoy(){

    let S = 0;
    let cpt = 0;
    let moy;
    
    for(let i = 0;i<billet.length;i++){
        S += billet[i].prix;
        cpt++;
    }

    if(cpt === 0){
        return 0;
    }else{
        moy = S/cpt;
    }

    return moy.toFixed(2);

}

function displayMoy(){

    let moy = calculateMoy();

    document.querySelector(".display-moy").innerHTML = `${moy} Da`;

    setTimeout(()=>{
        document.querySelector(".display-moy").innerHTML = '';
    }, 4000);

}

document.querySelector(".moy-button").addEventListener('click', ()=>{
    displayMoy();
});


function modifBillet(){

    
     let nomInput = document.querySelector(".m-nom");
    let prenomInput = document.querySelector(".m-prenom");
    let ageInput = document.querySelector(".m-age");
    let numeroInput = document.querySelector(".m-numero");
    let prixInput = document.querySelector(".m-prix");

    let nom = nomInput.value;
     let prenom = prenomInput.value;
      let age = ageInput.value;
       let numero = numeroInput.value;
        let prix = prixInput.value;

        if(nom ==='' || prenom === '' || age === '' || numero === '' || prix === ''){
            document.querySelector(".modif-message").innerHTML = 'Please enter all the information';
        }else if(isNaN(prix) || isNaN(age) || isNaN(numero)){
              document.querySelector(".modif-message").innerHTML = 'Please the price,The flight number & the age must contain only numbers' ;
        }else if(Number(prix) < 0 || Number(age) < 0){
             document.querySelector(".modif-message").innerHTML = 'Please the price and age must be positive';
        }else{

            let i = 0;
            let trouve = false;

            while(i<billet.length && (!trouve)){
                if(billet[i].numero === numero){
                    trouve = true;
                    billet[i].nom = nom;
                    billet[i].prenom = prenom;
                    billet[i].age = age;
                    billet[i].prix = prix;
                }else{
                    i++;
                }
            }

            
            if(trouve){
               
                document.querySelector(".modif-message").innerHTML = 'Modification done with success';

                displayBillet();

                setTimeout(()=>{
                      document.querySelector(".modif-message").innerHTML = '';
                }, 3000);

                nomInput.value = '';
                prenomInput.value = '';
                ageInput.value = '';
                numeroInput.value = '';
                prixInput.value = '';

            }else{

                 document.querySelector(".modif-message").innerHTML = 'Ticket not found';
            }

        }

}


document.querySelector(".modif-button").addEventListener('click', ()=>{
    modifBillet();
});


function findMin(){

    let min = billet[0];

    for(let i = 1;i<billet.length;i++){
        if(min.prix > billet[i].prix){
            min = billet[i];
        }
    }

    return min;
}

function displayMin(){

    let min = findMin();

    if(min != null){
         document.querySelector(".min-nom").innerHTML = `${min.nom}`;
          document.querySelector(".min-prenom").innerHTML = `${min.prenom}`;
           document.querySelector(".min-age").innerHTML = `${min.age}`;
            document.querySelector(".min-numero").innerHTML = `${min.numero}`;
             document.querySelector(".min-prix").innerHTML = `${min.prix}`;


             setTimeout(()=>{
                   document.querySelector(".min-nom").innerHTML = '';
          document.querySelector(".min-prenom").innerHTML = '';
           document.querySelector(".min-age").innerHTML = '';
            document.querySelector(".min-numero").innerHTML = '';
             document.querySelector(".min-prix").innerHTML = '';      

             }, 4000);

    }

}


document.querySelector(".min-button").addEventListener('click', ()=>{
    displayMin();
});

function findMax(){

    let max = billet[0];

    for(let i = 0;i<billet.length;i++){

        if(max.numero < billet[i].numero){
            max = billet[i];
        }

    }

    return max;
}

function displayMax(){

    let max = findMax();

     if(max != null){
         document.querySelector(".max-nom").innerHTML = `${max.nom}`;
          document.querySelector(".max-prenom").innerHTML = `${max.prenom}`;
           document.querySelector(".max-age").innerHTML = `${max.age}`;
            document.querySelector(".max-numero").innerHTML = `${max.numero}`;
             document.querySelector(".max-prix").innerHTML = `${max.prix}`;


             setTimeout(()=>{
                   document.querySelector(".max-nom").innerHTML = '';
          document.querySelector(".max-prenom").innerHTML = '';
           document.querySelector(".max-age").innerHTML = '';
            document.querySelector(".max-numero").innerHTML = '';
             document.querySelector(".max-prix").innerHTML = '';      

             }, 4000);

    }


}

document.querySelector(".max-button").addEventListener('click', ()=>{
    displayMax();
});



function sortBillet(){

  for(let i = 0;i<billet.length-1;i++){
    for(let j = i+1;j<billet.length;j++){
        if(billet[i].prix > billet[j].prix){
            let temp = billet[i];
            billet[i] = billet[j];
            billet[j] = temp;
        }

    }

  }

  const container = document.querySelector(".display-sort");
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

        const ageP = document.createElement("p");
        ageP.className = "age";
        ageP.textContent = billet[i].age;

        const numeroP = document.createElement("p");
        numeroP.className = "numero";
        numeroP.textContent = billet[i].numero;

        const prixP = document.createElement("p");
        prixP.className = "prix";
        prixP.textContent = `${billet[i].prix} Da`;

                billetDiv.appendChild(nomP);
        billetDiv.appendChild(prenomP);
        billetDiv.append(ageP);
        billetDiv.appendChild(numeroP);
        billetDiv.appendChild(prixP);

        container.appendChild(billetDiv);

  }

}

document.querySelector(".sort-button").addEventListener('click', ()=>{
    sortBillet();
});


