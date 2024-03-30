import React, { useContext, useEffect, useState } from 'react';
import { TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import QuantityBox from '../common/QuantityBox';


const CartItem = ({ item}) => {
    const [cartGuest, setCartGuest] = useState(() => {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    });
    const newPrice = displayMoney(item?.salePrice);
    const oldPrice = displayMoney(item?.price);

    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const cartitem = cartGuest.find(cartitem => cartitem.id === item.id);

    const quantity = cartitem? cartitem.quantity : 1;

    const handleRemoveCartItem = (itemId) => {
        const newcart = cartGuest.filter(it => it.id !== itemId);

        setCartGuest(newcart);

        localStorage.setItem('cart', JSON.stringify(newcart));
        alert("đã xóa item khỏi cart");
    }

    useEffect(()=>{
        
    },[cartGuest])
    
    return (
        <>
            <div className="cart_item">
                <figure className="cart_item_img">
                    <Link to="{`${path}${id}`}">
                        <img src={item?.image[0].imageUrl} alt="product-img" />
                    </Link>
                </figure>
                <div className="cart_item_info">
                    <div className="cart_item_head">
                        <h4 className="cart_item_title">
                            <Link to={`/product-details/${item?.id}`}>{item?.name}</Link>
                        </h4>
                        <div className="cart_item_del">
                            <span onClick={() => handleRemoveCartItem(item?.id)}>
                                <TbTrash />
                            </span>
                            <div className="tooltip">Xóa</div>
                        </div>
                    </div>

                    <h2 className="cart_item_price">
                        {newPrice} &nbsp;
                        <small><del>{oldPrice}</del></small>
                    </h2>
                    <div className="size-select">
                        <h4>Size:</h4>
                        {item?.sizeOptions.map((size) => (
                            <span
                                key={size.id}
                                className={`size-option ${selectedSize === size.name ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size.name}
                            </span>
                        ))}
                    </div>
                    <QuantityBox itemId={item?.id} itemQuantity={quantity} />

                </div>
            </div>
        </>
    );
};

export default CartItem;