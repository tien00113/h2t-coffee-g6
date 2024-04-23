import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';



const ModalReview = ({ onClose }) => {

    const [rating, setRating] = useState(0);

    const renderStars = (rating, setRating) => {
        return [...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
                <span
                    key={index}
                    className={`star ${ratingValue <= rating ? 'selected' : ''}`}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => { }}
                    onMouseLeave={() => { }}
                >&#9733;</span>
            );
        });
    };

    return (
        <div className="modal_review">
            <div className='modal_content'>
                <button className="close-button" onClick={onClose}><MdClose /></button>

                <div class="modal_content-box">
                    <div class="order">
                        <div class="order-left" >
                            <img src="https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sản phẩm 3" />
                            <div class="order-details">
                                <h3>Xiên Rau Củ</h3>
                                <p>Size: S</p>
                                <h5>x2</h5>
                            </div>
                        </div>

                        <div className="separator"></div>

                        <div className="serviceRating">
                            <div className="service">
                                <div className="label">Chất lượng sản phẩm</div>
                                <div className="stars">
                                    {renderStars(rating, setRating)}
                                </div>
                            </div>
                        </div>

                        <div class="payment-address-form">
                            <form>
                                <textarea name='additional-info' placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm nhé'></textarea>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="modal_content-box v-1">

                    <div class="order">
                        <dev className='order_info'>
                            <div class="order-left" >
                                <img src="https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sản phẩm 3" />
                                <div class="order-details">
                                    <h3>Xiên Rau Củ</h3>
                                    <p>Size: S</p>
                                    <h5>x2</h5>
                                </div>
                            </div>
                        </dev>

                        <div className="separator"></div>

                        <div className="serviceRating">
                            <div className="service">
                                <div className="label">Chất lượng sản phẩm</div>
                                <div className="stars">
                                    {renderStars(rating, setRating)}
                                </div>
                            </div>
                        </div>

                        <div class="payment-address-form">
                            <form>
                                <textarea name='additional-info' placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm nhé'></textarea>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="modal_content-box v-1">

                    <div class="order">
                        <dev className='order_info'>
                            <div class="order-left" >
                                <img src="https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sản phẩm 3" />
                                <div class="order-details">
                                    <h3>Xiên Rau Củ</h3>
                                    <p>Size: S</p>
                                    <h5>x2</h5>
                                </div>
                            </div>
                        </dev>

                        <div className="separator"></div>

                        <div className="serviceRating">
                            <div className="service">
                                <div className="label">Chất lượng sản phẩm</div>
                                <div className="stars">
                                    {renderStars(rating, setRating)}
                                </div>
                            </div>
                        </div>

                        <div class="payment-address-form">
                            <form>
                                <textarea name='additional-info' placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm nhé'></textarea>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="btn-group">
                    <button type="button" className="btn-2 btn-primary" onClick={onClose}>Trở Lại</button>
                    <button type="submit" className="btn-1 btn-primary">Xác Nhận</button>
                </div>
            </div>
        </div>

    );
};

export default ModalReview;