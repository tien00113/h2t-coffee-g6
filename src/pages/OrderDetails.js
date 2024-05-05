import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdDone } from "react-icons/md";
import { displayMoney } from '../helpers/utils';
import orderContext from '../contexts/order/orderContext';
import { toast } from 'react-toastify';

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
    const [status, setStatus] = useState(orderDetail?.status);
    const [step, setStep] = useState();


    useEffect(() => {
        switch (status) {
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
    }, [orderDetail?.status, step]);

    const date = new Date(orderDetail?.createAt);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    const showCustomAlert = () => {
        const toastId = toast.info(
            <div>
                <p>Bạn đã nhận được hàng?</p>
                <button className='btn-3' onClick={() => handleContinue(toastId)}>Xác nhận</button>
                <button className='btn-4' onClick={() => handleClose(toastId)}>Hủy</button>
            </div>,
            {
                autoClose: false,
                closeOnClick: false
            }
        );
    };

    // Hàm xử lý khi nhấn nút "Oke"
    const handleContinue = (toastId) => {
        completedOrder(orderDetail?.id);
        setStep(4);
        setStatus('DELIVERED');
        toast.dismiss(toastId);
    };

    // Hàm xử lý khi nhấn nút "Đóng"
    const handleClose = (toastId) => {
        toast.dismiss(toastId);
    };

    const alertCancelOrder = () => {
        const toastId = toast.info(
            <div>
                <p>Bạn muốn hủy đơn hàng?</p>
                <button className='btn-3' onClick={() => handleContinueCancel(toastId)}>Hủy đơn</button>
                <button className='btn-4' onClick={() => handleClose(toastId)}>Đóng</button>
            </div>,
            {
                autoClose: false,
                closeOnClick: false
            }
        );
    }

    const handleContinueCancel = (toastId) => {
        cancelledOrder(orderDetail?.id);
        toast.dismiss(toastId);
    }

    const updateStatusOrder = () => {
        if (orderDetail?.status === 'SHIPPED' && step < 4) {
            // completedOrder(orderDetail?.id);
            // setStep(4);
            // setStatus('DELIVERED');
            showCustomAlert()
        } else if (step < 3) {
            // cancelledOrder(orderDetail?.id)
            alertCancelOrder();
        } else if (orderDetail?.status === 'DELIVERED') {
            toast.warning('Chức năng đang nâng cấp, hãy đánh giá ở trang quản lý đơn hàng');
            showCustomAlert();
        } else if (step === 4 && status === "DELIVERED" && orderDetail?.status === "SHIPPED") {
            toast.warning('Chức năng đang nâng cấp, hãy đánh giá ở trang quản lý đơn hàng');
        }
    }

    return (
        <div className="order_details">
            <div className="stepper">
                {steps.map((label, index) => (
                    <div key={label} className="step">
                        {index < steps.length - 1 && (
                            <div className={`connector ${index < step - 1 ? 'active' : ''}`} />
                        )}
                        <div className={`circle ${index <= step - 1 ? "active" : ''}`}>
                            {(step <= 4 && index < step - 1) ? <MdDone style={{ fontSize: "20" }} /> : (step === 4 && (orderDetail?.deliveryDateTime && orderDetail?.deliveryDateTime < orderDetail?.updateStatusAt)) ? <MdDone style={{ fontSize: "20" }} /> : index + 1}
                        </div>
                        <div className="stepLabel">
                            {
                                step === 4 && status === 'CANCELLED' ? "Đã Hủy" :
                                    status === 'CONFIRMED' && label === 'Chờ Xác Nhận' ? "Đã Xác Nhận" :
                                        status === 'SHIPPED' && (label === 'Chờ Lấy Hàng' || label === 'Chờ Xác Nhận') ? label === 'Chờ Lấy Hàng' ? "Đã Lấy Hàng" : "Đã Xác Nhận" :
                                            step === 4 && (label === 'Chờ Xác Nhận' || label === 'Chờ Lấy Hàng' || label === 'Đang Giao' || label === 'Đánh Giá') ? label === 'Chờ Xác Nhận' ? "Đã Xác Nhận" : label === 'Chờ Lấy Hàng' ? "Đã Lấy Hàng" : label === 'Đang Giao' ? "Đã Giao" : (orderDetail?.deliveryDateTime && orderDetail?.deliveryDateTime < orderDetail?.updateStatusAt) ? "Hoàn Thành" : "Đánh Giá" :
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
                    <div className="purchase-history">
                        {orderDetail?.orderItems.map((item) => (
                            <div className="order">
                                <div className="order-left" >
                                    <img src={item?.product?.image[0]?.imageUrl} alt="Sản phẩm 1" />
                                    <div className="order-details">
                                        <h3>{item?.product?.name}</h3>
                                        <p>Size: {item?.sizeOption?.name}</p>
                                        {item?.toppingOption && <p>Topping: {item?.toppingOption?.name}</p>}
                                        <h5>x{item?.quantity}</h5>
                                    </div>
                                </div>
                                <div className="order-right" >
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
                                step === 3 ? "Đã Nhận Hàng" : step < 3 ? "Hủy Đơn" : step === 4 && orderDetail?.status === 'DELIVERED' && (orderDetail?.deliveryDateTime && orderDetail?.deliveryDateTime >= orderDetail?.updateStatusAt) ? "Đánh Giá" : step === 4 && status === 'DELIVERED' && orderDetail?.status === 'SHIPPED' ? "Đánh Giá" : "Mua Lại"
                            }
                        </button>
                        <table>
                            <tbody>
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
                            </tbody>
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
