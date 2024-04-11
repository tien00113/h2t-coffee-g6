import React, { useContext, useState } from 'react';
import { TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import QuantityBox from '../common/QuantityBox';
import cartContext from '../../contexts/cart/cartContext';

const CartItem = ({ item, quantityItem, cartId }) => {
    const { removeItem, cartGuests, removeItemCartUser } = useContext(cartContext);
    const newPrice = displayMoney(item?.product?.salePrice + item?.sizeOption?.price + ((item?.toppingOption !== null)? item?.toppingOption?.price : 0));
    const oldPrice = displayMoney(item?.product?.price + item?.sizeOption?.price + ((item?.toppingOption !== null)? item?.toppingOption?.price : 0));

    const [selectedSize, setSelectedSize] = useState(null);

    const cartItem = cartGuests.find(cartItem => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 1;

    return (
        <>
            <div className="cart_item">
                <figure className="cart_item_img">
                    <Link to={`/product-details/${item?.product?.id}`}>
                        <img src={item?.product?.image[0].imageUrl} alt="product-img" />
                    </Link>
                </figure>
                <div className="cart_item_info">
                    <div className="cart_item_head">
                        <h4 className="cart_item_title">
                            <Link to={`/product-details/${item?.product?.id}`}>{item?.product?.name}</Link>
                        </h4>
                        <div className="cart_item_del">
                            <span onClick={() => { cartGuests.length === 0 ? removeItemCartUser(cartId) : removeItem(item?.id) }}>
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
                        <span
                            className='size-option'
                        >
                            {item?.sizeOption?.name}
                        </span>
                    </div>
                    {item?.toppingOption && <div className="size-select">
                        <h4>Topping:</h4>
                        <span
                            className='size-option'
                        >
                            {item?.toppingOption?.name}
                        </span>
                    </div>}
                    <QuantityBox itemId={item?.id} itemQuantity={cartGuests.length === 0 ? quantityItem : quantity} check={cartGuests.length === 0 ? true : false} cartItemId={cartId} />
                </div>
            </div>
        </>
    );
};

export default CartItem;