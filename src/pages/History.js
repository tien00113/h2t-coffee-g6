import React from 'react'
import ProductModal from '../components/cart/ProductModal';



const History = () => {
    

    return (
        <div class="purchase-history">
            <h2>Lịch Sử Mua Hàng</h2>
            <div class="order">
                <div class="order-left" >
                    <img src="https://cdn.pixabay.com/photo/2020/03/28/14/38/egg-coffee-4977310_1280.jpg" alt="Sản phẩm 1" />
                    <div class="order-details">
                        <h3>Cà Phê Trứng</h3>
                        <p>Size: M</p>
                        <h5>x2</h5>
                    </div>
                </div>
                <div class="order-right" >
                    {/* <p class="status pending">Chờ xác nhận</p> */}
                    <p class="status in-progress">Đang giao</p>
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
                    <p class="status in-progress">Đang giao</p>
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
                    <p class="status in-progress">Đang giao</p>
                    <h3>Thành tiền: 55.000đ</h3>
                </div>
            </div>
        </div>
    )
}

export default History