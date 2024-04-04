import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import commonContext from '../../contexts/common/commonContext';
import productsData from '../../data/productsData';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByName } from '../../Redux/Search/search.action';


const SearchBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {search} = useSelector(store=> store);
    const [query, setQuery] = useState('');

    const { isSearchOpen, toggleSearch, searchResults, setSearchResults } = useContext(commonContext);

    const searchRef = useRef();

    // closing the SearchBar
    const closeSearch = () => {
        toggleSearch(false);
        setSearchResults([]);
    };

    useOutsideClose(searchRef, closeSearch);

    useScrollDisable(isSearchOpen);


    // handling Search
    const handleSearching = (e) => {
        setQuery(e.target.value);
        dispatch(getProductByName(e.target.value));

    };
    const handleSearchResults= () =>{
        if (query.trim()) {
            navigate(`/all-products`);
            closeSearch();
        }
    }

    return (
        <>
            {
                isSearchOpen && (
                    <div id="searchbar" className="backdrop">
                        <div className="searchbar_content" ref={searchRef}>
                            <div className="search_box">
                                <input
                                    type="search"
                                    className="input_field"
                                    placeholder="Tìm Kiếm Sản Phẩm..."
                                    onChange={handleSearching}
                                />
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleSearchResults}
                                >
                                    <AiOutlineSearch />
                                </button>
                            </div>

                            {
                                search.resultProducts.length !== 0 && (
                                    <div className="search_results">
                                        {
                                            search.resultProducts.map(item => {
                                                return (
                                                    <Link
                                                        to={`/product-details/${item.id}`}
                                                        onClick={closeSearch}
                                                        key={item.id}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                );
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SearchBar;