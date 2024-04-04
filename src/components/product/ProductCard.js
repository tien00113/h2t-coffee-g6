import React, { useContext, useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import cartContext from '../../contexts/cart/cartContext';
import useActive from '../../hooks/useActive';
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import ProductModal from '../cart/ProductModal';

const ProductCard = ({ item }) => {
    const { auth } = useSelector(state => state)
    const { addItemCartUser, addItemCartGuest } = useContext(cartContext);
    const { active, handleActive, activeClass } = useActive(false);

    const handleAddItemToGuestCart = () => {
        const newItem = { id: item.id, quantity: 1 };
        addItemCartGuest(newItem, 1);
    
        handleActive(item?.id);
    
        setTimeout(() => {
            handleActive(false);
        }, 3000);
    };
    

    const newPrice = displayMoney(item?.price);
    const oldPrice = displayMoney(item?.price);

    let obj = {
        "productId": item.id,
        "quantity": 1
    };

    let json = JSON.stringify(obj);

    const addToUserCart = () => {
        addItemCartUser(json);
    }

    const handleAddToCart = () => {
        if (auth.user === null) {
            handleAddItemToGuestCart();
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
     // button Mua Ngay
     const [modalVisible, setModalVisible] = useState(false);
     const handleBuyNowClick = () => {
         setModalVisible(true);
     };
     const handleCloseModal = () => {
         setModalVisible(false);
     };

    return (
        <>
            <div className="card products_card">
                <figure className="products_img">
                    <Link to="{`/product-details/${item.id}`}">
                        <img src={item?.image[0].imageUrl} alt="image-product" />
                    </Link>
                    <div className='btn_card'>
                        <button
                            type="button"
                            className={`btn products_btn ${activeClass(item?.id)}`}
                            onClick={handleAddToCart}
                        >
                            {active ? 'Đã Thêm' : 'Giỏ Hàng'}
                        </button>
                        <button className="btn buy_btn" onClick={handleBuyNowClick}>
                            Mua Ngay
                        </button>
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
                        <div className='icon_card' onClick={handleClick}>
                            <span><FaHeart style={{ color: color }} /></span>
                        </div>
                    </div>
                </div>
            </div>
            {modalVisible && <ProductModal item={item} onClose={handleCloseModal} />}
        </>
    );
};

export default ProductCard;