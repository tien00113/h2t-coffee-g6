import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';

const RouterRoutes = () => {

    useScrollRestore();

    const {auth} = useSelector(store=> store);

    useEffect(()=>{

    },auth?.user?.address);

    console.log("tất cả các address: ", auth?.user?.address);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/cart" element={<Cart auth={auth}/>} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/product-details/:productId" element={<ProductDetails auth={auth}/>} />
                <Route path="/checkout" element={<CheckOut auth={auth}/>}/>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;