import React from 'react';
import { useSelector } from 'react-redux';
import ProductReviews from './ProductReviews';
import ProductRating from '../product/ProductRating';

const ProductSummary = ({ review }) => {

    const { product } = useSelector(state => state.product);
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
                    <div className="prod_details_ratings">
                        <ProductRating rating={product?.averageRating || 5} />
                        {/* <span>{product?.averageRating}</span> */}
                        {product?.reViewProducts.length > 0 && <span className='rating_text'>({product?.averageRating + "/5"})</span>}
                    </div>
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