import React from 'react';
import { IoMdStar } from 'react-icons/io';

const ProductReviews = (props) => {

    const { name, date, review, rateCount } = props;

    return (
        <>
            <li>
                <div className='user_avatar'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrEJMXA4HU6NNsX9ImmYWYEvithsfvIwliyw&s" alt="" />
                </div>
                <div className="user_info">
                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrEJMXA4HU6NNsX9ImmYWYEvithsfvIwliyw&s" alt="" /> */}
                    <div>
                        <h4>{name}</h4>
                        <div className="user_ratings">
                            <div className="rating_star">
                                {
                                    [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
                                }
                            </div>
                            {/* <span>|</span> */}
                            <div className="date">14-08-2024 14:47</div>
                        </div>
                    </div>
                </div>
                <p className="user_review">{review}</p>
            </li>
        </>
    );
};

export default ProductReviews;