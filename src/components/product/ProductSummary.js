import React from 'react';
import reviewsData from '../../data/reviewsData';
import useActive from '../../hooks/useActive';
import ProductReviews from './ProductReviews';


const ProductSummary = (props) => {

    const { brand, title, info, category, type, connectivity } = props;

    const { active, handleActive, activeClass } = useActive('specs');


    return (
        <>
            <section id="product_summary" className="section">
                <div className='reviews_product'>
                    <div className='star_user'>
                        <div className='rating'>
                            <h4 className='h4-v1'>5 sao</h4>
                            <div className="rating-bar-container">
                                <div className="rating-bar rating-bar-5star"></div>
                            </div>
                            <h4 className='h4-v2'>70%</h4>
                        </div>
                        <div className='rating'>
                            <h4 className='h4-v1'>4 sao</h4>
                            <div className="rating-bar-container">
                                <div className="rating-bar rating-bar-4star"></div>
                            </div>
                            <h4 className='h4-v2'>17%</h4>
                        </div>
                        <div className='rating'>
                            <h4 className='h4-v1'>3 sao</h4>
                            <div className="rating-bar-container">
                                <div className="rating-bar rating-bar-3star"></div>
                            </div>
                            <h4 className='h4-v2'>8%</h4>
                        </div>
                        <div className='rating'>
                            <h4 className='h4-v1'>2 sao</h4>
                            <div className="rating-bar-container">
                                <div className="rating-bar rating-bar-2star"></div>
                            </div>
                            <h4 className='h4-v2'>4%</h4>
                        </div>
                        <div className='rating'>
                            <h4 className='h4-v1'>1 sao</h4>
                            <div className="rating-bar-container">
                                <div className="rating-bar rating-bar-1star"></div>
                            </div>
                            <h4 className='h4-v2'>1%</h4>
                        </div>
                    </div>
                    
                    <div className="container">
                        {/*===== Product-Summary-Details =====*/}
                        <div className="prod_summary_details">

                            <div className="prod_reviews">
                                <ul>
                                    {
                                        reviewsData.map(item => (
                                            <ProductReviews
                                                key={item.id}
                                                {...item}
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