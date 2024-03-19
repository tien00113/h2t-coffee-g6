import React, { useContext } from 'react';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import cartContext from '../../contexts/cart/cartContext';
import useActive from '../../hooks/useActive';
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";


const ProductCard = (props) => {

    const { id, images, title, info, finalPrice, originalPrice, rateCount, path } = props;

    const { addItem } = useContext(cartContext);
    const { active, handleActive, activeClass } = useActive(false);


    // handling Add-to-cart
    const handleAddItem = () => {
        const item = { ...props };
        addItem(item);

        handleActive(id);

        setTimeout(() => {
            handleActive(false);
        }, 3000);
    };

    const newPrice = displayMoney(finalPrice);
    const oldPrice = displayMoney(originalPrice);


    return (
        <>
            <div className="card products_card">
                <figure className="products_img">
                    <Link to={`${path}${id}`}>
                        <img src={images[1]} alt="product-img" />
                    </Link>
                    <div class='btn_card'>
                        <button
                            type="button"
                            className={`btn products_btn ${activeClass(id)}`}
                            onClick={handleAddItem}
                            >
                            {active ? 'Đã Thêm' : 'Giỏ Hàng'}
                        </button>
                        <button type="button" className="btn buy_btn"><Link to="/checkout">Mua Ngay</Link></button>
                    </div>
                </figure>
                <div className="products_details">
                    <h3 className="products_title">
                        <Link to={`${path}${id}`}>{title}</Link>
                    </h3>
                    {/* <h5 className="products_info">{info}</h5> */}

                    <div className="separator"></div>

                    <span className="rating_star">
                        {
                            [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
                        }
                    </span>
                    <div className="prod_details_price">
                        <div className="price_box">
                            <h2 className="price">
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