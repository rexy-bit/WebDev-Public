let quiz = [
    {
        question: "Qui est l'auteur de l'Odyssée ?",
        options: ["Homère", "Hésiode", "Platon", "Aristote"],
        correctAnswer: "Homère"
    },
    {
        question: "Qui a déclenché la guerre de Troie en enlevant Hélène ?",
        options: ["Ménélas", "Agamemnon", "Pâris", "Achille"],
        correctAnswer: "Pâris"
    },
    {
        question: "Quel héros grec a tué Hector pendant la guerre de Troie ?",
        options: ["Achille", "Ulysse", "Ajax", "Ménélas"],
        correctAnswer: "Achille"
    },
    {
        question: "Combien de soldats spartiates ont résisté face aux Perses aux Thermopyles ?",
        options: ["300", "1000", "500", "150"],
        correctAnswer: "300"
    },
    {
        question: "Quel roi perse affrontait les Spartiates aux Thermopyles ?",
        options: ["Xerxès Ier", "Darius Ier", "Cyrus le Grand", "Artaxerxès"],
        correctAnswer: "Xerxès Ier"
    },
    {
        question: "Qui était le roi de Sparte pendant la bataille des Thermopyles ?",
        options: ["Léonidas", "Agésilas", "Lycurgue", "Cléomène"],
        correctAnswer: "Léonidas"
    },
    {
        question: "Quel célèbre stratège a conduit les Grecs pendant le siège de Troie grâce à la ruse du cheval de Troie ?",
        options: ["Ulysse", "Achille", "Ajax", "Patrocle"],
        correctAnswer: "Ulysse"
    },
    {
        question: "Quel empire Alexandre le Grand a-t-il conquis en priorité ?",
        options: ["L'Empire perse", "L'Empire romain", "L'Égypte", "L'Empire carthaginois"],
        correctAnswer: "L'Empire perse"
    },
    {
        question: "Quel philosophe grec fut le précepteur d'Alexandre le Grand ?",
        options: ["Aristote", "Platon", "Socrate", "Homère"],
        correctAnswer: "Aristote"
    },
    {
        question: "Quelle ville d'Égypte, fondée par Alexandre, porte encore son nom aujourd'hui ?",
        options: ["Alexandrie", "Memphis", "Thèbes", "Carthage"],
        correctAnswer: "Alexandrie"
    }
];


let score = JSON.parse(localStorage.getItem('score')) || 0;
let currentQuestion = JSON.parse(localStorage.getItem('currentQuestion'))|| 0;
let selectedOption = null;

const quizMsg = document.querySelector(".quiz-message");
let quizTimeout;

let choseButtonTimeout;
showQuestion();
function showQuestion(){

    
      if(currentQuestion >= quiz.length){
        showFinalScore();
        return;
      }
 
    let q = quiz[currentQuestion];
    selectedOption = null;

    const container = document.querySelector(".quiz-content");
    container.innerHTML = '';
    let questionDiv = document.createElement("div");
    questionDiv.className = "question-div";
    questionDiv.textContent = q.question;

    let optionsDiv = document.createElement("div");
    optionsDiv.className = "options-div";

    q.options.forEach((option)=>{
        const optionButton = document.createElement("button");
        optionButton.className = "option-button";
        optionButton.textContent = option;

        optionButton.addEventListener('click', ()=>{
     
            selectedOption = option;

            document.querySelectorAll(".option-button").forEach((btn)=>{
                btn.classList.remove('is-selected');
            });

            optionButton.classList.add('is-selected');


        });

          optionsDiv.appendChild(optionButton);

        
    });

    const choseButton = document.createElement("button");
    choseButton.className = "chose-button";
    choseButton.textContent = "Choisir";

    choseButton.addEventListener('click', ()=>{

        if(selectedOption === null){

            quizMsg.style.color = "red";
            quizMsg.innerHTML = 'Veillez choisir une reponse d\'abord ';

            clearTimeout(quizTimeout);

            quizTimeout = setTimeout(()=>{
                quizMsg.innerHTML = '';
            }, 4000);

        }else{
        if(confirm(`Etes vous sur de vouloir selectionner l'option : ${selectedOption}`)){

            choseButton.disabled = true;

            clearTimeout(choseButtonTimeout);

            choseButtonTimeout = setTimeout(()=>{
                choseButton.disabled = false;
            },1000);
            if(selectedOption === q.correctAnswer){
                score++;
                quizMsg.style.color = 'green';
                quizMsg.innerHTML = 'Bonne reponse !';

                clearTimeout(quizTimeout);

                quizTimeout = setTimeout(()=>{
                    quizMsg.innerHTML = '';
                }, 2000);

                localStorage.setItem('score', JSON.stringify(score));

            }else{
                quizMsg.style.color = 'red';
                quizMsg.innerHTML = `Mauvaise reponse la bonne reponse etait : ${q.correctAnswer}`;

                clearTimeout(quizTimeout);

                quizTimeout = setTimeout(()=>{
                    quizMsg.innerHTML = '';
                }, 2000);

            }

                 currentQuestion++;
                localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
            if(currentQuestion < quiz.length){
              showQuestion();
            }else{

                showFinalScore();
            }

        }
       }
    });

    container.appendChild(questionDiv);
    container.appendChild(optionsDiv);
    container.appendChild(choseButton);


}



document.querySelector(".display-score-button").addEventListener('click', ()=>{
    if(document.querySelector(".display-score").innerHTML === ''){
        document.querySelector(".display-score").innerHTML = `${score}/${quiz.length}`;
    }else{
        document.querySelector(".display-score").innerHTML = '';
    }

});



function showFinalScore(){

    const container = document.querySelector(".quiz-content");
    container.innerHTML = '';

    const endText = document.createElement("div");
    endText.className = "end-text";
    endText.innerHTML = `Partie Terminer !`

    const scoreText = document.createElement("div");
    scoreText.className = "score-text";
    scoreText.innerHTML = `- Votre Score : ${score}/${quiz.length}`;

    const resetButton = document.createElement("div");
    resetButton.className = "reset-button";
    resetButton.innerHTML = '&#8634;';

    resetButton.addEventListener('click', ()=>{
        score = 0;
        currentQuestion = 0;
        localStorage.removeItem('score');
        localStorage.removeItem('currentQuestion');

        showQuestion();
    });
    

    container.appendChild(endText);
    container.appendChild(scoreText);
    container.appendChild(resetButton);

}