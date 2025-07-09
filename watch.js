let watches = [
    {
        code : 0,
        images : "images/casioBlue.jpg",
        nom : "Casio Collection",
        marque : "casio",
        categorie : "Homme",
        style : "classique",
        prix : 13500
        
    },{
        code : 1,
        images : "images/vintage.jpg",
        nom : "Casio vintage A158WEA-1EF",
        marque : "casio",
        categorie : "Unisexe",
        style : "classique",
        prix : 6700
    },{
        code : 2,
        images : "images/relogio.jpg",
        nom : "CASIO COLLECTION RELOGIO",
        marque : "casio",
        categorie : "Femme",
        style : "classique",
        prix : 26700
    },{
        code : 3,
        images : "images/resin.jpg",
        nom : "Resin Strap Noir GA-2100-1AER",
        marque : "casio",
        categorie : "Unisexe",
        style : "sport",
        prix : 24500
    },{
        code : 4,
        images : "images/fossil.jpg",
        nom : "Fossil Me3099",
        marque : "Fossil",
        categorie : "Homme",
        style : "luxe",
        prix : 39800
    },{
        code : 5,
        images : "images/Gshok.jpg",
        nom : "Casio Montre Homme G-Shock en Résine et Carbone",
        marque : "Casio",
        categorie : "Unisexe",
        style : "sport",
        prix : 37000
    },{
        code : 6,
        images : "images/serie7.jpg",
        nom : "Apple Watch Series 7 (GPS + Cellular, 41mm) Smartwatch",
        marque : "Apple",
        categorie : "Unisexe",
        style : "connectée",
        prix : 162000
    }

];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

displayListe();

function displayListe(){

    const container = document.querySelector(".display-content");
    
    container.innerHTML = '';

    watches.forEach((watch)=>{
        let watchDiv = createWatchDiv(watch);
        container.appendChild(watchDiv);
    });
}


function createWatchDiv(watch){

    const watchDiv = document.createElement("div");
    watchDiv.className = "watch-div";

    const watchImage = document.createElement("img");
    watchImage.className = "watch-image";
    watchImage.src = watch.images;

    const codeDiv = document.createElement("div");
    codeDiv.textContent = `- Code : ${watch.code}`;

    const watchName = document.createElement("div");
    watchName.textContent = `- Nom : ${watch.nom}`;

    const watchMarque = document.createElement("div");
    watchMarque.textContent = `- Marque : ${watch.marque}`;

    const categorie = document.createElement("div");
    categorie.textContent = `- Categorie : ${watch.categorie}`;

    const style = document.createElement("div");
    style.textContent = `- Style : ${watch.style}`;

    const prix = document.createElement("div");
    prix.textContent = `- Prix : ${watch.prix} Da`;

    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.textContent = "Add to cart";
    addButton.addEventListener('click', ()=>{
       
        let trouve = cart.find((item)=> Number(item.code) === Number(watch.code));

        if(trouve){

            displayAddMsgError();

        }else{

            cart.push(
                {
                    code : Number(watch.code),
                    images : watch.images,
                    nom : watch.nom,
                    marque : watch.marque,
                    categorie : watch.categorie,
                    style : watch.style,
                    prix : Number(watch.prix),
                    quantite : 1
                }
            );

            saveCart();
            displayCart();
            displayAddMsgSuccess();
        }
    });


      watchDiv.appendChild(watchImage);
      watchDiv.appendChild(codeDiv);
      watchDiv.appendChild(watchName);
      watchDiv.appendChild(watchMarque);
      watchDiv.appendChild(categorie);
      watchDiv.appendChild(style);
      watchDiv.appendChild(prix);
      watchDiv.appendChild(addButton);

      return watchDiv;
}


function saveCart(){

    localStorage.setItem('cart', JSON.stringify(cart));

}

const addMsg = document.querySelector(".add-msg");
let addMsgTimeout;
function displayAddMsgSuccess(){

    addMsg.style.display = "block"
    addMsg.style.color = "green";
    
    clearTimeout(addMsgTimeout);

    addMsg.innerHTML = "Article ajoute a la carte";

    addMsgTimeout = setTimeout(()=>{
        addMsg.style.display = "none";
    }, 1500);

}


