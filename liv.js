const humburger = document.querySelector(".humburger");
const nav = document.querySelector("nav");

nav.style.display = "none";
humburger.addEventListener('click', ()=>{

    if(nav.style.display === 'none'){
        nav.style.display = 'flex';
    }else{
        nav.style.display = 'none';
    }

});


function displayDelivery(){

    fetch('http://localhost:3000/livraisons')
      .then(response=>response.json())
       .then(data=>{
        console.log(data);

         const container = document.querySelector(".display-content");
         container.innerHTML = '';

         data.forEach(liv=>{
            const livDiv = document.createElement("div");
            livDiv.className ="liv-div";
            livDiv.innerHTML = `

               <div>- Type : ${liv.type}</div>
               <div>- Code : ${liv.code}</div>
               <div>- Supplier : ${liv.fournisseur}</div>
               <div>- Product : ${liv.produit}</div>
               <div>- Quantity : ${liv.quantite}</div>
               <div>- Statut : ${liv.statut}</div>
            `;

    
            const deleteButton = document.createElement("button");
            deleteButton.className = 'delete-button';
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener('click', ()=>{
                if(confirm(`Are you sure to delete Delivery number : ${liv.code} ?`)){
                    deleteLiv(liv.id);
                }
            });

            livDiv.appendChild(deleteButton);
            container.appendChild(livDiv);

         });
       }).catch(error=> console.error('Error in displaying the liste : ', error));

}


function deleteLiv(id){

    fetch(`http://localhost:3000/livraisons/${id}`, {

        method : 'DELETE',

    }).then(()=>{
        console.log(`Delivery with id : ${id} deleted`);
        displayDelivery();

    }).catch(error=> console.error('Error in deleting : ', error));

}

displayDelivery();



let addTimeout;
function addLiv(){

    let typeIn = document.querySelector(".input-type");
    let codeIn = document.querySelector(".input-code");
    let fournisseurIn = document.querySelector(".input-fournisseur");
    let produitIn = document.querySelector(".input-produit");
    let quantiteIn = document.querySelector(".input-quantite");
    let statutIn = document.querySelector(".input-statut");

    let type = typeIn.value;
    let code = codeIn.value;
    let fournisseur = fournisseurIn.value;
    let produit = produitIn.value;
    let quantite = quantiteIn.value;
    let statut = statutIn.value;


    const msg = document.querySelector(".add-message");
    msg.style.color = "red";

      let trouve = false;
    fetch('http://localhost:3000/livraisons')
       .then(response => response.json())
         .then(data=>{

            console.log('Hello add');
            
            data.forEach(liv =>{
                if(liv.code === code){
                    trouve = true;
                    
                }
            });

            if(trouve){
               msg.innerHTML = 'The code you enterede already exists try another one';

               clearTimeout(addTimeout);

               addTimeout = setTimeout(()=>{
                msg.innerHTML = '';
               }, 2000);
            }else if(!code || !type || !fournisseur || !produit || !quantite || !statut){
                msg.innerHTML = 'Please enter all the necessary information';

                clearTimeout(addTimeout);

                addTimeout = setTimeout(()=>{
                    msg.innerHTML = '';
                }, 2000);

            }else if(isNaN(quantite) || Number(quantite) < 0){
                msg.innerHTML = 'The quantity must be a positive number';

                clearTimeout(addTimeout);
                addTimeout = setTimeout(()=>{
                    msg.innerHTML = '';
                },2000);

            }else{

                const newDelivery = {
                    type,
                    code,
                    fournisseur,
                    produit,
                    quantite : Number(quantite),
                    statut
                };

                fetch('http://localhost:3000/livraisons', {
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(newDelivery)
                }).then(response=>response.json())
                  .then(data=>{
                    console.log('Delivery added with success : ', data);
                    displayDelivery();
                    typeIn.value = '';
                    codeIn.value = '';
                    fournisseurIn.value = '';
                    produitIn.value ='';
                    quantiteIn.value = '';
                    statutIn.value='';

                    msg.style.color = "green";
                    msg.innerHTML = 'Delivery added with success';

                    clearTimeout(addTimeout);

                    addTimeout = setTimeout(()=>{
                        msg.innerHTML = '';
                    }, 2000);

                  }).catch(error=> console.error('Error in adding : ', error));

            }
         }).catch(error=>console.log('Error in the add function : ', error));

}


const addButton = document.querySelector(".add-button");


let addButtonTimeout ;
addButton.addEventListener('click', ()=>{
    addButton.disabled = true;

    addLiv();
    
    clearTimeout(addButtonTimeout);

    addButtonTimeout = setTimeout(()=>{
        addButton.disabled = false;
    },500);
    
});


