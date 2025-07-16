let books = [
    {
        code : 0,
        titre : 'Le Parrain',
        image : 'images/parrain.jpg',
        auteur : 'Mario Puzo',
        prix : 3200

    },{
        code : 1,
        titre : 'L\'art de la guerre',
        image : 'images/guerre.jpg',
        auteur : 'Sun Tzu',
        prix : 900

    },{
        code : 2,
        titre : 'L\'illiad De Homer',
        image : 'images/illiad.jpg',
        auteur : 'Homer',
        prix : 3100
    },{
        code : 3,
        titre : 'The 48 Laws of Power',
        image : 'images/laws.jpg',
        auteur : 'Robert Green',
        prix : 4500
    },{
        code : 4,
        titre : 'La peste',
        image : 'images/peste.jpg',
        auteur : 'Albert Camus',
        prix : 1500
    },{
        code : 5,
        titre : 'Leon L\'africain',
        image : 'images/leon.jpg',
        auteur : 'Amine Maalouf',
        prix : 2200
    },{
        code : 6,
        titre : 'Rich Dad Poor Dad',
        image : 'images/richDad.jpg',
        auteur : 'Robert Kiyosaki',
        prix : 2700
    },{
        code : 7,
        titre : 'Le rocher de Tanios',
        image : 'images/rocher.jpg',
        auteur : 'Amine Maalouf',
        prix : 2900
    },{
        code : 8,
        titre : 'Samarcande',
        image : 'images/samarcande.jpg',
        auteur : 'Amine Maalouf',
        prix : 1100
    },{
        code : 9,
        titre : '1984',
        image : 'images/1884.jpg',
        auteur : 'George Orwell',
        prix : 3300
    },{
        code : 10,
        titre : 'Le discours de la methode',
        image : 'images/methode.jpg',
        auteur : 'René Descartes',
        prix : 3300
    },{
        code : 11,
        titre : 'Can’t Hurt Me',
        image : 'images/hurt.jpg',
        auteur : 'David Goggins',
        prix : 1500
    },{
        code : 12,
        titre : 'Rich dad\'s cashflow quadrant',
        image : 'images/cashflow.jpg',
        auteur : 'Robert Kiyosaki',
        prix : 3000
    },{
        code : 13,
        titre : 'The Odyssey of Homer',
        image : 'images/odysse.jpg',
        auteur : 'Homer',
        prix : 5200
    },{
        code : 14,
        titre : 'The richest man in Babylon',
        image : 'images/richest.jpg',
        auteur : 'George S. Clason',
        prix : 1800
    },{
        code : 15,
        titre : 'Réfléchissez et devenez riche',
        image : 'images/think.jpg',
        auteur : 'Napoleon Hill',
        prix : 1050
    },{
        code : 16,
        titre : 'Comment se faire des amis et influencer les autres',
        image : 'images/freinds.jpg',
        auteur : 'Dale Carnegie',
        prix : 1200
    },{
        code : 17,
        titre : 'Art of Public Speaking',
        image : 'images/public.jpg',
        auteur : 'Dale Carnegie',
        prix : 1400
    },{
        code : 18,
        titre : 'History of Alexander the Great',
        image : 'images/alexander.jpg',
        auteur : 'Jacob Abbott',
        prix : 1400
    },{
        code : 19,
        titre : 'Daily Laws',
        image : 'images/daily.jpg',
        auteur : 'Robert Green',
        prix : 2200
    },{
        code : 20,
        titre : 'The anger of Achilles',
        image : 'images/achilles.jpg',
        auteur : 'Homer',
        prix : 2900
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];


function displayLivre(){

    const container = document.querySelector(".display-content");
    container.innerHTML = '';

    books.forEach((book)=>{
        const bookDiv = document.createElement("div");
        bookDiv.className = "book-div";
        bookDiv.innerHTML = `
           <img src="${book.image}" alt="" class="book-image">
           <div>-Titre : ${book.titre}</div>
           <div>- Auteur : ${book.auteur}</div>
           <div>- Code : ${book.code}</div>
           <div>- Prix : ${book.prix} Da</div>
        `;

        const addButton = document.createElement("button");
        addButton.className = "add-button";
        addButton.textContent = "Ajouter au pagner";

        addButton.addEventListener('click', ()=>{
            let trouve = cart.find((cartBook)=>cartBook.code === book.code);

            if(trouve){
                trouve.quantite += 1;
                displayTotal();
            }else{

                cart.push({
                    code : book.code,
                    titre : book.titre,
                    image : book.image,
                    auteur : book.auteur,
                    prix : book.prix,
                    quantite : 1
                });

                displayTotal();

            }

            showCart();
            console.log(cart);

        });

        bookDiv.appendChild(addButton);

        container.appendChild(bookDiv);

    });

}

displayLivre();



function showCart(){


    const container = document.querySelector(".cart-content");
    container.innerHTML = '';


    cart.forEach((book, i)=>{

        const bookDiv = document.createElement("div");
        bookDiv.className = "book-div";
        bookDiv.innerHTML = `
           <img src="${book.image}" alt="" class="book-image">
           <div>-Titre : ${book.titre}</div>
           <div>- Auteur : ${book.auteur}</div>
           <div>- quantite : ${book.quantite}</div>
           <div>- Prix : ${book.prix} Da</div>
           <div>- Total : ${Number(book.prix) * Number(book.quantite)}</div>
        `;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener('click', ()=>{
            if(book.quantite - 1>=1){
                book.quantite -= 1;
                showCart();
                displayTotal();
            }else{
            cart.splice(i, 1);
            showCart();
            displayTotal();
            }
        });

        bookDiv.appendChild(deleteButton);

       container.appendChild(bookDiv);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
}

showCart();


function calculateTotal(){


    let total = 0;

    cart.forEach((book)=>{
        total += Number(book.quantite)*Number(book.prix);
    });

    return total.toFixed(2);

}
function displayTotal(){

    let total = calculateTotal();

    document.querySelector(".display-total").innerHTML = `Total a payer : ${total} Da`;
    
}

displayTotal();


document.querySelector(".reset-button").addEventListener('click', ()=>{
        
    cart = [];
    displayTotal();
    showCart();
    localStorage.setItem('cart', JSON.stringify(cart));

});


let searchMsgTimeout;
let containerTimeout;

function searchBook(){


    let titreIn = document.querySelector(".search-titre");
    let titre = titreIn.value;

    let trouve = books.find((book)=>book.titre.toLowerCase() === titre);

    const msg = document.querySelector(".search-msg");

    if(trouve){
        
        msg.style.color = "green";
        msg.innerHTML = 'Book found';

        clearTimeout(searchMsgTimeout);

        searchMsgTimeout = setTimeout(()=>{
            msg.innerHTML = '';
        },2000);

        const container = document.querySelector(".display-search");
        container.innerHTML = '';

        const bookDiv = document.createElement("div");
        bookDiv.className = "book-div";
        bookDiv.innerHTML = `
           <img src="${trouve.image}" alt="" class="book-image">
           <div>-Titre : ${trouve.titre}</div>
           <div>- Auteur : ${trouve.auteur}</div>
           <div>- Code : ${trouve.code}</div>
           <div>- Prix : ${trouve.prix} Da</div>
        `;

        container.appendChild(bookDiv);

        clearTimeout(containerTimeout);

        containerTimeout = setTimeout(()=>{
            container.innerHTML = '';
        }, 4000);

        titreIn.value = '';

    }else{

        msg.style.color = "red";
        msg.innerHTML = "Book not found";

        clearTimeout(searchMsgTimeout);

        searchMsgTimeout = setTimeout(()=>{
            msg.innerHTML = '';
        },2000);

    }

}


const searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', ()=>{
    searchBook();
});