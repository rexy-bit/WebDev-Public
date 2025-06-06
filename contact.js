let contact = JSON.parse(localStorage.getItem('contact')) || [
    {
        code : '0',
        nom : 'Rezgui',
         prenom : 'Yanis',
        num : '0554337845',
        adresse : '23 rue Ahmed Alger'
    }
];


displayContact();

function displayContact(){

    let contactHtml = '';

    for(let i = 0;i<contact.length;i++){

        let html = `
           


        <div class="contact">
            <p class="code">${contact[i].code}</p>
            <p class="nom">${contact[i].nom}</p>
            <p class="prenom">${contact[i].prenom}</p>
            <p class="num">${contact[i].num}</p>
            <p class="adresse">${contact[i].adresse}</p>

            <button class="delete-button" onclick="
               contact.splice(${i}, 1);
               displayContact();
            ">
              Delete
            </button>
        </div>
        `;

        contactHtml += html;
    }

    document.querySelector(".display-content").innerHTML = contactHtml;
    localStorage.setItem('contact', JSON.stringify(contact));

}

function addContact(){

    let codeInput = document.querySelector(".input-code");
    let nomInput = document.querySelector(".input-nom");
    let prenomInput = document.querySelector(".input-prenom");
    let numInput = document.querySelector(".input-num");
    let adresseInput = document.querySelector(".input-adresse");

    let code = codeInput.value;
    let nom = nomInput.value;
    let prenom = prenomInput.value;
    let num =numInput.value;
    let adresse = adresseInput.value;

    let trouve = false;
    let i = 0;
 
    while(i<contact.length && (!trouve)){
     
         if(contact[i].code === code){
          trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){   
            document.querySelector(".display-error-message").innerHTML = 'The code you entered already exists please try another one';
    } else if(code === '' || nom === '' || prenom === '' || num === '' || adresse === ''){
            document.querySelector(".display-error-message").innerHTML = 'Please make sure you enter all the information';

        }else if(isNaN(num)){
            document.querySelector(".display-error-message").innerHTML = 'Please the phone number must contain only numbers';
        }else{
        document.querySelector(".display-error-message").innerHTML = '';

            contact.push({
                code,
                nom,
                prenom,
                num,
                adresse
            });

            displayContact();

            document.querySelector(".display-success-message").innerHTML = 'Contact added successfully';

            codeInput.value= '';
            nomInput.value = '';
            prenomInput.value = '';
            numInput.value = '';
            adresseInput.value = '';

            setTimeout(()=>{
                document.querySelector(".display-success-message").innerHTML ='';
            }, 5000);

        }

}

let addButton = document.querySelector(".add-button");
addButton.addEventListener('click', ()=>{
    addContact();
});

function search(){

    let trouve = false;

    let codeInput = document.querySelector(".enter-code");
    let code = codeInput.value;

    let i = 0;

    while(i<contact.length && (!trouve)){
        if(code === contact[i].code){
            trouve = true;
        }else{
            i++;
        }
    }

    if(!trouve){
        document.querySelector(".display-found").innerHTML = 'contact not found';
        setTimeout(()=>{
             document.querySelector(".display-found").innerHTML = '';
        }, 3000);
    }else{

        document.querySelector(".display-found").innerHTML = 'Contact found !';
        
        document.querySelector(".d-code").innerHTML = `${contact[i].code}`;
        document.querySelector(".d-nom").innerHTML = `${contact[i].nom}`;
        document.querySelector(".d-prenom").innerHTML = `${contact[i].prenom}`;
        document.querySelector(".d-num").innerHTML =`${contact[i].num}`;
        document.querySelector(".d-adresse").innerHTML = `${contact[i].adresse}`;

        setTimeout(()=>{
            document.querySelector(".d-code").innerHTML ='';
        document.querySelector(".d-nom").innerHTML = '';
        document.querySelector(".d-prenom").innerHTML = '';
        document.querySelector(".d-num").innerHTML ='';
        document.querySelector(".d-adresse").innerHTML ='';
        document.querySelector(".display-found").innerHTML ='';
        }, 5000);


    }
}

const searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', ()=>{
    search();
});


function edit(){

    let codeInput = document.querySelector(".edit-code");
    let nomInput = document.querySelector(".edit-nom");
    let prenomInput = document.querySelector(".edit-prenom");
    let numInput = document.querySelector(".edit-num");
    let adresseInput = document.querySelector(".edit-adresse");

    let code = codeInput.value;
    let prenom = prenomInput.value;
    let nom = nomInput.value;
    let num = numInput.value;
    let adresse = adresseInput.value;

    let trouve = false;
    let i = 0;
    
    while(i<contact.length && (!trouve)){
        if(contact[i].code === code){
            trouve = true;

        }else{
            i++;
        }
    }

    if(trouve){

        if(nom === '' || prenom === '' || num === '' || adresse === ''){
            document.querySelector(".display-error-edit").innerHTML = 'Please enter all the required information';
        }else if(isNaN(num)){
             document.querySelector(".display-error-edit").innerHTML = 'The phone number must containe only numbers';
        }else{
            trouve = false;
            i = 0;

            while(i<contact.length && (!trouve)){
                if(code === contact[i].code){
                    contact[i].prenom = prenom;
                    contact[i].nom = nom;
                    contact[i].num = num;
                    contact[i].adresse = adresse;
                    trouve = true;
                    displayContact();
                }else{
                    i++;
                }
            }

            document.querySelector(".display-success-edit").innerHTML = 'Contact edited with success !';



            setTimeout(()=>{
                 document.querySelector(".display-success-edit").innerHTML = '';
            }, 3000);

            
        }
    }else{
        document.querySelector(".display-error-edit").innerHTML = 'Contact not found';

        setTimeout(()=>{
            document.querySelector(".display-error-edit").innerHTML = '';
        },3000);
    }

    codeInput.value = '';
    nomInput.value = '';
    prenomInput.value = '';
    numInput.value = '';
    adresseInput.value = '';
    
}

const editButton = document.querySelector(".edit-button");

editButton.addEventListener('click', ()=>{
    edit();
});