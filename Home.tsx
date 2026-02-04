import  { memo } from "react"
import Header from "../Components/Header";

import Hero from "../Components/Hero";
import About from "../Components/About";
import Programs from "../Components/Programs";
import WhyChoose from "../Components/WhyChoose";
import MainTestimonials from "../Components/MainTestimonials";
import MainFaq from "../Components/MainFaq";
import Contact from "../Components/Contact";


const Home = () => {

    return(
        <>
          <Header/>
          <Hero/>
          <About/>
          <Programs/>
          <WhyChoose/>
          <MainTestimonials/>
          <MainFaq/>
          <Contact/>
        </>
    )
}

export default memo(Home);