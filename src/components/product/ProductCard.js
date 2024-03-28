import React, { useContext } from 'react';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import cartContext from '../../contexts/cart/cartContext';
import useActive from '../../hooks/useActive';
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";


const ProductCard = ({ item }) => {

    // const { id, images, title, info, finalPrice, originalPrice, rateCount, path } = item;

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
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cart:[]};
        const existingProductIndex =cart.findIndex(item => item.id === productId);
        if (existingProductIndex >= 0) {
            // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
            cart[existingProductIndex].quantity = cart[existingProductIndex].quantity +1;
            console.log("vcl",cart)

        } else {
            const product = { id: productId, quantity: quantity };
            console.log("có phải mảng không: ", Array.isArray(cart))
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const cartGuest = localStorage.getItem('cart');

    console.log("cart đây này: ", cartGuest);


    const handleAddToCart = () => {
        addToCartGuest(item.id, 1);

        handleActive(item?.id);
        setTimeout(() => {
            handleActive(false);
        }, 3000);
    }

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
                        <div class='icon_card'>
                            <span><FaRegHeart /></span>
                            {/* <span><BsCart4 /></span> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;