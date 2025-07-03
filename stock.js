const humburger = document.querySelector(".humburger");
const nav = document.querySelector("nav");

let display = JSON.parse(localStorage.getItem('display')) || 'none';
nav.style.display = display;


humburger.addEventListener('click', ()=>{

    if(nav.style.display === 'none'){
        nav.style.display = 'flex';
    }else{
        nav.style.display = 'none';
    }

    display = nav.style.display;

    localStorage.setItem('display', JSON.stringify(display));

});


let stock = JSON.parse(localStorage.getItem('stock')) || [
    {
        code : '0',
        nom : 'Pc',
        quantite : 3,
        prix : 45000
    },{
        code : '1',
        nom : 'Bureau',
        quantite : 1,
        prix : 89000
    }
];


function displayStock(){

     const container = document.querySelector(".display-content");
     container.innerHTML = '';
 
    stock.forEach((product, i)=>{

        const stockDiv = document.createElement("div");
        stockDiv.className = "stock-div";
        stockDiv.innerHTML = `
            <div>- Code : ${product.code}</div>
            <div>- Name : ${product.nom}</div>
            <div>- Quantity : ${product.quantite}</div>
            <div>- Unit price : ${product.prix}</div>  
        `;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', ()=>{
            stock.splice(i, 1);
            displayStock();
        });
        
 
        stockDiv.appendChild(deleteButton);
        container.appendChild(stockDiv);
        

    });

    localStorage.setItem('stock', JSON.stringify(stock));

}

displayStock();


let addMsgTimeout;
function addStock(){


    let codeIn = document.querySelector(".input-code");
    let nomIn = document.querySelector(".input-nom");
    let quantiteIn = document.querySelector(".input-quantite");
    let prixIn = document.querySelector(".input-prix");

    let code = codeIn.value;
    let nom = nomIn.value;
    let quantite = quantiteIn.value;
    let prix = prixIn.value;

    let trouve = false;
    let i = 0;
    
    while(i<stock.length && (!trouve)){
        if(stock[i].code === code){
            trouve = true;
        }else{
            i++;
        }
    }

    const addMsg = document.querySelector(".add-msg");
    addMsg.style.color = "red";

    if(trouve){

        addMsg.innerHTML = `The code you entered already exists please try another one`;

        clearTimeout(addMsgTimeout);

        addMsgTimeout = setTimeout(()=>{
            addMsg.innerHTML = '';
        }, 2500);

    }else if(!code || !nom || !quantite || !prix){

        addMsg.innerHTML = 'Please enter all the necessary information';

                clearTimeout(addMsgTimeout);

        addMsgTimeout = setTimeout(()=>{
            addMsg.innerHTML = '';
        }, 2500);

    }else if(isNaN(prix) || isNaN(quantite) || Number(quantite) < 0 || Number(prix)<0){
        addMsg.innerHTML = 'The price and the quantite must be positive numbers';

                clearTimeout(addMsgTimeout);

        addMsgTimeout = setTimeout(()=>{
            addMsg.innerHTML = '';
        }, 2500);

    }else{

        addMsg.innerHTML = '';

        stock.push({
            code,
            nom,
            quantite : Number(quantite),
            prix : Number(prix)
        });

        displayStock();

        addMsg.style.color = "green";

        addMsg.innerHTML = 'Product added with success';

         clearTimeout(addMsgTimeout);

        addMsgTimeout = setTimeout(()=>{
            addMsg.innerHTML = '';
        }, 2000);

        codeIn.value = '';
        nomIn.value = '';
        quantiteIn.value = '';
        prixIn.value = '';

    }    

}


const addButton = document.querySelector(".add-button");

let addButtonTimeout;
addButton.addEventListener('click', ()=>{

    addButton.disabled = true;

    clearTimeout(addButtonTimeout);

    addStock();

    addButtonTimeout = setTimeout(()=>{

        addButton.disabled = false;

    },1000);

});



let searchMsgTimeout;
let searchContainerTimeout;
function searchStock(){


    let codeIn = document.querySelector(".search-code");
    let code = codeIn.value;

    let trouve = stock.find((produit)=> produit.code === code);

    const msg = document.querySelector(".search-msg");
    

    if(trouve){

        msg.style.color = "green";

        msg.innerHTML = 'Produt found in the stock !';
        
        clearTimeout(searchMsgTimeout);

        searchMsgTimeout = setTimeout(()=>{
            msg.innerHTML = '';
        }, 2000);

        const container = document.querySelector(".display-search");
        container.innerHTML = '';

        const stockDiv = document.createElement("div");
        stockDiv.className = "stock-div";

        stockDiv.innerHTML = `
            <div>- Code : ${trouve.code}</div>
            <div>- Name : ${trouve.nom}</div>
            <div>- Quantity : ${trouve.quantite}</div>
            <div>- Unit price : ${trouve.prix}</div>  
            
        `;

          container.appendChild(stockDiv);

        clearTimeout(searchContainerTimeout);

        searchContainerTimeout = setTimeout(()=>{
            container.innerHTML = '';
        },4000);

        codeIn.value = '';

    }else{

        msg.style.color = "red";
        msg.innerHTML = 'Code not found';

        clearTimeout(searchMsgTimeout);

         searchMsgTimeout = setTimeout(()=>{
            msg.innerHTML = '';
         },2000);

    }


}


const searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', ()=>{
    searchStock();

});



let modifMsgTimeout;
function modifStock(){

        let codeIn = document.querySelector(".m-code");
    let nomIn = document.querySelector(".m-nom");
    let quantiteIn = document.querySelector(".m-quantite");
    let prixIn = document.querySelector(".m-prix");

    let code = codeIn.value;
    let nom = nomIn.value;
    let quantite = quantiteIn.value;
    let prix = prixIn.value;

    const modifMsg = document.querySelector(".modif-msg");
    modifMsg.style.color = "red";

    if(!code || !nom || !quantite || !prix){
          modifMsg.innerHTML = 'Please enter all the necessary information';

                 clearTimeout(modifMsgTimeout);

       modifMsgTimeout = setTimeout(()=>{
         modifMsg.innerHTML = '';
       }, 2000);

    }else if(isNaN(prix) || isNaN(quantite) || Number(quantite) < 0 || Number(prix)<0){
       modifMsg.innerHTML = 'The price and the quantity must be positive numbers';
        
       clearTimeout(modifMsgTimeout);

       modifMsgTimeout = setTimeout(()=>{
         modifMsg.innerHTML = '';
       }, 2000);

    }else{

       let trouve = false;
       let i = 0;

       while(i<stock.length && (!trouve)){

          if(stock[i].code === code){
            trouve = true;
            stock[i].nom = nom;
            stock[i].quantite = Number(quantite);
            stock[i].prix = Number(prix);
             displayStock();
          }else{
            i++;
          }
       }

       if(trouve){
          modifMsg.style.color = "green";
           modifMsg.innerHTML = 'Modification done with success';

                 clearTimeout(modifMsgTimeout);

                modifMsgTimeout = setTimeout(()=>{
                    modifMsg.innerHTML = '';
                }, 2000);

                        codeIn.value = '';
        nomIn.value = '';
        quantiteIn.value = '';
        prixIn.value = '';
 
       }else{

            modifMsg.style.color = "red";
             modifMsg.innerHTML = 'Code not found';

              clearTimeout(modifMsgTimeout);

                modifMsgTimeout = setTimeout(()=>{
                    modifMsg.innerHTML = '';
                }, 2000);
          
       }


    }
}

const modifButton = document.querySelector(".modif-button");
modifButton.addEventListener('click', ()=>{

    modifStock();

});



function calculateMoy(){

    let moy = 0;
    let S = 0,cpt = 0;


    stock.forEach((product)=>{

        S += Number(product.prix);
        cpt++;
    });

    if(cpt !== 0){
        moy = S/cpt;
    }

    return moy.toFixed(2);

}


function displayMoy(){

    let moy = calculateMoy();

    let moyText = document.querySelector(".display-moy");

    moyText.innerHTML = `${moy} Da`;

}

displayMoy();



function findMax(){

    let max = stock[0];

    stock.forEach((product)=>{
        if(Number(product.prix) > Number(max.prix)){
            max = product;
        }
    });

    return max;

}


function displayMax(){

    let max = findMax();

    const container = document.querySelector(".display-max");
    container.innerHTML = '';

    const maxDiv = document.createElement("div");
    maxDiv.className = "stock-div";
    maxDiv.innerHTML = `
            <div>- Code : ${max.code}</div>
            <div>- Name : ${max.nom}</div>
            <div>- Quantity : ${max.quantite}</div>
            <div>- Unit price : ${max.prix}</div>
    `;

    container.appendChild(maxDiv);
    
}

displayMax();


function findMin(){

    let min = stock[0];

    stock.forEach((product)=>{
        if(Number(product.prix) < Number(min.prix)){
            min = product;
        }
    });

    return min;

}

function displayMin(){

    let min = findMin();

    const container = document.querySelector(".display-min");
    container.innerHTML = '';

        const minDiv = document.createElement("div");
    minDiv.className = "stock-div";
    minDiv.innerHTML = `
            <div>- Code : ${min.code}</div>
            <div>- Name : ${min.nom}</div>
            <div>- Quantity : ${min.quantite}</div>
            <div>- Unit price : ${min.prix}</div>
    `;

    container.appendChild(minDiv);

}

displayMin();


function displaySort(){


    for(let i = 0;i<stock.length - 1;i++){

        for(let j = i+1;j<stock.length;j++){
            if(Number(stock[i].prix) > Number(stock[j].prix)){
                let temp = stock[i];
                stock[i] = stock[j];
                stock[j] = temp;

            }
        }
    }


    let container = document.querySelector(".display-sort");
    container.innerHTML = '';


        stock.forEach((product, i)=>{

        const stockDiv = document.createElement("div");
        stockDiv.className = "stock-div";
        stockDiv.innerHTML = `
            <div>- Code : ${product.code}</div>
            <div>- Name : ${product.nom}</div>
            <div>- Quantity : ${product.quantite}</div>
            <div>- Unit price : ${product.prix}</div>  
        `;


 
        container.appendChild(stockDiv);
        

    });

}


const sortButton = document.querySelector(".sort-button");

sortButton.addEventListener('click', ()=>{

    let container = document.querySelector(".display-sort");

    if(container.innerHTML === ''){
        displaySort();
    }else{
        container.innerHTML = '';
    }


});