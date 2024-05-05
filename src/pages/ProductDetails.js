import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import ProductRating from '../components/product/ProductRating';


const ProductDetails = ({ auth }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const prodId = parseInt(productId);
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.product);

    useEffect(() => {
        dispatch(getProductDetail(prodId));
    }, [dispatch])
    useDocTitle('Product Details');

    const { handleActive, activeClass } = useActive(0);

    const { addItemCartUser, addItemCartGuest } = useContext(cartContext);

    const [previewImg, setPreviewImg] = useState(product?.image[0]?.imageUrl);
    const [selectedImgIndex, setSelectedImgIndex] = useState(0);
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
            if (auth === null) {
                handleAddItemToGuestCart();
            }
            else {
                addToUserCart();
            }
        }
    }

    // setting the very-first image on re-render
    const handleImageClick = (imageUrl, index) => {
        setPreviewImg(imageUrl);
        setSelectedImgIndex(index);
    };

    useEffect(() => {
        setPreviewImg(product?.image[0]?.imageUrl);
        handleActive(0);
    }, [product?.image]);

    const newPrice = displayMoney(product?.salePrice);
    const oldPrice = displayMoney(product?.price);

    const orderItems = [
        {
            product: product,
            sizeOption: selectedSize,
            toppingOption: selectedTopping,
            quantity: count,
            price: (product?.price + (selectedTopping ? selectedTopping?.price : 0) + selectedSize?.price) * count,
            priceSale: (product?.salePrice + (selectedTopping ? selectedTopping?.price : 0) + selectedSize?.price) * count,
            userId: auth?.id
        }
    ]

    return (
        <>
            <section id="product_details" className="section">
                <div className="container">
                    <div className="wrapper prod_details_wrapper">
                        <div className="prod_details_left_col">
                            <div className="prod_details_img">
                                <img src={previewImg} alt="product-img" />
                            </div>

                            <div className="prod_details_tabs">
                                {product?.image.map((img, index) => (
                                    <div className={`tabs_item ${index === selectedImgIndex ? 'selected' : ''}`}
                                        key={index}
                                        onClick={() => handleImageClick(img.imageUrl, index)}>
                                        <img src={img.imageUrl} alt="product-img" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/*=== Product Details Right-content ===*/}
                        <div className="prod_details_right_col">
                            <h1 className="prod_details_title">{product?.name}</h1>

                            <div className="prod_details_ratings">
                                <ProductRating rating={product?.averageRating || 5} />
                                {/* <span>{product?.averageRating}</span> */}
                                {product?.reViewProducts.length > 0 && <span className='rating_text'>({product?.averageRating + "/5"})</span>}
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

                            {product?.toppingOptions.length > 0 && <div class='topping'>
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
                            </div>}

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
                                <h4>Mô tả:</h4>
                                <p>{product?.description}</p>
                            </div>

                            <div className="separator"></div>

                            {showError && <div className="error_message">Bạn hãy chọn size để tiếp tục</div>}
                            <div className="prod_details_buy_btn">
                                <button type="button" className="btn" onClick={handleAddToCart}>
                                    Thêm vào giỏ
                                </button>
                                <button type="button" className="btn-1" onClick={() => { navigate("/checkout", { state: { item: orderItems } }) }}>
                                    Mua Ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {product?.reViewProducts.length > 0 && <ProductSummary review={product?.reViewProducts} />}

            <Services />
        </>
    );
};

export default ProductDetails;
