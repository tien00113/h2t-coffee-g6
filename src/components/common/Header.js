import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { dropdownMenu } from '../../data/headerData';
import { menu } from '../../data/headerData';
import commonContext from '../../contexts/common/commonContext';
import cartContext from '../../contexts/cart/cartContext';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getUserAction, logoutAction } from '../../Redux/Auth/auth.action';



const Header = () => {

    const { formUserInfo, toggleForm, toggleSearch } = useContext(commonContext);
    const { cartItems } = useContext(cartContext);
    const [isSticky, setIsSticky] = useState(false);
    const [isOpenLoginSignup, setIsLoginSignup] = useState(false);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if(jwt){
            dispatch(getUserAction(jwt));
        }
    }, [jwt]);
    const { auth } = useSelector(store => store); //1 đối tượng được lấy từ backend

    const handleOpenLoginSignup = () => {
        setIsLoginSignup(!isOpenLoginSignup);
    }

    const handleLogout = ()=>{
        dispatch(logoutAction());
        localStorage.removeItem("jwt");
        alert("đã đăng xuất thành công")
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
                                    {auth.user &&<h4>Hello! {<Link to="*">&nbsp;{auth.user.lastName}</Link>}</h4>}
                                    <p>Tài Khoản</p>
                                    {
                                        !auth.user && (
                                            <button
                                                type="button"
                                                onClick={handleOpenLoginSignup}
                                            >
                                                Đăng nhập
                                            </button>
                                        )
                                    }
                                    {
                                        auth.user && (
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                            >
                                                Đăng xuất
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