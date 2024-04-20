import React, { useState } from 'react';

const steps = [
    'Chờ Xác Nhận',
    'Đang Giao',
    'Đã Giao',
];

const orderInfo = {
    id: "ORD123456",
    date: "2023-12-01 14:22",
    items: [
        {
            image: "path_to_image.jpg",
            price: "$19.99",
            size: "Medium",
            toppings: ["Cheese", "Pepperoni", "Mushrooms"]
        }
    ],
    customer: {
        name: "Hoàng China",
        phone: "123-456-7890",
        address: "1234 Hồ Tùng Mậu, Cầu Giấy, Hà Nội"
    }
};

const Stepper = () => {
    const activeStep = 1;

    return (
        <div className="order_details">
            <div className="stepper">
                {steps.map((label, index) => (
                    <div key={label} className="step">
                        {index < steps.length - 1 && (
                            <div className={` connector ${index < activeStep ? 'active' : ''}`} />
                        )}
                        <div className={`circle ${index <= activeStep ? "active" : ''}`}>
                            {index + 1}
                        </div>
                        <div className="stepLabel">{label}</div>
                    </div>
                ))}
            </div>


            <div className="detail">
                <div className="detail_order">
                    <div className="code">
                        <p>Mã Đơn Hàng: {orderInfo.id}</p>
                        <h5>{orderInfo.date}</h5>
                    </div>
                    <div className="separator"></div>
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
                                <h3>60.000đ</h3>
                            </div>
                        </div>

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
                                <h3>60.000đ</h3>
                            </div>
                        </div>
                    </div>

                    <dev className='note'>
                        <h4>Ghi Chú đơn hàng:</h4>
                        <p>ngon đấy bro </p>
                    </dev>

                    <div className="separator"></div>

                    <div className='info'>
                        <button className='btn-2'>Trả Hàng/Hủy Đơn</button>
                        <table>
                            <tr>
                                <td>Tổng tiền hàng</td>
                                <td>60.000đ</td>
                            </tr>
                            <tr>
                                <td>Phí vận chuyển</td>
                                <td>Free</td>
                            </tr>
                            <tr>
                                <td id='info-pay'>Thành Tiền</td>
                                <td id='info-pay'>60.000đ</td>
                            </tr>
                            <tr>
                                <td id='info-pay'>Phương Thức Thanh Toán</td>
                                <td id='info-pay'>Ví MOMO</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="detail_address">
                    <h3>Thông tin nhận hàng</h3>
                    <div className="address">
                        <p>Người Nhận: <span>{orderInfo.customer.name}</span></p>
                        <p>Số Điện Thoại: <span>{orderInfo.customer.phone}</span></p>
                        <p>Địa Chỉ: <span>{orderInfo.customer.address}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stepper;
