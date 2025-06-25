let liv = JSON.parse(localStorage.getItem('liv')) || [{
    type : 'outgoing',
    numero : 0,
    four : 'Sarpi',
    produit : 'Cables electriques',
    quantite : 10,
    statut : 'delivered'
}];



function displayLiv(){

    let container = document.querySelector(".display-content");
    container.innerHTML = '';


    liv.forEach((element, i)=>{

        const livDiv = document.createElement("div");
        livDiv.className = "delivery-div";

        const typeD = document.createElement("div");
        typeD.textContent = `- Type : ${element.type}`;

        const numberD = document.createElement("div");
        numberD.textContent = `- Number : ${element.numero}`;

        const fourD = document.createElement("div");
        fourD.textContent = `- Supplier : ${element.four}`;

        const produitD = document.createElement("div");
        produitD.textContent = `- Product : ${element.produit}`;

        const quantiteD = document.createElement("div");
        quantiteD.textContent = `- Quatity : ${element.quantite}`;

        const statutD = document.createElement("div");
        statutD.textContent = `- Status : ${element.statut}`;


        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', ()=>{
            liv.splice(i, 1);
            displayLiv();
        });

        livDiv.appendChild(typeD);
        livDiv.appendChild(numberD);
        livDiv.appendChild(fourD);
        livDiv.appendChild(produitD);
        livDiv.appendChild(quantiteD);
        livDiv.appendChild(statutD);
        livDiv.appendChild(deleteButton);

        container.appendChild(livDiv);

    });

    localStorage.setItem('liv', JSON.stringify(liv));
}


displayLiv();

let addTime;
function addLiv(){

   let typeIn = document.querySelector(".input-type");
   let numeroIn = document.querySelector(".input-numero");
   let fourIn = document.querySelector(".input-fournisseur");
   let produitIn = document.querySelector(".input-produit");
   let quantiteIn = document.querySelector(".input-quantite");
   let statutIn = document.querySelector(".input-statut");

   let type = typeIn.value;
   let numero = numeroIn.value;
   let four = fourIn.value;
   let produit = produitIn.value;
   let quantite = quantiteIn.value;
   let statut =statutIn.value;

   
   let trouve = false;
   let i = 0;

   while(i<liv.length && (!trouve)){
      if(Number(liv[i].numero) === Number(numero)){
        trouve = true;
      }else{
        i++;
      }
    }

    let msg  = document.querySelector(".add-message");
    msg.style.color = "red";

   if(trouve){
       msg.innerHTML = 'The number you chose already exists try another one';
   }else if(type === '' || numero === '' || four === '' || produit === '' || quantite === '' || statut === ''){
    msg.innerHTML = 'Please enter all the necessary information';
   }else if(isNaN(quantite) || isNaN(numero) || Number(quantite) < 0 || Number(numero) < 0){
    msg.innerHTML = 'Please the number and the quantite must be positive numbers';
   }else{

      msg.innerHTML = '';

      liv.push({
        type,
        numero : Number(numero),
        four,
        produit,
        quantite : Number(quantite),
        statut
      });

      displayLiv();
      
      msg.style.color = "green";
      msg.innerHTML = 'Delivery added with success';

      clearTimeout(addTime);
      addTime = setTimeout(()=>{
        msg.innerHTML = '';
      }, 2000);

      typeIn.value = '';
      numeroIn.value = '';
      fourIn.value = '';
      produitIn.value = '';
      quantiteIn.value = '';
      statutIn.value = '';

   }
    
}




const addButton = document.querySelector(".add-button");

addButton.addEventListener('click', ()=>{

    addButton.disabled = true;

    addLiv();

    setTimeout(()=>{
        addButton.disabled = false;
    }, 500);

});




