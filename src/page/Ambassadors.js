import React from 'react'
import * as s from "../styles/globalStyles";
import { useSelector } from "react-redux";
import _Bg from "../assets/images/bg/bg.jpeg"

const Ambassadors = () => {


    // const data = useSelector((state) => state.data);

    // console.log(data.AllProjects )

    return (
        <s.Screen image={_Bg}>
            <s.Container flex={1} ai={"center"} jc={"center"}>

                <s.TextTitle 
                    style={{
                        textAlign: "center", 
                        fontSize: "56px"}}
                >
                    Đại sứ 
                </s.TextTitle>
                <s.TextTitle 
                    style={{
                        textAlign: "center", 
                        fontSize: "24px"}}
                >
                    Chỉ đơn giản là chúng ta không thể đạt được sứ mệnh của mình một mình.
                    Chúng tôi dựa vào các cố vấn, đại sứ, người hỗ trợ và đối tác dự án để
                    giúp chúng tôi thực hiện các dự án có tác động lớn trên toàn thế giới. 
                    Trang này dành riêng cho những người đang giúp chúng tôi chuyển đổi sự 
                    sáng tạo thành hành động.
                </s.TextTitle>

            </s.Container>
        </s.Screen>
    )
}

export default Ambassadors
