import React, { useState } from 'react';
import ModalReview from '../components/product/ModalReview';


// Sidebar Component
function Sidebar({ onSelect }) {

    const [selected, setSelected] = useState('all'); // Mặc định lựa chọn ban đầu là 'all'
    const handleSelect = (option) => {
        onSelect(option);
        setSelected(option); // Cập nhật lựa chọn hiện tại
    };

    return (
        <div className="sidebar">
            <h3>Quản lý đơn hàng</h3>
            <button
                onClick={() => handleSelect('all')}
                style={{ backgroundColor: selected === 'all' ? 'gray' : 'transparent' }}
            >
                Tất cả
            </button>
            <button
                onClick={() => handleSelect('wait_payment')}
                style={{ backgroundColor: selected === 'wait_payment' ? 'gray' : 'transparent' }}
            >
                Chờ Xác Nhận
            </button>
            <button
                onClick={() => handleSelect('cancel')}
                style={{ backgroundColor: selected === 'cancel' ? 'gray' : 'transparent' }}
            >
                Đã Hủy
            </button>
            <button
                onClick={() => handleSelect('history')}
                style={{ backgroundColor: selected === 'history' ? 'gray' : 'transparent' }}
            >
                Lịch Sử Mua Hàng
            </button>
        </div>
    );
}

// ContentArea Component
function ContentArea({ selectedOption }) {

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
                {selectedOption === 'all' && <div>Thông tin tài khoản</div>}
                {selectedOption === 'wait_payment' &&
                    <div class="purchase-history">
                        <div class="order">
                            <dev className='order_info'>
                                <div class="order-left" >
                                    <img src="https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sản phẩm 3" />
                                    <div class="order-details">
                                        <h3>Xiên Rau Củ</h3>
                                        <p>Size: S</p>
                                        <h5>x2</h5>
                                    </div>
                                </div>
                                <div class="order-right" >
                                    {/* <p class="status completed">Giao hoàn thành</p> */}
                                    <p class="status_wait">Chờ Xác Nhận</p>
                                    <h3>55.000đ</h3>
                                </div>
                            </dev>

                        </div>
                    </div>}
                {selectedOption === 'cancel' &&
                    <div class="purchase-history">
                        <div class="order">
                            <dev className='order_info'>
                                <div class="order-left" >
                                    <img src="https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sản phẩm 3" />
                                    <div class="order-details">
                                        <h3>Xiên Rau Củ</h3>
                                        <p>Size: S</p>
                                        <h5>x2</h5>
                                    </div>
                                </div>
                                <div class="order-right" >
                                    {/* <p class="status completed">Giao hoàn thành</p> */}
                                    <p class="status_failure">Đã huỷ</p>
                                    <h3>55.000đ</h3>
                                </div>
                            </dev>
                            <div className="separator"></div>
                            <dev className='btn_review'>
                                {/* <button className='btn-2'>Đánh giá</button> */}
                                <button className='btn-1'>Mua Lại</button>
                            </dev>
                        </div>
                    </div>}
                {selectedOption === 'history' &&
                    <div class="purchase-history">
                        <div class="order">
                            <dev className='order_info'>
                                <div class="order-left" >
                                    <img src="https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sản phẩm 3" />
                                    <div class="order-details">
                                        <h3>Xiên Rau Củ</h3>
                                        <p>Size: S</p>
                                        <h5>x2</h5>
                                    </div>
                                </div>
                                <div class="order-right" >
                                    <p class="status_success">Đã giao</p>
                                    <h3>55.000đ</h3>
                                </div>
                            </dev>
                            <div className="separator"></div>
                            <dev className='btn_review'>
                                <button className='btn-2' onClick={handleChangeClick}>Đánh giá</button>
                                <button className='btn-1'>Mua Lại</button>
                            </dev>
                        </div>

                        <div class="order">
                            <dev className='order_info'>
                                <div class="order-left" >
                                    <img src="https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sản phẩm 3" />
                                    <div class="order-details">
                                        <h3>Xiên Rau Củ</h3>
                                        <p>Size: S</p>
                                        <h5>x2</h5>
                                    </div>
                                </div>
                                <div class="order-right" >
                                    <p class="status_success">Đã giao</p>
                                    <h3>90.000đ</h3>
                                </div>
                            </dev>
                            <div className="separator"></div>
                            <dev className='btn_review'>
                                <button className='btn-2' onClick={handleChangeClick}>Đánh giá</button>
                                <button className='btn-1'>Mua Lại</button>
                            </dev>
                        </div>
                    </div>}
            </div>
            {modalVisible && <ModalReview onClose={handleCloseModal} />}
            </>
    );
}

// MainLayout Component
function OrderManage() {
    const [selectedOption, setSelectedOption] = useState('account');
    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="main-layout">
            <Sidebar onSelect={handleSelect} /> 
            <ContentArea selectedOption={selectedOption} />
        </div>
        
    );
}

export default OrderManage;