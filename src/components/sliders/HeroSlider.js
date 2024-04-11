import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper';
import { displayMoney } from '../../helpers/utils';
import productsData from '../../data/productsData';
import swiperSlideData from '../../data/swiperSlideData';

import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';


const HeroSlider = () => {

    const heroProducts = productsData.filter(item => item.tag === 'hero-product');


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
            {
                swiperSlideData.map(item => {
                    // const { id, title, tagline, heroImage, finalPrice, originalPrice, path } = item;
                    // const newPrice = displayMoney(finalPrice);
                    // const oldPrice = displayMoney(originalPrice);

                    return (
                        // <SwiperSlide
                        //     key={id}
                        //     className={`wrapper hero_wrapper hero_slide-${i}`}
                        // >
                        //     <div className="hero_item_txt">
                        //         <h3>{title}</h3>
                        //         <h1>{tagline}</h1>
                        //         <Link to={`${path}${id}`} className="btn">Mua Ngay</Link>
                        //     </div>
                        //     <figure className="hero_item_img">
                        //         <img src={heroImage} alt="product-img" />
                        //     </figure>
                        // </SwiperSlide>
                        <SwiperSlide key={item.id}>
                            <div>
                                <img src={item.url} alt="" />
                            </div>
                        </SwiperSlide>
                    );
                })
            }
        </Swiper>
    );
};

export default HeroSlider;