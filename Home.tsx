import  { memo } from "react"
import Hero from "../Components/HomeComponents/Hero";
import About from "../Components/HomeComponents/About";
import Why from "../Components/HomeComponents/Why";
import {motion} from "framer-motion"
import Best from "../Components/HomeComponents/Best";
import Categories from "../Components/HomeComponents/Categories";
import Testimonials from "../Components/HomeComponents/Testimonials";
import Faq from "../Components/HomeComponents/Faq";
import Contact from "../Components/HomeComponents/Contact";
import Footer from "../Components/HomeComponents/Footer";


const Home = () => {

    const sectionVariants = {
  hidden: { opacity: 0, y: 50 },  // invisible & déplacé vers le bas
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};


    return(
         <section className="flex flex-col w-full items-center">
            <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full"
      >
             <Hero/>
             </motion.div>

             <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full"
      >
             <About/>
             </motion.div>

             
              <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full"
      >
             <Why/>
             </motion.div>

             <Best/>
             <Categories/>
             <Testimonials/>
             <Faq/>
             <Contact/>
             <Footer/>
         </section>
    )
}

export default memo(Home);