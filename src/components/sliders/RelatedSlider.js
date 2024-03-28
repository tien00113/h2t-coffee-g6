import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper';
import productsData from '../../data/productsData';
import ProductCard from '../product/ProductCard';

import 'swiper/scss';
import 'swiper/scss/pagination';


const RelatedSlider = (props) => {

    const { category } = props;

    const relatedProduct = productsData.filter(item => item.category === category);

    return (
        <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={10}
            slidesPerView={"auto"}
            pagination={{ clickable: true }}
            breakpoints={{
                480: {
                    slidesPerView: 1,
                },
                568: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
            }}
            className="related_swiper"
        >
            {
                relatedProduct.map(item => (
                    <SwiperSlide key={item.id}>
                        <ProductCard {...item} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default RelatedSlider;