let bib = JSON.parse(localStorage.getItem('bib')) || [
    {
        titre : 'The 48 laws of power',
        auteur : 'Robert Green',
        date : '2003'
    },{
        titre : 'le prince',
        auteur : 'Niccolo mechiavelli',
        date : '1600'
    }
];

displayBib();
function displayBib(){

    let bibHtml = '';

    for(let i = 0;i<bib.length;i++){
        let book = bib[i];
        let titre = book.titre;
        let auteur = book.auteur;
        let date = book.date;

        let html = `
          <div class="book">
             <p class="name">
               ${titre}
             </p>

             <p class="auteur">
               ${auteur}
             </p>

             <p class="date">
               ${date} 
             </p>

             <button class="delete-button" onclick="
                bib.splice(${i}, 1);
                displayBib();
             ">
               Supprimer
             </button>
          </div>
        `;

        bibHtml += html;
    }

    document.querySelector(".display-bib").innerHTML = bibHtml;
    localStorage.setItem('bib', JSON.stringify(bib));
}

function addBook(){

    let titreInput = document.querySelector(".input-titre");
    let auteurInput = document.querySelector(".input-auteur");
    let dateInput = document.querySelector(".input-date");

    let titre = titreInput.value;
    let auteur = auteurInput.value;
    let date = dateInput.value;

    if(titre === '' || auteur === '' || date === ''){
         document.querySelector(".display-error-message").innerHTML = 'S\'il vous plait verifiez que vous avez entrez toutes vos informations correctement';
    }else{
     document.querySelector(".display-error-message").innerHTML = '';
    let bookObject =({
        titre,
        auteur,
        date
    });

    bib.push(bookObject);
    displayBib();
   }
}