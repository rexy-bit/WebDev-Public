let dep = JSON.parse(localStorage.getItem('dep')) || [
    {
        type : "revenu",
        description : "salaire",
        montant : 120000,
        date : "15/06/2025",
    

    }
];

dispDep();


function dispDep(){


    let container = document.querySelector(".display-content");
    container.innerHTML = '';

    dep.forEach((element, i) =>{

        let depDiv = document.createElement("div");
        if(element.type === "revenu"){
            depDiv.className = "revenuDiv";
        }else{
            depDiv.className = "depenseDiv";
        }

        const typeDiv = document.createElement("div");
        typeDiv.className = "type";
        typeDiv.textContent = `- Type : ${element.type}`;

        const descriptionDiv = document.createElement("div");
        descriptionDiv.className = "description";
        descriptionDiv.textContent = `- Description : ${element.description}`;

        const montantDiv = document.createElement("div");
        montantDiv.className = "montant";
        montantDiv.textContent = `- Montant : ${element.montant} DA`;

        const dateDiv = document.createElement("div");
        dateDiv.className = "date";
        dateDiv.textContent = `- Date : ${element.date}`;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', ()=>{
            dep.splice(i, 1);
            dispDep();
        });


        depDiv.appendChild(typeDiv);
        depDiv.appendChild(descriptionDiv);
        depDiv.appendChild(montantDiv);
        depDiv.appendChild(dateDiv);
        depDiv.appendChild(deleteButton);


        container.appendChild(depDiv);

    });

    localStorage.setItem('dep', JSON.stringify(dep));

}


function addDep(){


    let typeIn = document.querySelector(".input-type");
    let descriptionIn = document.querySelector(".input-description");
    let montantIn = document.querySelector(".input-montant");
    let dateIn = document.querySelector(".input-date");

    let type = typeIn.value;
    let description = descriptionIn.value;
    let montant = montantIn.value;
    let date = dateIn.value;

    
    if(type !== '1' && type !== '2'){
        document.querySelector(".display-error-message").innerHTML = 'Please the type must be 1 or 2';
    }else if(type === '' || description === '' || montant === '' || date === ''){
        document.querySelector(".display-error-message").innerHTML = 'Enter all the necessary information';

        
    }else if(isNaN(montant)){
            document.querySelector(".display-error-message").innerHTML = 'le montant doit contenir seulement des chiffres';

    }else if(Number(montant) < 0){
        document.querySelector(".display-error-message").innerHTML = 'svp le montant doit etre positif';
        
    }else{

         document.querySelector(".display-error-message").innerHTML = '';

         if(type === "1"){
            type = "revenu";
         }else{
            type = "depense";
         }

        dep.push({
          type,
          description,
          montant : Number(montant),
          date,
        });

        dispDep();

                     document.querySelector(".display-success-message").innerHTML = 'Depense ajoute avec succes';

        setTimeout(()=>{
           document.querySelector(".display-success-message").innerHTML = '';
        }, 3000);

        typeIn.value = '';
        descriptionIn.value = '';
        montantIn.value = '';
        dateIn.value = '';


    }
}

document.querySelector(".add-button").addEventListener('click', ()=>{
    addDep();
});


function dispRev(){

    let container = document.querySelector(".display-revenu");
    container.innerHTML = '';


    dep.forEach((element, i)=>{


        if(element.type === "revenu"){

            let depDiv = document.createElement("div");
            depDiv.className = "revenuDiv";

            const typeDiv = document.createElement("div");
            typeDiv.className = "type";
            typeDiv.textContent = `- Type : ${element.type}`;

            const descriptionDiv = document.createElement("div");
            descriptionDiv.className = "description";
            descriptionDiv.textContent = `- Description : ${element.description}`;

            const montantDiv = document.createElement("div");
            montantDiv.className = "montant";
            montantDiv.textContent = `- Montant : ${element.montant}`;

            const dateDiv = document.createElement("div");
            dateDiv.className = "date";
            dateDiv.textContent = `- Date : ${element.date}`;

            depDiv.appendChild(typeDiv);
            depDiv.appendChild(descriptionDiv);
            depDiv.appendChild(montantDiv);
            depDiv.appendChild(dateDiv);

            container.appendChild(depDiv);
        }

    });

}


document.querySelector(".revenu-button").addEventListener('click', ()=>{
    dispRev();
});


function dispDepense(){

    let container = document.querySelector(".display-depense");
    container.innerHTML = '';


    dep.forEach((element, i)=>{


        if(element.type === "depense"){

            let depDiv = document.createElement("div");
            depDiv.className = "depenseDiv";

            const typeDiv = document.createElement("div");
            typeDiv.className = "type";
            typeDiv.textContent = `- Type : ${element.type}`;

            const descriptionDiv = document.createElement("div");
            descriptionDiv.className = "description";
            descriptionDiv.textContent = `- Description : ${element.description}`;

            const montantDiv = document.createElement("div");
            montantDiv.className = "montant";
            montantDiv.textContent = `- Montant : ${element.montant}`;

            const dateDiv = document.createElement("div");
            dateDiv.className = "date";
            dateDiv.textContent = `- Date : ${element.date}`;

            depDiv.appendChild(typeDiv);
            depDiv.appendChild(descriptionDiv);
            depDiv.appendChild(montantDiv);
            depDiv.appendChild(dateDiv);

            container.appendChild(depDiv);

        }

    });

}

document.querySelector(".depense-button").addEventListener('click', ()=>{
    dispDepense();
});


function dispSolde(){

    let soldeRev = 0;
    let soldeDep = 0;

    dep.forEach((element, i)=>{

        if(element.type === "revenu"){
            soldeRev += element.montant;
        }else{
            soldeDep += element.montant;
        }
    });

    const container = document.querySelector(".display-solde");
    container.innerHTML = '';

    const revDiv = document.createElement("div");
    revDiv.className = "revDiv";
    revDiv.textContent = `Revenus : ${soldeRev} DA`;

    const depDiv = document.createElement("div");
    depDiv.className = "depDiv";
    depDiv.textContent = `Depenses : ${soldeDep} DA`;

    container.appendChild(revDiv);
    container.appendChild(depDiv)


    setTimeout(()=>{
        container.innerHTML = '';
    }, 3000);




}


document.querySelector(".solde-button").addEventListener('click', ()=>{
    dispSolde();
});