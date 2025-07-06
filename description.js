

cart = JSON.parse(localStorage.getItem('cart')) || [];

const descriptionMsg = document.querySelector(".description-msg");
let descriptionMsgTimeout;      
function showBookDetails(book){
    
    const imageContainer = document.querySelector(".image-div");
    imageContainer.innerHTML  = '';
    const image = document.createElement("img");
    image.className = "des-image";
    image.src = `${book.image}`;


    document.querySelector(".description-title").innerHTML = `Informations of ${book.titre}`;

    const addButton = document.querySelector(".add-button");
    addButton.className = "add-button";
    addButton.textContent = "Add to Cart";
    addButton.addEventListener('click', ()=>{
        let trouve = cart.find((b)=> Number(book.code)===Number(b.code));

        if(trouve){
            descriptionMsg.style.display = "block";
            descriptionMsg.style.color = "red";
            descriptionMsg.innerHTML = 'The book already exists in your cart';

            clearTimeout(descriptionMsgTimeout);

            descriptionMsgTimeout = setTimeout(()=>{
                descriptionMsg.style.display = "none";
            }, 2000);

        }else{
            cart.push({
                code : Number(book.code),
                image : book.image,
                titre : book.titre,
                auteur : book.auteur,
                categorie : book.categorie,
                prix : Number(book.prix),
                description : book.description,
                quantite : 1
            
            });

            displayCart();

            descriptionMsg.style.display = "block";
            descriptionMsg.style.color = "red";
            descriptionMsg.innerHTML = 'The book is already in your cart';
        
            clearTimeout(descriptionMsgTimeout);

            descriptionMsgTimeout = setTimeout(()=>{
                descriptionMsg.innerHTML = '';
            }, 2000);
            
        }
    });

    imageContainer.appendChild(image);
    imageContainer.appendChild(addButton);


    const contentContainer = document.querySelector(".content-div");
    contentContainer.innerHTML = '';

    contentContainer.innerHTML = `
      <div>- Code : ${book.code}</div>
      <div>- Title : ${book.titre}</div>
      <div>- Author : ${book.auteur}</div>
      <div>- Categorie : ${book.categorie}</div>
      <div>- Price : ${book.prix} Da</div>
      <div>- Description : ${book.description}</div>
    `;

    
    document.getElementById("description").style.display = "flex";

    document.getElementById("liste").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("cart").style.display = "none";
    document.getElementById("filter").style.display = "none";
    document.getElementById("home").style.display = "none";

}



