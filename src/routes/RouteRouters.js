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
import OrderManage from '../pages/OrderManage';
import OrderDetails from '../pages/OrderDetails';
import { useSelector } from 'react-redux';

const RouterRoutes = () => {

    useScrollRestore();

    const user = useSelector(store => store.auth?.user);

    useEffect(() => {

    }, [user?.address.length]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/cart" element={<Cart auth={user} />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/product-details/:productId" element={<ProductDetails auth={user} />} />
                <Route path="/checkout" element={<CheckOut auth={user} />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/order-manage" element={<OrderManage />} />
                <Route path="/order-details" element={<OrderDetails />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;