let film = JSON.parse(localStorage.getItem('film')) || [{
    title : 'The Godfather',
    producer : 'Francis Ford Coppola',
    year : 1972,
    type : 'Mafia',
    note : 10
}];


displayMovie();

function displayMovie(){

    const container = document.querySelector(".display-content");
    container.innerHTML = '';

    for(let i = 0;i<film.length;i++){

        const movieDiv = document.createElement("div");
        movieDiv.className = "movie";

        const titleP = document.createElement("p");
        titleP.classList = "title";
        titleP.textContent = `- Title : ${film[i].title}`;

        const producerP  = document.createElement("p");
        producerP.className = "producer";
        producerP.textContent = `- Producer : ${film[i].producer}`;

        const typeP = document.createElement("p");
        typeP.className = "type";
        typeP.textContent = `- Type : ${film[i].type}`;


        const yearP = document.createElement("p");
        yearP.className = "year";
        yearP.textContent = `- Year : ${film[i].year}`;

        const noteP = document.createElement("p");
        noteP.className = "note";
        noteP.textContent = `- Note : ${film[i].note}`;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', ()=>{
            film.splice(i, 1);
            displayMovie();
        });

        movieDiv.appendChild(titleP);
         movieDiv.appendChild(producerP);
          movieDiv.appendChild(yearP);
           movieDiv.appendChild(typeP);
            movieDiv.appendChild(noteP);
             movieDiv.appendChild(deleteButton);

    
             container.appendChild(movieDiv);

    }

    localStorage.setItem('film', JSON.stringify(film));
}


function addMovie(){

    let titleIn = document.querySelector(".input-title");
    let producerIn = document.querySelector(".input-producer");
    let yearIn = document.querySelector(".input-year");
    let typeIn = document.querySelector(".input-type");
    let noteIn = document.querySelector(".input-note");

    let title = titleIn.value;
    let producer = producerIn.value;
    let year = yearIn.value;
    let type = typeIn.value;
    let note = noteIn.value;

    if(title === '' || producer === '' || year === '' || type === '' || note === ''){
       document.querySelector(".display-error-message").innerHTML = 'Please enter all the necessary information';

    }else if(isNaN(year) || isNaN(note)){
        document.querySelector(".display-error-message").innerHTML = 'Please the year and the type must contain only numbers';
    }else if(Number(year) < 0){
         document.querySelector(".display-error-message").innerHTML = 'The year must be positive';
    }else if(Number(note) < 0 || Number(note) > 10){
         document.querySelector(".display-error-message").innerHTML = 'The rate must be between 0 and 10';
    }else{

         document.querySelector(".display-error-message").innerHTML = '';

         film.push({
            title,
            producer,
            year : Number(year),
            type,
            note : Number(note)
         });

         displayMovie();

          document.querySelector(".display-success-message").innerHTML = 'Film added with success';

          setTimeout(()=>{
             document.querySelector(".display-success-message").innerHTML = '';
          },3000);

          titleIn.value = '';
   producerIn.value = '';
    yearIn.value = '';
    typeIn.value = '';
    noteIn.value = '';

    }
}


document.querySelector(".add-button").addEventListener('click', ()=>{
    addMovie();
});


function searchMovie(){

   let searchIn = document.querySelector(".search-title");

   title = searchIn.value;

   let trouve = false;
   let i = 0;

   while(i<film.length && (!trouve)){

      if(film[i].title.toLowerCase() === title.toLowerCase()){
        trouve = true;
      }else{
        i++;
      }
   }

   if(trouve){

    document.querySelector(".display-search-result").innerHTML = 'Movie found';

    setTimeout(()=>{
         document.querySelector(".display-search-result").innerHTML = '';
    }, 3000);

       const container = document.querySelector(".display-search");

       container.innerHTML = '';

       let movieDiv = document.createElement("div");
       movieDiv.className = "movie";
       
       const titleP = document.createElement("p");
       titleP.className = "title";
       titleP.textContent = `- Titre : ${film[i].title}`;

       const producerP = document.createElement("p");
       producerP.className = "producer";
       producerP.textContent = `- Producer : ${film[i].producer}`;

       const yearP = document.createElement("p");
       yearP.className = "year";
       yearP.textContent = `- Year : ${film[i].year}`;

       const typeP = document.createElement("p");
       typeP.className = "type";
       typeP.textContent = `- Type : ${film[i].type}`;

       const noteP = document.createElement("p");
       noteP.className = "note";
       noteP.textContent = `- Note : ${film[i].note} / 10`;

       movieDiv.appendChild(titleP);
       movieDiv.appendChild(producerP);
       movieDiv.appendChild(yearP);
       movieDiv.appendChild(typeP);
       movieDiv.appendChild(noteP);

       container.appendChild(movieDiv);

       setTimeout(()=>{
        container.innerHTML = '';
       }, 5000);

   }else{
    document.querySelector(".display-search-result").innerHTML = 'Movie not found';

        setTimeout(()=>{
         document.querySelector(".display-search-result").innerHTML = '';
    }, 3000);
   }

}


document.querySelector(".search-button").addEventListener('click', ()=>{
    searchMovie();
});


function findMax(){

    let max = film[0];

    for(let i = 0;i<film.length;i++){

        if(film[i].year > max.year){
            max = film[i];
        }
    }

    return max;

}


