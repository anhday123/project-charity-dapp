import React from 'react'
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
// import { BrowserRouter as  Link } from "react-router-dom";
import {   Link  } from "react-router-dom";
import * as s from "../styles/globalStyles";


const AllProjects = () => {

  const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    // console.log(data.AllProjects)
    const [searchName, setSearchName] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const handleChange = event => {
      setSearchName(event.target.value);
   };

   useEffect(() => {
    const results = data.AllProjects.filter(item =>
        item.projectName.includes(searchName)
      );
      setSearchResults(results);
 }, [searchName])

    return ( 
       <s.Screen mgtS={"80px"}>
         
        <s.Container   ai={"center"}  >
        <s.TextTitle 
          style={{
            textAlign: "center", 
            fontSize: "36px", 
            color: "#000"}}
            >
              Chương trình đang kêu gọi
            
            </s.TextTitle>  
            <s.InputSearch

                type="search"
                placeholder="Tìm kiếm"
                value={searchName}
                onChange={handleChange}
            />    
        </s.Container>
    
        {searchName != null ? (
          <>
          <s.ContainerI>
              <s.ContainerItemBoder>
          {searchResults.map((item,index) => {
            return (
              
              <s.ContainerItem
                      flex={1} 
                      ai={"center"} 
                      jc={"center"}
                      
                      key={index}
                    >                   
                    <s.ContainerItemTitle>
                    <Link to={`/details/${item.id}`}>
                      <img src={item.imageUrl} alt=""/>
                    </Link>

                    <s.ItemTitle>
                    <s.ItemH3>id#{item.id}</s.ItemH3>
                    <s.ItemH3>{item.projectName}</s.ItemH3>
                    </s.ItemTitle>
                  </s.ContainerItemTitle>
                    <s.ItemBodyContainer>
                  <s.ItemBodyMoney1>{item.location}</s.ItemBodyMoney1>

                    </s.ItemBodyContainer>
                    <s.ItemBodyContainer>

                    <s.ItemBodyMoney1>{item.program_creator}</s.ItemBodyMoney1>
                    
                    <s.ItemP>{item.description}</s.ItemP>

                    <s.ItemBody>
                      <s.ItemBodyMoney1>Số tiền kêu gọi được: {blockchain.web3.utils.fromWei(item.amountDonated, "ether")}</s.ItemBodyMoney1>
                      <s.ItemBodyMoney1>/ {blockchain.web3.utils.fromWei(item.amountNeeded, "ether")}</s.ItemBodyMoney1>


                    </s.ItemBody>
                  </s.ItemBodyContainer>
                  <s.ItemFooterContainer>
                    <s.ItemFooter>
                      {/* <s.ItemFooterDonateText>Số lần ủng hộ</s.ItemFooterDonateText>
                      // <s.ItemFooterDonate>xxxx<s.ItemFooterDonate> */}
                      <s.ItemFooterDonateText>Trạng thái chương trình</s.ItemFooterDonateText>
                      <s.ItemFooterDonate>{item.ongoing == true ? (<>Đang hoạt động</> ) : (<>Chương trình đã kết thúc</>) }</s.ItemFooterDonate>
                      <Link to={`/details/${item.id}`}><s.ItemBtn>Tham gia</s.ItemBtn></Link>
                    </s.ItemFooter>
                  </s.ItemFooterContainer>

                    </s.ContainerItem>
                    
            )
            
          })}
          </s.ContainerItemBoder>
                    </s.ContainerI>
          </>
          
        ) : (
          <s.ContainerI>
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
                    <Link to={`/details/${item.id}`}>
                      <img src={item.imageUrl} alt=""/>
                    </Link>

                    <s.ItemTitle>
                    <s.ItemH3>id#{item.id}</s.ItemH3>
                    <s.ItemH3>{item.projectName}</s.ItemH3>
                    </s.ItemTitle>
                  </s.ContainerItemTitle>
                    <s.ItemBodyContainer>
                  <s.ItemBodyMoney1>{item.location}</s.ItemBodyMoney1>

                    </s.ItemBodyContainer>
                    <s.ItemBodyContainer>

                    <s.ItemBodyMoney1>{item.program_creator}</s.ItemBodyMoney1>
                    
                    <s.ItemP>{item.description}</s.ItemP>

                    <s.ItemBody>
                      <s.ItemBodyMoney1>Số tiền kêu gọi được: {blockchain.web3.utils.fromWei(item.amountDonated, "ether")}</s.ItemBodyMoney1>
                      <s.ItemBodyMoney1>/ {blockchain.web3.utils.fromWei(item.amountNeeded, "ether")}</s.ItemBodyMoney1>


                    </s.ItemBody>
                  </s.ItemBodyContainer>
                  <s.ItemFooterContainer>
                    <s.ItemFooter>
                      {/* <s.ItemFooterDonateText>Số lần ủng hộ</s.ItemFooterDonateText>
                      <s.ItemFooterDonate>xxxx</s.ItemFooterDonate> */}
                      <Link to={`/details/${item.id}`}><s.ItemBtn>Tham gia</s.ItemBtn></Link>
                    </s.ItemFooter>
                  </s.ItemFooterContainer>

                    </s.ContainerItem>
                    
                  );
              })}
                    </s.ContainerItemBoder>
                    </s.ContainerI>
        )}
       </s.Screen>
  

    )
}

export default AllProjects