function displayAddMsgError(){
    addMsg.style.display = "block";
    addMsg.style.color = "red";
    addMsg.innerHTML = "L'article existe deja dans votre pagner veiller aller au pagner pour modifier la quantite";

    clearTimeout(addMsgTimeout);

    addMsgTimeout = setTimeout(()=>{
        addMsg.style.display= 'none';
    }, 2500);

}


function calculateTotalArticles(){

    let S = 0;

    cart.forEach((article)=>{
        S += Number(article.quantite);
    });

    return S;
}
function displayItems(){

    let total = calculateTotalArticles();

    document.querySelector(".items-msg").innerHTML = `- Vous avez dans votre &#128722; ${cart.length} Articles avec ${total} exemplaires`;

}

displayItems();


function displayCart(){

    const container = document.querySelector(".display-cart");
    container.innerHTML = '';

    cart.forEach((watch, i)=>{
       let watchDiv = createWatchDivCart(watch, i);

       container.appendChild(watchDiv)
    });

    displayItems();
    displayTotal();
}

displayCart();

function createWatchDivCart(watch, i){

        const watchDiv = document.createElement("div");
    watchDiv.className = "watch-div";

    const watchImage = document.createElement("img");
    watchImage.className = "watch-image";
    watchImage.src = `${watch.images}`;

    const codeDiv = document.createElement("div");
    codeDiv.textContent = `- Code : ${watch.code}`;

    const watchName = document.createElement("div");
    watchName.textContent = `- Nom : ${watch.nom}`;

    const watchMarque = document.createElement("div");
    watchMarque.textContent = `- Marque : ${watch.marque}`;

    const categorie = document.createElement("div");
    categorie.textContent = `- Categorie : ${watch.categorie}`;

    const style = document.createElement("div");
    style.textContent = `- Style : ${watch.style}`;

    const prix = document.createElement("div");
    prix.textContent = `- Prix : ${watch.prix} Da`;

    const quantiteDiv = document.createElement("div");
    quantiteDiv.textContent = `- Quantite : ${watch.quantite}`;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons-div";

      const plusDiv = document.createElement("button");
      plusDiv.className = "plus-button";
      plusDiv.textContent = '+'
      plusDiv.addEventListener('click', ()=>{
        

        if(watch.quantite >= 5){
            displayCartMsg();
            
        }else{
            watch.quantite++;
            saveCart();
            displayCart();
            displayItems();
            displayTotal();
        }
      });

      buttonsDiv.appendChild(plusDiv);
        
      const moinsButton = document.createElement("button");
      moinsButton.className = "moins-button";
      moinsButton.textContent = '-';
      moinsButton.addEventListener('click', ()=>{
          

          if(watch.quantite <= 1){
             if(confirm(`Etes vous sure de vouloir supprimer l'articles ${watch.code} ?`)){
                cart.splice(i, 1);
                saveCart();
                displayCart();
                displayItems();
                displayTotal();
             }
          }else{
            watch.quantite--;
            saveCart();
            displayCart();
            displayItems();
            displayTotal();
          }
      });

      buttonsDiv.appendChild(moinsButton);


      watchDiv.appendChild(watchImage);
      watchDiv.appendChild(codeDiv);
      watchDiv.appendChild(watchName);
      watchDiv.appendChild(watchMarque);
      watchDiv.appendChild(categorie);
      watchDiv.appendChild(style);
      watchDiv.appendChild(prix);
      watchDiv.appendChild(quantiteDiv);
      watchDiv.appendChild(buttonsDiv);

      return watchDiv;
}


const cartMsg = document.querySelector(".cart-msg");
let cartMsgTimeout;

function displayCartMsg(){

    cartMsg.style.display = "block";
    cartMsg.style.color = "red";

      cartMsg.innerHTML = "You can not add more than 5 articles";

    clearTimeout(cartMsgTimeout);

    cartMsgTimeout = setTimeout(()=>{
        cartMsg.style.display = "none";
    }, 2000);
    
}

