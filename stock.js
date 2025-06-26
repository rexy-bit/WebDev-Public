
const humburger = document.querySelector(".humburger");
const functionsDiv = document.querySelector(".functions");


humburger.addEventListener('click', ()=>{
    if(functionsDiv.style.display === 'flex'){
        functionsDiv.style.display = 'none';
    }else{
        
        functionsDiv.style.display = 'flex';
    }
});



let stock = JSON.parse(localStorage.getItem('stock')) || [{
    code : '0',
    nom : 'Cables Electriques',
    quantite : 10,
    prix : 20000
}];



displayStock();
function displayStock(){


    const container = document.querySelector(".display-liste");
    container.innerHTML = '';


    stock.forEach((produt, i)=>{

        const produtDiv = document.createElement("div");
        produtDiv.className = "product-div";

        const codeD = document.createElement("div");
        codeD.textContent = `- Code : ${produt.code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Name : ${produt.nom}`;

        const quantiteD = document.createElement("div");
        quantiteD.textContent = `- Quantity : ${produt.quantite}`;

        const priceD = document.createElement("div");
        priceD.textContent = `- Price : ${produt.prix} Da`;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener('click', ()=>{
            stock.splice(i, 1);
            displayStock();
        });


        produtDiv.appendChild(codeD);
        produtDiv.appendChild(nomD);
        produtDiv.appendChild(quantiteD);
        produtDiv.appendChild(priceD);
        produtDiv.appendChild(deleteButton);

        container.appendChild(produtDiv)
    });

    localStorage.setItem('stock', JSON.stringify(stock));

}


let time1;
function addStock(){


    let codeIn = document.querySelector(".input-code");
    let nomIn = document.querySelector(".input-nom");
    let quantiteIn = document.querySelector(".input-quantite");
    let prixIn = document.querySelector(".input-prix");

    let code = codeIn.value;
    let nom = nomIn.value;
    let quantite = quantiteIn.value;
    let prix = prixIn.value;

    let i = 0;
    let trouve = false;

    while(i<stock.length && (!trouve)){

        if(stock[i].code === code){
            trouve = true;
        }else{
            i++;
        }
    }

    const msg = document.querySelector(".add-message");
    msg.style.color = "red";

    if(trouve){
         msg.innerHTML = 'The code you entered already exists please try another one';
    }else if(code === '' || nom === '' || quantite === '' || prix === ''){
           msg.innerHTML = 'Please enter all the necessary information';
    }else if(isNaN(quantite) || isNaN(prix) || Number(prix) < 0 || Number(quantite) < 0){
        msg.innerHTML = 'The quantity and the price must be a positive numbers';
    }else{

        msg.innerHTML = '';
        
        stock.push({
            code,
            nom,
            quantite : Number(quantite),
            prix : Number(prix)
        });

        displayStock();
        msg.style.color = "green";
        
        msg.innerHTML = 'Product added with success';

        clearTimeout(time1);
        time1 = setTimeout(()=>{
            msg.innerHTML = '';

        }, 2000);

        codeIn.value = '';
        nomIn.value = '';
        quantiteIn.value = '';
        prixIn.value = '';

    }

}

const addButton = document.querySelector(".add-button");

addButton.addEventListener('click', ()=>{
    
    addStock();

});


let time2;
let time3;
function searchStock(){


    let codeIn = document.querySelector(".search-code");
    let code = codeIn.value;

    let i = 0;
    let trouve = false;

    while(i<stock.length && (!trouve)){
        if(stock[i].code === code){
            trouve = true;

        }else{
            i++;
        }
    }

    const msg = document.querySelector(".search-message");

    if(trouve){
         
        msg.style.color = "green";
        msg.innerHTML = 'Product found !';

        clearTimeout(time2);

        time2 = setTimeout(()=>{
            msg.innerHTML = '';
        }, 2000);

        const container = document.querySelector(".display-search");
        container.innerHTML = '';

                const produtDiv = document.createElement("div");
        produtDiv.className = "product-div";

        const codeD = document.createElement("div");
        codeD.textContent = `- Code : ${stock[i].code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Name : ${stock[i].nom}`;

        const quantiteD = document.createElement("div");
        quantiteD.textContent = `- Quantity : ${stock[i].quantite}`;

        const priceD = document.createElement("div");
        priceD.textContent = `- Price : ${stock[i].prix} Da`;


        produtDiv.appendChild(codeD);
        produtDiv.appendChild(nomD);
        produtDiv.appendChild(quantiteD);
        produtDiv.appendChild(priceD);

        container.appendChild(produtDiv);

        clearTimeout(time3);

        time3 = setTimeout(()=>{
            container.innerHTML = '';
        }, 4000);

        codeIn.value = '';
    }else{
        msg.style.color = "red";

       msg.innerHTML = 'product not found !';

       clearTimeout(time2);
       time2 = setTimeout(()=>{
        msg.innerHTML = '';
       }, 2000);

    }

}


const searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', ()=>{
    searchStock();
});


let time4;

