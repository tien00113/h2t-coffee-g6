import React, { useContext, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import data from '../../data/addressData.json';
import { IoAdd } from "react-icons/io5";
import { Form, Formik } from 'formik';
import orderContext from '../../contexts/order/orderContext';
import { useSelector, useDispatch } from 'react-redux';
import { createAddressAction } from '../../Redux/Auth/auth.action';

const AddressForm = ({ onClose}) => {

    const dispatch = useDispatch();
    const address = useSelector(state => state.auth.user.address);

    const [showNew, setShowNew] = useState(false);
    const [cities, setCities] = useState(data);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    const { createAddress } = useContext(orderContext);

    const handleCityChange = (event, setFieldValue) => {
        if (event.target.value === "") {
            setSelectedCity(null);
            setSelectedDistrict(null);
            setDistricts([]);
            setWards([]);
            setFieldValue('city', '');
            setFieldValue('district', '');
            setFieldValue('ward', '');
        } else if (event.target.value !== selectedCity?.Id) {
            const city = cities.find(city => city.Id === event.target.value);
            setSelectedCity(city);
            setSelectedDistrict(null);
            setSelectedWard(null);
            setDistricts(city.Districts);
            setFieldValue('city', city?.Name);
            setFieldValue('district', '');
            setFieldValue('ward', '');
        }
        else {
            const city = cities.find(city => city.Id === event.target.value);
            setSelectedCity(city);
            setDistricts(city.Districts);
            setWards([]);
            setFieldValue('city', city?.Name);
        }
    };

    const handleDistrictChange = (event, setFieldValue) => {
        const district = districts.find(district => district.Id === event.target.value);
        setSelectedDistrict(district?.Name);
        setSelectedWard(null);
        setWards(district?.Wards);
        setFieldValue('district', district?.Name);
        setFieldValue('ward', '');
    };

    const handleWardChange = (event, setFieldValue) => {
        const ward = wards.find(wards => wards.Id === event.target.value);
        setSelectedWard(ward?.Name);
        setFieldValue('ward', ward?.Name);
    }

    const handleSetShowFormAdd = () => {
        setShowNew(!showNew);
    }

    const initialValues = {
        recipientName: "",
        phoneNumber: "",
        city: "",
        district: "",
        ward: "",
        street: "",
        isDefault: false,
    }

    const handleAddAddress = (values) => {

        dispatch(createAddressAction(values));
        handleSetShowFormAdd();
    }

    console.log("address ==============", address)

    useEffect(()=>{

    },[address])

    return (
        <>
            {showNew ? (
                <Formik initialValues={initialValues} onSubmit={handleAddAddress}>
                    {({ handleChange, setFieldValue }) => (<Form>
                        <div className="modal-box">
                            <div className='modal-checkout'>
                                <div className="modal-checkout-head">
                                    <h3>Cập nhật địa chỉ</h3>
                                    <button className="close-button" onClick={onClose}><MdClose /></button>
                                </div>
                                <div className="modal-checkout-mid">
                                    <div className='mid-text'>
                                        <label htmlFor="name">Họ và tên</label>
                                        <input type="text" id="recipientName" name='recipientName' placeholder='Tên...' onChange={handleChange} />
                                    </div>
                                    <div className='mid-text'>
                                        <label for="phone">Số điện thoại</label>
                                        <input type="tel" id="phoneNumber" name='phoneNumber' placeholder="Số điện thoại..." onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-select">
                                    <select value={selectedCity?.Id} onChange={(event) => handleCityChange(event, setFieldValue)} name='city'>
                                        <option value="">Chọn tỉnh thành</option>
                                        {cities.map(city => (
                                            <option key={city.Id} value={city.Id}>{city.Name}</option>
                                        ))}
                                    </select>

                                    <select disabled={!selectedCity} value={selectedDistrict?.Id} name='district' onChange={(event) => handleDistrictChange(event, setFieldValue)}>
                                        <option value="" >Chọn quận huyện</option>
                                        {selectedCity && districts.map(district => (
                                            <option key={district.Id} value={district.Id}>{district.Name}</option>
                                        ))}
                                    </select>

                                    <select disabled={(!selectedDistrict || !selectedCity)} name='ward' onChange={(event) => handleWardChange(event, setFieldValue)}>
                                        <option value="">Chọn phường xã</option>
                                        {selectedDistrict && wards.map(ward => (
                                            <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="detail">Địa chỉ cụ thể</label>
                                    <input type="text" id="street" name='street' placeholder="Địa chỉ cụ thể..." onChange={handleChange} />
                                </div>

                                <div className="map">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59585.57208772585!2d105.74971368816317!3d21.028754205820025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5756f91033%3A0x576917442d674bfd!2zQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1712213052135!5m2!1svi!2s" style={{ border: "0", width: "100%", aspectRatio: 10 / 2 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>

                                <div className='form-address'>
                                    <input type="checkbox" name='isDefault' onChange={handleChange}></input>
                                    <p>Đặt làm địa chỉ mặc định</p>
                                </div>


                                <div className="btn-group">
                                    <button type="button" className="btn_cancel" onClick={handleSetShowFormAdd}>Trở Lại</button>
                                    <button type="submit" className="btn-1 btn-primary">Thêm</button>
                                </div>
                            </div>
                        </div>
                    </Form>)}
                </Formik>) : (
                <div className="modal-box">
                    <div className='modal-checkout'>
                        <div className="form-group">
                            <div>Địa Chỉ Của Bạn</div>
                            <div className='separator'></div>

                            {address.length > 0 && address.map(item => (<div className="container">
                                <div className="left">
                                    <div className="input_checkbox"><input type="checkbox" /></div>
                                </div>
                                <div className="middle">
                                    <div className="info">
                                        <div className='fullname'>{item?.recipientName}</div>
                                        <div className='telephone'>({item?.phoneNumber})</div>
                                    </div>
                                    <div className="address_detail">{item?.street + " ," + item?.ward + " ," + item?.district + " ," + item?.city}</div>
                                </div>
                                <div className="right">
                                    <div className='button_update'>
                                        <button>Cập Nhật</button>
                                    </div>
                                </div>
                            </div>))}
                            <div className='add_address'>
                                <button onClick={handleSetShowFormAdd} className="btn_add"><IoAdd style={{ fontSize: "1.3rem" }} /> <div className='text'>Thêm Mới</div></button>
                            </div>
                        </div>
                        <div className='separator'></div>
                        <div className="btn-group">
                            <button type="button" className="btn_cancel" onClick={onClose}>Hủy</button>
                            <button type="button" className="btn-1 btn-primary">Xác Nhận</button>
                        </div>
                    </div>
                </div>)
            }
        </>
    );
};

export default AddressForm;