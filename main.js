
let cart = JSON.parse(localStorage.getItem('cart')) || [];

let data = JSON.parse(localStorage.getItem('data')) || defaultData;


let currentItem = JSON.parse(localStorage.getItem('currentItem')) || null;

if(currentItem !== null){
    displayDescription(currentItem);
}
function displayStore(){

    const container = document.querySelector(".display-store");
    container.innerHTML = '';

    data.forEach((item)=>{
        const itemDiv = createItemDiv(item);

        const addButton = document.createElement("button");
        addButton.className = "add-button";
        addButton.textContent = "add to cart";
        addButton.addEventListener('click', ()=>{
            addToCart(item);
        });

        itemDiv.appendChild(addButton);
        container.appendChild(itemDiv);
    });

    saveData();
}

function saveCurrentItem(){

    localStorage.setItem('currentItem', JSON.stringify(currentItem));
}
function createItemDiv(item){

    const itemDiv = document.createElement("div");
    itemDiv.className = "item-div";

    const imgLink = document.createElement("a");
    imgLink.className = "img-link";
    imgLink.href = "#description";
    imgLink.addEventListener("click", ()=>{
        displayDescription(item);
        currentItem = item;
        saveCurrentItem();
    });

    const imageDiv = document.createElement("img");
    imageDiv.className = "image";
    imageDiv.src = item.image;
    
    imgLink.appendChild(imageDiv);

    itemDiv.appendChild(imgLink);

    const nomDiv = document.createElement("div");
    nomDiv.textContent = `- Nom : ${item.nom}`;
    itemDiv.appendChild(nomDiv);

    const starDiv = createStarsRate(item.note);
    itemDiv.appendChild(starDiv);

    const prixDiv = document.createElement("div");
    prixDiv.textContent = `- Prix : ${item.prix}€`;
    itemDiv.appendChild(prixDiv);

    const quantiteDiv = document.createElement("div");
    quantiteDiv.textContent = `- Stock : ${item.stock}`;
    itemDiv.appendChild(quantiteDiv);


    return itemDiv;

}


function createStarsRate(note){

    const starDiv = document.createElement("div");
    starDiv.className = "star-div";

    for(let i = 1;i<=5;i++){

        const star = document.createElement("i");

        if(note >= i){
            star.className = "fas fa-star";
        }else if(note >= i - 0.5){
            star.className = "fas fa-star-half-alt"
        }else{
            star.className = "far fa-star"
        }

        starDiv.appendChild(star);
    }

    return starDiv;
}

displayStore();

function addToCart(item){
    let trouve = cart.find((it)=> Number(it.code) === Number(item.code));

    if(trouve){
       displayAddErrorMsg(item);
    }else{

        if(item.stock === 0){
 
            addMsg.style.display = "block";
            addMsg.style.color = "red";
            addMsg.innerHTML = `The item : ${item.nom} is out of stock`;
                clearTimeout(addMsgTimeout);

                addMsgTimeout = setTimeout(()=>{
                    addMsg.style.display = "none";
                }, 1500)
        }else{

            cart.push(
                {
                    code : Number(item.code),
                    image : item.image,
                    nom : item.nom,
                    prix : Number(item.prix),
                    note : Number(item.note),
                    categorie : item.categorie,
                    quantite : 1,
                    description : item.description
                }
            );

            item.stock--;

            displayAddSuccess(item);
            displayCart();
            displayStore();


        }

    }

}

const addMsg = document.querySelector(".add-msg");
let addMsgTimeout;

function displayAddErrorMsg(item){


    addMsg.style.display = "block";
    addMsg.style.color = "red";
    addMsg.innerHTML = `The item : ${item.nom} is already in you cart`;

    clearTimeout(addMsgTimeout);

    addMsgTimeout = setTimeout(()=>{
        addMsg.style.display = "none";
    }, 1500);

}

function saveData(){
    localStorage.setItem('data', JSON.stringify(data));
}


function displayAddSuccess(item){
        addMsg.style.display = "block";
    addMsg.style.color = "green";
    addMsg.innerHTML = `item : ${item.nom} added to cart with success`;

    clearTimeout(addMsgTimeout);

    addMsgTimeout = setTimeout(()=>{
        addMsg.style.display = "none";
    }, 1500);

}

function saveCart(){

    localStorage.setItem('cart', JSON.stringify(cart));
}


