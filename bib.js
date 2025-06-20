let bib = JSON.parse(localStorage.getItem('bib')) || [{

    title : 'The Prince',
    author : 'Niccolo Mechiavelli',
    gender : 'Politics, history',
    rate : 9,
    state : 'Nread'
}];


displayBib();

function displayBib(){


    let container = document.querySelector(".display-content");
    container.innerHTML = '';

    bib.forEach((book,i)=>{

        const bookD = document.createElement("div");
        bookD.className = "book-div";
        

        const titleD = document.createElement("div");
        titleD.className = "title";
        titleD.textContent = `- Title : ${book.title}`;

        const authorD = document.createElement("div");
        authorD.className = "author";
        authorD.textContent = `- Author : ${book.author}`;

        const genderD = document.createElement("div");
        genderD.className = "gender";
        genderD.textContent = `- Gender : ${book.gender}`;

        const rateD = document.createElement("div");
        rateD.className = "rate";
        rateD.textContent = `- Rate : ${book.rate}/10`;

        const stateButton = document.createElement("button");
        stateButton.className = "state-button";
        if(book.state === 'read'){
            stateButton.style.backgroundColor = "green";

        }else{
            stateButton.style.backgroundColor = "transparent";
        }


        stateButton.addEventListener('click', ()=>{
            if(book.state === 'read'){
                book.state = 'Nread';
                stateButton.style.backgroundColor = "transparent";
            }else{
                book.state = 'read';
                stateButton.style.backgroundColor = "green";
            }

            localStorage.setItem('bib', JSON.stringify(bib));
        });


        const deleteButton = document.createElement("button")
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', ()=>{
            bib.splice(i , 1);
            displayBib();
        });


        bookD.appendChild(titleD);
        bookD.appendChild(authorD);
        bookD.appendChild(genderD);
        bookD.appendChild(rateD);
        bookD.appendChild(stateButton);
        bookD.appendChild(deleteButton);

        container.appendChild(bookD);

    });

    localStorage.setItem('bib', JSON.stringify(bib));


}


let timeId1;
function addBook(){

    
    let titleIn = document.querySelector(".input-title");
    let authorIn = document.querySelector(".input-author");
    let genderIn = document.querySelector(".input-gender");
    let rateIn = document.querySelector(".input-rate");

    let title = titleIn.value;
    let author = authorIn.value;
    let gender = genderIn.value;
    let rate = rateIn.value;

     let trouve = false;
        let i = 0;

        while(i<bib.length && (!trouve)){
            if(title.toLowerCase() === bib[i].title.toLowerCase()){

           trouve = true;
            }else{
                i++;
            }
        }

        if(trouve){
                          document.querySelector(".display-error-message").innerHTML = 'The book you entered already exists';
        }else if(title === '' || author === ''|| gender === ''|| rate === ''){
        document.querySelector(".display-error-message").innerHTML = 'Please enter all the necessary information';
    }else if(isNaN(rate) || Number(rate) < 0|| Number(rate) > 10){
                        document.querySelector(".display-error-message").innerHTML = 'Please the rate must be a number between 0 and 10';

    }else{

                      document.querySelector(".display-error-message").innerHTML = '';

        bib.push({
            title,
            author,
            gender,
            rate : Number(rate),
            state : 'Ndone'
        });

        displayBib();

            document.querySelector(".display-success-message").innerHTML = 'Book entered with success';
        clearTimeout(timeId1);
        timeId1 = setTimeout(()=>{
            document.querySelector(".display-success-message").innerHTML = '';
        }, 3000);

        titleIn.value = '';
        authorIn.value = '';
        genderIn.value = '';
        rateIn.value = '';

    }
}

document.querySelector(".add-button").addEventListener('click', ()=>{
    addBook();
});


let timeId2;
let timeId3;

