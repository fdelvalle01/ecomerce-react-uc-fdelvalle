import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar';
import Home from '../screens/Home/Home';
import ProductsListContainer from '../screens/Product/ProductsListContainer';
import Cart from '../screens/Cart/Cart';

const Rutas = () => {
  return (
    <BrowserRouter>
    <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug/:CodeId/*" element={<ProductsListContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={ 
              <div>
                  <h1>404</h1>
              </div>
            }
            />
        </Routes>
    </BrowserRouter>
  )
}

export default Rutas