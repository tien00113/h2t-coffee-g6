import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdDone } from "react-icons/md";
import { displayMoney } from '../helpers/utils';
import orderContext from '../contexts/order/orderContext';

const steps = [
    'Chờ Xác Nhận',
    'Chờ Lấy Hàng',
    'Đang Giao',
    'Đánh Giá',
];

const OrderDetails = () => {
    const location = useLocation();
    const orderDetail = location?.state;
    const { completedOrder, cancelledOrder } = useContext(orderContext);
    const [step, setStep] = useState();

    console.log("order là: ", orderDetail);
    let activeStep;

    useEffect(() => {
        switch (orderDetail?.status) {
            case 'PLACED':
                setStep(1);
                break;
            case 'CONFIRMED':
                setStep(2);
                break;
            case 'SHIPPED':
                setStep(3);
                break;
            default:
                setStep(4);
        }
    }, [orderDetail?.status]);

    const date = new Date(orderDetail?.createAt);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    const updateStatusOrder = () => {
        if (orderDetail?.status === 'SHIPPED') {
            completedOrder(orderDetail?.id);
            setStep(4)
        } else if (step < 3) {
            cancelledOrder(orderDetail?.id)
        } else if (orderDetail?.status === 'DELIVERED') {
            console.log("dánh giá đi");
        }
    }

    console.log("step là: ", step)

    return (
        <div className="order_details">
            <div className="stepper">
                {steps.map((label, index) => (
                    <div key={label} className="step">
                        {index < steps.length - 1 && (
                            <div className={`connector ${index < step - 1 ? 'active' : ''}`} />
                        )}
                        <div className={`circle ${index <= step -1 ? "active" : ''}`}>
                            {(step <= 4 && index < step - 1) ? <MdDone style={{ fontSize: "20" }} /> : (step === 4 && (orderDetail?.deliveryDateTime && orderDetail?.deliveryDateTime < orderDetail?.updateStatusAt)) ? <MdDone style={{ fontSize: "20" }} /> : index + 1}
                        </div>
                        <div className="stepLabel">
                            {
                                step === 4 && orderDetail?.status === 'CANCELLED' ? "Đã Hủy" :
                                    orderDetail?.status === 'CONFIRMED' && label === 'Chờ Xác Nhận' ? "Đã Xác Nhận" :
                                        orderDetail?.status === 'SHIPPED' && (label === 'Chờ Lấy Hàng' || label === 'Chờ Xác Nhận') ? label === 'Chờ Lấy Hàng' ? "Đã Lấy Hàng" : "Đã Xác Nhận" :
                                            step ===4  && (label === 'Chờ Xác Nhận' || label === 'Chờ Lấy Hàng' || label === 'Đang Giao' || label === 'Đánh Giá') ? label === 'Chờ Xác Nhận' ? "Đã Xác Nhận" : label === 'Chờ Lấy Hàng' ? "Đã Lấy Hàng" : label === 'Đang Giao' ? "Đã Giao" : (orderDetail?.deliveryDateTime && orderDetail?.deliveryDateTime < orderDetail?.updateStatusAt) ? "Hoàn Thành" : "Đánh Giá" :
                                                label
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

                    <div className='note'>
                        <h4>Ghi Chú đơn hàng:</h4>
                        <p>{orderDetail?.note} </p>
                    </div>

                    <div className="separator"></div>

                    <div className='info'>
                        <button className='btn-2' onClick={updateStatusOrder}>
                            {
                                step ===3 ? "Đã Nhận Hàng" : step < 3 ? "Hủy Đơn" : step === 4 && orderDetail?.status === 'DELIVERED' ? "Đánh Giá" : "Mua Lại"
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
