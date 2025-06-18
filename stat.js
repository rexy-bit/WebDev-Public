let etud = JSON.parse(localStorage.getItem('etud'));



function calculateMoy(){

    let moy;
    let S = 0,cpt = 0;

    etud.forEach((element, i)=>{
        S += Number(element.moy);
        cpt++;
    });

    if(cpt === 0){
        moy= 0;
    }else{
        moy = S/cpt;
    }

    return moy.toFixed(2);

}


let intervalId;

function displayMoy(){

    let moy = calculateMoy();

    document.querySelector(".display-moy").innerHTML = `${moy}/20`;

    clearInterval(intervalId);

    intervalId = setTimeout(()=>{
        document.querySelector(".display-moy").innerHTML = '';
    }, 4000);

}

document.querySelector(".moy-button").addEventListener('click', ()=>{
    displayMoy();
});


function findMax(){

     let max = etud[0];

     etud.forEach((element, i)=>{
        if(Number(max.moy) < Number(element.moy)){
            max = element;
        }
     });


     return max;

}

function displayMax(){

    let max = findMax();

    if(max != null){

        const container = document.querySelector(".display-max");
        container.innerHTML = '';

        const etudD = document.createElement("div");
        etudD.className = "etud-div";

        const codeD = document.createElement("div");
        codeD.className = "code";
        codeD.textContent = `- Code : ${max.code}`;

        const nomD = document.createElement("div");
        nomD.className = "nom";
        nomD.textContent = `- Last-name : ${max.nom}`;

        const prenomD = document.createElement("div");
        prenomD.className = "prenom";
        prenomD.textContent = `- First-name : ${max.prenom}`;

        const ageD = document.createElement("div");
        ageD.className = "age";
        ageD.textContent = `- Age : ${max.age}`;

        const moyD = document.createElement("div");
        moyD.className = "moy";
        moyD.textContent = `Grade Av : ${max.moy}`;


        etudD.appendChild(codeD);
        etudD.appendChild(nomD);
        etudD.appendChild(prenomD);
        etudD.appendChild(ageD);
        etudD.appendChild(moyD);

        container.appendChild(etudD);

        clearTimeout(intervalId);

        intervalId = setTimeout(()=>{
            container.innerHTML = '';
        }, 4000);

    }
}




document.querySelector(".max-button").addEventListener('click', ()=>{
    displayMax();
});



function findMin(){

    let min = etud[0];

    etud.forEach((element, i)=>{

        if(Number(element.moy) < Number(min.moy)){
            min = element;
        }
    }    );

    return min;
}


function displayMin(){

    let min = findMin();


    if(min != null){

                const container = document.querySelector(".display-min");
        container.innerHTML = '';

        const etudD = document.createElement("div");
        etudD.className = "etud-div";

        const codeD = document.createElement("div");
        codeD.className = "code";
        codeD.textContent = `- Code : ${min.code}`;

        const nomD = document.createElement("div");
        nomD.className = "nom";
        nomD.textContent = `- Last-name : ${min.nom}`;

        const prenomD = document.createElement("div");
        prenomD.className = "prenom";
        prenomD.textContent = `- First-name : ${min.prenom}`;

        const ageD = document.createElement("div");
        ageD.className = "age";
        ageD.textContent = `- Age : ${min.age}`;

        const moyD = document.createElement("div");
        moyD.className = "moy";
        moyD.textContent = `Grade Av : ${min.moy}`;


        etudD.appendChild(codeD);
        etudD.appendChild(nomD);
        etudD.appendChild(prenomD);
        etudD.appendChild(ageD);
        etudD.appendChild(moyD);

        container.appendChild(etudD);


        clearTimeout(intervalId);

        intervalId = setTimeout(()=>{
            container.innerHTML = '';
        }, 4000);
    }

}


document.querySelector(".min-button").addEventListener('click', ()=>{
    displayMin();
});

