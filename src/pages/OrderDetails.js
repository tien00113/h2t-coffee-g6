import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdDone } from "react-icons/md";
import { displayMoney } from '../helpers/utils';

const steps = [
    'Chờ Xác Nhận',
    'Chờ Giao Hàng',
    'Đang Giao',
    'Hoàn Thành',
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

const OrderDetails = () => {
    const location = useLocation();
    const orderDetail = location?.state;

    console.log("order là: ", orderDetail);
    let activeStep;

    if (orderDetail?.status === 'PLACED') {
        activeStep = 1;
    } else if (orderDetail?.status === 'CONFIRMED') {
        activeStep = 2;
    } else if (orderDetail?.status === 'SHIPPED') {
        activeStep = 3;
    } else {
        activeStep = 4;
    }

    const date = new Date(orderDetail?.createAt);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    return (
        <div className="order_details">
            <div className="stepper">
                {steps.map((label, index) => (
                    <div key={label} className="step">
                        {index < steps.length - 1 && (
                            <div className={`connector ${index < activeStep ? 'active' : ''}`} />
                        )}
                        <div className={`circle ${index <= activeStep ? "active" : ''}`}>
                            {index < activeStep ? <MdDone style={{ fontSize: "20" }} /> : index + 1}
                        </div>
                        <div className="stepLabel">
                            {
                                activeStep === 4 && orderDetail?.status === 'CANCELLED' ? "Đã Hủy" : label
                            }
                        </div>
                    </div>
                ))}
            </div>

            <div className="detail">
                <div className="detail_order">
                    <div className="code">
                        <p>Mã Đơn Hàng: {orderDetail?.orderId}</p>
                        <h5>{formattedDate}</h5>
                    </div>
                    <div className="separator"></div>
                    <div class="purchase-history">
                        {orderDetail?.orderItems.map((item) => (
                            <div class="order">
                                <div class="order-left" >
                                    <img src={item?.product?.image[0]?.imageUrl} alt="Sản phẩm 1" />
                                    <div class="order-details">
                                        <h3>{item?.product?.name}</h3>
                                        <p>Size: {item?.sizeOption?.name}</p>
                                        <p>Topping: {item?.toppingOption?.name}</p>
                                        <h5>x{item?.quantity}</h5>
                                    </div>
                                </div>
                                <div class="order-right" >
                                    <h3>{displayMoney(item?.priceSale)}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <dev className='note'>
                        <h4>Ghi Chú đơn hàng:</h4>
                        <p>{orderDetail?.note} </p>
                    </dev>

                    <div className="separator"></div>

                    <div className='info'>
                        <button className='btn-2'>
                            {
                                activeStep < 4 ? "Hủy Đơn" : "Mua Lại"
                            }
                        </button>
                        <table>
                            <tr>
                                <td>Tổng tiền hàng</td>
                                <td>{displayMoney(orderDetail?.totalSalePrice)}</td>
                            </tr>
                            <tr>
                                <td>Phí vận chuyển</td>
                                <td>Free</td>
                            </tr>
                            <tr>
                                <td id='info-pay'>Thành Tiền</td>
                                <td id='info-pay'>{displayMoney(orderDetail?.totalSalePrice)}</td>
                            </tr>
                            <tr>
                                <td id='info-pay'>Phương Thức Thanh Toán</td>
                                <td id='info-pay'>COD</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="detail_address">
                    <h3>Thông tin nhận hàng</h3>
                    <div className="address">
                        <p>Người Nhận: <span>{orderDetail?.shippingAddress?.recipientName}</span></p>
                        <p>Số Điện Thoại: <span>{orderDetail?.shippingAddress?.phoneNumber}</span></p>
                        <p>Địa Chỉ: <span>{orderDetail?.shippingAddress?.street + ", " + orderDetail?.shippingAddress?.ward + ", " + orderDetail?.shippingAddress?.district + ", " + orderDetail?.shippingAddress?.city}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
