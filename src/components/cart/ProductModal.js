import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { displayMoney } from '../../helpers/utils';
import cartContext from '../../contexts/cart/cartContext';

const ProductModal = ({ onClose, item, auth, status }) => {

    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };
    const [selectedTopping, setSelectedTopping] = useState(null);
    const handleToppingClick = (topping) => {
        if (selectedTopping === topping) {
            setSelectedTopping(null);
        } else {
            setSelectedTopping(topping);
        }
    };

    const orderItems = [
        {
            product: item,
            sizeOption: selectedSize,
            toppingOption: selectedTopping,
            quantity: count,
            price: (item?.price+ (selectedTopping ? selectedTopping?.price : 0 ) + selectedSize?.price) * count,
            priceSale: (item?.salePrice+ (selectedTopping ? selectedTopping?.price : 0 ) + selectedSize?.price) * count,
            userId: auth?.id
        }
    ]

    const { addItemCartUser, addItemCartGuest } = useContext(cartContext);

    let currentId = localStorage.getItem('currentId');
    currentId = currentId ? Number(currentId) : 1;
    const handleAddItemToGuestCart = () => {
        const newItem = { id: currentId,product: item, sizeOption: selectedSize, toppingOption: selectedTopping, quantity:count };
        addItemCartGuest(newItem,count);
        currentId++;
        localStorage.setItem("currentId",currentId);
    };

    let obj = {
        "productId": item.id,
        "quantity": count,
        "sizeOption": selectedSize,
        "toppingOption": selectedTopping,
    };

    let json = JSON.stringify(obj);

    const addToUserCart = () => {
        addItemCartUser(json);
    }

    const handleAddToCart = () => {
        if (!auth) {
            handleAddItemToGuestCart();
            onClose();
        }
        else {
            addToUserCart();
            onClose();
        }
    }

    return (
        <div className="modal-box">
            <div className='modal-content'>
                <div class="modal-first">
                    <div className="first-left">
                        <img src={item.image[0].imageUrl} alt="Bac Xiu" />
                        <div>
                            <h4>{item?.name}</h4>
                            <h4 className="cart_item_price">
                                {displayMoney(item.salePrice)} &nbsp;
                                <small><del>{displayMoney(item.price)}</del></small>
                            </h4>
                        </div>
                    </div>
                    <button className="close-button" onClick={onClose}><MdClose /></button>
                </div>

                <div className="separator"></div>

                <div className="modal-details">
                    <h4>Size:</h4>
                    <div className="size">
                        {item?.sizeOptions.map((size) => (
                            <>
                                <span
                                    key={size.id}
                                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => handleSizeClick(size)}
                                >
                                    {size.name}
                                </span>
                            </>

                        ))}
                    </div>

                    {item?.toppingOptions.length !== 0 && (<div><div className="separator"></div>

                        <h4>Topping:</h4>
                        <div className="topping">
                            {item?.toppingOptions.map((topping) => (
                                <ul>
                                    <li
                                        key={topping.id}
                                        className={`topping-option ${selectedTopping === topping ? 'selected' : ''}`}
                                        onClick={() => handleToppingClick(topping)}
                                    >
                                        {topping.name}
                                    </li>
                                </ul>
                            ))}
                        </div> </div>)}

                    <div className="separator"></div>

                    <div className="quantity">
                        <div className="counter">
                            <button className="counter__button" onClick={() => setCount(Math.max(count - 1, 1))}>-</button>
                            <span className="counter__count">{count}</span>
                            <button className="counter__button" onClick={() => setCount(count + 1)}>+</button>
                        </div>
                        {status ? (<button className={`${selectedSize ? 'btn-1 add-to-cart' : 'disabled'}`} onClick={() => {navigate("/checkout", {state: {item: orderItems}})}}>Mua Ngay</button>) : (<button className={`${selectedSize ? 'btn-1 add-to-cart' : 'disabled'}`} onClick={handleAddToCart}>Thêm Vào Giỏ</button>)}
                    </div>
                </div>

            </div>
        </div>

    );
};

export default ProductModal;