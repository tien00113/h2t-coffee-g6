import React from 'react';
import { Routes, Route } from 'react-router';
import useScrollRestore from '../hooks/useScrollRestore';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ErrorPage from '../pages/ErrorPage';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import CheckOut from '../pages/CheckOut';
import History from '../pages/History';

const RouterRoutes = () => {

    useScrollRestore();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/product-details/:productId" element={<ProductDetails />} />
                <Route path="/checkout" element={<CheckOut/>}/>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;