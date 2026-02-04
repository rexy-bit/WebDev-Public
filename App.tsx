
import './App.css'

import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import { LanguagesProvider } from './Contexts/LanguagesContext'
import Course from './Pages/Course'
import ScrollToTop from './ScrollToTop'

function App() {
  
  return(
    <LanguagesProvider>


      <ScrollToTop/>
    <Routes>
       <Route path="/" element={
        <Home/>
       }/>

       <Route path='/course/:code' element={
        <Course/>
       }/>
    </Routes>
    </LanguagesProvider>
  )
}

export default App
