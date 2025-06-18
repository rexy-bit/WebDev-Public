let etud = JSON.parse(localStorage.getItem('etud'));

let intervalId;
function modifEmp(){


    let codeIn = document.querySelector(".m-code");
    let nomIn = document.querySelector(".m-nom");
    let prenomIn = document.querySelector(".m-prenom");
    let ageIn = document.querySelector(".m-age");
    let moyIn = document.querySelector(".m-moy");

    let code = codeIn.value;
    let nom = nomIn.value;
    let prenom = prenomIn.value;
    let age = ageIn.value;
    let moy = moyIn.value;


    if(code === '' || nom === '' || prenom === ''|| age === '' || moy === ''){
        document.querySelector(".modif-result").innerHTML = 'Please enter all the necessary information';
    }else if(isNaN(moy) || isNaN(age)){

        document.querySelector(".modif-result").innerHTML = 'The mean and the age must contain only numbers';

    }else if(Number(age) < 0 || Number(moy) < 0){
        document.querySelector(".modif-result").innerHTML = 'Please the age and mean must be positive';
    }else if(Number(moy) > 20){
        document.querySelector(".modif-result").innerHTML = 'Please the mean must be inthe range of [0, 20]';
    }else{

        let trouve = false;
        let i = 0;

        while(i<etud.length && (!trouve)){

            if(etud[i].code === code){
                trouve = true;
                etud[i].nom = nom;
                etud[i].prenom = prenom;
                etud[i].age = Number(age);
                etud[i].moy = Number(moy);


            }else{
                i++;
            }

        }

        if(!trouve){

            clearInterval(intervalId);
           document.querySelector(".modif-result").innerHTML = 'student not found';

           intervalId = setTimeout(()=>{
            document.querySelector(".modif-result").innerHTML = '';
           }, 3000);
        }else{

            codeIn.value = '';
            nomIn.value ='';
            prenomIn.value = '';
            ageIn.value = '';
            moyIn.value = '';

            localStorage.setItem('etud', JSON.stringify(etud));
            clearInterval(intervalId);

         document.querySelector(".modif-result").innerHTML = 'Modification done with success';

           intervalId = setTimeout(()=>{
            document.querySelector(".modif-result").innerHTML = '';
           },3000);

        }

    }

}


document.querySelector(".modif-button").addEventListener('click', ()=>{
    modifEmp();
});