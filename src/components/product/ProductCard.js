import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import useActive from '../../hooks/useActive';
import { FaHeart } from "react-icons/fa";
import ProductModal from '../cart/ProductModal';
import { useSelector } from 'react-redux';
import ProductRating from './ProductRating';

const ProductCard = ({ item }) => {
    const { user } = useSelector(store => store.auth?.user);
    const { active, activeClass } = useActive(false);
    const [status, setStatus] = useState(false);
    const newPrice = displayMoney(item?.salePrice);
    const oldPrice = displayMoney(item?.price);

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
        setStatus(true)
    };
    const handleAddToCartClick = () => {
        setModalVisible(true);
        setStatus(false)
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <div className="card products_card">
                <figure className="products_img">
                    <Link to={`/product-details/${item?.id}`}>
                        <img src={item?.image[0]?.imageUrl} alt="image-product" />
                    </Link>
                    <div className='btn_card'>
                        <button
                            type="button"
                            className={`btn products_btn ${activeClass(item?.id)}`}
                            onClick={handleAddToCartClick}
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
                        <ProductRating rating={item?.averageRating || 5} />
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
            {modalVisible && <ProductModal key={item.id} item={item} auth={user} status={status} onClose={handleCloseModal} />}
        </>
    );
};

export default ProductCard;