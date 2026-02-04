import  { memo } from "react"
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { useLanguagesContext } from "../Contexts/LanguagesContext";
import CourseHero from "../Components/CourseComponents/CourseHero";
import Testimonials from "../Components/CourseComponents/Testimonials";
import Faq from "../Components/CourseComponents/Faq";
import FormSend from "../Components/CourseComponents/FormSend";


const Course = () => {

    const {code} = useParams();
    const {programs} = useLanguagesContext();

    const course = programs.find((p)=>p.code === Number(code));

    return(
        <>
           <Header/>

             {!course ?
               <h1>Course not found</h1> 
               : 
                 <>
                    <CourseHero program={course}/>
                    <Testimonials course={course}/>
                    <Faq course={course}/>
                    <FormSend program={course}/>
                 </>
            }
        </>
    )
}

export default memo(Course);