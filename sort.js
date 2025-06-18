let etud = JSON.parse(localStorage.getItem('etud'));

let intervalId;
function displaySort(){

    for(let i = 0;i<etud.length-1;i++){
        for(let j = i+1;j<etud.length;j++){
            if(Number(etud[i].moy) > Number(etud[j].moy)){
                let temp = etud[i];
                etud[i] = etud[j];
                etud[j] = temp;
            }
        }
    }

    const container = document.querySelector(".display-sort");
    container.innerHTML = '';

    etud.forEach((element, i)=>{

         const etudD = document.createElement("div");
        etudD.className = "etud-div";

        const codeD = document.createElement("div");
        codeD.className = "code";
        codeD.textContent = `- Code : ${element.code}`;

        const nomD = document.createElement("div");
        nomD.className = "nom";
        nomD.textContent = `- Last-name : ${element.nom}`;

        const prenomD = document.createElement("div");
        prenomD.className = "prenom";
        prenomD.textContent = `- First-name : ${element.prenom}`;

        const ageD = document.createElement("div");
        ageD.className = "age";
        ageD.textContent = `- Age : ${element.age}`;

        const moyD = document.createElement("div");
        moyD.className = "moy";
        moyD.textContent = `Grade Av : ${element.moy}`;



        etudD.appendChild(codeD);
        etudD.appendChild(nomD);
        etudD.appendChild(prenomD);
        etudD.appendChild(ageD);
        etudD.appendChild(moyD);
      

        container.appendChild(etudD);
    });

   clearTimeout(intervalId);
    intervalId = setTimeout(()=>{
        container.innerHTML = '';
    }, 5000);

    

}

document.querySelector(".sort-button").addEventListener('click', ()=>{
    displaySort();
});