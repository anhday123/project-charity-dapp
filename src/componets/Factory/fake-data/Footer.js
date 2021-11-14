import React from 'react'
import "../../../page/styled/footer.css"
import { FaFacebook, FaInstagramSquare, FaTwitter, FaInvision } from 'react-icons/fa'
 const Footer = () => {
    return (
    <div className="footer">
        <div className="container">
            <div className="row">
                <div className="footer-col">
                    <h4>Sơ đồ</h4>
                    <ul>
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="/">Chương trình</a></li>
                        <li><a href="/">Đại sứ</a></li>
                        <li><a href="/">Về chúng tôi</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Thông tin</h4>
                    <ul>
                        <li><a href="/">Ủng hộ</a></li>
                        <li><a href="/">Tin tức</a></li>
                        <li><a href="/">Điều khoản sử dụng</a></li>
                        <li><a href="/">Chính sách bảo mật</a></li>
                        {/* <li><a href="/">payment options</a></li> */}
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Liên hệ chúng tôi</h4>
                    <ul>
                        <li><a href="/">ngocha17.1999@gmail.com</a></li>
                        <li><a href="/">tai_1751220039@dau.edu.vn</a></li>
                        <li><a href="/">+0359 500 725</a></li>
                        <li><a href="/">+0895 121 517</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Theo dõi chúng tôi</h4>
                    <div className="social-links">
                        <a href="/"><FaFacebook/></a>
                        <a href="/"><FaInstagramSquare/></a>
                        <a href="/"><FaTwitter/></a>
                        <a href="/"><FaInvision/></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Footer