function createItemDivCart(item){
        const itemDiv = document.createElement("div");
    itemDiv.className = "item-div";

    const imgLink = document.createElement("a");
    imgLink.className = "img-link";
    imgLink.href = "#description";
    imgLink.addEventListener("click", ()=>{
        displayDescription(item);
        currentItem = item;
        saveCurrentItem();
    })

    const imageDiv = document.createElement("img");
    imageDiv.className = "image";
    imageDiv.src = item.image;
    
    imgLink.appendChild(imageDiv);

    itemDiv.appendChild(imgLink);

    const nomDiv = document.createElement("div");
    nomDiv.textContent = `- Nom : ${item.nom}`;
    itemDiv.appendChild(nomDiv);

    const starDiv = createStarsRate(item.note);
    itemDiv.appendChild(starDiv);

    const prixDiv = document.createElement("div");
    prixDiv.textContent = `- Prix : ${item.prix}€`;
    itemDiv.appendChild(prixDiv);

    const quantiteDiv = document.createElement("div");
    quantiteDiv.textContent = `- Quantite : ${item.quantite}`;
    itemDiv.appendChild(quantiteDiv);


    return itemDiv;
}


function displayCart(){

      const container = document.querySelector(".display-cart");
      container.innerHTML = '';

      cart.forEach((item, i)=>{

        const itemDiv = createItemDivCart(item);

        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "buttons-div";

        const plusButton = document.createElement("button");
        plusButton.className = "plus";
        plusButton.textContent = "+";
        plusButton.addEventListener("click", ()=>{
             plusFunction(item);
        });
        buttonsDiv.appendChild(plusButton);
        
        const moinsButton = document.createElement("button");
        moinsButton.className = "plus";
        moinsButton.textContent = "-";
        moinsButton.addEventListener("click", ()=>{
             moinsFunction(item, i);
        });
        buttonsDiv.appendChild(moinsButton);

        itemDiv.appendChild(buttonsDiv);

        container.appendChild(itemDiv);
        
      });

    saveCart();
    saveData();
    displayReceipt();
    
}

displayCart();


const cartMsg = document.querySelector(".cart-msg");
let cartMsgTimeout;

function plusFunction(item){

    let trouve = data.find((it)=> Number(item.code) === Number(it.code));

    

    if(trouve.stock > 0){
        item.quantite++;
        displayCart();
        trouve.stock--;
        displayStore();
    }else{

         cartMsg.style.display = "block";
         cartMsg.style.color = "red";
         cartMsg.innerHTML = 'Vous avez atteint la limite de stock';
         clearTimeout(cartMsgTimeout);

         cartMsgTimeout = setTimeout(()=>{
            cartMsg.style.display = "none";
         }, 1500);

    }

}


function moinsFunction(item, i){

    let trouve = data.find((it)=> Number(it.code) === Number(item.code));

    let stock = trouve.stock;

    if(item.quantite > 1){
        item.quantite--;
        displayCart();
        trouve.stock++;
        displayStore();
    }else{
        if(confirm(`Are you sure to delete ${item.nom} form you cart ?`)){
           cart.splice(i, 1);
           displayCart();
           trouve.stock++;
           displayStore();
        }
    }

  }



  function displayReceipt(){

    const container = document.querySelector(".display-reciept");
    

    if(cart.length !== 0){
        container.style.display = "flex";
        container.innerHTML = '';

        let total = 0;

        const receiptTitle = document.createElement("h2");
        receiptTitle.textContent = "Reciept🧾";
        container.appendChild(receiptTitle);

        const recieptDivs = document.createElement("div");
        recieptDivs.className = "reciepts-div"
        cart.forEach((item)=>{
            const itemDiv = document.createElement("div");
            itemDiv.className = "reciept-div";
            itemDiv.textContent = `- Nom : ${item.nom} | Quantite : ${item.quantite} | prix unitaire : ${item.prix} | Total : ${Number(item.prix)*Number(item.quantite)}`;

            recieptDivs.appendChild(itemDiv);

            total += Number(item.prix)*Number(item.quantite);

        })

        container.appendChild(recieptDivs);

        const totalDiv = document.createElement("div");
        totalDiv.className = "total-price";
        totalDiv.textContent = `Total à payer : ${total} €`;

        container.appendChild(totalDiv);

    }else{
        container.style.display = "none";
    }

}

document.querySelector(".reset-button").addEventListener('click', ()=>{
    if(confirm('Are you sure to reset your cart ?')){
    localStorage.removeItem('data');
    localStorage.removeItem('cart');
    cart = [];
     data = structuredClone(defaultData)
    displayCart();
    displayStore();
    displayReceipt();
    }
});


