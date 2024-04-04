import React from 'react'
import ProductModal from '../components/cart/ProductModal';



const History = () => {
    

    return (
        <div class="purchase-history">
            <h2>Lịch Sử Mua Hàng</h2>
            <div class="order">
                <div class="order-left" >
                    <img src="/images/products/jbl660nc-1.png" alt="Sản phẩm 1" />
                    <div class="order-details">
                        <h3>Cà phê đen</h3>
                        <p>Size: M</p>
                        <h5>x2</h5>
                    </div>
                </div>
                <div class="order-right" >
                    <p class="status pending">Chờ xác nhận</p>
                    <h3>Thành tiền: 60.000đ</h3>
                </div>
            </div>
            <div class="order">
                <div class="order-left" >
                    <img src="/images/products/boat518-1.png" alt="Sản phẩm 2" />
                    <div class="order-details">
                        <h3>Bạc xỉu</h3>
                        <p>Size: L</p>
                        <h5>x1</h5>
                    </div>
                </div>
                <div class="order-right" >
                    <p class="status in-progress">Đang giao</p>
                    <h3>Thành tiền: 35.000đ</h3>
                </div>
            </div>
            <div class="order">
                <div class="order-left" >
                    <img src="/images/products/boat410-1.png" alt="Sản phẩm 3" />
                    <div class="order-details">
                        <h3>Trà đào</h3>
                        <p>Size: S</p>
                        <h5>x2</h5>
                    </div>
                </div>
                <div class="order-right" >
                    <p class="status completed">Giao hoàn thành</p>
                    <h3>Thành tiền: 55.000đ</h3>
                </div>
            </div>
        </div>
    )
}

export default History