function searchBook(){

    let titleIn = document.querySelector(".search-code");

    let title = titleIn.value;

    let trouve = false;
    let i = 0;

    while(i<bib.length && (!trouve)){
        if(title.toLowerCase() === bib[i].title.toLowerCase()){
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){
        document.querySelector(".search-result").innerHTML = 'Book found !';

        clearTimeout(timeId2);

        timeId2 = setTimeout(()=>{
            document.querySelector(".search-result").innerHTML = '';
        },3000);

        const container = document.querySelector(".display-search");
        container.innerHTML = '';

            const bookD = document.createElement("div");
        bookD.className = "book-div";
        

        const titleD = document.createElement("div");
        titleD.className = "title";
        titleD.textContent = `- Title : ${bib[i].title}`;

        const authorD = document.createElement("div");
        authorD.className = "author";
        authorD.textContent = `- Author : ${bib[i].author}`;

        const genderD = document.createElement("div");
        genderD.className = "gender";
        genderD.textContent = `- Gender : ${bib[i].gender}`;

        const rateD = document.createElement("div");
        rateD.className = "rate";
        rateD.textContent = `- Rate : ${bib[i].rate}/10`;

        bookD.appendChild(titleD);
        bookD.appendChild(authorD);
        bookD.appendChild(genderD);
        bookD.append(rateD);

        container.appendChild(bookD);

        clearInterval(timeId3);
        setTimeout(()=>{
           container.innerHTML = '';
        }, 4000);

        titleIn.value = '';

    }else{
        document.querySelector(".search-result").innerHTML = 'Book not found !';

        clearTimeout(timeId2);
        
        timeId2 = setTimeout(()=>{
            document.querySelector(".search-result").innerHTML = '';
        },3000);

    }

}


document.querySelector(".search-button").addEventListener('click', ()=>{
    searchBook();
});


function modifBook(){

        let titleIn = document.querySelector(".m-title");
    let authorIn = document.querySelector(".m-author");
    let genderIn = document.querySelector(".m-gender");
    let rateIn = document.querySelector(".m-rate");

    let title = titleIn.value;
    let author = authorIn.value;
    let gender = genderIn.value;
    let rate = rateIn.value;

    let trouve = false;
    let i = 0;

    while(i<bib.length && (!trouve)){

        if(title.toLowerCase() === bib[i].title.toLowerCase()){
            trouve = true;
        }else{
            i++;
        }
    }

    if(!trouve){
          document.querySelector(".modif-result").innerHTML = 'Book not found';
    }else if(title === ''|| author === '' || gender === ''|| rate === ''){
        document.querySelector(".modif-result").innerHTML = 'Please enter all the necessary information';
    }else if(isNaN(rate) || Number(rate) < 0 || Number(rate)>20){
        document.querySelector(".modif-result").innerHTML = 'Please the rate must be a number between 0 and 20';
    }else{

        bib[i].title = title;
        bib[i].author = author;
        bib[i].gender = gender;
        bib[i].rate = Number(rate);
        bib[i].state = 'Ndone';

        displayBib();

        document.querySelector(".modif-result").innerHTML = 'Modification done with succes';

        setTimeout(()=>{
            document.querySelector(".modif-result").innerHTML = '';
        }, 3000);

        titleIn.value = '';
        authorIn.value = '';
        genderIn.value = '';
        rateIn.value = '';
    }
}


document.querySelector(".modif-button").addEventListener('click', ()=>{
    modifBook();
});

let timeId4;
function displayNbrBooks(){

    clearTimeout(timeId4);

    document.querySelector(".display-nbr").innerHTML = `${bib.length}`;

    timeId4 = setTimeout(()=>{
        document.querySelector(".display-nbr").innerHTML = '';
    }, 3000);
    
}


document.querySelector(".nbr-button").addEventListener('click', ()=>{
    displayNbrBooks();
});

let timeId5;
function displayNbrRead(){

    let cpt = 0;

    bib.forEach((book, i)=>{
        if(book.state === 'read'){
            cpt++;
        }
    });

    clearInterval(timeId5);

    document.querySelector(".display-read").innerHTML = `${cpt}`;

    timeId5 = setTimeout(()=>{
        document.querySelector(".display-read").innerHTML = '';
    },3000);

    
}

document.querySelector(".read-button").addEventListener('click', ()=>{
    displayNbrRead();
});


let timeId6;
function displayNbrNread(){

    let cpt = 0;

    bib.forEach((book, i)=>{
        if(book.state !== 'read'){
            cpt++;
        }
    });


    document.querySelector(".display-Nread").innerHTML = `${cpt}`;

    timeId6 = setTimeout(()=>{
         document.querySelector(".display-Nread").innerHTML = '';
    },3000);


}

document.querySelector(".Nread-button").addEventListener('click', ()=>{
    displayNbrNread();
});


function calculateMoy(){

    let moy = 0;
    let cpt = 0,S = 0;

    bib.forEach((book)=>{
        S += Number(book.rate);
        cpt++;
    });

    moy = S/cpt;

    return moy.toFixed(2);

}


let timeId7;
function displayMoy(){


    let moy = calculateMoy();

    document.querySelector(".display-rate").innerHTML = `${moy}/10`;


    clearTimeout(timeId7);

    timeId7 = setTimeout(()=>{
        document.querySelector(".display-rate").innerHTML = '';
    }, 3000);


}

document.querySelector(".rate-button").addEventListener('click', ()=>{
    displayMoy();
});

