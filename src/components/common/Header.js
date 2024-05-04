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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Header = () => {

    const { toggleSearch } = useContext(commonContext);
    const { cartGuests, cartUser, getUserCart } = useContext(cartContext);
    const [isSticky, setIsSticky] = useState(false);
    const [isOpenLoginSignup, setIsLoginSignup] = useState(false);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const user  =  useSelector(state => state.auth?.user);

    useEffect(() => {
        if (jwt) {
            dispatch(getUserAction(jwt));
            if (user) {
                getUserCart();
            }
        }
    }, [jwt]);
    const handleOpenLoginSignup = () => {
        setIsLoginSignup(!isOpenLoginSignup);
    }

    const handleLogout = () => {
        dispatch(logoutAction());
        localStorage.removeItem("jwt");
        localStorage.removeItem("cart");
        toast.success('Đã đăng xuất');
    }

    useEffect(() => {
        const handleIsSticky = () => window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);

        window.addEventListener('scroll', handleIsSticky);

        return () => {
            window.removeEventListener('scroll', handleIsSticky);
        };
    }, [isSticky]);

    const [isActive, setIsActive] = useState(false);
    const toggleMenu = () => {
        setIsActive(!isActive);
    };
    const hideMenu = () => {
        setIsActive(false);
    };

    const handleClose = () => {
        setIsLoginSignup(false);
    }

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
                                    <h4><Link to="/">Trang chủ</Link></h4>
                                </div>
                                <div className='box'>
                                    <h4>Thực đơn</h4>
                                    <div className="dropdown_text">
                                        <p><Link to="/all-products" onClick={hideMenu}>Tất cả sản phẩm</Link></p>
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
                                <div className='box' onClick={hideMenu}>
                                    <h4><Link to="/contact">Liên hệ</Link></h4>
                                </div>
                                <div className='box' onClick={hideMenu}>
                                    <h4><Link to="/about">Giới thiệu</Link></h4>
                                </div>
                            </div>
                        </nav>

                        <nav className="nav_actions">
                            <div className="search_action">
                                <span onClick={() => toggleSearch(true)}>
                                    <AiOutlineSearch />
                                </span>
                                <div className="tooltip">Tìm kiếm</div>
                            </div>

                            <div className="cart_action">
                                <Link to="/cart">
                                    <AiOutlineShoppingCart />
                                    {
                                        user ? (
                                            cartUser?.cartItems.length > 0 && <span className="badge">{cartUser?.cartItems.length}</span>
                                        ) : (
                                            cartGuests.length > 0 && (<span className="badge">{cartGuests.length}</span>)
                                        )
                                    }
                                </Link>
                                <div className="tooltip">Giỏ hàng</div>
                            </div>

                            <div className="user_action">
                                <span>
                                    <AiOutlineUser />
                                </span>
                                <div className="dropdown_menu">
                                    {user && <h4>Xin chào! {<Link to="*">&nbsp;{user?.username}</Link>}</h4>}
                                    <p>Tài Khoản</p>
                                    {
                                        !user && (
                                            <button
                                                type="button"
                                                onClick={handleOpenLoginSignup}
                                            >
                                                Đăng nhập
                                            </button>
                                        )
                                    }
                                    {
                                        user && (
                                            
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
                                                        {link !== "Đơn hàng" ? <Link to={path}>{link}</Link> : (user ? <Link to={path}>{link}</Link> : <Link to="/*">{link}</Link>)}
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
            {isOpenLoginSignup && <AccountForm onClose={handleClose}/>}
            <SearchBar />
            <ToastContainer />
        </>
    );
};

export default Header;