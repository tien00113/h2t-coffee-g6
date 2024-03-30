import React, { useContext, useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import cartContext from '../../contexts/cart/cartContext';
import useActive from '../../hooks/useActive';
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToUserCartAction } from '../../Redux/Cart/cart.action';

const ProductCard = ({ item }) => {

    const dispatch = useDispatch();
    const { auth } = useSelector(store => store)
    const { addItem } = useContext(cartContext);
    const { active, handleActive, activeClass } = useActive(false);


    // handling Add-to-cart
    const handleAddItem = () => {
        const item = { item };
        addItem(item);

        handleActive(item?.id);

        setTimeout(() => {
            handleActive(false);
        }, 3000);
    };

    const newPrice = displayMoney(item?.price);
    const oldPrice = displayMoney(item?.price);

    const addToCartGuest = (productId, quantity) => {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cart: [] };
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex >= 0) {
            // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
            cart[existingProductIndex].quantity = cart[existingProductIndex].quantity + 1;

        } else {
            const product = { id: productId, quantity: quantity };
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    let obj = {
        "productId": item.id,
        "quantity": 1
    };

    let json = JSON.stringify(obj);

    const addToUserCart = () => {
        dispatch(addToUserCartAction(json));
    }

    const handleAddToCart = () => {
        if (auth.user === null) {
            addToCartGuest(item.id, 1);
        }
        else {
            addToUserCart();
        }

        handleActive(item?.id);
        setTimeout(() => {
            handleActive(false);
        }, 3000);
    }
    const [color, setColor] = useState('white');

    const handleClick = () => {
        if (color === 'red') {
            setColor('white');
        } else {
            setColor('red');
        }
    };

    return (
        <>
            <div className="card products_card">
                <figure className="products_img">
                    <Link to="{`/product-details/${item.id}`}">
                        <img src={item?.image[0].imageUrl} alt="image-product" />
                    </Link>
                    <div class='btn_card'>
                        <button
                            type="button"
                            className={`btn products_btn ${activeClass(item?.id)}`}
                            onClick={handleAddToCart}
                        >
                            {active ? 'Đã Thêm' : 'Giỏ Hàng'}
                        </button>
                        <button type="button" className="btn buy_btn"><Link to="/checkout">Mua Ngay</Link></button>
                    </div>
                </figure>
                <div className="products_details">
                    <h3 className="products_title">
                        <Link to={`/product-details/${item?.id}`}>{item?.name}</Link>
                    </h3>
                    {/* <h5 className="products_info">{info}</h5> */}

                    <div className="separator"></div>

                    <span className="rating_star">
                        {
                            item?.reViewProducts && item?.reViewProducts.length > 0 ?
                                [...Array(item?.reViewProducts.rate)].map((_, i) => <IoMdStar key={i} />)
                                :
                                [...Array(5)].map((_, i) => <IoMdStar key={i} />)

                        }
                    </span>
                    <div className="prod_details_price">
                        <div className="price_box">
                            <h2 className="price" style={{ color: "white" }}>
                                {newPrice} &nbsp;
                                <small className="del_price"><del>{oldPrice}</del></small>
                            </h2>
                        </div>
                        <div class='icon_card' onClick={handleClick}>
                            <span><FaHeart style={{ color: color }} /></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;