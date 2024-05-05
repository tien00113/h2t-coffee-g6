import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export const footMenu = [
    {
        id: 1,
        title: "Trợ Giúp",
        menu: [
            {
                id: 1,
                link: "Câu hỏi thường gặp",
                path: "/"
            },
            {
                id: 2,
                link: "Hủy đơn hàng",
                path: "/"
            },
            {
                id: 3,
                link: "Trả đơn hàng",
                path: "/"
            },
            {
                id: 4,
                link: "Thông tin bảo hành",
                path: "/"
            },
        ]
    },
    {
        id: 2,
        title: "Chính Sách",
        menu: [
            {
                id: 1,
                link: "Chính sách hoàn trả",
                path: "/"
            },
            {
                id: 2,
                link: "Chính sách bảo mật",
                path: "/"
            },
            {
                id: 3,
                link: "Sơ đồ trang web",
                path: "/"
            },
            {
                id: 4,
                link: "Điều khoản",
                path: "/"
            },
        ]
    },
    {
        id: 3,
        title: "Cửa Hàng",
        menu: [
            {
                id: 1,
                link: "Về chúng tôi",
                path: "/about"
            },
            {
                id: 2,
                link: "Liên hệ",
                path: "/contact"
            },
            {
                id: 3,
                link: "Chi nhánh",
                path: "/"
            },
            {
                id: 4,
                link: "Trung tâm dịch vụ",
                path: "/"
            },
        ]
    },
    {
        id: 4,
        title: "Theo dõi",
        menu: [
            {
                id: 1,
                link: <FaFacebookF />,
                path: "/",
            },
            {
                id: 2,
                link: <FaTwitter />,
                path: "/",
            },
            {
                id: 3,
                link: <FaInstagram />,
                path: "/",
            },
            {
                id: 4,
                link: <FaLinkedinIn />,
                path: "/",
            },
        ]
    }
];


