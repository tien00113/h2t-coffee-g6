import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, A11y, Autoplay } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import { displayMoney } from '../../helpers/utils';

import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import "swiper/scss/effect-coverflow";
import { getAllProductAction } from '../../Redux/Product/product.action';

const FeaturedSlider = () => {
    const [isLoading, setIsLoading] = useState(true);

    const products = useSelector(store => store.product.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductAction());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            setIsLoading(false);
        }
    }, [products]);

    const topSoldProducts = products
    .slice() // Tạo một bản sao của mảng sản phẩm để tránh ảnh hưởng đến danh sách gốc
    .sort((a, b) => b.sold - a.sold) // Sắp xếp giảm dần theo thuộc tính sold
    .slice(0, 6); // Lấy ra 6 sản phẩm đầu tiên

    if (isLoading) {
        return <div>Loading...</div>; // Hiển thị một thông báo khi đang tải dữ liệu
    }

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
            {topSoldProducts.map((item) => {
                const newPrice = displayMoney(item.salePrice);
                const oldPrice = displayMoney(item.price);

                return (
                    <SwiperSlide key={item.id} className="featured_slides">
                        <div className="featured_title">{item.name}</div>
                        <figure className="featured_img">
                            <Link to={`/product-details/${item.id}`}>
                                <img src={item.image[0].imageUrl} alt="" />
                            </Link>
                        </figure>
                        <h2 className="products_price">
                            {newPrice} &nbsp;
                            <small><del>{oldPrice}</del></small>
                        </h2>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default FeaturedSlider;
