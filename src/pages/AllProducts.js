import React, { useContext, useEffect } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import FilterBar from '../components/filters/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
import filtersContext from '../contexts/filters/filtersContext';
import EmptyView from '../components/common/EmptyView';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductAction } from '../Redux/Product/product.action';


const AllProducts = () => {

    const dispatch = useDispatch();
    const { product } = useSelector(store => store);
    useDocTitle('All Products');

    useEffect(() => {
        if (product) {
            dispatch(getAllProductAction());
        }
    }, []);

    console.log("tatadad cả sản phẩm nẹ, ", product);


    return (
        <>
            <section id="all_products" className="section">
                <FilterBar />

                <div className="container">
                    {
                        product.products && product.products.length ? (
                            <div className="wrapper products_wrapper">
                                {
                                    product.products.map(item => (
                                        <ProductCard
                                            key={item.id}
                                            item={item}
                                        />

                                    ))
                                }
                            </div>
                        ) : (
                            <EmptyView
                                icon={<BsExclamationCircle />}
                                msg="No Results Found"
                            />
                        )
                    }
                </div>
            </section>

            <Services />
        </>
    );
};

export default AllProducts;