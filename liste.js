let etud = JSON.parse(localStorage.getItem('etud')) || [
    {
        code : '0',
        nom : 'Rezgui',
        prenom : 'Yanis',
        age : 19,
        moy : 16.7
    }
];


displayListe();

function displayListe(){

    const container = document.querySelector(".display-content");
    container.innerHTML = '';


    etud.forEach((element, i) =>{

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


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener('click', ()=>{
            etud.splice(i, 1);
            displayListe();
        });


        etudD.appendChild(codeD);
        etudD.appendChild(nomD);
        etudD.appendChild(prenomD);
        etudD.appendChild(ageD);
        etudD.appendChild(moyD);
        etudD.appendChild(deleteButton);

        container.appendChild(etudD);
    });

    localStorage.setItem('etud', JSON.stringify(etud));
}