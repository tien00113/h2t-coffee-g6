import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// import commonContext from '../../contexts/common/commonContext';
// import useForm from '../../hooks/useForm';
// import useOutsideClose from '../../hooks/useOutsideClose';
// import useScrollDisable from '../../hooks/useScrollDisable';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAction, loginUserAction, getUserAction } from '../../Redux/Auth/auth.action';
import { Field, Form, Formik } from 'formik';

const AccountForm = () => {
    const dispatch = useDispatch();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSignupVisible, setIsSignupVisible] = useState(false);

    const initialValues = isSignupVisible ? { email: "", password: "", confirmpassword: "", username: "" } : { email: "", password: "" }

    const { auth } = useSelector(store => store);

    const handleController = () => {
        setIsSignupVisible(!isSignupVisible)
    }

    const handleSubmitSignin = (values) => {
        console.log("da bam dang nhap", values)
        dispatch(loginUserAction({ data: values }));
    }
    useEffect(() => {
        if (auth.user) {
            window.location.reload();
        }
    }, [auth.user])

    const handleSubmitSignup = (values) => {
        console.log("đã bấm đăng ký", values);
        dispatch(registerUserAction({ data: values }));
    }

    const handClose = () => {
        setIsFormOpen(!isFormOpen);
    }

    return (
        <>
            {
                !isFormOpen && (
                    <div className="backdrop">
                        <div className="modal_centered">
                            <Formik onSubmit={isSignupVisible ? handleSubmitSignup : handleSubmitSignin} initialValues={initialValues}>
                                <Form id="account_form">
                                    {/*===== Form-Header =====*/}
                                    <div className="form_head">
                                        <h2>{isSignupVisible ? 'Đăng ký' : 'Đăng nhập'}</h2>
                                        <p>
                                            {isSignupVisible ? 'Bạn đã có tài khoản?' : 'Bạn chưa có tài khoản?'}
                                            &nbsp;&nbsp;
                                            <button type="button" onClick={handleController}>
                                                {isSignupVisible ? 'Đăng nhập' : 'Đăng ký'}
                                            </button>
                                        </p>
                                    </div>

                                    {/*===== Form-Body =====*/}
                                    <div className="form_body">
                                        {
                                            isSignupVisible && (
                                                <div className="input_box">
                                                    <Field
                                                        type="text"
                                                        name="username"
                                                        className="input_field"
                                                        required
                                                    />
                                                    <label className="input_label">Username</label>
                                                </div>
                                            )
                                        }

                                        <div className="input_box">
                                            <Field
                                                type="email"
                                                name="email"
                                                className="input_field"
                                                required
                                            />
                                            <label className="input_label">Email</label>
                                        </div>

                                        <div className="input_box">
                                            <Field
                                                type="password"
                                                name="password"
                                                className="input_field"
                                                required
                                            />
                                            <label className="input_label">Password</label>
                                        </div>

                                        {
                                            isSignupVisible && (
                                                <div className="input_box">
                                                    <Field
                                                        type="password"
                                                        name="conf_password"
                                                        className="input_field"
                                                        required
                                                    />
                                                    <label className="input_label">Confirm Password</label>
                                                </div>
                                            )
                                        }

                                        <button className="btn login_btn">
                                            {isSignupVisible ? 'Đăng Ký' : 'Đăng Nhập'}
                                        </button>
                                    </div>

                                    {/*===== Form-Footer =====*/}
                                    <div className="form_foot">
                                        <p>or login with</p>
                                        <div className="login_options">
                                            <Link to="/">Facebook</Link>
                                            <Link to="/">Google</Link>
                                            <Link to="/">Twitter</Link>
                                        </div>
                                    </div>

                                    {/*===== Form-Close-Btn =====*/}
                                    <div
                                        className="close_btn"
                                        title="Close"
                                        onClick={handClose}
                                    >
                                        &times;
                                    </div>

                                </Form>
                            </Formik>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default AccountForm;