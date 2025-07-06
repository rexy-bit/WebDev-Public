let books = [
    {
        code : 0,
        image : 'images/parrain.jpg',
        titre : 'The Godfather',
        auteur : 'Mario Puzo',
        categorie : 'Littérature',
        prix : 2100,
        description: "The Godfather is an epic tale of family, power, loyalty, and the dark underworld of organized crime. Written by Mario Puzo, this gripping novel takes readers into the life of Vito Corleone, the powerful head of the Corleone crime family. As he maneuvers the dangerous world of rival gangs, politics, and betrayal, his youngest son Michael is drawn into a life he never intended to lead. Richly layered with themes of honor, vengeance, and legacy, the novel captures the emotional complexity of a family torn between tradition and survival. It explores how absolute power can both protect and destroy those who wield it. A masterpiece of modern literature, The Godfather remains a cultural landmark, delving into the human cost of crime and ambition with unforgettable characters and storytelling."

    },{
        code : 1,
        image : 'images/laws.jpg',
        titre : 'The 48 laws of power',
        auteur : 'Robert Green',
        categorie : 'Développement',
        prix : 3500,
        description: "The 48 Laws of Power by Robert Greene is a bold and provocative manual on the dynamics of power, influence, and manipulation. Drawing from thousands of years of history, philosophy, and political strategy, Greene distills timeless lessons from historical figures like Machiavelli, Sun Tzu, and Napoleon. Each law is illustrated with real-life stories and practical applications, giving readers a toolkit to rise in competitive environments, whether in business, politics, or personal life. With its sharp tone and unapologetic stance, the book encourages readers to be aware of power dynamics in everyday interactions and to use them to their advantage. Controversial, enlightening, and meticulously researched, this book has become a modern classic in self-development literature."

    },{
        code : 2,
        image : 'images/peste.jpg',
        titre : 'La peste',
        auteur : 'Albert Camus',
        categorie : 'Littérature',
        prix : 1300,
        description: "La Peste (The Plague) by Albert Camus is a philosophical novel that examines human suffering, resilience, and moral responsibility in the face of a devastating epidemic. Set in the Algerian city of Oran, the story follows Dr. Bernard Rieux as he witnesses a deadly outbreak of plague and the varied reactions of the townspeople. Through its existential themes and understated prose, Camus explores how individuals confront meaninglessness, isolation, and fear. The novel is not just a tale about disease, but a profound reflection on the human condition and the absurdity of life. La Peste remains a timeless exploration of how people seek dignity and compassion in the midst of chaos and uncertainty."

    },{
        code : 3,
        image : 'images/guerre.jpg',
        titre : 'L\'art de la guerre',
        auteur : 'Sun Tzu',
        categorie : 'Développement',
        prix : 1700,
        description: "The Art of War by Sun Tzu is one of the most influential treatises on strategy and warfare ever written. Dating back to ancient China, this concise and profound guide offers timeless wisdom on leadership, conflict resolution, and tactical thinking. Each of its thirteen chapters focuses on a different aspect of warfare—from planning and terrain to deception and morale—emphasizing flexibility, patience, and psychological insight. While originally intended for military generals, its principles have been embraced in modern times by business leaders, athletes, and politicians. The Art of War teaches that victory is achieved not only through strength, but through knowledge, timing, and an understanding of human nature. A classic text that transcends time, culture, and profession."

    },{
        code : 4,
        image : 'images/methode.jpg',
        titre : 'Le discours de la methode',
        auteur : 'René Descartes',
        categorie : 'Études',
        prix : 1900,
        description: "Discourse on the Method by René Descartes is a groundbreaking philosophical and scientific essay that laid the foundation for modern rational thought. In this autobiographical treatise, Descartes presents his famous maxim, 'Cogito, ergo sum' ('I think, therefore I am'), as the cornerstone of knowledge and self-awareness. He outlines a systematic process for acquiring truth through reason, doubt, and analytical thinking, distancing himself from traditional scholasticism and religious authority. Written with clarity and elegance, the book weaves together mathematics, natural science, and personal reflection, offering a vision of intellectual independence and scientific inquiry. Discourse on the Method is a vital text for anyone seeking to understand the birth of modern philosophy and the power of human reason."

    },{
        code : 5,
        image : 'images/hurt.jpg',
        titre : 'Can\'t hurt Me',
        auteur : 'David Goggins',
        categorie : 'Développement',
        prix : 3700,
        description: "Can't Hurt Me by David Goggins is a deeply inspiring memoir that tells the story of a man who transformed suffering into strength. Goggins shares the brutal experiences of his childhood—abuse, poverty, racism—and how he overcame them to become a Navy SEAL, ultra-endurance athlete, and motivational icon. This book is more than a biography; it's a guide to mental toughness. With brutal honesty and raw detail, Goggins outlines the mindset that helped him break through pain, fear, and limitation. Each chapter includes challenges that push readers to go beyond comfort and excuses. Goggins proves that no matter how broken you feel, the power to rebuild lies within you. 'Can't Hurt Me' is a call to confront your past, defy your limits, and unlock your true potentienl."

    },{
        code : 6,
        image : 'images/illiad.jpg',
        titre : 'L\'illiad De Homer',
        auteur : 'Homer',
        categorie : 'Histoire',
        prix : 3900,
        description: "The Iliad by Homer is one of the greatest epic poems in history, telling the story of the Trojan War with intensity, poetry, and emotional depth. Set during the final weeks of the war, the tale centers around Achilles, the Greek hero whose rage and pride influence the fate of thousands. With vivid battles, godly interventions, and timeless themes of honor, fate, and glory, the poem explores the fragile line between heroism and humanity. Rich in mythological detail and grand in scale, The Iliad is both a war narrative and a profound meditation on mortality and legacy. It remains a cornerstone of Western literature, studied for its literary beauty and its insights into the ancient world’s values and beliefs."

    },{
        code : 7,
        titre : 'Leon L\'africain',
        image : 'images/leon.jpg',
        auteur : 'Amine Maalouf',
        categorie : 'Littérature',
        prix : 2200,
        description: "Léon l’Africain by Amin Maalouf is a beautifully written fictionalized biography that follows the life of Hasan al-Wazzan, a real 16th-century traveler, diplomat, and scholar. Born in Granada and exiled to North Africa, Hasan’s journey takes him across the Islamic and Christian worlds—from Timbuktu to Constantinople, and finally to the papal court in Rome. Through his eyes, Maalouf paints a rich portrait of a world in transition, shaped by religion, war, and culture. The novel captures the complexity of identity, exile, and tolerance in a divided world. Written with poetic prose and historical precision, Léon l’Africain is both an adventure and a philosophical reflection on what it means to belong everywhere and nowhere at once."

    },{
        code : 8,
        titre : 'Rich Dad Poor Dad',
        image : 'images/richDad.jpg',
        auteur : 'Robert Kiyosaki',
        categorie : 'Développement',
        prix : 2700,
        description: "Rich Dad Poor Dad by Robert Kiyosaki is a groundbreaking personal finance book that challenges traditional beliefs about money and education. Through a simple yet powerful narrative, Kiyosaki compares the financial philosophies of two father figures—his biological 'Poor Dad' and the wealthy, savvy 'Rich Dad' of his best friend. The book reveals how the rich think differently about work, income, and investing, emphasizing financial literacy, assets over liabilities, and the importance of taking risks. Easy to understand and widely applicable, it empowers readers to rethink their relationship with money, escape the rat race, and start building wealth. Whether you're a student, employee, or entrepreneur, this book offers timeless lessons for achieving financial independence."

    },{
        code : 9,
        titre : 'Le rocher de Tanios',
        image : 'images/rocher.jpg',
        auteur : 'Amine Maalouf',
        categorie : 'Littérature',
        prix : 2900,
        description: "Le Rocher de Tanios by Amin Maalouf is a captivating historical novel that blends mystery, memory, and Middle Eastern legend. Set in 19th-century Lebanon during a time of political intrigue and foreign influence, the story follows the mysterious life of Tanios, a boy marked by prophecy and scandal. As he grows up in a village overshadowed by suspicion and secrets, Tanios’s identity and fate become entangled with the destinies of local leaders and empires. Maalouf weaves historical fact with poetic imagination, creating a rich tapestry of culture, politics, and human emotion. Winner of the Prix Goncourt, this novel is a haunting reflection on exile, honor, and the search for truth in a divided world."

    },{
        code : 10,
        titre : 'Samarcande',
        image : 'images/samarcande.jpg',
        auteur : 'Amine Maalouf',
        categorie : 'Histoire',
        prix : 1100,
        description: "Samarcande by Amin Maalouf is a richly layered historical novel that transports readers to the heart of medieval Persia, a land of poetry, science, and spiritual rebellion. The story revolves around the legendary manuscript of Omar Khayyam’s Rubaiyat, blending fiction with real historical figures like Hassan-i Sabbah and Nizam al-Mulk. Through the journey of the manuscript from the 11th century to the 20th, Maalouf explores themes of destiny, love, freedom, and political upheaval. The novel gracefully shifts between East and West, past and present, offering profound insights into the human condition and the fragile balance between power and wisdom. Samarcande is a lyrical meditation on history and memory, written with Maalouf’s signature blend of intellectual depth and poetic elegance."

    },{
        code : 11,
        titre : '1984',
        image : 'images/1884.jpg',
        auteur : 'George Orwell',
        categorie : 'Philosophie',
        prix : 3300,
        description: "1984 by George Orwell is a chilling dystopian novel that explores the terrifying consequences of totalitarianism, surveillance, and mind control. Set in a world where the Party controls every aspect of life, language, and even thought, the novel follows Winston Smith as he secretly rebels against Big Brother’s oppressive regime. Orwell’s vision of a future stripped of truth, privacy, and individuality remains eerily relevant in today's world. With its concepts of 'doublethink', 'thoughtcrime', and 'Newspeak', 1984 has become a cornerstone of political and philosophical literature. It's not only a warning about the dangers of authoritarianism, but also a powerful defense of human dignity, memory, and the right to think freely. A must-read that challenges the boundaries of power and freedom."

    },{
        code : 12,
        titre : 'Rich dad\'s cashflow quadrant',
        image : 'images/cashflow.jpg',
        auteur : 'Robert Kiyosaki',
        categorie : 'Développement',
        prix : 3000,
        description: "Rich Dad's Cashflow Quadrant by Robert Kiyosaki is a transformative guide to understanding the four types of people who earn money: Employees, Self-employed, Business owners, and Investors. Building on the principles from his bestselling 'Rich Dad Poor Dad', Kiyosaki explains how to shift from earning a paycheck to achieving financial freedom by moving to the right side of the quadrant. With clear examples and practical insights, the book helps readers identify where they are financially, where they want to go, and how to get there. It emphasizes mindset, financial education, and leveraging systems rather than trading time for money. For those who want to escape the rat race and build lasting wealth, this book is both an eye-opener and a strategic roadmap."

    },{
        code : 13,
        titre : 'The Odyssey of Homer',
        image : 'images/odysse.jpg',
        auteur : 'Homer',
        categorie : 'Histoire',
        prix : 5200,
        description: "The Odyssey by Homer is one of the oldest and most celebrated epics in Western literature, chronicling the long and perilous journey of Odysseus as he returns home from the Trojan War. Filled with mythical creatures, divine interventions, and heroic trials, the poem captures the essence of adventure and the enduring struggle for home, identity, and justice. Odysseus's cleverness, resilience, and flaws make him a timeless figure of human complexity. Beyond its thrilling narrative, The Odyssey explores themes of loyalty, fate, hospitality, and the power of storytelling itself. Rich in symbolism and poetic rhythm, this ancient work continues to inspire readers and artists, offering both entertainment and profound philosophical insight."

    },{
        code : 14,
        titre : 'The richest man in Babylon',
        image : 'images/richest.jpg',
        auteur : 'George S. Clason',
        categorie : 'Développement',
        prix : 1800,
        description: "The Richest Man in Babylon by George S. Clason is a timeless financial classic that uses ancient Babylonian parables to teach essential principles of wealth-building. Through simple yet powerful stories, such as those of Arkad—the richest man in Babylon—the book imparts wisdom on saving, investing, avoiding debt, and creating lasting prosperity. Written in a style that evokes ancient storytelling, these lessons have guided millions toward better financial habits and independence. The book’s strength lies in its clarity and universal applicability: no matter your income or background, the advice remains relevant. Ideal for both beginners and seasoned investors, this book remains one of the most accessible and enduring guides to personal finance."

    },{
        code : 15,
        titre : 'Réfléchissez et devenez riche',
        image : 'images/think.jpg',
        auteur : 'Napoleon Hill',
        categorie : 'Développement',
        prix : 1050,
        description: "Think and Grow Rich by Napoleon Hill is one of the most influential personal development books ever written. Based on interviews with over 500 successful individuals—including Andrew Carnegie, Henry Ford, and Thomas Edison—Hill distills the key principles behind wealth creation and success. More than just financial advice, the book outlines a philosophy of life centered on desire, faith, persistence, and imagination. Each chapter offers practical steps and mindset shifts that empower readers to turn their dreams into reality. The emphasis on the power of thought, goal-setting, and self-discipline has inspired generations of entrepreneurs and leaders. Think and Grow Rich remains a timeless guide for anyone seeking to unlock their potential and build a meaningful life."

    },{
        code : 16,
        titre : 'Comment se faire des amis et influencer les autres',
        image : 'images/freinds.jpg',
        auteur : 'Dale Carnegie',
        categorie : 'Développement',
        prix : 1200,
        description: "How to Win Friends and Influence People by Dale Carnegie is a groundbreaking self-help classic that has helped millions of people improve their communication, relationships, and personal success. Through timeless principles and real-world examples, Carnegie teaches readers how to handle people diplomatically, make a lasting impression, and influence others without manipulation. The book emphasizes the importance of listening, empathy, and genuine appreciation in both personal and professional contexts. Simple yet powerful, its lessons can be applied in business, leadership, social settings, and everyday life. With its friendly tone and actionable advice, this book remains as relevant today as it was when it was first published in 1936."

    },{
        code : 17,
        titre : 'Art of Public Speaking',
        image : 'images/public.jpg',
        auteur : 'Dale Carnegie',
        categorie : 'Développement',
        prix : 1400,
        description: "The Art of Public Speaking by Dale Carnegie is a practical and empowering guide designed to help readers become confident and persuasive communicators. Drawing from years of teaching experience, Carnegie outlines essential techniques for overcoming fear, organizing thoughts, engaging audiences, and delivering impactful speeches. The book covers everything from voice modulation and body language to storytelling and persuasive structure. It encourages practice, authenticity, and a deep understanding of the audience’s needs. Whether you’re a student, professional, or aspiring leader, this book provides a roadmap to mastering the art of speaking in public. Its timeless advice has empowered generations to speak with confidence and clarity."

    },{
        code : 18,
        titre : 'History of Alexander the Great',
        image : 'images/alexander.jpg',
        auteur : 'Jacob Abbott',
        categorie : 'Histoire',
        prix : 1400,
        description: "History of Alexander the Great by Jacob Abbott offers a compelling biography of one of history’s most legendary conquerors. Written in a narrative style that is accessible and engaging, the book traces Alexander’s rise from a young Macedonian prince to a ruler of one of the largest empires the world has ever known. Abbott explores the key battles, political strategies, and personal traits that defined Alexander’s career, while also delving into his complex personality and leadership style. The book provides historical context without overwhelming the reader, making it perfect for both students and enthusiasts. A fascinating look into the ambition, brilliance, and flaws of a man who changed the course of history forever."

    },{
        code : 19,
        titre : 'Daily Laws',
        image : 'images/daily.jpg',
        auteur : 'Robert Green',
        categorie : 'Développement',
        prix : 2200,
        description: "The Daily Laws by Robert Greene is a powerful daily guide for mastering life, power, and personal growth. Structured around 365 meditations, the book draws on Greene’s most influential works—including The 48 Laws of Power, Mastery, and The Laws of Human Nature—to deliver a lesson for each day of the year. These concise, thought-provoking entries offer insights into human behavior, strategy, ambition, and creativity. Designed for reflection and real-world application, The Daily Laws encourages consistent self-awareness and discipline. It serves as both a tool for long-term transformation and a source of daily motivation. Whether you’re a leader, artist, or thinker, this book will sharpen your focus and deepen your understanding of yourself and others."

    },{
        code : 20,
        titre : 'The anger of Achilles',
        image : 'images/achilles.jpg',
        auteur : 'Homer',
        categorie : 'Histoire',
        prix : 2900,
        description: "The Anger of Achilles is a modern retelling of Homer’s Iliad, focusing on the rage and inner conflict of the Greek hero Achilles during the Trojan War. Through poetic language and emotional depth, the book delves into Achilles’s pride, grief, and sense of honor, which ultimately drive the tragic events of the war. The narrative captures the brutality of ancient combat and the delicate balance between glory and destruction. This adaptation retains the epic scale of the original while making the story more accessible to contemporary readers. It’s a tale of friendship, revenge, and destiny that continues to resonate through the centuries, offering timeless lessons on the cost of pride and the complexities of heroism."

    },{
        code : 21,
        titre : 'Meditations',
        image : 'images/meditaions.jpg',
        auteur : 'Marcus Aurelius',
        categorie : 'Philosophie',
        prix : 3800,
        description: "Meditations by Marcus Aurelius is a timeless collection of philosophical reflections written by the Roman emperor during his rule in the 2nd century AD. Rooted in Stoic philosophy, these personal writings offer wisdom on self-discipline, virtue, duty, and resilience. Aurelius contemplates the nature of life, the importance of inner peace, and the value of living in harmony with the universe. Despite being written nearly two thousand years ago, the meditations remain strikingly relevant for modern readers seeking guidance in a chaotic world. Honest, humble, and deeply introspective, this book is not just a guide for leaders but for anyone striving to live a more thoughtful, purposeful life. A profound and meditative masterpiece of ancient thought."

    },{
        code : 22,
        titre : 'L\'etranger',
        image : 'images/etranger.jpg',
        auteur : 'Albert Camus',
        categorie : 'Philosophie',
        prix : 1900,
        description: "The Stranger, written by Nobel Prize-winning author Albert Camus, is a powerful exploration of absurdism and existential philosophy. The novel follows Meursault, an emotionally detached French Algerian who is indifferent to social norms and morality. After committing a seemingly senseless murder, he is put on trial, not just for his crime, but for his lack of emotional conformity. Through Meursault's passive and indifferent perspective, Camus challenges the expectations of society and the meaning of life itself. Stark, thought-provoking, and deeply philosophical, The Stranger is a cornerstone of 20th-century literature and a profound reflection on the absurdity of existence."


    }
];


