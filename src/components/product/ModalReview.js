import React, { useContext, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import reviewContext from '../../contexts/review/reviewContext';



const ModalReview = ({ onClose, order }) => {

    const {reviewProduct} = useContext(reviewContext);

    const [reviews, setReviews] = useState([]);
    const [hoverValue, setHoverValue] = useState(0);

    console.log("Đơn hàng là: ", order);

    useEffect(() => {
        setReviews(order?.orderItems.map(item => ({ productId: item.product.id, rating: 0, hover: 0, review: '' })));
    }, [order]);


    const handleRatingChange = (productId, newRating) => {
        setReviews(reviews.map(review => review.productId === productId ? { ...review, rating: newRating } : review));
    };

    const handleHoverChange = (productId, newHover) => {
        setReviews(reviews.map(review => review.productId === productId ? { ...review, hover: newHover } : review));
    };

    const handleReviewTextChange = (productId, newReviewText) => {
        setReviews(reviews.map(review => review.productId === productId ? { ...review, review: newReviewText } : review));
    };

    const data = {
        order: order,
        reviewProducts: reviews.map(review => ({
            rating: review.rating,
            comment: review.review
        }))
    };
    const handleSubmit = () => {
        reviewProduct(data);
    };

    const renderStars = (rating, setRating) => {
        return [...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
                <span
                    key={index}
                    className={`star ${ratingValue <= (hoverValue || rating) ? 'selected' : ''}`}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHoverValue(ratingValue)}
                    onMouseLeave={() => setHoverValue(0)}
                >&#9733;</span>
            );
        });
    };

    const handleReView = () => {

    }

    return (
        <div className="modal_review">
            <div className='modal_content'>
                <button className="close-button" onClick={onClose}><MdClose /></button>

                {order?.orderItems.map((item, index) => {
                    const review = reviews.find(review => review.productId === item.product.id);
                    if (!review) {
                        return null;
                    }
                    return (<div class="modal_content-box v-1" key={index}>
                        <div class="order">
                            <div class="order-left" >
                                <img src={item?.product?.image[0]?.imageUrl} alt="Sản phẩm 3" />
                                <div class="order-details">
                                    <h3>{item?.product?.name}</h3>
                                    <p>Size: {item?.sizeOption?.name}</p>
                                    {item?.toppingOption && <p>Topping: {item?.toppingOption?.name}</p>}
                                    <h5>x{item?.quantity}</h5>
                                </div>
                            </div>

                            <div className="separator"></div>

                            <div className="serviceRating">
                                <div className="service">
                                    <div className="label">Chất lượng sản phẩm</div>
                                    <div className="stars">
                                        {renderStars(review.rating, (newRating) => handleRatingChange(review.productId, newRating), (newHover) => handleHoverChange(review.productId, newHover))}
                                    </div>
                                </div>
                            </div>

                            <div class="payment-address-form">
                                <form>
                                    <textarea name='additional-info' placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm nhé' onChange={(e) => handleReviewTextChange(item.product.id, e.target.value)}></textarea>
                                </form>
                            </div>
                        </div>
                    </div>)
                })}

                <div className="btn-group">
                    <button type="button" className="btn-2 btn-primary" onClick={onClose}>Trở Lại</button>
                    <button type="submit" className="btn-1 btn-primary" onClick={handleSubmit}>Đánh Giá</button>
                </div>
            </div>
        </div>

    );
};

export default ModalReview;