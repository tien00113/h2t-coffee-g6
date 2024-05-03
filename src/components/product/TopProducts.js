import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import useActive from '../../hooks/useActive';
import productsData from '../../data/productsData';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductAction } from '../../Redux/Product/product.action';
import { getAllCategoryAction } from '../../Redux/Category/category.action';


const TopProducts = () => {

    const dispatch = useDispatch();
    const product = useSelector(store=> store.product.products);
    const category = useSelector(state => state.category.category);
    const { activeClass, handleActive } = useActive(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (product) {
            setProducts(product);
        }
    }, [product]);
    useEffect(() => {
        if (product) {
            dispatch(getAllProductAction());
            dispatch(getAllCategoryAction());
        }
    }, []);

    // making a unique set of product's category
    const productsCategory = [
        'Tất Cả',
        ...new Set(category.map(item => item.name))
    ];

    // handling product's filtering
    const handleProducts = (category, i) => {
        if (category === 'Tất Cả') {
            setProducts(product);
            handleActive(i);
            return;
        }

        const filteredProducts = product.filter(item => item.category.name === category);
        setProducts(filteredProducts);
        handleActive(i);
    };

    return (
        <>
            <div className="products_filter_tabs">
                <ul className="tabs">
                    {
                        productsCategory.map((item, i) => (
                            <li
                                key={i}
                                className={`tabs_item ${activeClass(i)}`}
                                onClick={() => handleProducts(item, i)}
                            >
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="wrapper products_wrapper">
                {
                    products.slice(0, 11).map(item => (
                        <ProductCard
                            key={item.id}
                            item={item}
                        />
                    ))
                }
                <div className="card products_card browse_card">
                    <Link to="/all-products">
                        Tất Cả <br /> Sản Phẩm <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopProducts;