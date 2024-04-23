import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { displayMoney } from '../helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllOrderAction } from '../Redux/Order/order.action';
import AccountForm from '../components/form/AccountForm';
import ModalReview from '../components/product/ModalReview';

// Sidebar Component
function Sidebar({ onSelect }) {

    const [selected, setSelected] = useState('PLACED'); // Mặc định lựa chọn ban đầu là 'all'
    const handleSelect = (option) => {
        onSelect(option);
        setSelected(option); // Cập nhật lựa chọn hiện tại
    };

    return (
        <div className="sidebar">
            <h3>Quản lý đơn hàng</h3>
            <button
                onClick={() => handleSelect('PLACED')}
                style={{ backgroundColor: selected === 'PLACED' ? 'gray' : 'transparent' }}
            >
                Chờ Xác Nhận
            </button>
            <button
                onClick={() => handleSelect('CONFIRMED')}
                style={{ backgroundColor: selected === 'CONFIRMED' ? 'gray' : 'transparent' }}
            >
                Chờ Giao Hàng
            </button>
            <button
                onClick={() => handleSelect('SHIPPED')}
                style={{ backgroundColor: selected === 'SHIPPED' ? 'gray' : 'transparent' }}
            >
                Đang Giao Hàng
            </button>
            <button
                onClick={() => handleSelect('CANCELLED')}
                style={{ backgroundColor: selected === 'CANCELLED' ? 'gray' : 'transparent' }}
            >
                Đã Hủy
            </button>
            <button
                onClick={() => handleSelect('DELIVERED')}
                style={{ backgroundColor: selected === 'DELIVERED' ? 'gray' : 'transparent' }}
            >
                Lịch Sử Mua Hàng
            </button>
        </div>
    );
}

// ContentArea Component
function ContentArea({ allOrder, onSelect }) {
    const navigate = useNavigate();
    const placedOrders = allOrder.filter(item => item?.status === 'PLACED');
    const confirmedOrders = allOrder.filter(item => item?.status === 'CONFIRMED');
    const shippedOrders = allOrder.filter(item => item?.status === 'SHIPPED');
    const cancelledOrdes = allOrder.filter(item => item?.status === 'CANCELLED');
    const deliveredOrders = allOrder.filter(item => item?.status === 'DELIVERED');

    const [modalVisible, setModalVisible] = useState(false);
    const handleChangeClick = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <div className="content-area">
                {/* PLACED ORDER*/}
                {
                    onSelect === 'PLACED' && (placedOrders.length > 0 ? placedOrders.map((order) => (
                        // <Link key={order?.id} to={`/order-details/${order?.id}`}>
                        <div className='purchase-history' onClick={() => { navigate("/order-details", { state: order }) }}>
                            <div class="order">
                                <div class="order-left" >
                                    <img src={order?.orderItems[0]?.product?.image[0]?.imageUrl} alt="orderImage" />
                                    <div class="order-details">
                                        <h3>{order?.orderItems[0]?.product?.name}</h3>
                                        <p>Size: {order?.orderItems[0]?.sizeOption?.name}</p>
                                        <p>Topping: {order?.orderItems[0]?.toppingOption?.name}</p>
                                        <h5>x{order?.orderItems[0]?.quantity}</h5>
                                    </div>
                                </div>
                                <div class="order-right" >
                                    <p class="status in-progress">Chờ Xác Nhận</p>
                                    <h3>Thành Tiền: {displayMoney(order?.totalSalePrice)}</h3>
                                </div>
                            </div>
                            <div className="separator"></div>
                            <div className='add_product'>
                                <h5>Hiện thị thêm đơn hàng</h5>
                            </div>
                        </div>
                        // </Link>
                    )) : "Chưa có đơn hàng")}

                {/*END PLACED ORDER*/}
                {/*CONFIRED ORDER*/}

                {onSelect === 'CONFIRMED' && (confirmedOrders.length > 0 ? confirmedOrders.map((order) => (
                    <div className='purchase-history'>
                        <div class="order">
                            <div class="order-left" >
                                <img src={order?.orderItems[0]?.product?.image[0]?.imageUrl} alt="orderImage" />
                                <div class="order-details">
                                    <h3>{order?.orderItems[0]?.product?.name}</h3>
                                    <p>Size: {order?.orderItems[0]?.sizeOption?.name}</p>
                                    <p>Topping: {order?.orderItems[0]?.toppingOption?.name}</p>
                                    <h5>x{order?.orderItems[0]?.quantity}</h5>
                                </div>
                            </div>
                            <div class="order-right" >
                                <p class="status in-progress">Chờ Giao Hàng</p>
                                <h3>Thành tiền: {displayMoney(order?.totalSalePrice)}</h3>
                            </div>
                        </div>
                    </div>
                )) : "Chưa có đơn hàng")}

                {/*END CONFIRED ORDER*/}
                {/*SHIPPED ORDER*/}

                {onSelect === 'SHIPPED' && (shippedOrders.length > 0 ? shippedOrders.map((order) => (
                    <div className='purchase-history'>
                        <div class="order">
                            <div class="order-left" >
                                <img src={order?.orderItems[0]?.product?.image[0]?.imageUrl} alt="orderImage" />
                                <div class="order-details">
                                    <h3>{order?.orderItems[0]?.product?.name}</h3>
                                    <p>Size: {order?.orderItems[0]?.sizeOption?.name}</p>
                                    <p>Topping: {order?.orderItems[0]?.toppingOption?.name}</p>
                                    <h5>x{order?.orderItems[0]?.quantity}</h5>
                                </div>
                            </div>
                            <div class="order-right" >
                                {/* <p class="status pending">Chờ xác nhận</p> */}
                                <p class="status in-progress">Đang Giao Hàng</p>
                                <h3>Thành tiền: {displayMoney(order?.totalSalePrice)}</h3>
                                {/* <div className='btn_review'>
                                <button className='btn-2' onClick={handleChangeClick}>Đánh giá</button>
                                <button className='btn-1'>Mua Lại</button>
                            </div> */}
                            </div>
                        </div>
                    </div>
                )) : "Chưa có đơn hàng")}

                {/*END SHIPPED ORDER*/}
                {/*CANCELLED ORDER*/}

                {onSelect === 'CANCELLED' && (cancelledOrdes.length > 0 ? cancelledOrdes.map((order) => (
                    <div className='purchase-history'>
                        <div class="order">
                            <div class="order-left" >
                                <img src={order?.orderItems[0]?.product?.image[0]?.imageUrl} alt="orderImage" />
                                <div class="order-details">
                                    <h3>{order?.orderItems[0]?.product?.name}</h3>
                                    <p>Size: {order?.orderItems[0]?.sizeOption?.name}</p>
                                    <p>Topping: {order?.orderItems[0]?.toppingOption?.name}</p>
                                    <h5>x{order?.orderItems[0]?.quantity}</h5>
                                </div>
                            </div>
                            <div class="order-right" >
                                <p class="status in-progress">Đã Hủy</p>
                                <h3>Thành tiền: {displayMoney(order?.totalSalePrice)}</h3>
                            </div>
                        </div>
                    </div>
                )) : "Chưa có đơn hàng")}

                {/*END CANCELLED ORDER*/}
                {/*DELIVERED ORDER*/}

                {onSelect === 'DELIVERED' &&
                    <div id='history_product_buy'>
                        <div className='purchase-history'>
                            <div class="order">
                                <div class="order-left" >
                                    <img src="https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sản phẩm 3" />
                                    <div class="order-details">
                                        <h3>Cà Phê</h3>
                                        <p>Size: S</p>
                                        <p>Topping: Đá</p>
                                        <h5>x1</h5>
                                    </div>
                                </div>
                                <div class="order-right" >
                                    <p class="status in-progress">Đã Hủy</p>
                                    <h3>Thành tiền: 2000</h3>
                                </div>
                            </div>
                            <div className="separator"></div>
                            <div className='add_product'>
                                <h5>Hiện thị thêm đơn hàng</h5>
                            </div>
                            <div className='btn_review'>
                                <button className='btn-2' onClick={handleChangeClick}>Đánh giá</button>
                                <button className='btn-1'>Mua Lại</button>
                            </div>
                        </div>
                    </div>

                }

                {/* END DELIVERED ORDER*/}
            </div>
            {modalVisible && <ModalReview onClose={handleCloseModal} />}
        </>
    );
}

// MainLayout Component
function OrderManage() {
    const [selectedOption, setSelectedOption] = useState('PLACED');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrderAction());
    }, [selectedOption]);

    const order = useSelector(store => store.order.orders)

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className="main-layout">
                <Sidebar onSelect={handleSelect} />
                <ContentArea allOrder={order} onSelect={selectedOption} />
            </div>
        </>
    );
}

export default OrderManage;