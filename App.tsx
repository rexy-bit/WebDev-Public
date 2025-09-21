
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ItemsProvider } from './Contexts/ItemsContext'
import { AuthProvider } from './Contexts/AuthContext'
import UserRoute from './Layouts/UserRoute'
import PublicLayout from './Layouts/PublicLayout'
import Home from './Pages/Home'
import Store from './Pages/Store'
import Description from './Pages/Description'
import Orders from './Pages/Orders'
import Cart from './Pages/Cart'
import AdminRoute from './Layouts/AdminRoute'
import AdminLayout from './Layouts/AdminLayout'
import { SearchProvider } from './Contexts/SearchContext'
import Search from './Pages/Search'
import Profile from './Pages/Profile'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import { CartProvider } from './Contexts/CartContext'
import { OrderProvider } from './Contexts/OrderContext'
import Track from './Pages/Track'
import Dashboard from './AdminPages/Dashboard'
import AdminOrders from './AdminPages/AdminOrders'
import Users from './AdminPages/Users'
import AdminStore from './AdminPages/AdminStore'
import AdminProfile from './AdminPages/AdminProfile'
import Update from './AdminPages/Update'
import Add from './AdminPages/Add'
import { UsersProvider } from './Contexts/UsersContext'
import { OrderAdminProvider } from './Contexts/OrderAdminContext'
import GeneralFooter from './Components/HomeComponents.tsx/GeneralFooter'

function App() {

  return (
    <AuthProvider>
    <ItemsProvider>
      <SearchProvider>
         <CartProvider>
        <OrderProvider>
          <UsersProvider>
            <OrderAdminProvider>
          
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

           <Route path='/store' element={
            <>
             
            <Store/>
            <GeneralFooter/>
            </>
           }/>

           <Route path='/description' element={
            <>
            <Description/>
            <GeneralFooter/>
            
                </>
           }/>

           <Route path='/orders' element={
            <>
            
            <Orders/>
            <GeneralFooter/>
            </>

           }/>

            <Route path='/track/:id' element={
              <>
                
                <Track/>
                <GeneralFooter/>
              </>
            }/>
           <Route path='/cart' element={
            <>
            
            <Cart/>
            <GeneralFooter/>
            </>
           }/>
     
           <Route path="/search" element={
            <>
              
              <Search/>
              <GeneralFooter/>
            </>
           }/>

             <Route path='/description/:id' element={
              <>
                
                <Description/>
                <GeneralFooter/>
              </>
            }/>
            
            <Route path='/profile' element={
              <>
                
                <Profile/>
                <GeneralFooter/>
              </>
            }/>

            <Route path='/signUp' element={
              <>
                
                <SignUp/>
                <GeneralFooter/>
              </>
            }/>

            <Route path='/signIn' element={
              <>
                
                <SignIn/>
                <GeneralFooter/>
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

               <Route path='orders' element={
                 <AdminOrders/>
              }/>
 
                 <Route path='users' element={
                <Users/>
              }/>

              <Route path='store' element={
                <AdminStore/>
              }/>
              
               <Route path='profile' element={
                <AdminProfile/>
              }/>

              <Route path='update/:id' element={
                <Update/>
              }/>

              <Route path='add' element={
                <Add/>
              }
              />
            </Route>

      </Routes>


                </OrderAdminProvider>
             </UsersProvider>
          </OrderProvider>
        </CartProvider>
        
       </SearchProvider>
    </ItemsProvider>
    </AuthProvider>
  )
}

export default App
