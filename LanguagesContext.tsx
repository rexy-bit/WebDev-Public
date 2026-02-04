import { createContext, useContext } from "react";
import type { Program } from "./Types";





interface LanguagesContextType{
    programs : Program[]
}

const LanguagesContext = createContext<LanguagesContextType | null>(null);


export const LanguagesProvider = ({children} : {children : React.ReactNode}) => {


    const programs : Program[] = [
        {
            code : 0,
            name : 'English For Beginners',
            icon : 'https://res.cloudinary.com/dub4fhabm/image/upload/v1761947140/edf8d658-d770-4b58-9054-aca1ee0c7c86.png',
            level : 'Beginner',
            perfectText : "The perfect English course for beginners",
            shortDescrition : 'English for beginners is a complete programm for anyone who\'s interested in learning English, regardless of their background or prior experience.',
            longDescription : "In our English for Beginners course, you'll learn important language skills like grammar, new words, speaking, listening, and understanding what you read. Each part of the course focuses on a different skill. You'll follow clear lessons, do activities, and practice to improve. This course is made especially for people who are just starting to learn English. We start with the basics and gradually move to harder things, so it's easy to follow along.",
            attractiveText : "Start your journey to English fluency with our Beginner's English Course. Perfect for new learners, this course focuses on building a strong foundation. Gain confidence with our lessons, interactive quizzes, and games. Join us and master English today!",
            duration : '5 Weeks',
            advantages : ["30+ Lessons on video", "Unlimited access and immediate", "1000+ Quizzes and games"],
            type : 'Online',
            students : 25,
            perfectIcon : 'https://res.cloudinary.com/dub4fhabm/image/upload/v1762638659/undraw_destination_fkst_yqpapr.png',
            purchasePrice : 5500,
            why : [
                {
                icon : "fa-solid fa-flag-checkered",
                title : 'From the beginning to the end!',
                description : "From understanding basic sentence structures to mastering verb tenses and building vocabulary, our English for Beginners Grammar Course covers all the essentials to kickstart your language learning journey and build a solid foundation for fluency!"
                },{
                    icon : "fa-solid fa-laptop",
                    title : '100% online content',
                    description : "The English for Begginers program is 100% online, available 24/7 and designed to be completed in 1 week (or less, the choice is yours)."
                },{
                    icon : "fa-solid fa-list-check",
                    title : 'Get into practice!',
                    description : "English for Begginers is not only theoretical training, it is also practical and concrete application of the lessons taught."
                },{
                    icon : "fa-solid fa-clipboard-question",
                    title : 'Interactive quizzes',
                    description : "You'll gain access to a comprehensive library of over 1000 quizzes meticulously crafted by your instructor, designed to reinforce your grasp of the lessons covered in this course."
                },{
                    icon : "fa-solid fa-people-line",
                    title : 'A private community',
                    description : "Through the private community, you will be able to share, exchange and network with thousands of determined students."
                },{
                    icon : "fa-solid fa-graduation-cap",
                    title : 'Advanced method',
                    description : "You'll not only go through some english lessons, but you'll discover the science behind learning the language and aquiring it."
                }

            ],
            faq : [
                {
                    question : 'What Will I learn in this course?',
                    answer : "In this course, you will learn essential English language skills, especially the grammar and vocabulary part since they're one of the most important foundations for beginners. We'll cover topics tailored for beginners to help you build a strong foundation in English proficiency."
                }, {
                    question : 'How is this course structured?',
                    answer : "The course is divided into modules, each focusing on a specific aspect of English language learning. You'll progress through structured lessons, interactive activities, and practice exercises designed to reinforce your understanding and skills."
                }, {
                    question : 'Is this course suitable for absolute beginners?',
                    answer : "Yes, this course is specifically designed for absolute beginners with little to no prior knowledge of English. Our curriculum starts from the basics and gradually progresses to more advanced concepts, ensuring a smooth learning experience for beginners."
                }, {
                    question : 'How often will the live Zoom sessions be held?',
                    answer : "Our programm will have 2 regular Zoom sessions per week."
                }, {
                    question : 'Will there be interactive exercices or quizzes?',
                    answer : "Yes, the course includes interactive exercises and quizzes to reinforce your learning and assess your progress. These activities are designed to engage you actively in the learning process and provide immediate feedback on your understanding."
                }, {
                    question : 'What makes this course different from other English courses available online?',
                    answer : "Our course stands out for its comprehensive curriculum, interactive learning approach, personalized feedback, and experienced instructors. We prioritize student engagement and success, ensuring a rewarding learning experience that equips you with practical language skills for real-world communication."
                }, {
                    question : 'Will I recieve a certificate upon completion?',
                    answer : "Upon completing the course requirements, you will receive a certificate of achievement, recognizing your accomplishment and proficiency in learning the English language."
                }
               
            ],

            testomonials : [
                {
                    name : "Sarah Ahmed",
                    testimonial : "Polyglot helped me build confidence in speaking English from day one. The lessons are clear, interactive, and fun! I can now hold simple conversations without fear"
                },{
                    name : "Amina Benali",
                    testimonial : "The ‘English for Beginners’ course was the perfect start for me. The platform made learning easy and enjoyable, and I improved faster than I expected."
                },{
                    name : "Sahi Said",
                    testimonial : "Before joining Polyglot, I couldn’t understand basic English sentences. Now I can read, write, and even chat online in English! The teachers are patient and motivating."
                }
            ]

        },{
    code : 1,
    name : 'English Speaking',
    icon : 'https://res.cloudinary.com/dub4fhabm/image/upload/v1761947268/3cf510aa-8a98-41d1-a899-aaa9aa0b0b7d.png',
    perfectText : 'The perfect program to Speak English Fluently',
    level : 'Intermediate',
     perfectIcon : 'https://res.cloudinary.com/dub4fhabm/image/upload/v1762638659/undraw_destination_fkst_yqpapr.png',
    shortDescrition : "English Speaking is designed for learners who already know the basics and want to improve their fluency, pronunciation, and communication skills in real-life situations.",
    longDescription : "Our English Speaking Intermediate program focuses on helping you speak naturally and confidently. Through real-life dialogues, role-plays, and interactive sessions, you’ll learn how to express yourself clearly, use idiomatic expressions, and improve your pronunciation. You’ll also practice listening and responding quickly, preparing you for both casual and professional conversations. This course is ideal for learners who already have basic English knowledge and wish to reach the next level in their speaking journey.",
    attractiveText : "Take your English to the next level with our Intermediate Speaking Course! Gain real confidence in conversations, discussions, and presentations. Learn from real-world examples and interactive speaking sessions that make practice engaging and effective!",
    duration : '6 Weeks',
    type : 'On site',
    students : 20,
    purchasePrice : 6500,
    advantages : ["5 Weeks of Studying", "On-site Classes", "25 Students per group"],
    why : [
        {
            icon : "fa-solid fa-list-check",
            title : 'Fluency through practice!',
            description : "Through guided conversation sessions, pronunciation drills, and role-play exercises, our English Speaking program helps you speak more fluently and naturally. You’ll learn to think in English and communicate with ease in various everyday and professional situations."
        },{
            icon : "fa-solid fa-person-arrow-down-to-line",
            title : 'In-person learning advantage',
            description : "Experience dynamic classroom interactions where you can practice English face-to-face, receive instant feedback, and develop your speaking confidence in a supportive learning environment."
        },{
            icon : "fa-solid fa-volume-high",
            title : 'Speak with confidence!',
            description : "This program focuses on real-world communication rather than memorization. You’ll engage in practical discussions and real scenarios designed to help you use English effectively and naturally."
        },{
            icon : "fa-solid fa-users-rays",
            title : 'Interactive group activities',
            description : "Participate in group discussions, debates, and storytelling sessions that enhance teamwork, confidence, and critical thinking—all in English!"
        },{
            icon : "fa-solid fa-users-between-lines",
            title : 'Supportive speaking community',
            description : "Join a motivated community of English learners where you can practice daily, share your progress, and receive encouragement from peers and mentors."
        },{
            icon : "fa-solid fa-graduation-cap",
            title : 'Science-backed learning method',
            description : "Our approach combines neuroscience and language acquisition science to help you speak more naturally, remember longer, and express yourself more accurately."
        }
    ],
    faq : [
        {
            question : 'What will I learn in this course?',
            answer : "You’ll learn to speak English with greater fluency and accuracy, use idioms and expressions naturally, and improve pronunciation and listening comprehension. The course focuses heavily on real-world communication and confidence building."
        }, {
            question : 'Who is this course for?',
            answer : "This course is ideal for learners who already have a basic understanding of English grammar and vocabulary and now want to improve their speaking and listening skills for personal or professional use."
        }, {
            question : 'How is the course structured?',
            answer : "The course includes weekly live sessions, group activities, conversation practices, and real-time feedback. Each week introduces new communication themes, vocabulary, and speaking challenges."
        }, {
            question : 'Is this course only in person?',
            answer : "Yes, this program is designed to be delivered in person to maximize your speaking practice and real-time interaction with instructors and classmates."
        }, {
            question : 'Will there be assessments or feedback?',
            answer : "Yes! You’ll receive personalized feedback from instructors on your pronunciation, fluency, and accuracy after every speaking task and activity."
        }, {
            question : 'What makes this course unique?',
            answer : "Unlike typical English courses, this one focuses exclusively on communication skills. You’ll spend most of your time speaking, listening, and thinking in English, supported by a scientific learning approach and constant instructor feedback."
        }, {
            question : 'Do I receive a certificate at the end?',
            answer : "Yes, upon completing all sessions and assignments, you will receive a certificate of completion recognizing your progress and your ability to communicate effectively in English."
        }
    ],
    testomonials : [
        {
            name : "Hassan Merabet",
            testimonial : "Before joining the English Speaking program, I understood English but couldn’t express myself well. After just a few weeks, I can confidently speak and hold real conversations!"
        },{
            name : "Leila Mansouri",
            testimonial : "The in-person classes made a huge difference for me. Speaking face-to-face with others helped me overcome my fear of mistakes and improve my fluency naturally."
        },{
            name : "Karim Bouzid",
            testimonial : "Polyglot’s intermediate course pushed me to speak more and think in English. The teachers correct you kindly and give great advice. I feel much more confident now!"
        }
    ]
}


    ];


    return(
       <LanguagesContext.Provider value={{programs}}>
        {children}
       </LanguagesContext.Provider>
    )
}


export const useLanguagesContext = () => {

    const context = useContext(LanguagesContext);

    if(!context){

        throw new Error("Use the LanguagesContext inside the LanguagesProvider");
    }

    return context;
}