let cart = JSON.parse(localStorage.getItem('cart')) || [];


function displayBooks(){


    const container = document.querySelector(".display-content");
    container.innerHTML = '';

    books.forEach((book)=>{
        const bookDiv = document.createElement("book-div");
        bookDiv.className = "book-div";

        const image = document.createElement("img");
        image.className = "image";
        image.src = `${book.image}`;

        const codeDiv = document.createElement("div");
        codeDiv.textContent = `- Code : ${book.code}`;

        const titleDiv = document.createElement("div");
        titleDiv.textContent = `- Title : ${book.titre}`;

        const auteurDiv = document.createElement("div");
        auteurDiv.textContent = `- Author : ${book.auteur}`;

        const categorieDiv = document.createElement("div");
        categorieDiv.textContent = `- Categorie : ${book.categorie}`;

        const prixDiv = document.createElement("div");
        prixDiv.textContent = `- Price : ${book.prix}`;

        const addButton = document.createElement("button");
        addButton.className = "add-button";
        addButton.textContent = 'Add To Cart';
        addButton.addEventListener('click', ()=>{
           let trouve = cart.find((b)=>b.code === book.code);

           if(trouve){
             affErrorMsg();

             displayCart();
           }else{
              
              cart.push({
                code : book.code,
                image : book.image,
                titre : book.titre,
                auteur : book.auteur,
                categorie : book.categorie,
                quantite: 1,
                prix : book.prix
              });

              console.log(cart);
              displayCart();

              affAddMsg();

           }

        });

        image.addEventListener('click', ()=>{
            showBookDetails(book);
        });

        
        bookDiv.appendChild(image);
        bookDiv.appendChild(codeDiv);
        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(auteurDiv);
        bookDiv.appendChild(categorieDiv);
        bookDiv.appendChild(prixDiv);
        bookDiv.appendChild(addButton);

        

        container.appendChild(bookDiv);
    });


}


