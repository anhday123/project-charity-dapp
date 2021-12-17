import React from 'react'

import {  useSelector } from "react-redux";

import {  Link} from "react-router-dom";
import * as s from "../styles/globalStyles";

const MyProjects = () => {
 
    const data = useSelector((state) => state.data)
    const blockchain = useSelector((state) => state.blockchain);
    
    // console.log(data.AllOwnerProjects);


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
                    <s.ItemBodyMoney1>{item.program_creator}</s.ItemBodyMoney1>                   
                    <s.ItemP>{item.description}</s.ItemP>
                    {/* <s.ItemBodyMoney1>{item.location}</s.ItemBodyMoney1> */}

                    <s.ItemBody>
                      <s.ItemBodyMoney1>Số tiền kêu gọi được: {blockchain.web3.utils.fromWei(item.amountDonated, "ether")}</s.ItemBodyMoney1>
                      <s.ItemBodyMoney1>/ {blockchain.web3.utils.fromWei(item.amountNeeded, "ether")}</s.ItemBodyMoney1>


                    </s.ItemBody>
                  </s.ItemBodyContainer>
                  <s.ItemFooterContainer>
                    <s.ItemFooter>

                      <s.ItemFooterDonateText>Trạng thái chương trình</s.ItemFooterDonateText>
                      <s.ItemFooterDonate>{item.ongoing == true ? (<>Đang hoạt động</> ) : (<>Chương trình đã kết thúc</>) }</s.ItemFooterDonate>
                      
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