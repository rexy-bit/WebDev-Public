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
import { OrderProvider } from './Contexts/OrdersContext'
import Orders from './Pages/Orders'
import Track from './Pages/Track'

function App() {
  



  return(
    
    <AuthProvider>
      <ItemsProvider>
        <CartProvider>
          <OrderProvider>
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


        <Route path='/orders' element={
          <>
            <Header/>
            <Orders/>
          </>
        }/>

        <Route  path='/track/:id' element={
           <>
              <Header/>
               <Track/>
               </>
        }/>
     </Routes>

              </OrderProvider>
           </CartProvider>
        </ItemsProvider>
     </AuthProvider>
  )
}

export default App
