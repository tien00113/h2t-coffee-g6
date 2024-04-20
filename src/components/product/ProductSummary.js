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
            </section>
        </>
    );
};

export default ProductSummary;