function calculateTotalCost(){

    let S = 0;

    cart.forEach((watch)=>{
        S += Number(watch.quantite)*Number(watch.prix);
    });

    return S;
}
function displayTotal(){

    let total = calculateTotalCost();

    document.querySelector(".display-total").innerHTML = `Total a payer : ${total} Da`;

}

displayTotal();


document.querySelector(".reset-button").addEventListener('click', ()=>{
    cart = [];
    saveCart();
    displayCart();
    displayItems();
    displayTotal();
});

const searchMsg = document.querySelector(".search-msg");
let searchMsgTimeout;
function searchWatch(){

    let codeIn = document.querySelector(".input-code");
    let code = codeIn.value;
    const container = document.querySelector(".display-search");

    let trouve = watches.find((watch)=> Number(watch.code) === Number(code));

    if(code === ''){
                searchMsg.style.color = "red";
        searchMsg.innerHTML = 'Veillez entrez le code';
        clearTimeout(searchMsgTimeout);

        searchMsgTimeout = setTimeout(()=>{
            searchMsg.innerHTML = '';
        }, 2000);

        container.innerHTML = '';
    }

    

    if(trouve){
        
        container.innerHTML = '';

        let watchDiv = createWatchDivForSearchSection(trouve);

        container.appendChild(watchDiv);

        searchMsg.style.color = "green";
        searchMsg.innerHTML = 'Article trouve';

        clearTimeout(searchMsgTimeout);

        searchMsgTimeout = setTimeout(()=>{
            searchMsg.innerHTML = '';
        }, 2000);

    }else{

        container.innerHTML = '';

        searchMsg.style.color = "red";
        searchMsg.innerHTML = 'Le code n\'a pas ete trouver';
        clearTimeout(searchMsgTimeout);

        searchMsgTimeout = setTimeout(()=>{
            searchMsg.innerHTML = '';
        }, 2000);
    }

    codeIn.value = '';

}

const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", ()=>{
    searchWatch();
});


function createWatchDivForSearchSection(watch){
        const watchDiv = document.createElement("div");
    watchDiv.className = "watch-div";

    const watchImage = document.createElement("img");
    watchImage.className = "watch-image";
    watchImage.src = watch.images;

    const codeDiv = document.createElement("div");
    codeDiv.textContent = `- Code : ${watch.code}`;

    const watchName = document.createElement("div");
    watchName.textContent = `- Nom : ${watch.nom}`;

    const watchMarque = document.createElement("div");
    watchMarque.textContent = `- Marque : ${watch.marque}`;

    const categorie = document.createElement("div");
    categorie.textContent = `- Categorie : ${watch.categorie}`;

    const style = document.createElement("div");
    style.textContent = `- Style : ${watch.style}`;

    const prix = document.createElement("div");
    prix.textContent = `- Prix : ${watch.prix} Da`;

    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.textContent = "Add to cart";
    addButton.addEventListener('click', ()=>{
       
        let trouve = cart.find((item)=> Number(item.code) === Number(watch.code));

        if(trouve){

            displaySearchMsgError();

        }else{

            cart.push(
                {
                    code : Number(watch.code),
                    images : watch.images,
                    nom : watch.nom,
                    marque : watch.marque,
                    categorie : watch.categorie,
                    style : watch.style,
                    prix : Number(watch.prix),
                    quantite : 1
                }
            );

            saveCart();
            displayCart();
            displaySearchMsgSuccess();
        }
    });


      watchDiv.appendChild(watchImage);
      watchDiv.appendChild(codeDiv);
      watchDiv.appendChild(watchName);
      watchDiv.appendChild(watchMarque);
      watchDiv.appendChild(categorie);
      watchDiv.appendChild(style);
      watchDiv.appendChild(prix);
      watchDiv.appendChild(addButton);

      return watchDiv;
}

const searchMsg2 = document.querySelector(".add-search");
let searchmsg2Timeout;
function displaySearchMsgSuccess(){
 
    searchMsg2.style.display = "block";
    searchMsg2.style.color = "green";
    searchMsg2.innerHTML = 'Article ajouter avec succes';
    clearTimeout(searchmsg2Timeout);

    searchmsg2Timeout = setTimeout(()=>{
        searchMsg2.style.display= "none";
    }, 1500);


}

