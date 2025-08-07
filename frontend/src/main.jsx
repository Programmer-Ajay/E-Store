import { createRoot } from 'react-dom/client'
import './index.css'
import { App, MainLayout } from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router'

import store from './redux/store.js'
import { Provider } from 'react-redux'

import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Regster.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Users/profile.jsx'
import Shop from './pages/Shop.jsx'
import Cart from './pages/Cart.jsx'

//Admin routes
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import Userslist from './pages/Admin/userlist.jsx'
import Category from './pages/Admin/Category.jsx'
import AddProduct from './pages/Admin/AddProduct.jsx'
import AllProduct from './pages/Admin/AllProduct.jsx'

import UpdateProduct from './pages/Admin/updateProduct.jsx'

// product routes
import AllSearchedproducts from './pages/product/AllSearchProducts.jsx'
import FavouriteProducts from './pages/product/favourite.jsx'
import ProductDetails from './pages/product/productDetails.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
   // route without Navigation bar
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    // route without navigation
      <Route element={<MainLayout />}>
        <Route index={true} path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/search' element={<AllSearchedproducts />} />
        <Route path='/shop'  element={<Shop/>}/>
        <Route path='/favourite' element={<FavouriteProducts />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='products/:id' element={<ProductDetails />} />
        

     // admin routes
        <Route path='/admin' element=      {<AdminRoute/>}>
          <Route path='userslist' element={<Userslist />} />
          <Route path='category' element={<Category />} />
          <Route path='productslist' element={<AllProduct />} />
          <Route path='AddProduct' element={<AddProduct />} />
          <Route path='AddProduct' element={<AddProduct />} />
          <Route path='updateProduct/:id' element={<UpdateProduct />} />
        </Route>


      </Route>


    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>



)
