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


const ProductDetails = ({ auth }) => {
    const { productId } = useParams();
    const prodId = parseInt(productId);
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getProductDetail(prodId));
    }, [dispatch])
    useDocTitle('Product Details');

    const { handleActive, activeClass } = useActive(0);

    const { addItemCartUser, addItemCartGuest } = useContext(cartContext);

    const [previewImg, setPreviewImg] = useState(product?.image[0].imageUrl);
    const [showError, setShowError] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedTopping, setSelectedTopping] = useState(null);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };
    const handleToppingClick = (topping) => {
        if (selectedTopping === topping) {
            setSelectedTopping(null);
        } else {
            setSelectedTopping(topping);
        }
    };

    const [count, setCount] = useState(1);

    // handling Add-to-cart
    let currentId = localStorage.getItem('currentId');
    currentId = currentId ? Number(currentId) : 1;
    console.log("currentId modal: ", currentId)
    const handleAddItemToGuestCart = () => {
        const newItem = { id: currentId, product: product, sizeOption: selectedSize, toppingOption: selectedTopping, quantity: count };
        addItemCartGuest(newItem, count);
        currentId++;
        localStorage.setItem("currentId", currentId);
    };

    let obj = {
        "productId": product?.id,
        "quantity": count,
        "sizeOption": selectedSize,
        "toppingOption": selectedTopping,
    };

    let json = JSON.stringify(obj);

    const addToUserCart = () => {
        addItemCartUser(json);
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            setShowError(true);
        } else {
            setShowError(false);
            if (auth.user === null) {
                handleAddItemToGuestCart();
            }
            else {
                addToUserCart();
            }
        }
    }

    // setting the very-first image on re-render
    useEffect(() => {
        setPreviewImg(product?.image[0].imageUrl);
        handleActive(0);
    }, [product?.image]);

    const newPrice = displayMoney(product?.salePrice);
    const oldPrice = displayMoney(product?.price);

    return (
        <>
            <section id="product_details" className="section">
                <div className="container">
                    <div className="wrapper prod_details_wrapper">

                        <div className="prod_details_left_col">
                            <div className="prod_details_img">
                                <img src={previewImg} alt="product-img" />
                            </div>
                        </div>

                        {/*=== Product Details Right-content ===*/}
                        <div className="prod_details_right_col">
                            <h1 className="prod_details_title">{product?.name}</h1>

                            <div className="prod_details_ratings">
                                <span className="rating_star">
                                    {/* {
                                        [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
                                    } */}
                                    {
                                        product?.reViewProducts && product?.reViewProducts.length > 0 ?
                                            [...Array(product?.reViewProducts)].map((_, i) => <IoMdStar key={i} />)
                                            :
                                            [...Array(5)].map((_, i) => <IoMdStar key={i} />)

                                    }
                                </span>
                                <span>|</span>
                                <Link to="*"> Ratings</Link>
                            </div>

                            <div className="prod_details_price">
                                <div className="price_box">
                                    <h2 className="price">
                                        {newPrice} &nbsp;
                                        <small className="del_price"><del>{oldPrice}</del></small>
                                    </h2>
                                </div>
                            </div>

                            <div className="separator"></div>

                            <div className="size">
                                <h4>Size</h4>
                                <div className="size-select">
                                    {product?.sizeOptions.map((size) => (
                                        <span
                                            key={size.id}
                                            className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={() => handleSizeClick(size)}
                                        >
                                            {size.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div class='topping'>
                                <h4>Topping</h4>
                                <div className="topping-select">
                                    {product?.toppingOptions.map((topping) => (
                                    <span 
                                        key={topping.id}
                                        className={`topping-option ${selectedTopping === topping ? 'selected' : ''}`}
                                        onClick={() => handleToppingClick(topping)}
                                    >
                                        {topping.name}
                                    </span>
                                    ))}
                                </div>
                            </div>

                            <div className='quantity'> 
                                <h4>Số lượng</h4>
                                <div class="counter">
                                    <button className="counter__button" onClick={() => setCount(Math.max(count - 1, 1))}>-</button>
                                    <span className="counter__count">{count}</span>
                                    <button className="counter__button" onClick={() => setCount(count + 1)}>+</button>
                                </div>
                            </div>


                            <div className="separator"></div>

                            <div className="describe">
                                <h4>Describe:</h4>
                                <p>{product?.description}</p>
                            </div>

                            <div className="separator"></div>

                            {showError && <div className="error_message">Bạn hãy chọn size để tiếp tục</div>}
                            <div className="prod_details_buy_btn">
                                <button type="button" className="btn" onClick={handleAddToCart}>
                                    Thêm vào giỏ
                                </button>
                                <button type="button" className="btn-1" onClick={handleAddToCart}>
                                    Mua Ngay
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <ProductSummary />

            <section id="related_products" className="section">
                <div className="container">
                    <SectionsHead heading="Related Products" />
                    <RelatedSlider category={product?.category} />
                </div>
            </section>

            <Services />
        </>
    );
};

export default ProductDetails;
