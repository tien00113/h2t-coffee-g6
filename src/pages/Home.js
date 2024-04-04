import React from 'react';
import HeroSlider from '../components/sliders/HeroSlider';
import FeaturedSlider from '../components/sliders/FeaturedSlider';
import SectionsHead from '../components/common/SectionsHead';
import TopProducts from '../components/product/TopProducts';
import Services from '../components/common/Services';
import QuiltedImageList from '../components/common/QuiltedImageList';


const Home = () => {

    return (
        <main>
            <section id="hero">
                <HeroSlider />
            </section>

            <section id="featured" className="section">
                <div className="container">
                    <SectionsHead heading="Sản Phẩm Bán Chạy" />
                    <FeaturedSlider />
                </div>
            </section>

            <section id="products" className="section">
                <div className="container">
                    <SectionsHead heading="Sản Phẩm Nổi Bật" />
                    <TopProducts />
                </div>
            </section>

            <section className="section">
                <SectionsHead heading="Coffee Chill" />
                <QuiltedImageList />
            </section>

            <Services />
        </main>
    );
};

export default Home;;