function displayMax(){

    let max = findMax();

    if( max != null){

        let container = document.querySelector(".display-recent");

        container.innerHTML = '';

         let movieDiv = document.createElement("div");
       movieDiv.className = "movie";
       
       const titleP = document.createElement("p");
       titleP.className = "title";
       titleP.textContent = `- Titre : ${max.title}`;

       const producerP = document.createElement("p");
       producerP.className = "producer";
       producerP.textContent = `- Producer : ${max.producer}`;

       const yearP = document.createElement("p");
       yearP.className = "year";
       yearP.textContent = `- Year : ${max.year}`;

       const typeP = document.createElement("p");
       typeP.className = "type";
       typeP.textContent = `- Type : ${max.type}`;

       const noteP = document.createElement("p");
       noteP.className = "note";
       noteP.textContent = `- Note : ${max.note} / 10`;

       movieDiv.appendChild(titleP);
       movieDiv.appendChild(producerP);
       movieDiv.appendChild(yearP);
       movieDiv.appendChild(typeP);
       movieDiv.appendChild(noteP);

       container.appendChild(movieDiv);

       setTimeout(()=>{
        container.innerHTML = '';
       }, 5000);




    }
}

document.querySelector(".max-button").addEventListener('click', ()=>{
    displayMax();
});


function findMin(){

    let min = film[0];

    for(let i = 0;i<film.length;i++){

        if(film[i].year < min.year){

            min = film[i];

        }

    }

    return min;
   
    
}

function displayMin(){

        let min = findMin();

    if( min != null){

        let container = document.querySelector(".display-old");

        container.innerHTML = '';

         let movieDiv = document.createElement("div");
       movieDiv.className = "movie";
       
       const titleP = document.createElement("p");
       titleP.className = "title";
       titleP.textContent = `- Titre : ${min.title}`;

       const producerP = document.createElement("p");
       producerP.className = "producer";
       producerP.textContent = `- Producer : ${min.producer}`;

       const yearP = document.createElement("p");
       yearP.className = "year";
       yearP.textContent = `- Year : ${min.year}`;

       const typeP = document.createElement("p");
       typeP.className = "type";
       typeP.textContent = `- Type : ${min.type}`;

       const noteP = document.createElement("p");
       noteP.className = "note";
       noteP.textContent = `- Note : ${min.note} / 10`;

       movieDiv.appendChild(titleP);
       movieDiv.appendChild(producerP);
       movieDiv.appendChild(yearP);
       movieDiv.appendChild(typeP);
       movieDiv.appendChild(noteP);

       container.appendChild(movieDiv);

       setTimeout(()=>{
        container.innerHTML = '';
       }, 5000);




    }

}

document.querySelector(".min-button").addEventListener('click', ()=>{
    displayMin();
});


function modifyFilm(){


        let titleIn = document.querySelector(".modif-title");
    let producerIn = document.querySelector(".modif-producer");
    let yearIn = document.querySelector(".modif-year");
    let typeIn = document.querySelector(".modif-type");
    let noteIn = document.querySelector(".modif-note");

    let title = titleIn.value;
    let producer = producerIn.value;
    let year = yearIn.value;
    let type = typeIn.value;
    let note = noteIn.value;

    if(title === '' || producer === '' || year === '' || type === '' || note === ''){
       document.querySelector(".display-modif-message").innerHTML = 'Please enter all the necessary information';

    }else if(isNaN(year) || isNaN(note)){
        document.querySelector(".display-modif-message").innerHTML = 'Please the year and the type must contain only numbers';
    }else if(Number(year) < 0){
         document.querySelector(".display-modif-message").innerHTML = 'The year must be positive';
    }else if(Number(note) < 0 || Number(note) > 10){
         document.querySelector(".display-modif-message").innerHTML = 'The rate must be between 0 and 10';
    }else{

        let trouve = false;
        let i = 0;

        while(i<film.length && (!trouve)){

            if(film[i].title.toLowerCase() === title.toLowerCase()){
                film[i].producer = producer;
                film[i].year = Number(year);
                film[i].type = type;
                film[i].note = Number(note);
                trouve = true;
            }else{
                i++;
            }

        }

        if(trouve){
           document.querySelector(".display-modif-message").innerHTML = 'Modification done with success';

           displayMovie();

                     titleIn.value = '';
   producerIn.value = '';
    yearIn.value = '';
    typeIn.value = '';
    noteIn.value = '';



        }else{
            document.querySelector(".display-modif-message").innerHTML = 'Movie not found';
        }

        

    }
   
}


document.querySelector(".modify-button").addEventListener('click', ()=>{
    modifyFilm();
});



function sortFilm(){


    for(let i = 0;i<film.length - 1;i++){
        for(let j = i+1;j<film.length;j++){
            if(film[i].year > film[j].year){
                let temp = film[i];
                film[i] = film[j];
                film[j] = temp;
            }
        }
    }


    const container = document.querySelector(".display-sort");
    container.innerHTML = '';

    for(let i = 0;i<film.length;i++){


                const movieDiv = document.createElement("div");
        movieDiv.className = "movie";

        const titleP = document.createElement("p");
        titleP.classList = "title";
        titleP.textContent = `- Title : ${film[i].title}`;

        const producerP  = document.createElement("p");
        producerP.className = "producer";
        producerP.textContent = `- Producer : ${film[i].producer}`;

        const typeP = document.createElement("p");
        typeP.className = "type";
        typeP.textContent = `- Type : ${film[i].type}`;


        const yearP = document.createElement("p");
        yearP.className = "year";
        yearP.textContent = `- Year : ${film[i].year}`;

        const noteP = document.createElement("p");
        noteP.className = "note";
        noteP.textContent = `- Note : ${film[i].note}`;


        movieDiv.appendChild(titleP);
        movieDiv.appendChild(producerP);
        movieDiv.appendChild(yearP);
        movieDiv.appendChild(typeP);
        movieDiv.appendChild(noteP);

        container.appendChild(movieDiv);

    }



}



document.querySelector(".sort-button").addEventListener('click', ()=>{
    sortFilm();
});
