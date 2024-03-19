import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { dropdownMenu } from '../../data/headerData';
import { menu } from '../../data/headerData';
import commonContext from '../../contexts/common/commonContext';
import cartContext from '../../contexts/cart/cartContext';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';
import { useSelector, useStore } from 'react-redux';


const Header = () => {

    const { formUserInfo, toggleForm, toggleSearch } = useContext(commonContext);
    const { cartItems } = useContext(cartContext);
    const [isSticky, setIsSticky] = useState(false);
    const [isOpenLoginSignup, setIsLoginSignup] = useState(false);
    const { auth } = useSelector(store => store); //1 đối tượng được lấy từ backend

    const handleOpenLoginSignup = () => {
        setIsLoginSignup(!isOpenLoginSignup);
    }

    useEffect(() => {
        const handleIsSticky = () => window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);

        window.addEventListener('scroll', handleIsSticky);

        return () => {
            window.removeEventListener('scroll', handleIsSticky);
        };
    }, [isSticky]);

    const cartQuantity = cartItems.length;

    console.log("user------------------------------", auth);

    const [isActive, setIsActive] = useState(false);
    const toggleMenu = () => {
        setIsActive(!isActive);
    };
    const hideMenu = () => {
        setIsActive(false);
      };

    return (
        <>
            <header id="header" className={isSticky ? 'sticky' : ''}>
                <div className="container">
                    <div className="navbar">
                        <h2 className="nav_logo">
                            <Link to="/">H2T-Coffee</Link>
                        </h2>

                        <nav>
                            <div className={`nav_text ${isActive ? 'active' : ''}`}>
                                <div className='box' onClick={hideMenu}>
                                    <h4><Link to="/">Home</Link></h4>
                                </div>
                                <div class='box'>
                                    <h4>Menu</h4>
                                    <div className="dropdown_text">
                                        <p><Link to="/all-products" onClick={hideMenu}>All Products</Link></p>
                                        <div className="separator"></div>
                                        <ul>
                                            {
                                                menu.map(item => {
                                                    const { id, link, path } = item;
                                                    return (
                                                        <li key={id} onClick={hideMenu}>
                                                            <Link to={path}>{link}</Link>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div class='box' onClick={hideMenu}>
                                    <h4><Link to="/contact">Contact Us</Link></h4>
                                </div>
                                <div class='box' onClick={hideMenu}>
                                    <h4><Link to="/about">About Us</Link></h4>
                                </div>
                            </div>
                        </nav>

                        <nav className="nav_actions">
                            <div className="search_action">
                                <span onClick={() => toggleSearch(true)}>
                                    <AiOutlineSearch />
                                </span>
                                <div className="tooltip">Search</div>
                            </div>

                            <div className="cart_action">
                                <Link to="/cart">
                                    <AiOutlineShoppingCart />
                                    {
                                        cartQuantity > 0 && (
                                            <span className="badge">{cartQuantity}</span>
                                        )
                                    }
                                </Link>
                                <div className="tooltip">Cart</div>
                            </div>

                            <div className="user_action">
                                <span>
                                    <AiOutlineUser />
                                </span>
                                <div className="dropdown_menu">
                                    <h4>Hello! {formUserInfo && <Link to="*">&nbsp;{formUserInfo}</Link>}</h4>
                                    <p>Tài Khoản</p>
                                    {
                                        !formUserInfo && (
                                            <button
                                                type="button"
                                                onClick={handleOpenLoginSignup}
                                            >
                                                Login / Signup
                                            </button>
                                        )
                                    }
                                    <div className="separator"></div>
                                    <ul>
                                        {
                                            dropdownMenu.map(item => {
                                                const { id, link, path } = item;
                                                return (
                                                    <li key={id}>
                                                        <Link to={path}>{link}</Link>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="hamburger" onClick={toggleMenu}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            {isOpenLoginSignup && <AccountForm />}
            <SearchBar />
        </>
    );
};

export default Header;