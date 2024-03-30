import React, { useContext, useEffect, useState } from 'react';
import { BsCartX } from 'react-icons/bs';
import { calculateTotal, displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import cartContext from '../contexts/cart/cartContext';
import CartItem from '../components/cart/CartItem';
import EmptyView from '../components/common/EmptyView';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductInCartGuest, getUserCartAction } from '../Redux/Product/product.action';



const Cart = () => {
    const dispatch = useDispatch();

    const { product, auth } = useSelector(store => store);

    console.log("user hieen tai la : ", auth)
    console.log("product store hien tai : ", product)

    useDocTitle('Cart');

    const { cartItems } = useContext(cartContext);

    const cartQuantity = cartItems.length;

    // total original price
    const cartTotal = cartItems.map(item => {
        return item.originalPrice * item.quantity;
    });

    const calculateCartTotal = calculateTotal(cartTotal);
    const displayCartTotal = displayMoney(calculateCartTotal);


    // total discount
    const cartDiscount = cartItems.map(item => {
        return (item.originalPrice - item.finalPrice) * item.quantity;
    });

    const calculateCartDiscount = calculateTotal(cartDiscount);
    const displayCartDiscount = displayMoney(calculateCartDiscount);


    // final total amount
    const totalAmount = calculateCartTotal - calculateCartDiscount;
    const displayTotalAmount = displayMoney(totalAmount);

    const [cartGuest, setCartGuest] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        if (auth.user === null) {
            const productIds = cartGuest.map(item => item.id);
            dispatch(getProductInCartGuest(productIds));
            console.log("alo auth daaty")
        }
        else {
            dispatch(getUserCartAction());
            console.log("alo auth day day day day nay", product)
        }

    }, [cartGuest])
    
    useEffect(()=>{
        dispatch(getUserCartAction());
    },[dispatch])
    return (
        <>
            <section id="cart" className="section">
                {auth.user === null ? (<div className="container">
                    {
                        cartGuest.length === 0 ? (
                            <EmptyView
                                icon={<BsCartX />}
                                msg="Gior Hàng Rỗng"
                                link="/all-products"
                                btnText="Mua Ngay"
                            />
                        ) : (
                            <div className="wrapper cart_wrapper">
                                <div className="cart_left_col">
                                    {
                                        product.cartGuest.map(item => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                            />
                                        ))
                                    }
                                </div>

                                <div className="cart_right_col">
                                    <div className="order_summary">
                                        <h3>
                                            Mat hang thanh toan &nbsp;
                                            ( {cartQuantity} {cartQuantity > 1 ? 'items' : 'item'} )
                                        </h3>
                                        <div className="order_summary_details">
                                            <div className="price">
                                                <span>Giá niêm yết</span>
                                                <b>{displayCartTotal}</b>
                                            </div>
                                            <div className="discount">
                                                <span>Khuyến mãi</span>
                                                <b>- {displayCartDiscount}</b>
                                            </div>
                                            <div className="delivery">
                                                <span>Vận chuyển</span>
                                                <b>Free</b>
                                            </div>
                                            <div className="separator"></div>
                                            <div className="total_price">
                                                <b><small>Tổng tiền</small></b>
                                                <b>{displayTotalAmount}</b>
                                            </div>
                                        </div>
                                        <button type="button" className="btn checkout_btn"><Link to="/checkout">Thanh Toán</Link></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>) : (<div className="container">
                    {
                        product.cart.length === 0 ? (
                            <EmptyView
                                icon={<BsCartX />}
                                msg="Giỏ Hàng Rỗng"
                                link="/all-products"
                                btnText="Mua Ngay"
                            />
                        ) : (
                            <div className="wrapper cart_wrapper">
                                <div className="cart_left_col">
                                    {
                                        product.cart.map(item => (
                                            <CartItem
                                                key={item.product.id}
                                                item={item.product}
                                            />
                                        ))
                                    }
                                </div>

                                <div className="cart_right_col">
                                    <div className="order_summary">
                                        <h3>
                                            tong thanh taon item &nbsp;
                                            ( {cartQuantity} {cartQuantity > 1 ? 'items' : 'item'} )
                                        </h3>
                                        <div className="order_summary_details">
                                            <div className="price">
                                                <span>Giá niêm yết</span>
                                                <b>{displayCartTotal}</b>
                                            </div>
                                            <div className="discount">
                                                <span>Khuyến mãi</span>
                                                <b>- {displayCartDiscount}</b>
                                            </div>
                                            <div className="delivery">
                                                <span>Vận chuyển</span>
                                                <b>Free</b>
                                            </div>
                                            <div className="separator"></div>
                                            <div className="total_price">
                                                <b><small>Tổng tiền</small></b>
                                                <b>{displayTotalAmount}</b>
                                            </div>
                                        </div>
                                        <button type="button" className="btn checkout_btn"><Link to="/checkout">Thanh Toán</Link></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>)}
            </section>
        </>
    );
};

export default Cart;