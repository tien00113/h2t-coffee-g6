import React, { useContext, useEffect, useState } from 'react';
import filtersContext from '../../contexts/filters/filtersContext';
import { sortMenu } from '../../data/filterBarData';
import { displayMoney } from '../../helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryAction } from '../../Redux/Category/category.action';


const FilterBarOptions = () => {

    const dispatch = useDispatch();
    const { category } = useSelector(store => store.category);
    useEffect(() => {
        dispatch(getAllCategoryAction());
    }, [dispatch]);
    const { selectedCategory } = useContext(filtersContext);
    const {
        sortedValue,
        setSortedValue,
        handleCategoryMenu,
        handlePrice,
        selectedPrice: { price, minPrice, maxPrice },
        mobFilterBar: { isMobSortVisible, isMobFilterVisible },
        handleMobSortVisibility,
        handleMobFilterVisibility,
        handleClearFilters,
    } = useContext(filtersContext);

    const displayPrice = displayMoney(price);


    return (
        <>
            {/*===== Clear-Filters btn =====*/}
            {
                (sortedValue) && (
                    <div className="clear_filter_btn">
                        <button
                            type="button"
                            className="btn"
                            onClick={handleClearFilters}
                        >
                            Đặt Lại
                        </button>
                    </div>
                )
            }

            {/*===== Sort-menu =====*/}
            <div className={`sort_options ${isMobSortVisible ? 'show' : ''}`}>
                <div className="sort_head">
                    <h3 className="title">Sắp Xếp</h3>
                    <button
                        type="button"
                        className="close_btn"
                        onClick={() => handleMobSortVisibility(false)}
                    >
                        &times;
                    </button>
                </div>

                <div className="separator"></div>

                <ul className="sort_menu">
                    {
                        sortMenu.map(item => {
                            const { id, title } = item;
                            return (
                                <li
                                    key={id}
                                    className={sortedValue === title ? 'active' : ''}
                                    // onClick={() => setSortedValue(title)}
                                >
                                    {title}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            {/*===== Filter-menu =====*/}
            <div className={`filter_options ${isMobFilterVisible ? 'show' : ''}`}>
                <div className="filter_head">
                    <h3 className="title">Bộ Lọc</h3>
                    <button
                        type="button"
                        className="close_btn"
                        onClick={() => handleMobFilterVisibility(false)}
                    >
                        &times;
                    </button>
                </div>

                <div className="separator"></div>

                {/* Filter by Category */}
                <div className="filter_block">
                    <h4>Phân loại</h4>
                    <ul className="filter_menu">
                        {
                            category.map(item => {
                                return (
                                    <li key={item?.id} className="filter_btn">
                                        <input
                                            type="checkbox"
                                            id={item?.name}
                                            onChange={() => handleCategoryMenu(item?.id)}
                                            checked={selectedCategory.id === item?.id && selectedCategory.checked}
                                        />
                                        <label htmlFor={item?.name}>{item?.name}</label>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                {/* Filter by Price */}
                <div className="filter_block">
                    <h4>Giá</h4>
                    <div className="price_filter">
                        <p>{displayPrice}</p>
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={price}
                            onChange={handlePrice}
                        />
                    </div>
                </div>

            </div>
        </>
    );
};

export default FilterBarOptions;