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
    const { product } = useSelector(store=> store);
    const { category } = useSelector(state => state.category);
    const [products, setProducts] = useState(productsData);
    const { activeClass, handleActive } = useActive(0);

    useEffect(() => {
        if (product) {
            dispatch(getAllProductAction());
            dispatch(getAllCategoryAction());
        }
    }, []);

    console.log("tất cả sản phẩm nẹ, ", product);
    console.log("tất cả phan loai ne ", category);

    // making a unique set of product's category
    const productsCategory = [
        'All',
        ...new Set(productsData.map(item => item.category))
    ];

    // handling product's filtering
    const handleProducts = (category, i) => {
        if (category === 'All') {
            setProducts(productsData);
            handleActive(i);
            return;
        }

        const filteredProducts = productsData.filter(item => item.category === category);
        setProducts(filteredProducts);
        handleActive(i);
    };


    return (
        <>
            <div className="products_filter_tabs">
                <ul className="tabs">
                    <li className='tabs_item'>
                        Tất cả
                    </li>
                    {
                        category.map(item => (
                            <li
                                key={item.id}
                                className={`tabs_item ${activeClass(item.id)}`}
                                onClick={() => handleProducts(item, item.id)}
                            >
                                {item.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="wrapper products_wrapper">
                {
                    product.products.slice(0, 14).map(item => (
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