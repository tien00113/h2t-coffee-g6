// import React, { useContext, useEffect, useState } from 'react';
// import { BsExclamationCircle } from 'react-icons/bs';
// import useDocTitle from '../hooks/useDocTitle';
// import FilterBar from '../components/filters/FilterBar';
// import ProductCard from '../components/product/ProductCard';
// import Services from '../components/common/Services';
// import EmptyView from '../components/common/EmptyView';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllProductAction } from '../Redux/Product/product.action';
// import filtersContext from '../contexts/filters/filtersContext';


// const AllProducts = () => {

//     const dispatch = useDispatch();
//     const { product } = useSelector(store => store);
//     const { search } = useSelector(store => store);

//     const { selectedCategory } = useContext(filtersContext);
//     useDocTitle('All Products');

//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         if (!selectedCategory.id && search.queryValue === "") {
//             setProducts(product.products);
//         }
//         else if (selectedCategory.id && search.queryValue === "") {
//             setProducts(product.products.filter(item => item.category.id === selectedCategory.id));
//         } else if (selectedCategory.id && search.queryValue !== "") {
//             setProducts(search.resultProducts.filter(item => item.category.id === selectedCategory.id));
//         } else if (!selectedCategory.id && search.queryValue !== "") {
//             setProducts(search.resultProducts)
//         }
//     }, [product.products, selectedCategory.id, search.queryValue])

//     useEffect(() => {
//         if (product) {
//             dispatch(getAllProductAction());
//         }
//     }, [dispatch]);

//     return (
//         <>
//             <section id="all_products" className="section">
//                 <FilterBar products={products} />

//                 <div className="container">
//                     {
//                         products.length ? (<div>
//                             {search.queryValue !== "" && <div>Tìm kiếm với từ khóa: "{search.queryValue}" thấy {search.resultProducts.length} kết quả.</div>}
//                             <div className="wrapper products_wrapper">
//                                 {
//                                     products.map(item => (
//                                         <ProductCard
//                                             key={item.id}
//                                             item={item}
//                                         />
//                                     ))
//                                 }
//                             </div> </div>
//                         ) : (
//                             <EmptyView
//                                 icon={<BsExclamationCircle />}
//                                 msg="Không tìm thấy kết quả"
//                             />
//                         )
//                     }
//                 </div>
//             </section>

//             <Services />
//         </>
//     );
// };

// export default AllProducts;

import React, { useContext, useEffect, useState } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import FilterBar from '../components/filters/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
import EmptyView from '../components/common/EmptyView';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductAction } from '../Redux/Product/product.action';
import filtersContext from '../contexts/filters/filtersContext';
import InfiniteScroll from 'react-infinite-scroll-component';

const AllProducts = () => {

    const dispatch = useDispatch();
    const { product } = useSelector(store => store);
    const { search } = useSelector(store => store);

    const { selectedCategory } = useContext(filtersContext);
    useDocTitle('All Products');

    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (!selectedCategory.id && search.queryValue === "") {
            setProducts(product.products.slice(0, 9));
        }
        else if (selectedCategory.id && search.queryValue === "") {
            setProducts(product.products.filter(item => item.category.id === selectedCategory.id).slice(0, 9));
        } else if (selectedCategory.id && search.queryValue !== "") {
            setProducts(search.resultProducts.filter(item => item.category.id === selectedCategory.id).slice(0, 9));
        } else if (!selectedCategory.id && search.queryValue !== "") {
            setProducts(search.resultProducts.slice(0, 9))
        }
    }, [product.products, selectedCategory.id, search.queryValue])

    useEffect(() => {
        if (product) {
            dispatch(getAllProductAction());
        }
    }, [dispatch]);

    const fetchMoreData = () => {
        if (products.length >= product.products.length) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            setProducts(prevProducts => prevProducts.concat(product.products.slice(prevProducts.length, prevProducts.length + 9)));
        }, 500);
    };

    return (
        <>
            <section id="all_products" className="section">
                <FilterBar products={products} />

                <div className="container">
                    {
                        products.length ? (
                            <InfiniteScroll
                                dataLength={products.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<h4 style={{ textAlign: 'center' }}>Tải Thêm...</h4>}
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Bạn Đã Xem Toàn Bộ Sản Phẩm</b>
                                    </p>
                                }
                            >
                                <div>
                                    {search.queryValue !== "" && <div>Tìm kiếm với từ khóa: "{search.queryValue}" thấy {search.resultProducts.length} kết quả.</div>}
                                    <div className="wrapper products_wrapper">
                                        {
                                            products.map(item => (
                                                <ProductCard
                                                    key={item.id}
                                                    item={item}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </InfiniteScroll>
                        ) : (
                            <EmptyView
                                icon={<BsExclamationCircle />}
                                msg="Không tìm thấy kết quả"
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
