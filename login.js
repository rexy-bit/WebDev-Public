const users = [{
    username : "admin",
    password : "admin123",
    role : "admin",
},{
    username : "yanis",
    password : "yanis123",
    role : "employe"
}];


let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;


let time1,time2;
function loginF(){

    let usernameIn = document.querySelector(".login-username");
    let passewordIn = document.querySelector(".login-passeword");

    let username = usernameIn.value;
    let passeword = passewordIn.value;

    let i = 0;
    let trouve = false;

    

    let user;
    while(i<users.length && (!trouve)){
        if((users[i].username === username) && (users[i].password === passeword)){
            trouve = true;
            user = users[i];
        }else{
            i++;
        }
    }

    const msg = document.querySelector(".display-login-message");

    
    if(trouve){

            currentUser = user;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            msg.style.color = "green";
            msg.innerHTML = `Welcome : ${username}`;

            clearTimeout(time1);

           time1 = setTimeout(()=>{
                msg.innerHTML = '';
            },2000);

            if(user.role === "admin"){
                window.location.hash = "admin";
            }else{
                window.location.hash = "employe";
            }

            usernameIn.value = '';
            passewordIn.value = '';
    }else{
        msg.style.color = "red"
        msg.innerHTML = 'Invalid Login';

        clearTimeout(time2);

        time2 = setTimeout(()=>{
                msg.innerHTML = '';
            },2000);
    }
}


document.querySelector(".login-button").addEventListener('click',()=>{
    loginF();
} );



function showPage(pageId){

    document.querySelectorAll(".section-connexion").forEach((s)=>{
        s.style.display = "none";
    });
    document.getElementById("admin").classList.add("hidden");
    document.getElementById("employe").classList.add("hidden");

    if(pageId === "home" || pageId === "connexion"){
        document.getElementById("public-pages").style.display = "block";
        const page = document.getElementById(pageId);
        if(page){
            page.style.display = "block";
        }
    }else if(pageId === "admin"){
        document.getElementById("public-pages").style.display = "none";
        document.getElementById("admin").classList.remove("hidden");
    }else if(pageId === "employe"){
        document.getElementById("public-pages").style.display = "none";
        document.getElementById("employe").classList.remove("hidden");
    }

}

function router(){
          const hash = window.location.hash.slice(1) || "home";
      showPage(hash);
}

  window.addEventListener("hashchange", router);
    window.addEventListener("DOMContentLoaded", () => {
      const saved = localStorage.getItem("currentUser");
      if (saved) {
        currentUser = JSON.parse(saved);
        window.location.hash = currentUser.role === "admin" ? "admin" : "employe";
      } else {
        window.location.hash = "connexion";
      }
    });