import React from 'react'
import {  useSelector } from "react-redux";
// import _Bg from "../assets/images/bg/about-2.jpeg"

import * as s from "../styles/globalStyles";


const AllProjects = () => {
    const data = useSelector((state) => state.data);
    console.log(data.AllProjects)

    return ( 
       <s.Screen>
     
        <s.ContainerItemBoder>
        {data.AllProjects.map((item, index) => {
                  return (
                    
                    <s.ContainerItem
                      flex={1} 
                      ai={"center"} 
                      jc={"center"}
                      
                      key={index}
                    >                     
                    <s.ContainerItemTitle>
                        <img src={item.imageUrl} alt="Crypto Against COVID"/>

                    <s.ItemTitle>
                    <s.ItemH3>#{item.id}</s.ItemH3>
                    <s.ItemH3>{item.projectName}</s.ItemH3>
                    </s.ItemTitle>
                  </s.ContainerItemTitle>
                    <s.ItemBodyContainer>
                    <s.ItemBodyMoney1>{item.recipient}</s.ItemBodyMoney1>
                    <s.ItemP>{item.description}</s.ItemP>
                    
                    <s.ItemBody>
                      <s.ItemBodyMoney1>{item.amountDonated}</s.ItemBodyMoney1>
                      <s.ItemBodyMoney2>{item.amountNeeded}</s.ItemBodyMoney2>
                    </s.ItemBody>
                  </s.ItemBodyContainer>
                  <s.ItemFooterContainer>
                    <s.ItemFooter>
                      <s.ItemFooterDonateText>Số lần ủng hộ</s.ItemFooterDonateText>
                      <s.ItemFooterDonate>800</s.ItemFooterDonate>
                      <s.ItemBtn>Tham gia</s.ItemBtn>
                    </s.ItemFooter>
                  </s.ItemFooterContainer>

                    </s.ContainerItem>
                  );
              })}
          {/* <s.ContainerItem>
            <s.ContainerItemTitle>
              <img src="https://resource.binance.charity/images/a5ded15f1fae4b47b55264374adc845a_WechatIMG701.jpeg" alt="Crypto Against COVID"/>

              <s.ItemTitle>
                <s.ItemH3>Cứu trợ lũ lụt bà con mình trung</s.ItemH3>
                <s.ItemP>Join Binance Charity and help the world fight COVID-19.Join Binance Charity and help the world fight COVID-19.</s.ItemP>
              </s.ItemTitle>
            </s.ContainerItemTitle>
            <s.ItemBodyContainer>
              <s.ItemBody>
                <s.ItemBodyMoney1>5000</s.ItemBodyMoney1>
                <s.ItemBodyMoney2>5000</s.ItemBodyMoney2>
              </s.ItemBody>
            </s.ItemBodyContainer>
            <s.ItemFooterContainer>
              <s.ItemFooter>
                <s.ItemFooterDonateText>huhuhu</s.ItemFooterDonateText>
                <s.ItemFooterDonate>800</s.ItemFooterDonate>
                <s.ItemBtn>Tham gia</s.ItemBtn>
              </s.ItemFooter>
            </s.ItemFooterContainer>
          </s.ContainerItem> */}
  
        </s.ContainerItemBoder>
     
       </s.Screen>
  

    )
}

export default AllProjects