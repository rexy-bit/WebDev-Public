let bib = JSON.parse(localStorage.getItem('bib')) || [{
    code : 0,
    title : 'The 48 laws of power',
    author : 'Robert Green',
    price : 3200
}];


displayBib();

function displayBib(){

    let bibHtml= '';

    for(let i = 0;i<bib.length;i++){

        let html = `
        
           <div class="book">
              <p class="code">${bib[i].code}</p>
              <p class="title">${bib[i].title}</p>
               <p class="author">${bib[i].author}</p>  
               <p class="price">${bib[i].price} Da</p>

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

function addBib(){


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

        if(bib[i].code === Number(code)){
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){
        document.querySelector(".display-error-message").innerHTML = 'The code you entered already exists please try another one';
    }else if(isNaN(code) || isNaN(price)){
        document.querySelector(".display-error-message").innerHTML = 'The price and the code must contain only numbers !';
    }else if(Number(price) < 0){
         document.querySelector(".display-error-message").innerHTML = 'The price must be a positive number';
    }else{

         document.querySelector(".display-error-message").innerHTML = '';

         bib.push({
            code : Number(code),
            title,
            author,
            price : Number(price)
         });

         displayBib();

          document.querySelector(".display-success-message").innerHTML = 'Book added successfuly';

          setTimeout(()=>{
             document.querySelector(".display-success-message").innerHTML = '';
          }, 3000);

          codeInput.value = '';
          titleInput.value = '';
          authorInput.value = '';
          priceInput.value = '';
    }
}

document.querySelector(".add-button").addEventListener('click', ()=>{
    addBib();
});


function searchBib(){

    let trouve = false;
    let i = 0;

    let code = (document.querySelector(".search-code")).value;

    while(i<bib.length && (!trouve)){

        if(bib[i].code === Number(code)){
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){

        document.querySelector(".search-message").innerHTML = 'Book found';

        setTimeout(()=>{
            document.querySelector(".search-message").innerHTML = '';
        }, 3000);

        document.querySelector(".s-title").innerHTML = `${bib[i].title}`;
        document.querySelector(".s-author").innerHTML = `${bib[i].author}`;
        document.querySelector(".s-price").innerHTML = `${bib[i].price}`;

        setTimeout(()=>{
            document.querySelector(".s-title").innerHTML = '';
        document.querySelector(".s-author").innerHTML = '';
        document.querySelector(".s-price").innerHTML =  '';
        }, 5000);

      (document.querySelector(".search-code")).value = '';


    }else{
        document.querySelector(".search-message").innerHTML = 'The code you entered was not found';

        setTimeout(()=>{
            document.querySelector(".search-message").innerHTML = '';
        }, 3000);
    }
}


document.querySelector(".search-button").addEventListener('click', ()=>{
    searchBib();
});


function calculateMoy(){

    let S = 0;
    let cpt = 0;
    let moy = 0;

    for(let i = 0;i<bib.length;i++){
        S += bib[i].price;
        cpt++;

    }

    if(cpt != 0){
        moy = S/cpt;
    }

    return moy.toFixed(2);
}

function displaymoy(){

    let moy = calculateMoy();
    document.querySelector(".display-moy").innerHTML = `${moy} Da`;

    setTimeout(()=>{
        document.querySelector(".display-moy").innerHTML = '';
    }, 3000);

}

document.querySelector(".moy-button").addEventListener('click', ()=>{
    displaymoy();
});


function findMax(){

    let max = bib[0];

    for(let i = 1;i<bib.length;i++){
        if(max.price < bib[i].price){
            max = bib[i];
        }
    }

    return max;

    
}

function displayMax(){

    let max = findMax();

    if(max != null){

        document.querySelector(".max-code").innerHTML = `${max.code}`;
        document.querySelector(".max-title").innerHTML = `${max.title}`;
        document.querySelector(".max-author").innerHTML = `${max.author}`;
        document.querySelector(".max-price").innerHTML = `${max.price}`;

        setTimeout(()=>{
                    document.querySelector(".max-code").innerHTML = '';
        document.querySelector(".max-title").innerHTML =  '';
        document.querySelector(".max-author").innerHTML = '';
        document.querySelector(".max-price").innerHTML = '';

        }, 5000);
    }
}

document.querySelector(".max-button").addEventListener('click', ()=>{
    displayMax();
});

function findMin(){

    let min = bib[0];

    for(let i = 0;i<bib.length;i++){

        if(bib[i].price < min.price){
            min = bib[i];
        }

    }

    return min;
}

function displayMin(){

    let min = findMin();

    if(min != null){
        document.querySelector(".min-code").innerHTML = `${min.code}`;
        document.querySelector(".min-title").innerHTML = `${min.title}`;
        document.querySelector(".min-author").innerHTML = `${min.author}`;
        document.querySelector(".min-price").innerHTML = `${min.price}`;


          setTimeout(()=>{
                            document.querySelector(".min-code").innerHTML = '';
        document.querySelector(".min-title").innerHTML = '';
        document.querySelector(".min-author").innerHTML ='';
        document.querySelector(".min-price").innerHTML = '';
          }, 5000);

    }
}

document.querySelector(".min-button").addEventListener('click', ()=>{
    displayMin();
});



function modifyBib(){

    let codeInput = document.querySelector(".modif-code");
    let titleInput = document.querySelector(".modif-title");
    let authorInput = document.querySelector(".modif-author");
    let priceInput = document.querySelector(".modif-price");

    let code = codeInput.value;
    let title = titleInput.value;
    let author = authorInput.value;
    let price = priceInput.value;

    let trouve = false;
    let i = 0;
    if(code === '' || title === '' || author === '' || price === ''){
        document.querySelector(".modif-result").innerHTML = 'Enter all the correct information';
    }else if(Number(price) < 0){
        document.querySelector(".modif-result").innerHTML = 'The price must be a positive number';
    }else{

        document.querySelector(".modif-result").innerHTML = '';

    while(i<bib.length && (!trouve)){
        if(bib[i].code === Number(code)){
            bib[i].title = title;
            bib[i].author = author;
            bib[i].price = Number(price);
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){
        document.querySelector(".modif-result").innerHTML = 'Modification done with success';

        displayBib();
    }else{
        document.querySelector(".modif-result").innerHTML = 'Code not found';
    }

    codeInput.value = '';
    titleInput.value = ''
    authorInput.value = '';
    priceInput.value = '';
}


}


document.querySelector(".modif-button").addEventListener('click', ()=>{
    modifyBib();
});

function sortBib(){

    for(let i = 0;i<bib.length-1;i++){
        for(let j = i+1;j<bib.length;j++){

            if(bib[i].price > bib[j].price){
                let temp = bib[i];
                bib[i] = bib[j];
                bib[j] = temp;
            }
        }
    }

    let sortHtml = '';

    for(let i = 0;i<bib.length;i++){

          let html = `
        
           <div class="book">
              <p class="code">${bib[i].code}</p>
              <p class="title">${bib[i].title}</p>
               <p class="author">${bib[i].author}</p>  
               <p class="price">${bib[i].price} Da</p>

            </div>
        
        `;
        
        sortHtml += html;
    }

    document.querySelector(".display-sort").innerHTML = sortHtml;


}

document.querySelector(".sort-button").addEventListener('click', ()=>{
    sortBib();
});

