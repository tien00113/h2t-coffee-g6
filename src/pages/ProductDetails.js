import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdStar, IoMdCheckmark } from 'react-icons/io';
import { calculateDiscount, displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import useActive from '../hooks/useActive';
import cartContext from '../contexts/cart/cartContext';
import productsData from '../data/productsData';
import SectionsHead from '../components/common/SectionsHead';
import RelatedSlider from '../components/sliders/RelatedSlider';
import ProductSummary from '../components/product/ProductSummary';
import Services from '../components/common/Services';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductAction, getProductDetail } from '../Redux/Product/product.action';


// const ProductDetails = () => {
//     const { productId } = useParams();

//     const { product } = useSelector(state => state.product);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getProductDetail(productId));
//     }, [dispatch, productId])
//     /////////////////////////
//     /////////////////////////\
//     ////////////////////////
// import { getAllProductsAction } from '../Redux/Product/product.action';


const ProductDetails = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector(store => store);
    console.log("tất cả sản phẩm", products);

    useEffect(() => {
        dispatch(getAllProductAction());
    }, product)
    useDocTitle('Product Details');

    const { handleActive, activeClass } = useActive(0);

    const { addItem } = useContext(cartContext);

    // here the 'id' received has 'string-type', so converting it to a 'Number'
    const prodId = parseInt(productId);

    // showing the Product based on the received 'id'
    const products = productsData.find(item => item.id === prodId);

    const { images, title, info, category, finalPrice, originalPrice, ratings, rateCount } = products;

    const [previewImg, setPreviewImg] = useState(images[0]);

    const [count, setCount] = useState(0);

    // handling Add-to-cart
    const handleAddItem = () => {
        addItem(product);
    };


    // setting the very-first image on re-render
    useEffect(() => {
        setPreviewImg(product?.image[0].imageUrl);
        handleActive(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product?.image]);


    // handling Preview image
    const handlePreviewImg = (i) => {
        setPreviewImg(images[i]);
        handleActive(i);
    };


    // calculating Prices
    const discountedPrice = originalPrice - finalPrice;
    const newPrice = displayMoney(product?.salePrice);
    const oldPrice = displayMoney(product?.price);
    // const savedPrice = displayMoney(discountedPrice);
    // const savedDiscount = calculateDiscount(discountedPrice, originalPrice);


    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedTopping, setSelectedTopping] = useState(null);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };
    const handleToppingClick = (topping) => {
        setSelectedTopping(topping);
    };

    console.log("sản phẩm chi tiết này này: ", product);

    return (
        <>
            <section id="product_details" className="section">
                <div className="container">
                    <div className="wrapper prod_details_wrapper">

                        {/*=== Product Details Left-content ===*/}
                        <div className="prod_details_left_col">
                            <div className="prod_details_tabs">
                                {/* {
                                    images.map((img, i) => (
                                        <div
                                            key={i}
                                            className={`tabs_item ${activeClass(i)}`}
                                            onClick={() => handlePreviewImg(i)}
                                        >
                                            <img src={img} alt="product-img" />
                                        </div>
                                    ))
                                } */}
                            </div>
                            <figure className="prod_details_img">
                                <img src={previewImg} alt="product-img" />
                            </figure>
                        </div>

                        {/*=== Product Details Right-content ===*/}
                        <div className="prod_details_right_col">
                            <h1 className="prod_details_title">{title}</h1>

                            <div className="prod_details_ratings">
                                <span className="rating_star">
                                    {
                                        [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
                                    }
                                    {
                                        product?.reViewProducts && product?.reViewProducts.length >0 ?
                                            [...Array(5)].map((_, i) => <IoMdStar key={i} />)
                                            :
                                            [...Array(product?.reViewProducts.rate)].map((_, i) => <IoMdStar key={i} />)

                                    }
                                </span>
                                <span>|</span>
                                <Link to="*">{ratings} Ratings</Link>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_price">
                                <div className="price_box">
                                    <h2 className="price">
                                        {newPrice} &nbsp;
                                        <small className="del_price"><del>{oldPrice}</del></small>
                                    </h2>
                                </div>
                            </div>


                            <div className="size-select">
                                <h4>Size:</h4>
                                {product?.sizeOptions.map((size) => (
                                    <span
                                        key={size.id}
                                        className={`size-option ${selectedSize === size.name ? 'selected' : ''}`}
                                        onClick={() => handleSizeClick(size.name)}
                                    >
                                        {size.name}
                                    </span>
                                ))}
                            </div>

                            <div class="counter">
                                <button className="counter__button" onClick={() => setCount(Math.max(count - 1, 1))}>-</button>
                                <span className="counter__count">{count}</span>
                                <button className="counter__button" onClick={() => setCount(count + 1)}>+</button>
                            </div>

                            <div className="separator"></div>

                            <div class='topping'>
                                <h4>Topping:</h4>
                                {product?.toppingOptions.map((topping) => (
                                    <ul>
                                        <li
                                            key={topping.id}
                                            className={`topping-option ${selectedTopping === topping.name ? 'selected' : ''}`}
                                            onClick={() => handleToppingClick(topping.name)}
                                        >
                                            {topping.name}
                                        </li>
                                    </ul>
                                ))}
                            </div>

                            <div className="separator"></div>


                            <div className="prod_details_buy_btn">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleAddItem}
                                >
                                    Add to cart
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* <ProductSummary {...product} /> */}

            <section id="related_products" className="section">
                <div className="container">
                    <SectionsHead heading="Related Products" />
                    <RelatedSlider category={category} />
                </div>
            </section>

            <Services />
        </>
    );
};

export default ProductDetails;