import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { displayMoney } from '../../helpers/utils';


const ProductModal = ({ onClose, item }) => {

    const [count, setCount] = useState(1);

    return (
        <div className="modal-box">
            <div className='modal-content'>
                <div class="modal-first">
                    <div className="first-left">
                        <img src={item.image[0].imageUrl} alt="Bac Xiu" />
                        <h4>{item?.name}</h4>
                    </div>
                    <button className="close-button" onClick={onClose}><MdClose /></button>
                </div>

                <div className="separator"></div>

                <div className="modal-details">
                    <div className="size">
                        <h4>Size:</h4>
                        <div className="size-options">
                            {item?.sizeOptions.map((size) => (
                                <label><input type="radio" name="size" value="small" checked />{size.name}</label>
                            ))}
                        </div>
                    </div>

                    <div className="separator"></div>

                    <div className="topping">
                        <h4>Topping:</h4>
                        <div className="topping-options">
                            {item?.toppingOptions.map((topping) => (
                                <label><input type="checkbox" name="topping" value="white-pearls" />{topping.name} (+{displayMoney(topping.price)})</label>
                            ))}
                        </div>
                    </div>

                    <div className="separator"></div>

                    <div className="note">
                        <textarea placeholder="Thêm ghi chú"></textarea>
                    </div>

                    <div className="separator"></div>

                    <div className="quantity-add_cart">
                        <div class="counter">
                            <button className="counter__button" onClick={() => setCount(Math.max(count - 1, 1))}>-</button>
                            <span className="counter__count">{count}</span>
                            <button className="counter__button" onClick={() => setCount(count + 1)}>+</button>
                        </div>
                        <button className="btn-1 add-to-cart"><Link to="/checkout">Mua Ngay</Link></button>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default ProductModal;