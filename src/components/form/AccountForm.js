import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import commonContext from '../../contexts/common/commonContext';
// import useForm from '../../hooks/useForm';
// import useOutsideClose from '../../hooks/useOutsideClose';
// import useScrollDisable from '../../hooks/useScrollDisable';
import { object, string, ref } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAction, loginUserAction, clearErrorAction } from '../../Redux/Auth/auth.action';
import { Field, Form, Formik } from 'formik';

const AccountForm = ({onClose}) => {
    const dispatch = useDispatch();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSignupVisible, setIsSignupVisible] = useState(false);

    const initialValues = isSignupVisible ? { email: "", password: "", confirmpassword: "", username: "" } : { email: "", password: "" }

    const SignupSchema = object().shape({
        confirmpassword: string()
            .oneOf([ref('password'), null], 'Mật khẩu không khớp'),
    });

    const user  =  useSelector(state => state.auth?.user);
    const err = useSelector(state => state.auth?.error);

    const handleController = () => {
        setIsSignupVisible(!isSignupVisible);
        dispatch(clearErrorAction());
    }

    const handleSubmitSignin = (values) => {
        dispatch(loginUserAction({ data: values }));
    }
    useEffect(() => {
        if (user) {
            window.location.reload();
        } else {
            localStorage.removeItem("jwt")
        }
    }, [user])

    const handleSubmitSignup = (values) => {
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
                            <Formik onSubmit={isSignupVisible ? handleSubmitSignup : handleSubmitSignin} initialValues={initialValues} validationSchema={SignupSchema} >
                                {({ errors, touched }) => (<Form id="account_form">
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
                                            err && (
                                                <div className="error_message">
                                                    {isSignupVisible ? 'Username hoặc Email đã tồn tại!' : 'Tài khoản hoặc mật khẩu không chính xác!'}
                                                </div>
                                            )
                                        }
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
                                                type="text"
                                                name="email"
                                                className="input_field"
                                                required
                                            />
                                            <label className="input_label">Email hoặc Username</label>
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
                                                        name="confirmpassword"
                                                        className="input_field"
                                                        required
                                                    />
                                                    {errors.confirmpassword && touched.confirmpassword ? (
                                                        <p>{errors.confirmpassword}</p>
                                                    ) : null}
                                                    <label className="input_label">Xác Nhận Password</label>
                                                </div>
                                            )
                                        }

                                        <button type='submit' className="btn login_btn">
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
                                        onClick={onClose}
                                    >
                                        &times;
                                    </div>

                                </Form>)}
                            </Formik>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default AccountForm;