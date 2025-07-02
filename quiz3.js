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
    },    {
        question: "Quel est le nom latin d'Ulysse ?",
        options: ["Odysseus", "Héraclès", "Énée", "Hector"],
        correctAnswer: "Odysseus"
    },
    {
        question: "Quel dieu grec protégeait les Grecs pendant la guerre de Troie ?",
        options: ["Athéna", "Arès", "Apollon", "Hadès"],
        correctAnswer: "Athéna"
    },
    {
        question: "Combien de temps dura le voyage d’Ulysse pour retourner à Ithaque ?",
        options: ["10 ans", "1 an", "3 ans", "7 ans"],
        correctAnswer: "10 ans"
    },
    {
        question: "Quel est le nom de la femme d’Ulysse ?",
        options: ["Pénélope", "Hélène", "Andromaque", "Clytemnestre"],
        correctAnswer: "Pénélope"
    },
    {
        question: "Comment s’appelait le fils d’Ulysse ?",
        options: ["Télémaque", "Achille", "Orphée", "Ménélas"],
        correctAnswer: "Télémaque"
    },
    {
        question: "Qui tua Achille pendant la guerre de Troie ?",
        options: ["Pâris", "Hector", "Priam", "Ajax"],
        correctAnswer: "Pâris"
    },
    {
        question: "Quel est le point faible d’Achille ?",
        options: ["Son talon", "Sa tête", "Son cœur", "Ses yeux"],
        correctAnswer: "Son talon"
    },
    {
        question: "Quel est le nom de l’alliance grecque contre la Perse à l’époque de la bataille des Thermopyles ?",
        options: ["Ligue de Delos", "Ligue hellénique", "Symmachie", "Ligue spartiate"],
        correctAnswer: "Ligue hellénique"
    },
    {
        question: "Quel fut le dernier grand combat d’Alexandre avant sa mort ?",
        options: ["La bataille de l’Hydaspe", "La bataille de Gaugamèles", "La bataille d’Issos", "La bataille de Marathon"],
        correctAnswer: "La bataille de l’Hydaspe"
    },
    {
        question: "Dans quel pays actuel est mort Alexandre le Grand ?",
        options: ["Irak", "Grèce", "Égypte", "Turquie"],
        correctAnswer: "Irak"
    }
];


//let currentQuestion = JSON.parse(localStorage.getItem('currentQuestion')) || 0;
let currentQuestion = JSON.parse(localStorage.getItem('currentQuestion')) || 0;
let score = JSON.parse(localStorage.getItem('score')) || 0;
let currentOption = null;


const quizMsg = document.querySelector(".quiz-message");
let quizMsgTimeout;


showQuestion();

let choseButtonTimeout;

function showQuestion(){

    if(currentQuestion >= quiz.length){
        displayAfterGame();
        return;
    }

    let q = quiz[currentQuestion];

    currentOption = null;
    const container = document.querySelector(".quiz-content");
    container.innerHTML = '';

    const questionDiv = document.createElement("div");
    questionDiv.className = "question-div";
    questionDiv.textContent = q.question;

    const optionsDiv = document.createElement("div");
    optionsDiv.className = 'options-div';
    
    q.options.forEach((option)=>{


        const optionButton = document.createElement("button");
        optionButton.className = "option-button";
        optionButton.textContent = option;
        
        optionButton.addEventListener('click', ()=>{

            currentOption = option;

            document.querySelectorAll(".option-button").forEach((btn)=>{
                btn.classList.remove('selected');

            });

            optionButton.classList.add('selected');

        });

        optionsDiv.appendChild(optionButton);
    });

    const choseButton = document.createElement("button");
    choseButton.className = "chose-button";
    choseButton.textContent = 'Choisir';

    choseButton.addEventListener('click', ()=>{

        choseButton.disabled = true;

        clearTimeout(choseButtonTimeout);

        choseButtonTimeout = setTimeout(()=>{
            choseButton.disabled = false;
        }, 1000);

        if(!currentOption){
            quizMsg.style.color = "red";
            quizMsg.innerHTML = 'Veillez choisir une reponse !';

          clearTimeout(quizMsgTimeout);

          quizMsgTimeout = setTimeout(()=>{
            quizMsg.innerHTML = '';
          }, 2500);
        }else{

            if(q.correctAnswer === currentOption){
                score++;
                quizMsg.style.color ="green";
                quizMsg.innerHTML = 'Bonne reponse !';
                localStorage.setItem('score', JSON.stringify(score));

                clearTimeout(quizMsgTimeout);

                quizMsgTimeout = setTimeout(()=>{
                    quizMsg.innerHTML ='';
                }, 2500);
            }else{

                quizMsg.style.color = 'red';
                quizMsg.innerHTML = `Mauvaise reponse , la bonne reponse etait : ${q.correctAnswer}`;

            }

            currentQuestion++;
            localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));

            if(currentQuestion < quiz.length){
                showQuestion();
            }else{
            displayAfterGame();
            
            }
        
      }

    });

    container.appendChild(questionDiv);
    container.appendChild(optionsDiv);
    container.appendChild(choseButton);


}


function displayScore(){

  let scoreContent = document.querySelector(".display-score");

   if(scoreContent.innerHTML === ''){

     scoreContent.innerHTML = `Score : ${score}/${quiz.length}`;

   }else{
    scoreContent.innerHTML = '';
   }

}

document.querySelector(".display-score-button").addEventListener('click', ()=>{

    displayScore();

});



function displayAfterGame(){

    const container = document.querySelector(".quiz-content");
    container.innerHTML = '';

    const endText = document.createElement("div");
    endText.className = "end-text";
    endText.textContent = 'Fin de la partie';

    const endScore = document.createElement("div");
    endScore.className = "end-score";
    endScore.textContent = `- Score : ${score}/${quiz.length}`;

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
    container.appendChild(endScore);
    container.appendChild(resetButton);

}