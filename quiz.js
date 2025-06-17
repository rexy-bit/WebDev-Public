let quiz = [{
        question: "Quelle est la capitale de la France ?",
    options: ["Paris", "Lyon", "Marseille", "Nice"],
    correctAnswer: "Paris"
},{
        question: "Qui a écrit 'L'Étranger' ?",
    options: ["Albert Camus", "Victor Hugo", "Voltaire", "Zola"],
    correctAnswer: "Albert Camus"
}];



let currentQuestion = 0;
let score = 0;
let selectedOption = null;


showQuestion();

function showQuestion(){

    let q = quiz[currentQuestion];
    
    const container = document.querySelector(".quiz");
    container.innerHTML = '';

    const questionDiv = document.createElement("div");
    questionDiv.className = "question-div";
    questionDiv.textContent = q.question;

    const  optionsDiv = document.createElement("div");
    optionsDiv.className = "options-div";

    q.options.forEach((option, i) =>{

        
        const choiceButton = document.createElement("button");
        choiceButton.className = "c-button";
        choiceButton.textContent = option;



        choiceButton.addEventListener('click', ()=>{
    
            selectedOption = option;

            document.querySelectorAll(".c-button").forEach((btn)=>{
                 btn.classList.remove('selected');
            });


            choiceButton.classList.add("selected");
        });

                optionsDiv.appendChild(choiceButton);
         
    });

    


    container.appendChild(questionDiv);
    container.appendChild(optionsDiv);


}


