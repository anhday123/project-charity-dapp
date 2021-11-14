import React from 'react'

import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import * as s from "../styles/globalStyles";

const MyProjects = () => {
 
    const data = useSelector((state) => state.data)
    
    console.log(data.AllOwnerProjects);


    return (
        <>
        <s.Screen mgtS={"80px"}>
        <s.Container ai={"center"}>
            <s.TextTitle 
                style={{
                    textAlign: "center", 
                    fontSize: "36px", 
                    color: "#000"}}
            >
            Chương trình của bạn
            </s.TextTitle>      
        </s.Container>
        <s.ContainerI>
        <s.ContainerItemBoder>
        {data.AllOwnerProjects.map((item, index) => {
                  return (
                    
                    <s.ContainerItem
                      flex={1} 
                      ai={"center"} 
                      jc={"center"}
                      
                      key={index}
                    >                     
                    <s.ContainerItemTitle>
                    <Link to={`/details/${item.id}`}>
                        <img src={item.imageUrl} alt="img"/>
                    </Link>

                    <s.ItemTitle>
                    <s.ItemH3>#{item.id}</s.ItemH3>
                    <s.ItemH3>{item.projectName}</s.ItemH3>
                    </s.ItemTitle>
                    
                  </s.ContainerItemTitle>
                  <s.ItemBodyContainer>
                  <s.ItemBodyMoney1>{item.location}</s.ItemBodyMoney1>

                    </s.ItemBodyContainer>
                  
                    <s.ItemBodyContainer>
                    <s.ItemBodyMoney1>{item.recipient}</s.ItemBodyMoney1>                   
                    <s.ItemP>{item.description}</s.ItemP>
                    {/* <s.ItemBodyMoney1>{item.location}</s.ItemBodyMoney1> */}

                    <s.ItemBody>
                      <s.ItemBodyMoney1>{item.amountDonated}</s.ItemBodyMoney1>
                      <s.ItemBodyMoney2>{item.amountNeeded}</s.ItemBodyMoney2>
                    </s.ItemBody>
                  </s.ItemBodyContainer>
                  <s.ItemFooterContainer>
                    <s.ItemFooter>
                        <s.ItemFooterDonateText>
                          Số lần ủng hộ
                        </s.ItemFooterDonateText>
                      <s.ItemFooterDonate>xxxx</s.ItemFooterDonate>
                        <Link to={`/details/${item.id}`}>
                          <s.ItemBtn>Tham gia</s.ItemBtn>
                        </Link>
                    </s.ItemFooter>
                  </s.ItemFooterContainer>

                    </s.ContainerItem>
                  );
              })}
    
        </s.ContainerItemBoder>
      </s.ContainerI>   
        </s.Screen>
            
        </>  
    );
}



export default MyProjects;