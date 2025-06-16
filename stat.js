
let emp = JSON.parse(localStorage.getItem('emp')) || [];
function calculateMoy(){

    let S = 0;
    let cpt = 0;
    let moy = 0;

    emp.forEach((element, i)=>{
        S += Number(element.salaire);
        cpt++;
    });

    if(cpt != 0){
        moy = S/cpt;
    }
    
   return moy.toFixed(2);
}

function displayMoy(){

    let moy = calculateMoy();

    document.querySelector(".display-moy").innerHTML = `${moy} Da`;

    setTimeout(()=>{
        document.querySelector(".display-moy").innerHTML = '';
    },4000);

}

document.querySelector(".moy-button").addEventListener('click', ()=>{
    displayMoy();
});


function findMax(){


    let max = emp[0];

    emp.forEach((element, i)=>{
        if(Number(element.salaire) > Number(max.salaire)){
            max = element;
        }
    });

    return max;
}


function displayMax(){

    let max = findMax();

    if(max != null){

        let container = document.querySelector(".max-content");
        container.innerHTML = '';

        const empDiv = document.createElement("div");
        empDiv.className = "emp-div";
        
        const codeD = document.createElement("div");
        codeD.textContent = `- code : ${max.code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Last-name : ${max.nom}`;

        const prenomD = document.createElement("div");
        prenomD.textContent = `- First Name : ${max.prenom}`;

        const ageD = document.createElement("div");
        ageD.textContent = `- Age : ${max.age}`;

        const salaireD = document.createElement("div");
        salaireD.textContent = `- Salaire : ${max.salaire}`;


        empDiv.appendChild(codeD);
        empDiv.appendChild(nomD);
        empDiv.appendChild(prenomD);
        empDiv.appendChild(ageD);
        empDiv.appendChild(salaireD);

        container.appendChild(empDiv);


        setTimeout(()=>{
            container.innerHTML = '';
        },4000);
    }

}


document.querySelector(".max-button").addEventListener('click', ()=>{
    displayMax();
});

function findMin(){

        let min = emp[0];

    emp.forEach((element, i)=>{
        if(Number(element.salaire) < Number(min.salaire)){
            min = element;
        }
    });

    return min;


}
function displayMin(){

          let min = findMin();

    if(min != null){

        let container = document.querySelector(".min-content");
        container.innerHTML = '';

        const empDiv = document.createElement("div");
        empDiv.className = "emp-div";
        
        const codeD = document.createElement("div");
        codeD.textContent = `- code : ${min.code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Last-name : ${min.nom}`;

        const prenomD = document.createElement("div");
        prenomD.textContent = `- First Name : ${min.prenom}`;

        const ageD = document.createElement("div");
        ageD.textContent = `- Age : ${min.age}`;

        const salaireD = document.createElement("div");
        salaireD.textContent = `- Salaire : ${min.salaire}`;


        empDiv.appendChild(codeD);
        empDiv.appendChild(nomD);
        empDiv.appendChild(prenomD);
        empDiv.appendChild(ageD);
        empDiv.appendChild(salaireD);

        container.appendChild(empDiv);


        setTimeout(()=>{
            container.innerHTML = '';
        },4000);
    }

}

document.querySelector(".min-button").addEventListener('click', ()=>{
    displayMin();
});