let timeSearch;
let timeSearch1;
function searchLiv(){

    let numeroIn = document.querySelector(".search-numero");
    let numero = numeroIn.value;

    let trouve = false;

    let i = 0;

    while(i<liv.length && (!trouve)){

        if(Number(liv[i].numero) === Number(numero)){
            trouve = true;
        }else{
            i++;
        }
    }


    let msg = document.querySelector(".search-message");

    if(trouve){

        msg.style.color = "green";
        msg.innerHTML = 'Delivery found';

        clearTimeout(timeSearch);
        timeSearch = setTimeout(()=>{
            msg.innerHTML  = '';
        }, 2000);

        let container = document.querySelector(".display-search");
        container.innerHTML = '';

                const livDiv = document.createElement("div");
        livDiv.className = "delivery-div";

        const typeD = document.createElement("div");
        typeD.textContent = `- Type : ${liv[i].type}`;

        const numberD = document.createElement("div");
        numberD.textContent = `- Number : ${liv[i].numero}`;

        const fourD = document.createElement("div");
        fourD.textContent = `- Supplier : ${liv[i].four}`;

        const produitD = document.createElement("div");
        produitD.textContent = `- Product : ${liv[i].produit}`;

        const quantiteD = document.createElement("div");
        quantiteD.textContent = `- Quatity : ${liv[i].quantite}`;

        const statutD = document.createElement("div");
        statutD.textContent = `- Status : ${liv[i].statut}`;


        livDiv.appendChild(typeD);
        livDiv.appendChild(numberD);
        livDiv.appendChild(fourD);
        livDiv.appendChild(produitD);
        livDiv.appendChild(quantiteD);
        livDiv.appendChild(statutD);

        container.appendChild(livDiv);

        clearTimeout(timeSearch1);

        timeSearch1 = setTimeout(()=>{
            container.innerHTML  = '';
        }, 4000);

        numeroIn.value = '';

    }else{
        msg.style.color ="red";
        msg.innerHTML = 'Delivery not found';
    }

}


let searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', ()=>{
    searchLiv();
});



function modifLiv(){

    let typeIn = document.querySelector(".m-type");
   let numeroIn = document.querySelector(".m-numero");
   let fourIn = document.querySelector(".m-fournisseur");
   let produitIn = document.querySelector(".m-produit");
   let quantiteIn = document.querySelector(".m-quantite");
   let statutIn = document.querySelector(".m-statut");

   let type = typeIn.value;
   let numero = numeroIn.value;
   let four = fourIn.value;
   let produit = produitIn.value;
   let quantite = quantiteIn.value;
   let statut =statutIn.value;


   let trouve = false;
   let i = 0;

   const msg = document.querySelector(".modif-message");

   if(type === '' || numero === '' || four === '' || produit === '' || quantite === '' || statut === '' ){
    msg.style.color = "red";
    msg.innerHTML = 'Please enter all the necessary information';
   }else if(isNaN(quantite) || isNaN(numero) || Number(quantite) < 0 || Number(numero) < 0){
    msg.style.color = "red";
    msg.innerHTML = 'Please the number and the quantite must be positive numbers';
   }else{


        while(i<liv.length && (!trouve)){

            if(Number(liv[i].numero) === Number(numero)){
                trouve = true;

                liv[i].type = type;
                liv[i].four = four;
                liv[i].produit = produit;
                liv[i].quantite = quantite;
                liv[i].statut = statut;
                
                   displayLiv();
                msg.style.color = "green";

                msg.innerHTML = 'Modification done with success';

                setTimeout(()=>{
                    msg.innerHTML = '';
                }, 2000);

                typeIn.value = '';
                numeroIn.value = '';
                fourIn.value = '';
                produitIn.value = '';
                quantiteIn.value = '';
                statutIn.value = '';


            }else{
                i++;
            }

        }

    }

   if(!trouve){
      msg.style.color = "red";
      msg.innerHTML = 'Number not found';

   }
}


const modifButton = document.querySelector(".modif-button");

modifButton.addEventListener('click', ()=>{

    modifLiv();

});


let time1;
function displayTotal(){

    document.querySelector(".display-nbrD").innerHTML = `${liv.length}`;

    clearTimeout(time1);

    time1 = setTimeout(()=>{
        document.querySelector(".display-nbrD").innerHTML = '';
    },3000);
}


document.querySelector(".nbrD-button").addEventListener('click', ()=>{
    displayTotal();
});


function nbrOut(){


    let cpt = 0;

    liv.forEach((del)=>{
          
        if(del.type === 'outgoing'){
            cpt++;
        }
    });

    return cpt;

}

let time2;
function displayOut(){

    let nbr = nbrOut();

    document.querySelector(".display-outgoing").innerHTML = `${nbr}`;

     clearTimeout(time2);

     time2 = setTimeout(()=>{
         document.querySelector(".display-outgoing").innerHTML = '';
     }, 3000);


}


document.querySelector(".out-button").addEventListener('click', ()=>{
    displayOut();
});



function nbrIn(){

    let cpt = 0;

    liv.forEach((liv)=>{
        if(liv.type === 'incoming'){
            cpt++;
        }
    });


    return cpt;
}


let time3;
function displayIn(){


    let nbr = nbrIn();

     document.querySelector(".display-incoming").innerHTML = `${nbr}`;

     clearTimeout(time3);

     time3 = setTimeout(()=>{
        document.querySelector(".display-incoming").innerHTML = '';
     }, 3000);


}


document.querySelector(".in-button").addEventListener('click',()=>{
    displayIn();
});