function displayDescription(item){

    document.querySelector(".description-title").innerHTML = `Description de ${item.nom}`;

    const containerDescription = document.querySelector(".display-description");

    const imageCon = document.querySelector(".description-image");
    imageCon.innerHTML = "";

    const image = document.createElement("img");
    image.className = "imageDes";
    image.src = item.image;
    imageCon.appendChild(image);
    
    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.textContent = "add to cart";
    addButton.addEventListener('click', ()=>{
        addToCartDescription(item);
    });
    imageCon.appendChild(addButton);

    containerDescription.appendChild(imageCon);

    const otherContainer = document.querySelector(".other");
    otherContainer.innerHTML = '';

    const nomDiv = document.createElement("div");
    nomDiv.textContent = item.nom;
    nomDiv.className = "nom-div";
    otherContainer.appendChild(nomDiv);

    const codeDiv = document.createElement("div");
    codeDiv.textContent = `- Code : ${item.code}`;
    otherContainer.appendChild(codeDiv);

    const categorie = document.createElement("div");
    categorie.textContent = `- Categorie : ${item.categorie}`;
    otherContainer.appendChild(categorie);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "description";
    descriptionDiv.textContent = `- Description : ${item.description}`;
    otherContainer.appendChild(descriptionDiv);

    const rateDiv = createStarsRate(item.note);
    otherContainer.appendChild(rateDiv);

    const prix = document.createElement("div");
    prix.textContent = `- Prix : ${item.prix} €`;
    otherContainer.appendChild(prix);

    containerDescription.appendChild(otherContainer);


}


const descriptionMsg = document.querySelector(".description-msg");
let descriptionMsgTimeout;
function addToCartDescription(item){
  
    let trouve = cart.find((it)=> Number(it.code) === Number(item.code));
    let trouveData = data.find((it)=>Number(it.code)=== Number(item.code));

    if(trouve){

        descriptionMsg.style.display = "block";
        descriptionMsg.style.color = "red";
        descriptionMsg.innerHTML = `Item ${item.nom} is already in your cart`;

        clearTimeout(descriptionMsgTimeout);

        descriptionMsgTimeout = setTimeout(()=>{
            descriptionMsg.style.display = "none";
        }, 1500);

    }else if(trouveData.stock === 0){

        descriptionMsg.style.display = "block";
        descriptionMsg.style.color = "red";
        descriptionMsg.innerHTML = `Item ${item.nom} is out of stock`;

        clearTimeout(descriptionMsgTimeout);

        descriptionMsgTimeout = setTimeout(()=>{
            descriptionMsg.style.display = "none";
        }, 1500);

    }else{

                    cart.push(
                {
                    code : Number(item.code),
                    image : item.image,
                    nom : item.nom,
                    prix : Number(item.prix),
                    note : Number(item.note),
                    categorie : item.categorie,
                    quantite : 1,
                    description : item.description
                }
            );

            displayCart();
            trouveData.stock--;
            displayStore();

        descriptionMsg.style.display = "block";
        descriptionMsg.style.color = "green";
        descriptionMsg.innerHTML = `Item ${item.nom} added with success`;

        clearTimeout(descriptionMsgTimeout);

        descriptionMsgTimeout = setTimeout(()=>{
            descriptionMsg.style.display = "none";
        }, 1500);

    }

}



const searchMsg = document.querySelector(".search-msg");
let searchMsgTimeout;

let currentSearch = JSON.parse(localStorage.getItem('currentSearch')) || null;

if(currentSearch !== null){
    searchItem(currentSearch);
}

function searchItem(search){


     if(!search){
               searchMsg.style.display = "block";
            searchMsg.style.color = "red";
            searchMsg.innerHTML = `Not found`;
                clearTimeout(searchMsgTimeout);

                searchMsgTimeout = setTimeout(()=>{
                    searchMsg.style.display = "none";
                }, 1500);
        
                return;
     }


    const container = document.querySelector(".display-search");
    container.innerHTML = '';

    data.forEach((item)=>{

      let keyWordCheck = item.keyWords.some((keyWord)=> keyWord.toLowerCase().includes(search.toLowerCase()));

        if(item.nom.toLowerCase().includes(search.toLowerCase()) || item.categorie.toLowerCase().includes(search.toLowerCase()) || keyWordCheck){
    
            const itemDiv = createItemDiv(item);
            
                const addButton = document.createElement("button");
            addButton.className = "add-button";
            addButton.textContent = "add to cart";
            addButton.addEventListener('click', ()=>{
                addToCartSearch(item);
                searchItem(search);
            });
            
            itemDiv.appendChild(addButton);

            container.appendChild(itemDiv);
        }
    });
}


