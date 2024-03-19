import React from 'react'
import { RiVisaFill } from "react-icons/ri";
const CheckOut = () => {
  return (
    <section class='payment'>
        <div class="payment-container">
            <h2>Visa Payment</h2>
            <form id="paymentForm">
                <input type="email" id="email" placeholder="Email" required/>
                <div class='number'>
                  <input type="text" id="cardNumber" placeholder="Số thẻ" required/>
                  <span><RiVisaFill /></span>
                </div>
                <input type="text" id="cardName" placeholder="Tên trên thẻ" required/>
                <input type="text" id="expiryDate" placeholder="Ngày cấp (MM/YY)" required/>
                <input type="text" id="cvc" placeholder="Mã CVC" required/>
                <input type="text" id="address" placeholder="Địa chỉ" required/>
                <button class='btn-1' type="submit">Thanh toán</button>
            </form>
        </div>
    </section>
  )
}

export default CheckOut