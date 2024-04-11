import React, { useContext } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import cartContext from '../../contexts/cart/cartContext';


const QuantityBox = (props) => {

    const { itemId, itemQuantity, check, cartItemId} = props;

    const { incrementItem, decrementItem, incrementItemCartUser, decrementItemCartUser } = useContext(cartContext);


    console.log("check uanbtity guset cartItem: ", itemQuantity)
    return (
        <>
            <div className="quantity_box">
                <button
                    type="button"
                    onClick={() => {!check ? decrementItem(itemId) : decrementItemCartUser(cartItemId)}}
                >
                    <FaMinus />
                </button>
                <span className="quantity_count">
                    {itemQuantity}
                </span>
                <button
                    type="button"
                    onClick={() => {!check ? incrementItem(itemId) : incrementItemCartUser(cartItemId)}}
                >
                    <FaPlus />
                </button>
            </div>
        </>
    );
};

export default QuantityBox;