function addToCartSearch(item){
    let trouve = cart.find((it)=> Number(it.code) === Number(item.code));

    if(trouve){
                   searchMsg.style.display = "block";
            searchMsg.style.color = "red";
            searchMsg.innerHTML = `The item : ${item.nom} is already in your cart`;
                clearTimeout(searchMsgTimeout);

                searchMsgTimeout = setTimeout(()=>{
                    searchMsg.style.display = "none";
                }, 1500);
        
    }else{

        if(item.stock === 0){
 
            searchMsg.style.display = "block";
            searchMsg.style.color = "red";
            searchMsg.innerHTML = `The item : ${item.nom} is out of stock`;
                clearTimeout(searchMsgTimeout);

                searchMsgTimeout = setTimeout(()=>{
                    searchMsg.style.display = "none";
                }, 1500);
        }else{

            cart.push(
                {
                    code : Number(item.code),
                    image : item.image,
                    nom : item.nom,
                    prix : Number(item.prix),
                    note : Number(item.note),
                    categorie : item.categorie,
                    quantite : 1,
                    description : item.description
                }
            );

            item.stock--;

                        searchMsg.style.display = "block";
            searchMsg.style.color = "green";
            searchMsg.innerHTML = `item : ${item.nom} added with success`;
                clearTimeout(searchMsgTimeout);

                searchMsgTimeout = setTimeout(()=>{
                    searchMsg.style.display = "none";
                }, 1500);
            
            displayCart();
            displayStore();


        }

    }

}


const searchButton = document.querySelector(".search-button");
searchButton.addEventListener('click', ()=>{
    let searchIn = document.querySelector(".input-search");
    let search = searchIn.value;

    currentSearch = search;

    localStorage.setItem('currentSearch', JSON.stringify(currentSearch));
    searchItem(search);
});



const filterMsg = document.querySelector(".filter-msg");
let filterMsgTimeout;

let currentCategorie = JSON.parse(localStorage.getItem('currentCategorie')) || null;

if(currentCategorie !== null){
    filterByCategorie(currentCategorie);
}

function filterByCategorie(categorie){

    const container = document.querySelector(".display-filter");
    container.innerHTML = '';

    if(!categorie){

        filterMsg.style.display = "block";
        filterMsg.style.color = "red";
        filterMsg.innerHTML = "Categorie not found";

        clearTimeout(filterMsgTimeout);

        filterMsgTimeout = setTimeout(()=>{
            filterMsg.style.display = "none";
        }, 1500);

    }

    let trouve = false;

    data.forEach((item)=>{
        if(item.categorie === categorie){

            trouve = true;
            let itemDiv = createItemDiv(item);

            const addButton = document.createElement("button");
            addButton.className = "add-button";
            addButton.textContent = "add to cart";
            addButton.addEventListener('click', ()=>{
                addToCartFilter(item);
                filterByCategorie(categorie);
            });

            itemDiv.appendChild(addButton);

            container.appendChild(itemDiv);
        }
    });

    if(!trouve){
                filterMsg.style.display = "block";
        filterMsg.style.color = "red";
        filterMsg.innerHTML = "Categorie not found";

        clearTimeout(filterMsgTimeout);

        filterMsgTimeout = setTimeout(()=>{
            filterMsg.style.display = "none";
        }, 1500);
    }

}


const filterButton = document.querySelector(".filter-button");
filterButton.addEventListener('click', ()=>{
    
    let filterInput = document.querySelector(".input-categorie");
    let categorie = filterInput.value;

    currentCategorie = categorie;
    localStorage.setItem('currentCategorie', JSON.stringify(currentCategorie));

    filterByCategorie(categorie);

});


function addToCartFilter(item){
    let trouve = cart.find((it)=> Number(it.code) === Number(item.code));

    if(trouve){
                   filterMsg.style.display = "block";
            filterMsg.style.color = "red";
            filterMsg.innerHTML = `The item : ${item.nom} is already in your cart`;
                clearTimeout(filterMsgTimeout);

                filterMsgTimeout = setTimeout(()=>{
                    filterMsg.style.display = "none";
                }, 1500);
        
    }else{

        if(item.stock === 0){
 
            filterMsg.style.display = "block";
            filterMsg.style.color = "red";
            filterMsg.innerHTML = `The item : ${item.nom} is out of stock`;
                clearTimeout(filterMsgTimeout);

                filterMsgTimeout = setTimeout(()=>{
                    filterMsg.style.display = "none";
                }, 1500);
        }else{

            cart.push(
                {
                    code : Number(item.code),
                    image : item.image,
                    nom : item.nom,
                    prix : Number(item.prix),
                    note : Number(item.note),
                    categorie : item.categorie,
                    quantite : 1,
                    description : item.description
                }
            );

            item.stock--;

                        filterMsg.style.display = "block";
            filterMsg.style.color = "green";
            filterMsg.innerHTML = `item : ${item.nom} added with success`;
                clearTimeout(filterMsgTimeout);

                filterMsgTimeout = setTimeout(()=>{
                    filterMsg.style.display = "none";
                }, 1500);
            
            displayCart();
            displayStore();


        }

    }

}