displayBooks();

let addMsgTImeout;
function affAddMsg(){

    const addMsg = document.querySelector(".add-msg");
    addMsg.style.display = "block";
      addMsg.style.color = "green";
    addMsg.innerHTML = "Book Added successfuly";
  

    clearTimeout(addMsgTImeout);

    addMsgTImeout = setTimeout(()=>{
        addMsg.style.display = "none";
    }, 2000);

}


//let errorTimeout;
function affErrorMsg(){

    const errorMsg = document.querySelector(".add-msg");
    errorMsg.style.display = "block";
    errorMsg.style.color = "red";

    errorMsg.innerHTML = 'The book you entered is already in your cart Go to the cart to update quantity';

    clearTimeout(addMsgTImeout);

    addMsgTImeout = setTimeout(()=>{
        errorMsg.style.display = "none";
    },3000);

}


let cartMsgTimeout;
function displayCart(){

    displayArticles();
    displayTotalPrice();

    const cartContainer = document.querySelector(".display-cart");
    cartContainer.innerHTML = '';

    const cartMsg = document.querySelector(".cart-msg");
    
    
    cart.forEach((book, i)=>{

                const bookDiv = document.createElement("div");
        bookDiv.className = "book-div";



        const image = document.createElement("img");
        image.className = "image";
        image.src = `${book.image}`;

        image.addEventListener('click', ()=>{
            showBookDetails(book);
        });

        const codeDiv = document.createElement("div");
        codeDiv.textContent = `- Code : ${book.code}`;

        const titleDiv = document.createElement("div");
        titleDiv.textContent = `- Title : ${book.titre}`;

        const auteurDiv = document.createElement("div");
        auteurDiv.textContent = `- Author : ${book.auteur}`;

        const categorieDiv = document.createElement("div");
        categorieDiv.textContent = `- Categorie : ${book.categorie}`;

        const quantiteDiv = document.createElement("div");
        quantiteDiv.textContent = `- Quantite : ${book.quantite}`;

        const prixDiv = document.createElement("div");
        prixDiv.textContent = `- Price : ${book.prix}`;


        bookDiv.appendChild(image);
        bookDiv.appendChild(codeDiv);
        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(auteurDiv);
        bookDiv.appendChild(categorieDiv);
        bookDiv.appendChild(quantiteDiv);
        bookDiv.appendChild(prixDiv);

        

        const plusButton = document.createElement("button");
        plusButton.className = "plus-button";
        plusButton.textContent = '+';
        plusButton.addEventListener('click', ()=>{
            
            if(book.quantite + 1 <=5){
                book.quantite += 1;
                displayCart();
            }else{
               cartMsg.style.display = "block";
               cartMsg.style.color = "red";

               cartMsg.innerHTML = 'You can not purchase more than 5 exemples of a book';

               clearTimeout(cartMsgTimeout);

               cartMsgTimeout = setTimeout(()=>{
                cartMsg.style.display = "none";

               }, 3500);

            }

            
        });

        const moinsButton = document.createElement("button");
        moinsButton.className = "moins-button";
        moinsButton.textContent = '-';

        moinsButton.addEventListener('click', ()=>{

            if(book.quantite - 1>= 1){
                book.quantite -= 1;
                displayCart();
                displayArticles();
                displayTotalPrice();
            }else{

                if(confirm(`Do you want to delete book : ${book.titre} from your cart ?`)){
                    cart.splice(i, 1);
                    displayCart();
                    displayArticles();
                    displayTotalPrice();
                }
                
            }
        });


        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "plus-div";
        buttonsDiv.appendChild(plusButton);
        buttonsDiv.appendChild(moinsButton);
        
        bookDiv.appendChild(buttonsDiv);

        cartContainer.appendChild(bookDiv);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
}


displayCart();


function calculateNumberOfBook(){

    let S = 0;

    cart.forEach((book)=>{
        S += Number(book.quantite);
    });

    return S;
}
function displayArticles(){

    let nbrItems = calculateNumberOfBook();

    document.querySelector(".display-numbers-articles").innerHTML = `You have in your &#128722; : ${nbrItems} books among ${cart.length} book exemples`;

}

displayArticles();



function calculateTotalPrice(){

    let S = 0;

    cart.forEach((book)=>{
        S += Number(book.quantite)*Number(book.prix);
    });

    return S;
}
function displayTotalPrice(){

    let total = calculateTotalPrice();

    document.querySelector(".display-total").innerHTML = `Total price is : ${total} Da`;

}


let searchTimeout;
let addSearchTimeout;
function searchBook(){

    let codeIn = document.querySelector(".search-code");
    let code = codeIn.value;

    let trouve = books.find((book)=>Number(book.code) === Number(code));
    const searchMsg = document.querySelector(".search-msg");

    const container = document.querySelector(".display-search");
    container.innerHTML = '';

    const addMsg = document.querySelector(".searchM");

    if(trouve){
       searchMsg.style.color = "green";
       searchMsg.innerHTML = 'Book found !';

       clearTimeout(searchTimeout);

       searchTimeout = setTimeout(()=>{
         searchMsg.innerHTML = '';
       },2500);

               const bookDiv = document.createElement("div");
        bookDiv.className = "book-div";


        const image = document.createElement("img");
        image.className = "image";
        image.src = `${trouve.image}`;

                   image.addEventListener('click', ()=>{
            showBookDetails(trouve);
        });

        const codeDiv = document.createElement("div");
        codeDiv.textContent = `- Code : ${trouve.code}`;

        const titleDiv = document.createElement("div");
        titleDiv.textContent = `- Title : ${trouve.titre}`;

        const auteurDiv = document.createElement("div");
        auteurDiv.textContent = `- Author : ${trouve.auteur}`;

        const categorieDiv = document.createElement("div");
        categorieDiv.textContent = `- Categorie : ${trouve.categorie}`;
                                          
        const prixDiv = document.createElement("div");
        prixDiv.textContent = `- Price : ${trouve.prix}`;

        const addButton = document.createElement("button");
        addButton.className = "add-button";
        addButton.textContent = 'Add To Cart';
        addButton.addEventListener('click', ()=>{
           let find = cart.find((b)=>Number(b.code) === Number(trouve.code));

           if(find){

               addMsg.style.display = "block";
               addMsg.style.color = "red";
               addMsg.innerHTML = 'The book is already in your cart';

               clearTimeout(addSearchTimeout);

               addSearchTimeout = setTimeout(()=>{
                addMsg.style.display = "none";
               },2500);

           }else{
              
              cart.push({
                code : trouve.code,
                image : trouve.image,
                titre : trouve.titre,
                auteur : trouve.auteur,
                categorie : trouve.categorie,
                quantite: 1,
                prix : trouve.prix
              });

              console.log(cart);
              displayCart();

              addMsg.style.display = "block";
              addMsg.style.color = "green";
              addMsg.innerHTML = "Book added succesfuly";
              
              clearTimeout(addSearchTimeout);

              addSearchTimeout = setTimeout(()=>{
                addMsg.style.display = "none";
              }, 2000);
            

           }

        });


        
        bookDiv.appendChild(image);
        bookDiv.appendChild(codeDiv);
        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(auteurDiv);
        bookDiv.appendChild(categorieDiv);
        bookDiv.appendChild(prixDiv);
        bookDiv.appendChild(addButton);


        container.appendChild(bookDiv);
    }else{

        searchMsg.style.color = "red";
        searchMsg.innerHTML = "code not found !";

        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(()=>{
            searchMsg.innerHTML = '';
        },2000);

    }


}


const searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', ()=>{
    searchBook();
});