let findTimeout;
let searchContainerTimeout;
function searchLiv(){

    let codeIn = document.querySelector(".search-code");
    let code = codeIn.value;

    const msg = document.querySelector(".search-message");
    
    fetch('http://localhost:3000/livraisons')
      .then(response => response.json())
        .then(data=>{

            let trouve = false;
            let searchDel;
            data.forEach(liv=>{
                if(liv.code === code){
                    trouve = true;
                    searchDel = liv;
                }
            });


            if(trouve){
                msg.style.color = "green";

                msg.innerHTML = 'Delivery found';
                 clearTimeout(findTimeout);

                 findTimeout = setTimeout(()=>{
                    msg.innerHTML = '';
                 }, 2000);

                 const container = document.querySelector(".display-search");
                 container.innerHTML = '';

                 const delDiv = document.createElement("div");
                 delDiv.className = "liv-div";
                 delDiv.innerHTML = `
                                        <div>- Type : ${searchDel.type}</div>
                                        <div>- Code : ${searchDel.code}</div>
                                        <div>- Supplier : ${searchDel.fournisseur}</div>
                                        <div>- Product : ${searchDel.produit}</div>
                                        <div>- Quantity : ${searchDel.quantite}</div>
                                        <div>- Statut : ${searchDel.statut}</div>
                 `;

                 container.appendChild(delDiv);

                 clearTimeout(searchContainerTimeout);

                 searchContainerTimeout = setTimeout(()=>{
                    container.innerHTML = '';
                 }, 4000);

                 codeIn.value = '';
            }else{

                msg.style.color = "red";

                msg.innerHTML = 'Code not found';
                clearTimeout(findTimeout);

                findTimeout = setTimeout(()=>{
                    msg.innerHTML = '';
                }, 2000);
            }
        }).catch(error=>console.error('Error in search : ', error));

}


const searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', ()=>{
    searchLiv();
});



let modifTimeout;
function modifLiv(){

        let typeIn = document.querySelector(".m-type");
    let codeIn = document.querySelector(".m-code");
    let fournisseurIn = document.querySelector(".m-fournisseur");
    let produitIn = document.querySelector(".m-produit");
    let quantiteIn = document.querySelector(".m-quantite");
    let statutIn = document.querySelector(".m-statut");

    let type = typeIn.value;
    let code = codeIn.value;
    let fournisseur = fournisseurIn.value;
    let produit = produitIn.value;
    let quantite = quantiteIn.value;
    let statut = statutIn.value;
    
    fetch('http://localhost:3000/livraisons')
     .then(response => response.json())
       .then(data=>{

         let trouve = false;

         let i = 0;

                  const msg = document.querySelector(".modif-message");
         msg.style.color = "red";

         if(!code || !type || !fournisseur || !produit || !quantite || !statut){
             msg.innerHTML = 'Please enter all the necessary information';
         }else if(isNaN(quantite) || Number(quantite) < 0){
            msg.innerHTML = 'Please the quantite must be a positive number';
         }else{

                while(i<data.length && (!trouve)){
                    if(data[i].code === code){
                        trouve = true;
                    }else{
                        i++;
                    }
                }

                if(trouve){
                    msg.style.color = "green";
                    msg.innerHTML = 'Delivery found !';

                    const empModif = {
                        type,
                        code,
                        fournisseur,
                        produit,
                        quantite : Number(quantite),
                        statut
                    };

                    clearTimeout(modifTimeout);

                    modifTimeout = setTimeout(()=>{
                        msg.innerHTML = '';
                    }, 2000);

                    fetch(`http://localhost:3000/livraisons/${data[i].id}`, {
                        method : 'PUT',
                        headers : {
                            'Content-type' : 'application/json'
                        },
                        body : JSON.stringify(empModif)
                    })
                      .then(response=>{
                          
                          if(response.ok){

                            msg.innerHTML = 'Modification done with success';
                            clearTimeout(modifTimeout);
                            modifTimeout = setTimeout(()=>{
                               msg.innerHTML = '';
                            },2000);


                            displayDelivery();

                            codeIn.value = '';
                            typeIn.value = '';
                            fournisseurIn.value = '';
                            produitIn.value = '';
                            quantiteIn.value = '';
                            statutIn.value = '';
                          }else{
                            msg.style.color = "red";
                            msg.innerHTML = 'an error occured';
                          }
                      }).catch(error=>console.error('Error during modification : ', error));

                }else{
                
                    msg.innerHTML = 'Code not found';

                    clearTimeout(modifTimeout);

                    modifTimeout = setTimeout(()=>{
                        msg.innerHTML = '';
                    }, 2000);

                }
           }
         
       }).catch(error=>console.error('Error in modification function : ', error));

}


const modifButton = document.querySelector(".modif-button");

modifButton.addEventListener('click', ()=>{
    modifLiv();
});



function sortLiv(){


    fetch('http://localhost:3000/livraisons')
     .then(response => response.json())
        .then(data=>{

            console.log(data);

            let livraison = data;

            console.log(livraison);

            for(let i = 0;i<livraison.length - 1;i++){
                for(let j = i+1;j<livraison.length;j++){
                    if(Number(livraison[i].quantite) > Number(livraison[j].quantite)){
                        let temp = livraison[i];
                        livraison[i] = livraison[j];
                        livraison[j] = temp;
                    }
                }
            }

            const container = document.querySelector(".display-sort");
            container.innerHTML = '';

            livraison.forEach(liv=>{

            const livDin = document.createElement("div");
            livDin.className = "liv-div";
            livDin.innerHTML = `
                <div>- Type : ${liv.type}</div>
                <div>- Code : ${liv.code}</div>
                <div>- Supplier : ${liv.fournisseur}</div>
                <div>- Product : ${liv.produit}</div>
                <div>- Quantity : ${liv.quantite}</div>
                <div>- Statut : ${liv.statut}</div>
            `;

            container.appendChild(livDin);
            });

        }).catch(error => console.error('Error in sort function : ', error));

}


const sortButton = document.querySelector(".sort-button");

sortButton.addEventListener('click', ()=>{
    const container = document.querySelector(".display-sort");

    if(container.innerHTML === ''){
        sortLiv();
    }else{
        container.innerHTML = '';
    }

});