const orderMsg = document.querySelector(".order-msg");
let orderMsgTimeout;

let currentOrder = JSON.parse(localStorage.getItem('currentOrder')) || null;

if(currentOrder !== null){

    document.querySelector(".input-nom").value = currentOrder.nom;
    document.querySelector(".input-prenom").value = currentOrder.prenom;
    document.querySelector(".input-number").value = currentOrder.number;
    document.querySelector(".input-adresse").value = currentOrder.adress;
    document.querySelector(".order-result").innerHTML = currentOrder.msg;
}
function displayOrder(){

    

    if(cart.length === 0){

        document.querySelector(".order-content").innerHTML = 'Your cart is empty';

        return;

    }

        let nomInput = document.querySelector(".input-nom");
        let prenomInput = document.querySelector(".input-prenom");
        let numberInput = document.querySelector(".input-number");
        let adressInput = document.querySelector(".input-adresse");

        let nom = nomInput.value;
        let prenom = prenomInput.value;
        let number = numberInput.value;
        let adress = adressInput.value;

        let msg = 'Your order has been successfully placed!, 💰 Payment is made upon delivery (Cash on Delivery)';

        displayReceiptOrder();


        if(!nom || !prenom || !number || !adress){
             
            orderMsg.style.display = "block";
            orderMsg.style.color = "red";
            orderMsg.innerHTML = 'Please enter all the necessary information';

            clearTimeout(orderMsgTimeout);

            orderMsgTimeout =  setTimeout(()=>{
                orderMsg.style.display = "none";
            }, 1500);

        }else if(isNaN(number) || number.length !== 10){
            
                        orderMsg.style.display = "block";
            orderMsg.style.color = "red";
            orderMsg.innerHTML = 'The number must be in correct formating';

            clearTimeout(orderMsgTimeout);

            orderMsgTimeout =  setTimeout(()=>{
                orderMsg.style.display = "none";
            }, 1500);   

        }else{

                                    orderMsg.style.display = "block";
            orderMsg.style.color = "green";
            orderMsg.innerHTML = 'Your order has been successfully placed!';

            clearTimeout(orderMsgTimeout);

            orderMsgTimeout =  setTimeout(()=>{
                orderMsg.style.display = "none";
            }, 1500);   


            document.querySelector(".order-result").innerHTML = msg;

            currentOrder = {
                nom,
                prenom,
                number,
                adress,
                msg
            };

            localStorage.setItem('currentOrder', JSON.stringify(currentOrder));


        }


    
}

displayReceiptOrder();

  function displayReceiptOrder(){

    const container = document.querySelector(".display-reciept-order");
    

    if(cart.length !== 0){
        container.style.display = "flex";
        container.innerHTML = '';

        let total = 0;

        const receiptTitle = document.createElement("h2");
        receiptTitle.textContent = "Reciept🧾";
        container.appendChild(receiptTitle);

        const recieptDivs = document.createElement("div");
        recieptDivs.className = "reciepts-div"
        cart.forEach((item)=>{
            const itemDiv = document.createElement("div");
            itemDiv.className = "reciept-div";
            itemDiv.textContent = `- Nom : ${item.nom} | Quantite : ${item.quantite} | prix unitaire : ${item.prix} | Total : ${Number(item.prix)*Number(item.quantite)}`;

            recieptDivs.appendChild(itemDiv);

            total += Number(item.prix)*Number(item.quantite);

        })

        container.appendChild(recieptDivs);

        const totalDiv = document.createElement("div");
        totalDiv.className = "total-price";
        totalDiv.textContent = `Total à payer : ${total} €`;

        container.appendChild(totalDiv);

    }else{
        container.style.display = "none";
    }

}


const confirmButton = document.querySelector(".confirm-button");
confirmButton.addEventListener('click', ()=>{
    displayOrder();
});