let filterDisplayTimeout;

function filterBooks(){

    const container = document.querySelector(".display-filter");
    container.innerHTML = '';

    let categorieIn = document.querySelector(".input-categorie");
    let categorie = categorieIn.value;

    const filterMsg = document.querySelector(".display-filter-msg");


    books.forEach((book)=>{
        if(book.categorie === categorie){

            filterMsg.style.color = "green";
            filterMsg.innerHTML = "Gategorie found !";


            clearTimeout(filterDisplayTimeout);

            filterDisplayTimeout = setTimeout(()=>{
                filterMsg.innerHTML = '';
            }, 2000);


                const bookDiv = document.createElement("book-div");
                bookDiv.className = "book-div";

                


                const image = document.createElement("img");
                image.className = "image";
                image.src = `${book.image}`;

                image.addEventListener('click', ()=>{
                    showBookDetails(book);
                });

                const codeDiv = document.createElement("div");
                codeDiv.textContent = `- Code : ${book.code}`;

                const titleDiv = document.createElement("div");
                titleDiv.textContent = `- Title : ${book.titre}`;

                const auteurDiv = document.createElement("div");
                auteurDiv.textContent = `- Author : ${book.auteur}`;

                const categorieDiv = document.createElement("div");
                categorieDiv.textContent = `- Categorie : ${book.categorie}`;

                const prixDiv = document.createElement("div");
                prixDiv.textContent = `- Price : ${book.prix}`;

                const addButton = document.createElement("button");
                addButton.className = "add-button";
                addButton.textContent = 'Add To Cart';
                addButton.addEventListener('click', ()=>{
                let trouve = cart.find((b)=>b.code === book.code);

                if(trouve){
                    
                    displayErrorFilter();

                    displayCart();
                }else{
                    
                    cart.push({
                        code : book.code,
                        image : book.image,
                        titre : book.titre,
                        auteur : book.auteur,
                        categorie : book.categorie,
                        quantite : 1,
                        prix : book.prix
                    });

                    console.log(cart);
                    displayCart();

                    displayAddFilter();

          

                }
            });


        
        bookDiv.appendChild(image);
        bookDiv.appendChild(codeDiv);
        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(auteurDiv);
        bookDiv.appendChild(categorieDiv);
        bookDiv.appendChild(prixDiv);
        bookDiv.appendChild(addButton);

        

        container.appendChild(bookDiv);
        }
    });

    if(container.innerHTML === ''){
        filterMsg.style.color = "red";

        filterMsg.innerHTML = 'Categorie not found';

        clearTimeout(filterDisplayTimeout);

        filterDisplayTimeout = setTimeout(()=>{
            filterMsg.innerHTML = '';
        }, 2000);
    }
}

let filterMsgTimeout;
function displayErrorFilter(){


    const msg = document.querySelector(".filter-msg");
    msg.style.display = "block";
    msg.style.color = "red";

    msg.innerHTML = 'The book already exists in your cart';

    clearTimeout(filterMsgTimeout);

    filterMsgTimeout = setTimeout(()=>{
        msg.style.display = "none";
    },2500);

}

function displayAddFilter(){
 
     const msg = document.querySelector(".filter-msg");
    msg.style.display = "block";
    msg.style.color = "green";
    msg.innerHTML = 'Book added successfuly';

    clearTimeout(filterMsgTimeout);

    filterMsgTimeout = setTimeout(()=>{
        msg.style.display = "none";
    },2500);
    
}


const filterButton = document.querySelector(".filter-button");

filterButton.addEventListener('click', ()=>{

    filterBooks();

});



document.querySelector(".reset-button").addEventListener('click', ()=>{
    cart = [];
    displayCart();
    displayTotalPrice();
});