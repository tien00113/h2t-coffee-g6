import React from 'react';
import { FiMapPin } from "react-icons/fi";
import { MdOutlineLocalPhone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";

class ContactUs extends React.Component {
  render() {
    return (
      <section className="contact">
        <div className="content">
          <h2>Contact Us</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet autem debitis suscipit, repellat odit amet possimus quos dolor?</p>
        </div>
        <div className="container">

          <div className="contactInfo">

            <div className="box">
              <div className="icon"><FiMapPin /></div>
              <div className="text">
                <h3>Address</h3>
                <p>319 Ho Tung Mau</p>
              </div>

            </div>
            <div className="box">
              <div className="icon"><MdOutlineLocalPhone /></div>
              <div className="text">
                <h3>Phone</h3>
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
                  <h2>Send Message</h2>
                  <div className="inputBox">
                      <input type="text" name="" required='required' />
                      <span>Full Name</span>
                  </div>
                  <div className="inputBox">
                      <input type="text" name="" required='required' />
                      <span>Email</span>
                  </div>
                  <div className="inputBox">
                      <textarea name="" id="" cols="30" rows="3" required='required'></textarea>
                      <span>Type your message...</span>
                  </div>
                  <div className="inputBox">
                      <input type="submit" name="" value="Send" />
                  </div>
              </form> 
          </div>

        </div>
      </section>
    );
  }
}

export default ContactUs;