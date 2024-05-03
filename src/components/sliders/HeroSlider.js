import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper';
import swiperSlideData from '../../data/swiperSlideData';

import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';

const HeroSlider = () => {
    return (
        <Swiper
            modules={[Pagination, A11y, Autoplay]}
            loop={true}
            speed={2000}
            spaceBetween={100}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
        >
            {swiperSlideData.map(item => (
                <SwiperSlide key={item.id}>
                    <div>
                        <img src={item.url} alt="" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default HeroSlider;
