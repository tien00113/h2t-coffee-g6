import {FaShippingFast, FaShieldAlt, FaTags, FaCreditCard} from 'react-icons/fa';

const servicesData = [
    {
        id: 1,
        icon: <FaShippingFast />,
        title: "Chuyển phát nhanh",
        info: "Giao hàng trong 24 giờ",
    },
    {
        id: 2,
        icon: <FaShieldAlt />,
        title: "Bảo hành thương hiệu",
        info: "An toàn 100%",
    },
    {
        id: 3,
        icon: <FaTags />,
        title: "Ưu đãi",
        info: "Tất cả đơn hàng trả trước",
    },
    {
        id: 4,
        icon: <FaCreditCard />,
        title: "Thanh toán an toàn",
        info: "Bảo mật",
    },
];

export default servicesData;