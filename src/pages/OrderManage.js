import React, { useState } from 'react';

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
                onClick={() => handleSelect('delivery')}
                style={{ backgroundColor: selected === 'delivery' ? 'gray' : 'transparent' }}
            >
                Vận Chuyển
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
    return (
        <div className="content-area">
            {selectedOption === 'all' && <div>Thông tin tài khoản</div>}
            {selectedOption === 'wait_payment' && <div>Danh sách đơn hàng</div>}
            {selectedOption === 'delivery' && <div>Thông báo mới nhất</div>}
            {selectedOption === 'cancel' && <div>Thông tin Shopee Xu</div>}
            {selectedOption === 'history' &&
                <div class="purchase-history">
                    <div class="order">
                        <div class="order-left" >
                            <img src="https://cdn.pixabay.com/photo/2020/03/28/14/38/egg-coffee-4977310_1280.jpg" alt="Sản phẩm 1" />
                            <div class="order-details">
                                <h3>Cà Phê Trứng</h3>
                                <p>Size: M</p>
                                <p>Topping: Kem Foam</p>
                                <h5>x2</h5>
                            </div>
                        </div>
                        <div class="order-right" >
                            {/* <p class="status pending">Chờ xác nhận</p> */}
                            <p class="status in-progress">Đã giao</p>
                            <h3>Thành tiền: 60.000đ</h3>
                        </div>
                    </div>
                    <div class="order">
                        <div class="order-left" >
                            <img src="https://cdn.pixabay.com/photo/2024/02/12/15/23/ai-generated-8568762_1280.jpg" alt="Sản phẩm 2" />
                            <div class="order-details">
                                <h3>Bánh Mỳ Kẹp</h3>
                                <p>Size: L</p>
                                <h5>x1</h5>
                            </div>
                        </div>
                        <div class="order-right" >
                            <p class="status in-progress">Đã giao</p>
                            <h3>Thành tiền: 35.000đ</h3>
                        </div>
                    </div>
                    <div class="order">
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
                            <p class="status in-progress">Đã giao</p>
                            <h3>Thành tiền: 55.000đ</h3>
                        </div>
                    </div>
                </div>}
        </div>
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