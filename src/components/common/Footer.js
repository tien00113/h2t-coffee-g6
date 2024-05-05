import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { footMenu } from '../../data/footerData';


const Footer = () => {

    const [subValue, setSubValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubValue('');
        alert('Thankyou, you are subscribed to receive our daily newsletter');
    };

    const currYear = new Date().getFullYear();


    return (
        <footer id="footer">
            <div className="container">
                <div className="wrapper footer_wrapper">

                    {
                        footMenu.map(item => {
                            const { id, title, menu } = item;
                            return (
                                <div className="foot_menu" key={id}>
                                    <h4>{title}</h4>
                                    <ul>
                                        {
                                            menu.map(item => {
                                                const { id, link, path } = item;
                                                return (
                                                    <li key={id}>
                                                        <Link to={path}>{link}</Link>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

        </footer >
    );
};

export default Footer;