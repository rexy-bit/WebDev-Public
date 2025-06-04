let bib = JSON.parse(localStorage.getItem('bib')) || [
    {
        code : '1',
        title : 'The Godfather',
        author : 'Mario Puzo',
        price : '3000'
    }
];

displayBib();
let addButton = document.querySelector(".add-button");

addButton.addEventListener('click', ()=>{
    addBook();
})


function displayBib(){

    let bibHtml = '';

    for(let i = 0;i<bib.length;i++){
        let book = bib[i];

        let code = book.code;
        let title = book.title;
        let author = book.author;
        let price = book.price;
        
        let html = `
           <div class="display-book">
              <p class="code">
                 ${code}
              </p>

              <p class="title">
                ${title}
              </p>

              <p class="author">
                ${author}
              </p>

              <p class="price">${price} Da</p>
              <button class="delete-button" onclick="
                bib.splice(${i}, 1);
                displayBib();
              ">
                Delete
              </button>
           </div>
        `;

        bibHtml += html;
    }

    document.querySelector(".display-content").innerHTML = bibHtml;
    localStorage.setItem('bib', JSON.stringify(bib));
}

function addBook(){

    let titleInput = document.querySelector(".input-title");
    let codeInput = document.querySelector(".input-code");
    let authorInput = document.querySelector(".input-author");
    let priceInput = document.querySelector(".input-price");

    let title = titleInput.value;
    let code = codeInput.value;
    let author = authorInput.value;
    let price = priceInput.value;

    let trouve = false;

    let i = 0;

    while(i<bib.length && (!trouve)){
        if(bib[i].code === code){
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){
        document.querySelector(".display-error-message").innerHTML = 'The code you entered already exists please try another one';
    }else if(title === '' || author === '' || price === ''){
         document.querySelector(".display-error-message").innerHTML = 'Please enter all the book\'s information';
    }else if(price < 0){
        document.querySelector(".display-error-message").innerHTML = 'The price is less than 0 enter a correct price !';
    }else{
        document.querySelector(".display-error-message").innerHTML = '';
        bib.push({
            code,
            title,
            author,
            price
        });

        displayBib();

        titleInput.value = '';
        authorInput.value = '';
        codeInput.value = '';
        priceInput.value = '';

    }

    
}

function findMax(){

    let max;

    max = bib[0];

    for(let i = 1;i<bib.length;i++){
        if(bib[i].price > max.price){
            max = bib[i];
        }
    }

    return max;
}

let maxButton = document.querySelector(".display-max-button");

maxButton.addEventListener('click', ()=>{
    displayMax();
})
function displayMax(){
    let max = findMax();

    document.querySelector(".display-max-code").innerHTML = `${max.code}`;
    document.querySelector(".display-max-title").innerHTML = `${max.title}`;
    document.querySelector(".display-max-author").innerHTML = `${max.author}`;
    document.querySelector(".display-max-price").innerHTML = `${max.price}`;

}