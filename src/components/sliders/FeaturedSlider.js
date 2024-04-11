import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, A11y, Autoplay } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import { displayMoney } from '../../helpers/utils';
import productsData from '../../data/productsData';

import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import "swiper/scss/effect-coverflow";
import { getAllProductAction } from '../../Redux/Product/product.action';


const FeaturedSlider = () => {

    const featuredProducts = productsData.filter(item => item.tag === 'featured-product');

    const {product} = useSelector(store=> store);
    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            dispatch(getAllProductAction());
        }
    }, [dispatch]);
    return (
        <Swiper
            modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
            loop={true}
            speed={400}
            spaceBetween={100}
            slidesPerView={"auto"}
            pagination={{ clickable: true }}
            effect={"coverflow"}
            centeredSlides={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 70,
                modifier: 3,
                slideShadows: false,
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 200
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 250
                },
            }}
            className="featured_swiper"
        >
            {
                product?.products.map((item) => {
                    // const { id, images, title, finalPrice, originalPrice, path } = item;
                    const newPrice = displayMoney(item?.salePrice);
                    const oldPrice = displayMoney(item?.price);

                    return (
                        <SwiperSlide key={item?.id} className="featured_slides">
                            <div className="featured_title">{item?.name}</div>
                            <figure className="featured_img">
                                <Link to={`/product-details/${item?.id}`}>
                                    <img src={item?.image[0]?.imageUrl} alt="" />
                                </Link>
                            </figure>
                            <h2 className="products_price">
                                {newPrice} &nbsp;
                                <small><del>{oldPrice}</del></small>
                            </h2>
                        </SwiperSlide>
                    );
                })
            }
        </Swiper>
    );
};

export default FeaturedSlider;