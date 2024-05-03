import React from 'react';
import { IoMdStar } from 'react-icons/io';

const ProductReviews = ({ userReview }) => {

    return (
        <div className='review_user'>
            <div className='comment_review'>
                <div className='user_avatar'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrEJMXA4HU6NNsX9ImmYWYEvithsfvIwliyw&s" alt="" />
                </div>
                <div className="user_info">
                    <h4>{userReview?.user?.username}</h4>
                    <div className="user_ratings">
                        <div className="rating_star">
                            {
                                [...Array(userReview?.rating)].map((_, i) => <IoMdStar key={i} />)
                            }
                        </div>
                        <div className="date">{userReview?.createAt}</div>
                    </div>
                    <p className="user_review">
                        {userReview?.comment}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;