function modifStock(){


    let codeIn = document.querySelector(".m-code");
    let nomIn = document.querySelector(".m-nom");
    let quantiteIn = document.querySelector(".m-quantite");
    let prixIn = document.querySelector(".m-prix");

    let code = codeIn.value;
    let nom = nomIn.value;
    let quantite = quantiteIn.value;
    let prix = prixIn.value;

    let i = 0;
    let trouve = false;

    const msg = document.querySelector(".modif-message");
    msg.style.color = "red"


    if(code === '' || nom === '' || quantite === '' || prix === ''){
         msg.innerHTML = 'Please enter all the necessary information';
    }else if(isNaN(quantite) || isNaN(prix) || Number(prix) < 0 || Number(quantite) < 0){
        msg.innerHTML = 'The quantity and the price must be a positive numbers';
    }else{
            while(i<stock.length && (!trouve)){

                if(stock[i].code === code){
                    trouve = true;
                    stock[i].nom = nom;
                    stock[i].quantite = quantite;
                    stock[i].prix = prix;

                    displayStock();

                    msg.style.color  = "green";

                    msg.innerHTML = 'Modification done with success';
                    clearTimeout(time4);

                    time4 = setTimeout(()=>{
                        msg.innerHTML = '';
                    }, 2000);


                }else{
                    i++;
                }

                        codeIn.value = '';
                        nomIn.value = '';
                        quantiteIn.value = '';
                        prixIn.value = '';
            }

            if(!trouve){
                msg.innerHTML  = 'Product not found !';
            }

    }

}


const modifButton = document.querySelector(".modif-button");

modifButton.addEventListener('click', ()=>{
    modifStock();
});



function findMax(){

    let max = stock[0];

    stock.forEach((prod, i)=>{
        if(Number(prod.prix) > Number(max.prix)){
            max = prod;
        }
    });


    return max;
}


function displayMax(){

    let max =findMax();

    const container = document.querySelector(".display-max");
    container.innerHTML = '';

        const produtDiv = document.createElement("div");
        produtDiv.className = "product-div";

        const codeD = document.createElement("div");
        codeD.textContent = `- Code : ${max.code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Name : ${max.nom}`;

        const quantiteD = document.createElement("div");
        quantiteD.textContent = `- Quantity : ${max.quantite}`;

        const priceD = document.createElement("div");
        priceD.textContent = `- Price : ${max.prix} Da`;


        produtDiv.appendChild(codeD);
        produtDiv.appendChild(nomD);
        produtDiv.appendChild(quantiteD);
        produtDiv.appendChild(priceD);

        container.appendChild(produtDiv);


}


displayMax();



function findMin(){
    let min = stock[0];

    stock.forEach((prod)=>{
        if(Number(prod.prix) < Number(min.prix)){
            min = prod;
        }
    });


    return min;
}


function displayMin(){

  
    let min = findMin();


        const container = document.querySelector(".display-min");
    container.innerHTML = '';

        const produtDiv = document.createElement("div");
        produtDiv.className = "product-div";

        const codeD = document.createElement("div");
        codeD.textContent = `- Code : ${min.code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Name : ${min.nom}`;

        const quantiteD = document.createElement("div");
        quantiteD.textContent = `- Quantity : ${min.quantite}`;

        const priceD = document.createElement("div");
        priceD.textContent = `- Price : ${min.prix} Da`;


        produtDiv.appendChild(codeD);
        produtDiv.appendChild(nomD);
        produtDiv.appendChild(quantiteD);
        produtDiv.appendChild(priceD);

        container.appendChild(produtDiv);

}

displayMin();


let time5;
function displayTotal(){

    document.querySelector(".display-total").innerHTML = `${stock.length}`;

    clearTimeout(time5);

    time5 = setTimeout(()=>{
        document.querySelector(".display-total").innerHTML = '';
    }, 3000);
}


const totalButton = document.querySelector(".total-button");

totalButton.addEventListener('click', ()=>{
    displayTotal();
});


function calculateMoy(){

    let moy = 0;
    let cpt = 0;
    let S = 0;

    stock.forEach((prod)=>{
        S += Number(prod.prix);
        cpt++;
    });

    if(cpt !=0){
        moy = S/cpt;
    }


    return moy.toFixed(2);
}

let time6;
function displayMoy(){


    let moy = calculateMoy();

    let moyText = document.querySelector(".display-mean");

    moyText.innerHTML = `${moy} Da`;

    clearTimeout(time6);

    time6 = setTimeout(()=>{
        moyText.innerHTML = '';
    }, 3000);

}


const meanButton = document.querySelector(".mean-button");

meanButton.addEventListener('click', ()=>{
    displayMoy();
});


function sortStock(){

    for(let i = 0;i<stock.length-1;i++){
        for(let j = i+1;j<stock.length;j++){
            if(Number(stock[i].prix) > Number(stock[j].prix)){
                let temp = stock[i];
                stock[i] = stock[j];
                stock[j] = temp;

            }
        }
    }


    let container = document.querySelector(".sort-content");
    container.innerHTML = '';


    stock.forEach((produt)=>{
        const produtDiv = document.createElement("div");
        produtDiv.className = "product-div";

        const codeD = document.createElement("div");
        codeD.textContent = `- Code : ${produt.code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Name : ${produt.nom}`;

        const quantiteD = document.createElement("div");
        quantiteD.textContent = `- Quantity : ${produt.quantite}`;

        const priceD = document.createElement("div");
        priceD.textContent = `- Price : ${produt.prix} Da`;





        produtDiv.appendChild(codeD);
        produtDiv.appendChild(nomD);
        produtDiv.appendChild(quantiteD);
        produtDiv.appendChild(priceD);
       

        container.appendChild(produtDiv);

    });

    
}


const sortButton = document.querySelector(".sort-button");

sortButton.addEventListener('click', ()=>{


    //sortStock();
    
    let container = document.querySelector(".sort-content");

    if(container.innerHTML === ''){
        sortStock();
    }else{
        container.innerHTML = '';
    }
        
});
