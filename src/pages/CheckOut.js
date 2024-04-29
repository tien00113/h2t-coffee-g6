import React, { useContext, useRef, useState } from 'react';
import orderContext from '../contexts/order/orderContext';
import { displayMoney } from '../helpers/utils';
import AddressForm from '../components/form/AddressForm';
import AccountForm from '../components/form/AccountForm';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckOut = ({ auth }) => {

  const { order } = useContext(orderContext);
  const location = useLocation();
  const navigate = useNavigate();
  const textAreaRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [login, setLogin] = useState(false);

  const checkoutItems = location?.state?.item;

  const checkoutItem = checkoutItems.map(({ id, ...item }) => {
    return { ...item };
  })

  const defaultAddress = auth?.user?.address.find(address => address.isDefault === true);

  const [shipAddress, setShipAddress] = useState(defaultAddress);

  const grandTotal = checkoutItem.reduce((total, item) => {
    const { product, quantity, sizeOption, toppingOption } = item;
    return total + (product?.salePrice + sizeOption?.price + toppingOption?.price) * quantity;
  }, 0);

  const handleChangeClick = () => {
    if (auth?.user) {
      setModalVisible(true);
    }
    else {
      setLogin(!login);
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleCloseLogin = () => {
    setLogin(false);
  }

  const handleOrder = async () => {
    const addOrder = {
      orderItems: checkoutItem,
      note: textAreaRef.current.value,
      shipAddress: shipAddress
    }
    const newOrder = await order(addOrder);

    navigate("/order-manage", {state: newOrder});

  }

  return (
    <>
      <section class='payment'>
        <div class="payment-address">
          <h3>Thanh toán và giao hàng</h3>
          <div className="separator"></div>
          {auth?.user?.address.length > 0 ? (<div class="address-info">
            <div className='info_left'>
              {shipAddress ? (<p>{shipAddress?.recipientName} ({shipAddress?.phoneNumber})</p>) : (<p>{defaultAddress?.recipientName} ({defaultAddress?.phoneNumber})</p>)}
              {shipAddress ? (<p>{shipAddress?.street}, {shipAddress?.ward}, {shipAddress?.district}, {shipAddress?.city}</p>) : (<p>{defaultAddress?.street}, {defaultAddress?.ward}, {defaultAddress?.district}, {defaultAddress?.city}</p>)}
            </div>
            <div>
              <button className='btn-1' onClick={handleChangeClick}>Thay đổi</button>
            </div>
          </div>) : (
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
          <div className='payment-address-image'>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59585.57208772585!2d105.74971368816317!3d21.028754205820025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5756f91033%3A0x576917442d674bfd!2zQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1712213052135!5m2!1svi!2s" style={{ border: "0", width: "100%", aspectRatio: 5 / 2 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div class="payment-address-form">
            <form>
              <label htmlFor='address'>Ghi chú</label>
              <textarea ref={textAreaRef} name='additional-info' placeholder='Ghi chú về đơn hàng '></textarea>
              <div className="separator"></div>
              <input type="checkbox" />
              Đồng ý với các điều kiện mua hàng.
            </form>
          </div>
        </div>

        <div class="payment-checkout">
          <h3>Mặt hàng thanh toán</h3>

          <div className="separator"></div>
          {/* product */}
          {
            checkoutItem.map((item) => (
              <div class="payment-checkout-product">
                <div class="product">
                  <div class="product-left" >
                    <img src={item?.product?.image[0]?.imageUrl} alt="product" />
                    <div class="product-details">
                      <span>{item?.product?.name}</span>
                      <div className="size-topping">
                        <div className='size'>
                          <p>Size: </p>
                          <h4>{item?.sizeOption?.name}</h4>
                        </div>
                        <div className='topping'>
                          <p>Topping: </p>
                          <h4>{item?.toppingOption?.name}</h4>
                        </div>
                      </div>
                      <h5>x{item?.quantity}</h5>
                    </div>
                  </div>
                  <div class="product-right" >
                    <span>{displayMoney(item?.product?.salePrice + item?.sizeOption?.price + item?.toppingOption?.price)}</span>
                  </div>
                </div>
              </div>
            ))
          }
          {/* product */}
          <div className="separator"></div>
          <div className="payment-checkout-sale">
            <form>
              <div class="cost">
                <div class="subtotal">
                  <span>Cộng (1 món)</span>
                  <span>{displayMoney(grandTotal)}</span>
                </div>
                <div class="subtotal-ship">
                  <span>Giao hàng</span>
                  <span>Free</span>
                </div>
                <div class="total">
                  <span>Thành Tiền</span>
                  <span className='totalPrice'>{displayMoney(grandTotal)}</span>
                </div>
              </div>
            </form>
          </div>

          <div className="separator"></div>

          <div className="payment-checkout-final">
            <div className="payment-method">
              <label><input type="radio" name="checkout" value="" checked /> Thanh toán khi nhận hàng</label>
              <div className="separator"></div>
              <label><input type="radio" name="checkout" value="" /> Thanh toán bằng thẻ ngân hàng</label>
              <div className="separator"></div>
              <label><input type="radio" name="checkout" value="" /> Thanh toán bằng ví điện tử</label>
            </div>
            <div className="separator"></div>
            <div>
              <button className="btn-1" onClick={handleOrder}>Đặt hàng</button>
            </div>
          </div>
        </div>
      </section>
      {modalVisible ? (<AddressForm onClose={handleCloseModal} defaultAddress={defaultAddress} setShippingAddress={setShipAddress} />) : (
        login && <AccountForm onClose={handleCloseLogin} />
      )}
    </>
  )
}

export default CheckOut