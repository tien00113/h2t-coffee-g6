import React from 'react';
import ProductReviews from './ProductReviews';


const ProductSummary = ({ review }) => {

    let ratingCounts = [0, 0, 0, 0, 0];

    if (!review) {
        review = [];
    }

    review.forEach(rv => {
        ratingCounts[rv.rating - 1]++;
    });

    let percentages = ratingCounts.map(count => Math.round((count / review.length) * 100));

    return (
        <>
            <section id="product_summary" className="section">
                <div className='reviews_product'>
                    <div className='star_user'>
                        {percentages.slice().reverse().map((percentage, index) => (
                            <div className='rating' key={index}>
                                <h4 className='h4-v1'>{5 - index} sao</h4>
                                <div className="rating-bar-container">
                                    <div className="rating-bar" style={{ width: `${percentage}%` }}></div>
                                </div>
                                <h4 className='h4-v2'>{percentage}%</h4>
                            </div>
                        ))}
                    </div>


                    <div className="container">
                        {/*===== Product-Summary-Details =====*/}
                        <div className="prod_summary_details">

                            <div className="prod_reviews">
                                <ul>
                                    {
                                        review.map((item) => (
                                            <ProductReviews
                                                key={item.id}
                                                userReview={item}
                                            />
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductSummary;