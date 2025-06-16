let emp = JSON.parse(localStorage.getItem('emp')) || [{
    code : "012",
    nom : "Rezgui",
    prenom : "Yanis",
    age : 19,
    salaire : 2000
}];


displayEmp();
function displayEmp(){


    const container = document.querySelector(".display-content");
    container.innerHTML = '';

    emp.forEach((element, i)=>{

        const empDiv = document.createElement("div");
        empDiv.className = "emp-div";
        

        const codeDiv = document.createElement("div");
        codeDiv.className = "codeDiv";
        codeDiv.textContent = `- Code : ${element.code}`;

        const nomDiv = document.createElement("div");
        nomDiv.className = "nomDiv";
        nomDiv.textContent = `- Last-name : ${element.nom}`;

        const prenomDiv = document.createElement("div");
        prenomDiv.className = "prenom";
        prenomDiv.textContent = `- First-name : ${element.prenom}`;

        const ageD = document.createElement("div");
        ageD.className = "age";
        ageD.textContent = `- Age : ${element.age}`;

        const salaireD = document.createElement("div");
        salaireD.className = "salaire";
        salaireD.textContent = `- Salaire : ${element.salaire}`;


        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', ()=>{
            emp.splice(i, 1);
            displayEmp();
        });


        empDiv.appendChild(codeDiv);
        empDiv.appendChild(nomDiv);
        empDiv.appendChild(prenomDiv);
        empDiv.appendChild(ageD);
        empDiv.appendChild(salaireD);
        empDiv.appendChild(deleteButton);

        container.appendChild(empDiv);

    });

    localStorage.setItem('emp', JSON.stringify(emp));
}


