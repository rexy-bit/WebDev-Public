import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Header from './Components/HomeComponents/Header'
import Profile from './Pages/Profile'
import { AuthProvider } from './Contexts/AuthContexts'
import { ItemsProvider } from './Contexts/ItemsContexts'
import Store from './Pages/Store'
import { CartProvider } from './Contexts/CartContext'
import Cart from './Pages/Cart'

function App() {
  



  return(
    
    <AuthProvider>
      <ItemsProvider>
        <CartProvider>
     <Routes>
      

          
        <Route path='/' element={
          <>
          <Header/>
          <Home/>
          </>
        }/>

        <Route path='/profile' element={
          <>
            <Header/>
            <Profile/>
          </>
        }/>

        <Route path='/store' element={
          <>
          <Header/>
          <Store/>
          </>
        }/>
        
        <Route path='/cart' element={

          <>
            <Header/>
            <Cart/>
          </>
        }/>
     </Routes>

           </CartProvider>
        </ItemsProvider>
     </AuthProvider>
  )
}

export default App
