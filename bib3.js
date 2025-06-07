let bib = JSON.parse(localStorage.getItem('bib')) || [{
    code : '1',
    title : 'The Godfather',
    author : 'Mario Puzo',
    price : '3000'
}];

displayBib();

  const addButton = document.querySelector(".add-button");

  addButton.addEventListener('click', ()=>{
    addBook();
  })

function displayBib(){

    let bibHtml = '';

    for(let i = 0;i<bib.length;i++){

        let bookObject = bib[i];

        let html = `
          <div class="display-book">
             <p class="code">${bookObject.code}</p>
             <p class="title">${bookObject.title}</p>
             <p class="author">${bookObject.author}</p>
             <p class="price">${bookObject.price} Da</p>
             <button class="delete-button" onclick = "
                bib.splice(${i}, 1);
                displayBib();
             ">Delete</button>
          </div>
        `;

        bibHtml += html;

    }

    document.querySelector(".display-content").innerHTML = bibHtml;
    localStorage.setItem('bib', JSON.stringify(bib));
}

function addBook(){

    let codeInput = document.querySelector(".input-code");
    let titleInput = document.querySelector(".input-title");
    let authorInput = document.querySelector(".input-author");
    let priceInput = document.querySelector(".input-price");

    let code = codeInput.value;
    let title = titleInput.value;
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
        document.querySelector(".display-error-message").innerHTML= 'The code you entered already exists please try another one';

    }else if(code === '' || title === '' || author === '' || price === ''){

        document.querySelector(".display-error-message").innerHTML = 'Please enter all the book\'s information';

    }else if(price < 0){
    
        document.querySelector(".display-error-message").innerHTML = 'The price you entered is invalid';

    }else if(isNaN(price)){
    
                document.querySelector(".display-error-message").innerHTML = 'The value of price must be a valid number';

    }else{
          document.querySelector(".display-error-message").innerHTML = '';

          bib.push({
            code,
            title,
            author,
            price
          });

          

          displayBib();
          document.querySelector(".display-success-message").innerHTML = 'Book added successfully';

          setTimeout(()=>{
            document.querySelector(".display-success-message").innerHTML = '';
          }, 2000);

          codeInput.value = '';
          titleInput.value = '';
          authorInput.value = '';
          priceInput.value = '';

    }

}


function calculateMoy(){

    let moy;
    let S =0;
    let cpt = 0;

    for(let i = 0;i<bib.length;i++){
        S = S + (Number(bib[i].price));
        cpt = cpt + 1;
    }

    moy = (S)/cpt;

    //console.log(moy.toFixed(2));

    return moy.toFixed(2);
}

let moyButton = document.querySelector(".display-moy-button");

moyButton.addEventListener('click', ()=>{
    displayMoy();
})

function displayMoy(){

    let moy = calculateMoy();

    document.querySelector(".display-moy").innerHTML = `${moy} Da`;

    setTimeout(()=>{
        document.querySelector(".display-moy").innerHTML = '';
    }, 5000);
 
}

function findMax(){

    let max;

    max = bib[0];

    for(let i = 1;i<bib.length;i++){
        if(Number(bib[i].price) > Number(max.price)){
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

    setTimeout(()=>{
         document.querySelector(".display-max-code").innerHTML = '';
    document.querySelector(".display-max-title").innerHTML = '';
    document.querySelector(".display-max-author").innerHTML = '';
    document.querySelector(".display-max-price").innerHTML = '';
    }, 5000);

}

function findMin(){

    let min;

    min = bib[0];

    for(let i =1;i<bib.length;i++){
        if(Number(bib[i].price) < Number(min.price)){
            min = bib[i];
        }
    }

    return min;
}

let minButton = document.querySelector(".display-min-button");
minButton.addEventListener('click', ()=>{
    displayMin();
});

function displayMin(){

    let min = findMin();

    document.querySelector(".display-min-code").innerHTML =  `${min.code}`;
    document.querySelector(".display-min-title").innerHTML =  `${min.title}`;
    document.querySelector(".display-min-author").innerHTML = `${min.author}`;
    document.querySelector(".display-min-price").innerHTML = `${min.price}`;
    

    
    setTimeout(()=>{
         document.querySelector(".display-min-code").innerHTML = '';
    document.querySelector(".display-min-title").innerHTML = '';
    document.querySelector(".display-min-author").innerHTML = '';
    document.querySelector(".display-min-price").innerHTML = '';
    }, 5000);
    
}