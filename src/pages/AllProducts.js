import React, { useContext, useEffect } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import FilterBar from '../components/filters/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
import EmptyView from '../components/common/EmptyView';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductAction } from '../Redux/Product/product.action';


const AllProducts = () => {

    const dispatch = useDispatch();
    const { product } = useSelector(store => store);
    const { search } = useSelector(store => store);
    useDocTitle('All Products');

    useEffect(() => {
        if (product) {
            dispatch(getAllProductAction());
        }
    }, [dispatch]);

    return (
        <>
            <section id="all_products" className="section">
                <FilterBar />

                <div className="container">
                    {search.resultProducts.length > 0 ? (<div>
                        {search.queryValue !== "" && <div>Tìm kiếm với từ khóa: "{search.queryValue}" thấy {search.resultProducts.length} kết quả.</div>}
                        <div className='wrapper products_wrapper'>
                            {
                                search.resultProducts.map(item => (
                                    <ProductCard
                                        key={item.id}
                                        item={item}
                                    />

                                ))
                            }
                        </div>
                    </div>) : (
                        search.queryValue === null && product.products && product.products.length > 0 ? (
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
                                msg="Không tìm thấy sản phẩm"
                            />
                        )
                    )}

                </div>
            </section>

            <Services />
        </>
    );
};

export default AllProducts;