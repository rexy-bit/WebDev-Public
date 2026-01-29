import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import { AuthProvider } from './Contexts/AuthContexts'
import { ItemsProvider } from './Contexts/ItemsContexts'
import Store from './Pages/Store'
import { CartProvider } from './Contexts/CartContext'
import Cart from './Pages/Cart'
import { OrderProvider } from './Contexts/OrdersContext'
import Orders from './Pages/Orders'
import Track from './Pages/Track'
import ItemDetails from './Pages/ItemDetails'
import { FavoritesProvider } from './Contexts/FavoritesContext'
import { SearchProvider } from './Contexts/SearchContext'
import Search from './Pages/Search'
import Favorites from './Pages/Favorites'
import ScrollToTop from './ScrollToTop'
import UserRoute from './Layouts/UserRoute'
import PublicLayout from './Layouts/PublicLayout'
import AdminRoute from './Layouts/AdminRoute'
import AdminLayout from './Layouts/AdminLayout'
import Dashboard from './AdminPages/Dashboard'
import Users from './AdminPages/Users'
import AdminOrders from './AdminPages/AdminOrders'
import Items from './AdminPages/Items'
import AdminProfile from './AdminPages/AdminProfile'
import { ItemsAdminContextProvider } from './AdminContexts/ItemsAdminContext'
import { OrdersAdminProvider } from './AdminContexts/OrdersAdminContext'
import { UsersAdminProvider } from './AdminContexts/UsersAdminContext'

function App() {
  



  return(
    
    <AuthProvider>
      <ItemsProvider>
        <CartProvider>
          <OrderProvider>
            <FavoritesProvider>
              <SearchProvider>
                <ItemsAdminContextProvider>
                  <OrdersAdminProvider>
                    <UsersAdminProvider>

                <ScrollToTop/>
     <Routes>
      

      <Route element={
        <UserRoute>
          <PublicLayout/>
        </UserRoute>
      }>

            <Route path='/' element={
          <>
          
          <Home/>
          </>
        }/>

        <Route path='/profile' element={
          <>
            
            <Profile/>
          </>
        }/>

        <Route path='/store' element={
          <>
          
          <Store/>
          </>
        }/>
        
        <Route path='/cart' element={

          <>
            
            <Cart/>
          </>
        }/>


        <Route path='/orders' element={
          <>
            
            <Orders/>
          </>
        }/>

        <Route  path='/track/:id' element={
           <>
              
               <Track/>
               </>
        }/>

        <Route path='/details/:id' element={
          <>
            
            <ItemDetails/>
          </>
        }/>

        <Route path='/search' element={
          <>
            
            <Search/>
          </>
        }/>

        <Route path='/favorites' element={

          <>
            
            <Favorites/>
          </>
        }/>
      </Route>
          

        <Route path='/admin/*' element={

           <AdminRoute>
            <AdminLayout/>
           </AdminRoute>

        }>

          <Route path='dashboard' element={
            <Dashboard/>
          }/>

          <Route path='users' element={
            <Users/>
          }/>

          <Route path='orders' element={
            <AdminOrders/>
          }/>

          <Route path='items' element={
            <Items/>
          }/>

          <Route path='profile' element={
            <AdminProfile/>
          }/>
           
        </Route>
     
     </Routes>

                                 </UsersAdminProvider>
                              </OrdersAdminProvider>

                         </ItemsAdminContextProvider>
                   </SearchProvider>
                 </FavoritesProvider>
              </OrderProvider>
           </CartProvider>
        </ItemsProvider>
     </AuthProvider>
  )
}

export default App
