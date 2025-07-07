let quiz = [
    {
        question: "Qui est considéré comme le fondateur légendaire de Rome ?",
        options: ["Romulus", "César", "Néron", "Augustus"],
        correctAnswer: "Romulus"
    },
    {
        question: "Quel fleuve traverse la ville de Rome ?",
        options: ["Tigre", "Tibre", "Danube", "Nil"],
        correctAnswer: "Tibre"
    },
    {
        question: "Quelle était la langue officielle de l’Empire romain ?",
        options: ["Grec", "Latin", "Araméen", "Italien"],
        correctAnswer: "Latin"
    },
    {
        question: "Quel général romain a conquis la Gaule ?",
        options: ["Pompée", "Jules César", "Octave", "Brutus"],
        correctAnswer: "Jules César"
    },
    {
        question: "Quel bâtiment emblématique de Rome accueillait les combats de gladiateurs ?",
        options: ["Le Panthéon", "Le Forum", "Le Colisée", "Les Thermes"],
        correctAnswer: "Le Colisée"
    },
    {
        question: "Qui fut le premier empereur romain ?",
        options: ["Jules César", "Augustus", "Caligula", "Trajan"],
        correctAnswer: "Augustus"
    },
    {
        question: "Comment s'appelait le peuple qui a précédé les Romains en Italie centrale ?",
        options: ["Les Gaulois", "Les Étrusques", "Les Vandales", "Les Goths"],
        correctAnswer: "Les Étrusques"
    },
    {
        question: "Quel empereur est célèbre pour avoir incendié Rome selon certains récits ?",
        options: ["Néron", "Tibère", "Hadrien", "Commode"],
        correctAnswer: "Néron"
    },
    {
        question: "Comment s'appelait l'assemblée dirigeante pendant la République romaine ?",
        options: ["Le Sénat", "Le Conseil", "Le Forum", "L'Empire"],
        correctAnswer: "Le Sénat"
    },
    {
        question: "En quelle année l’Empire romain d’Occident est-il tombé ?",
        options: ["395", "410", "476", "509"],
        correctAnswer: "476"
    }
];



let currentQuestion = JSON.parse(localStorage.getItem('currentQuestion')) || 0;
let selectedOption = null;
let score = JSON.parse(localStorage.getItem('score')) || 0;

//let score = JSO 0;
//let currentQuestion = 0;

const container = document.querySelector(".display-quiz");
const quizMsg = document.querySelector(".quiz-msg");
let quizMsgTimeout;

displayQuiz();
 displayScore();
function displayQuiz(){

    if(currentQuestion >= quiz.length){
        showAfterPage();
        return;
    }

    container.innerHTML = '';

     let q = quiz[currentQuestion];

     const stateDiv = document.createElement("div");
     stateDiv.className = "state-div";
     stateDiv.textContent = `Question : ${currentQuestion + 1}/${quiz.length}`;
     
     const questionDiv = document.createElement("div");
     questionDiv.className = "question-div";
     questionDiv.textContent = q.question;

     const optionsDiv = document.createElement("div");
     optionsDiv.className = "options-div";
     q.options.forEach((option)=>{

        const optionButton = document.createElement("button");
        optionButton.className = "option-button";
        optionButton.textContent = option;

        optionButton.addEventListener('click', ()=>{

            document.querySelectorAll(".option-button").forEach((btn)=>{
                btn.classList.remove('selected');
            });

            optionButton.classList.add("selected");
            selectedOption = option;
        });


        optionsDiv.appendChild(optionButton);
        

     });

             const choseButton = document.createElement("button");
          choseButton.className = "chose-button";
          choseButton.textContent = "Choisir";
           choseButton.addEventListener('click', ()=>{
                if(selectedOption === null){
                     quizMsg.style.display = "block";
                    quizMsg.style.color = "red";
                    quizMsg.innerHTML = "Veillez choisir une reponse";

                    clearTimeout(quizMsgTimeout);
                    displayScore();

                    quizMsgTimeout = setTimeout(()=>{
                        quizMsg.style.display = "none";

                    }, 2000);

                }else{
                     if(selectedOption === q.correctAnswer){

                    quizMsg.style.display = "block";
                    quizMsg.style.color = "green";
                    
                    quizMsg.innerHTML = "Bonne reponse !";
                    
                    score++;
                    displayScore();
                    clearTimeout(quizMsgTimeout);
                    localStorage.setItem('score', JSON.stringify(score));

                    quizMsgTimeout = setTimeout(()=>{
                        quizMsg.style.display = "none";
                    },1500);

                }else{

                    quizMsg.style.display = "block";
                    quizMsg.style.color = "red";
                    quizMsg.innerHTML = `Mauvaise reponse la bonne reponse etait : ${q.correctAnswer}`;

                    clearTimeout(quizMsgTimeout);
                    displayScore();

                    quizMsgTimeout = setTimeout(()=>{
                        quizMsg.style.display = "none";

                    },2000);

                }

                currentQuestion++;
                localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));

                if(currentQuestion < quiz.length){
                    displayQuiz();

                }else{

                    setInterval(()=>{
                        showAfterPage();
                    },2000);
                    
               }

                
            }

        });

        container.appendChild(stateDiv);
        container.appendChild(questionDiv);
        container.appendChild(optionsDiv);
        container.appendChild(choseButton);


}




function displayScore(){

    document.querySelector(".display-score").innerHTML = `- Score : ${score}/${quiz.length}`;
}

function showAfterPage(){

    container.innerHTML = '';

    const endDiv = document.createElement("div");
    endDiv.className = "end-div";
    endDiv.textContent = "Partie terminer !"

    const scoreDiv = document.createElement("div");
    scoreDiv.className = "score-text";
  
    if(score < 5){
        
        scoreDiv.innerHTML = `Score : ${score}/${quiz.length}  &#128542;`;
    }else if(score >=5 && score < 10){
        scoreDiv.innerHTML = `Score : ${score}/${quiz.length}  &#128522;`;
    }else{
        scoreDiv.innerHTML = `Score : ${score}/${quiz.length}  &#128516;`;
    }

    const resetButton = document.createElement("div");
    resetButton.className = "reset-button";
    resetButton.innerHTML = "&#8634;";

    resetButton.addEventListener("click", ()=>{
        score = 0;
        currentQuestion = 0;
        localStorage.removeItem('score');
        localStorage.removeItem('currentQuestion');

        displayQuiz();
        displayScore();
    });

    container.appendChild(endDiv);
    container.appendChild(scoreDiv);
    container.appendChild(resetButton);

}
