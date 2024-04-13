import React, { useContext, useEffect, useState } from 'react';
import { BsCartX } from 'react-icons/bs';
import { displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import cartContext from '../contexts/cart/cartContext';
import CartItem from '../components/cart/CartItem';
import EmptyView from '../components/common/EmptyView';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductInCartGuest } from '../Redux/Product/product.action';


const Cart = ({ auth }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const dispatch = useDispatch();

    const { product } = useSelector(store => store);

    useDocTitle('Cart');

    const { cartGuests, cartUser, getUserCart } = useContext(cartContext);

    useEffect(() => {
        if (auth.user === null) {
            const productIds = cartGuests.map(item => item.productId);
            // dispatch(getProductInCartGuest(productIds));
        }
        else {
            getUserCart();
            localStorage.removeItem('cart');
        }
    }, [cartGuests, auth.user]);

    useEffect(() => {
        let p = 0;
        let ps = 0;
        cartGuests.map(item => {
            p += (item?.product?.price + item?.sizeOption?.price + ((item?.toppingOption) ? item?.toppingOption?.price : 0)) * item?.quantity;
            ps += (item?.product?.salePrice + item?.sizeOption?.price + ((item?.toppingOption) ? item?.toppingOption?.price : 0)) * item?.quantity;
        });
        setPrice(p);
        setDiscount(p - ps);
    }, [cartGuests]);
    console.log("cart guest: ", cartGuests);
    console.log("cart currentId: ", localStorage.getItem("currentId"));
    return (
        <>
            <section id="cart" className="section">
                {auth.user === null ? (<div className="container">
                    {
                        cartGuests.length === 0 ? (
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
                                        cartGuests.map(item => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                quantityItem={item.quantity}
                                            />
                                        ))
                                    }
                                </div>

                                <div className="cart_right_col">
                                    <div className="order_summary">
                                        <h3>
                                            Tổng Sản Phẩm: &nbsp;
                                            {/* {cartGuests.length} */}
                                        </h3>
                                        <div className="order_summary_details">
                                            <div className="price">
                                                <span>Giá niêm yết</span>
                                                <b>{displayMoney(price)}</b>
                                            </div>
                                            <div className="discount">
                                                <span>Khuyến mãi</span>
                                                <b>- {displayMoney(discount)}</b>
                                            </div>
                                            <div className="delivery">
                                                <span>Vận chuyển</span>
                                                <b>Free</b>
                                            </div>
                                            <div className="separator"></div>
                                            <div className="total_price">
                                                <b><small>Tổng tiền</small></b>
                                                <b>{displayMoney(price - discount)}</b>
                                            </div>
                                        </div>
                                        <button type="button" className="btn-2 checkout_btn"><Link to="/checkout">Thanh Toán</Link></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>) : (<div className="container">
                    {
                        cartUser?.cartItems && cartUser?.cartItems.length === 0 ? (
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
                                        cartUser?.cartItems.map(item => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                quantityItem={item?.quantity}
                                                cartId={item?.id}
                                            />
                                        ))
                                    }
                                </div>

                                <div className="cart_right_col">
                                    <div className="order_summary">
                                        <h3>
                                            Tổng sản phẩm &nbsp;
                                            {/* {cartUser?.totalItem} */}
                                        </h3>
                                        <div className="order_summary_details">
                                            <div className="price">
                                                <span>Giá niêm yết</span>
                                                <b>{displayMoney(cartUser?.totalPrice)}</b>
                                            </div>
                                            <div className="discount">
                                                <span>Khuyến mãi</span>
                                                <b>- {displayMoney(cartUser?.totalPrice - cartUser?.totalSalePrice)}</b>
                                            </div>
                                            <div className="delivery">
                                                <span>Vận chuyển</span>
                                                <b>Free</b>
                                            </div>
                                            <div className="separator"></div>
                                            <div className="total_price">
                                                <b><small>Tổng tiền</small></b>
                                                <b>{displayMoney(cartUser?.totalSalePrice)}</b>
                                            </div>
                                        </div>
                                        <button type="button" className="btn-2 checkout_btn"><Link to="/checkout">Thanh Toán</Link></button>
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