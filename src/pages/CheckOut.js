import React, { useContext, useRef, useState } from 'react';
import orderContext from '../contexts/order/orderContext';
import { displayMoney } from '../helpers/utils';
import AddressForm from '../components/form/AddressForm';

const CheckOut = ({ auth }) => {

  const { orderItem, size, topping, quantity, order } = useContext(orderContext);

  const textAreaRef = useRef();


  const handleOrderNow = () => {
    const addOrder = { address: auth?.user?.address[0], orderItem: orderItem, note: textAreaRef.current.value }
    order(addOrder);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const handleChangeClick = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <section class='payment'>
        <div class="payment-address">
          <h3>Thanh toán và giao hàng</h3>
          <div className="separator"></div>
          {auth?.user?.address.length > 0 ? (<div class="address-info">
            <div>
              <p>Nguyễn Hiền Tiến (0986908668)</p>
              <p>32 Xuân Diệu, Tây Hồ, Hà Nội</p>
            </div>
            <div>
              <button className='btn-1' onClick={handleChangeClick}>Thay đổi</button>
            </div>
          </div>): (
            <div className="select_address">
              <h4>Chọn Địa Chỉ Giao Hàng</h4> 
              <button className='btn-2' onClick={handleChangeClick}>Thêm</button>
            </div>
          )}
          <div className="separator"></div>

          <div class="payment-address-drop">
            <label for="store">Chọn chi nhánh gần bạn</label>
            <select name="store" id="store">
              <option value="store1">Cửa hàng 1 - Phố Huế, Hai Bà Trưng, Hà Nội</option>
              <option value="store1">Cửa hàng 2 - Hồ Tùng Mậu, Cầu Giấy, Hà Nội</option>
              <option value="store1">Cửa hàng 3 - Cổ Nhuế, Bắc Từ Liêm, Hà Nội</option>
            </select>
          </div>
          {/* <div class="payment-address-image">
          <img src="https://cdn.pixabay.com/photo/2018/06/18/23/03/europe-3483539_1280.jpg" alt="" />
        </div> */}
          <div className='payment-address-image'>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59585.57208772585!2d105.74971368816317!3d21.028754205820025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5756f91033%3A0x576917442d674bfd!2zQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1712213052135!5m2!1svi!2s" style={{ border: "0", width: "100%", aspectRatio: 5 / 3 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div class="payment-address-form">
            <form>
              {/* <div class="form-head">
              <div class="form-head-name">
                <label for="name">Họ và tên *</label>
                <input type="text" id="name" placeholder="Nhập họ và tên" />
              </div>
              <div class="form-head-tel">
                <label for="phone">Số điện thoại *</label>
                <input type="tel" id="phone" placeholder="Số điện thoại" />
              </div>
            </div>

            <label for="email">Địa chỉ email (tùy chọn)</label>
            <input type="email" id="email" placeholder="Nhập địa chỉ Email" />

            <label for="address">Địa chỉ *</label> */}
              {/* <input type="text" id="address" placeholder='Ví dụ: Số 20 đường Cầu Giấy' />   */}

              <label htmlFor='address'>Ghi chú</label>
              <textarea ref={textAreaRef} name='additional-info' placeholder='Ghi chú về đơn hàng '></textarea>
              {/* <label for="address">Phương thức thanh toán</label> */}
              <div className="separator"></div>

              {/* <div class='additional-info'>
              <h3>Thông tin bổ sung</h3>
              <p></p>
              <label htmlFor='address'>Ghi chú</label>
              <textarea name='additional-info' placeholder='Ghi chú về đơn hàng (ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn.)'></textarea>
            </div> */}
              {/* <div className="payment-method">
              <label><input type="radio" name="checkout" value="" checked /> Thanh toán khi nhận hàng</label>
              <div className="separator"></div>
              <label><input type="radio" name="checkout" value="" /> Thanh toán bằng thẻ ngân hàng</label>
              <div className="separator"></div>
              <label><input type="radio" name="checkout" value="" /> Thanh toán bằng ví điện tử</label>
            </div>
            <div className="separator"></div> */}
              <input type="checkbox" />
              Đồng ý với các điều kiện mua hàng.
            </form>
          </div>
        </div>

        <div class="payment-checkout">
          <h3>Mặt hàng thanh toán</h3>

          <div className="separator"></div>
          {/* product */}
          <div class="payment-checkout-product">
            <div class="product">
              <div class="product-left" > 
                <img src={orderItem?.product?.image[0]?.imageUrl} alt="product" />
                <div class="product-details">
                  <span>{orderItem?.product?.name}</span>
                  <div className="size-topping">
                    <div className='size'>
                      <p>Size: </p>
                      <h4>{size?.name}</h4>
                    </div>
                    <div className='topping'>
                      <p>Topping: </p>
                      <h4>{topping?.name}</h4>
                    </div>
                  </div>
                  <h5>x{quantity}</h5>
                </div>
              </div>
              <div class="product-right" >
                <span>{displayMoney(orderItem?.product?.salePrice + size?.price + topping?.price)}</span>
              </div>
            </div>
          </div>
          {/* product */}
          <div className="separator"></div>
          <div className="payment-checkout-sale">
            <form>
              {/* <label for="promo-code">Mã ưu đãi</label>
            <div className="promo">
              <input type="text" id="promo-code" placeholder="Nhập mã" />
              <button className="btn-1" type="submit">Áp dụng</button>
            </div> */}

              <div class="cost">
                <div class="subtotal">
                  <span>Cộng (1 món)</span>
                  <span>{displayMoney(orderItem?.priceSale)}</span>
                </div>
                <div class="subtotal-ship">
                  <span>Giao hàng</span>
                  <span>Free</span>
                </div>
                <div class="total">
                  <span>Thành Tiền</span>
                  <span className='totalPrice'>{displayMoney(orderItem?.priceSale)}</span>
                </div>
              </div>
            </form>
          </div>

          <div className="separator"></div>

          <div className="payment-checkout-final">
            {/* <label><input type="radio" name="checkout" value="" checked /> Thanh toán khi nhận hàng</label>
          <label><input type="radio" name="checkout" value="" /> Thanh toán bằng thẻ ngân hàng</label> */}
            <div className="payment-method">
              <label><input type="radio" name="checkout" value="" checked /> Thanh toán khi nhận hàng</label>
              <div className="separator"></div>
              <label><input type="radio" name="checkout" value="" /> Thanh toán bằng thẻ ngân hàng</label>
              <div className="separator"></div>
              <label><input type="radio" name="checkout" value="" /> Thanh toán bằng ví điện tử</label>
            </div>
            <div className="separator"></div>
            <div>
              <button className="btn-1" onClick={handleOrderNow}>Đặt hàng</button>
            </div>
          </div>
        </div>
      </section>
      {modalVisible && <AddressForm address={auth?.user?.address} onClose={handleCloseModal} />}
    </>
  )
}

export default CheckOut