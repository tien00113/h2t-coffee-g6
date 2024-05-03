import React from 'react';
import { FiMapPin } from "react-icons/fi";
import { MdOutlineLocalPhone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";

class ContactUs extends React.Component {
  render() {
    return (
      <section className="contact">
        <div className="content">
          <h2>Liên Hệ</h2>
          <p>Để mua sản phẩm dễ dàng hơn, thưởng thức các hương vị cà phê truyền thống.</p>
        </div>
        <div className="container">

          <div className="contactInfo">

            <div className="box">
              <div className="icon"><FiMapPin /></div>
              <div className="text">
                <h3>Địa Chỉ</h3>
                <p>319 Hồ Tùng Mậu</p>
              </div>

            </div>
            <div className="box">
              <div className="icon"><MdOutlineLocalPhone /></div>
              <div className="text">
                <h3>Số Điện Thoại</h3>
                <p>+123 456 789</p>
              </div>

            </div>
            <div className="box">
              <div className="icon"><HiOutlineMail /></div>
              <div className="text">
                <h3>Email</h3>
                <p>quanlishopcoffee@gmail.com</p>
              </div>
            </div>

          </div>

          <div className="contactForm">
              <form >
                  <h2>Gửi Tin Nhắn</h2>
                  <div className="inputBox">
                      <input type="text" name="" required='required' />
                      <span>Tên đầy đủ</span>
                  </div>
                  <div className="inputBox">
                      <input type="text" name="" required='required' />
                      <span>Email</span>
                  </div>
                  <div className="inputBox">
                      <textarea name="" id="" cols="30" rows="3" required='required'></textarea>
                      <span>Nhập lời nhắn của bạn...</span>
                  </div>
                  <div className="inputBox">
                      <input type="submit" name="" value="Gửi" />
                  </div>      
              </form> 
          </div>

        </div>
      </section>
    );
  }
}

export default ContactUs;