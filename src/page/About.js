import React from 'react'
import "./styled/about.scss"
import H1 from "../assets/images/bg/about-1.jpeg"
import H2 from "../assets/images/bg/about-2.jpeg"
import H3 from "../assets/images/bg/about-3.jpeg"
import H4 from "../assets/images/bg/about-4.jpeg"
import * as s from "../styles/globalStyles";
const About = () => {
    return (
      <s.Screen mgtS={"80px"}>
<div className="">
            <div className="explore-main">
              <div className="explore-image">
                <img srcset={H1} alt="" />
              </div>
              <div className="explore-content">
                <h2 className="heading heading--small explore-heading">
                  Giúp đỡ trẻ am khó khăn
                </h2>
                <p className="text explore-desc">
                  Xây dựng trường học có nhà vệ sinh, hỗ trợ các bữa ăn dinh dưỡng và đồng phục
                </p>
                {/* <a href="#!" className="btn1 btn--primary">Learn more</a> */}
              </div>
            </div>
            <div className="explore-main reverse">
              <div className="explore-image">
                <img srcset={H2} alt="" />
              </div>
              <div className="explore-content">
                <h2 className="heading heading--small explore-heading">
                  Xây dựng các công trình tình thương
                </h2>
                <p className="text explore-desc">
                  Hỗ trợ nhà ở cho người lao động thấp
                </p>
                {/* <a href="#!" className="btn1 btn--primary">Learn more</a> */}
              </div>
            </div>
            <div className="explore-main">
              <div className="explore-image">
                <img srcset={H3} alt="" />
              </div>
              <div className="explore-content">
                <h2 className="heading heading--small explore-heading">
                  Chung tay cùng qua đại dịch
                </h2>
                <p className="text explore-desc">
                  Hỗ trợ khâor trang, sát khuẩn cho những địa bàn khó khăn
                </p>
                {/* <a href="#!" className="btn1 btn--primary">Learn more</a> */}
              </div>
            </div>
            <div className="explore-main reverse">
              <div className="explore-image">
                <img srcset={H4} alt="" />
              </div>
              <div className="explore-content">
                <h2 className="heading heading--small explore-heading">
                  Cứu hộ động vật
                </h2>
                <p className="text explore-desc">
                  Tạo môi trường cho các loài động vật có nguy cơ tuyệt chủng
                </p>
                {/* <a href="#!" className="btn1 btn--primary">Learn more</a> */}
              </div>
            </div>

      </div>
            
      </s.Screen>
    )
}
export default About