function displaySearchMsgError(){

        searchMsg2.style.display = "block";
    searchMsg2.style.color = "red";
    searchMsg2.innerHTML = 'Cet article a deja été ajouté';
    clearTimeout(searchmsg2Timeout);

    searchmsg2Timeout = setTimeout(()=>{
        searchMsg2.style.display= "none";
    }, 1500);

}

const filterMsg = document.querySelector(".filter-msg");
let filterMsgTimeout;

function filterWatch(){

    let styleIn = document.querySelector(".input-style");
    let style = styleIn.value;

    const container = document.querySelector(".display-filter");
    container.innerHTML = '';

    watches.forEach((watch)=>{
        if(watch.style === style){
           let watchDiv = createWatchDivForFilterSection(watch);

           container.appendChild(watchDiv);
        }
    });

    if(container.innerHTML === ''){

        filterMsg.style.display = "block";
        filterMsg.style.color = "red";
        filterMsg.innerHTML = `Pas de montres du style ${style} dans la boutique`;

        clearTimeout(filterMsgTimeout);

        filterMsgTimeout = setTimeout(()=>{
            filterMsg.style.display = "none";
        }, 2500);
    }
}


function createWatchDivForFilterSection(watch){

        const watchDiv = document.createElement("div");
    watchDiv.className = "watch-div";

    const watchImage = document.createElement("img");
    watchImage.className = "watch-image";
    watchImage.src = watch.images;

    const codeDiv = document.createElement("div");
    codeDiv.textContent = `- Code : ${watch.code}`;

    const watchName = document.createElement("div");
    watchName.textContent = `- Nom : ${watch.nom}`;

    const watchMarque = document.createElement("div");
    watchMarque.textContent = `- Marque : ${watch.marque}`;

    const categorie = document.createElement("div");
    categorie.textContent = `- Categorie : ${watch.categorie}`;

    const style = document.createElement("div");
    style.textContent = `- Style : ${watch.style}`;

    const prix = document.createElement("div");
    prix.textContent = `- Prix : ${watch.prix} Da`;

    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.textContent = "Add to cart";
    addButton.addEventListener('click', ()=>{
       
        let trouve = cart.find((item)=> Number(item.code) === Number(watch.code));

        if(trouve){

            displayFilterhMsgAddError();

        }else{

            cart.push(
                {
                    code : Number(watch.code),
                    images : watch.images,
                    nom : watch.nom,
                    marque : watch.marque,
                    categorie : watch.categorie,
                    style : watch.style,
                    prix : Number(watch.prix),
                    quantite : 1
                }
            );

            saveCart();
            displayCart();
            displayFilterMsgAddSuccess();
        }
    });


      watchDiv.appendChild(watchImage);
      watchDiv.appendChild(codeDiv);
      watchDiv.appendChild(watchName);
      watchDiv.appendChild(watchMarque);
      watchDiv.appendChild(categorie);
      watchDiv.appendChild(style);
      watchDiv.appendChild(prix);
      watchDiv.appendChild(addButton);

      return watchDiv;
}

function displayFilterMsgAddSuccess(){

        filterMsg.style.display = "block";
    filterMsg.style.color = "green";
    filterMsg.innerHTML = 'Article ajouter avec succes';
    clearTimeout(filterMsgTimeout);

    filterMsgTimeout = setTimeout(()=>{
        filterMsg.style.display= "none";
    }, 1500);
}

function displayFilterhMsgAddError(){

            filterMsg.style.display = "block";
    filterMsg.style.color = "red";
    filterMsg.innerHTML = 'Cet article a deja été ajouté';
    clearTimeout(filterMsgTimeout);

    filterMsgTimeout = setTimeout(()=>{
        filterMsg.style.display= "none";
    }, 1500);

}

const filterButton = document.querySelector(".filter-button");
filterButton.addEventListener('click', ()=>{
    filterWatch();
});


