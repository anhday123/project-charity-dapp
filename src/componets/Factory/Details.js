import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData , removeData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import _Bg1 from "../../assets/images/bg/blockchain1.png";
import { ethers } from "ethers";
const Details = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [loading, setLoading] = useState(false);
    const [sotien, setValue] = useState();
    const { id } = useParams();
    console.log(id);
    
    const list = data.AllProjects;
    console.log(list);
    const listDonors = data.Donors;
   console.log(listDonors);
    const donate = async (_account, _value) => {
        setLoading(true);
        await blockchain.Charity.methods
          .donate(id)
          .send({
            from: _account,
            value: blockchain.web3.utils.toWei(_value),
          })
          .once("error", (err) => {
            setLoading(false);
            console.log(err);
          })
          .then((receipt) => {
            setLoading(false);
            console.log(receipt);
            dispatch(fetchData(blockchain.account));
          });
      };
    
    return (
        <>
            <s.Screen mgtS={"80px"} image={_Bg1}>
            <s.Container ai={"center"}>
            <s.TextTitle 
                style={{
                    textAlign: "center", 
                    fontSize: "36px", 
                    color: "#000"}}
        >
            Chi tiết chương trình
            </s.TextTitle>      
        </s.Container>
            <s.Container>
            <input
            placeholder={"Số tiền ủng hộ"}
            style={{padding: "10px", margin: "10px"}}
            onChange={e => setValue(e.target.value)}
            />
            <button
                onClick={() => {
                donate(
                    blockchain.account,
                    sotien, 
                )
                }}
            >
                donate
            </button>

            </s.Container>
            <s.ContainerItemBoder>
            {list.filter(item => item.id === id).map((item, index) => (
                <s.Container 
                    key={index} 
                    style={{ padding:"10px 100px"}}
                >
                {/* <s.ContainerItem
                        flex={1} 
                        ai={"center"} 
                        jc={"center"}
                        
                        key={index}
                      >                      */}
                      {/* <s.ContainerItemTitle> */}
                          <img src={item.imageUrl} alt="img"/>

                      {/* <s.ItemTitle> */}
                      <s.ItemH3>#{item.id}</s.ItemH3>
                      <s.ItemH3>{item.projectName}</s.ItemH3>
                      {/* </s.ItemTitle> */}
                    {/* </s.ContainerItemTitle> */}
                      {/* <s.ItemBodyContainer> */}
                      <s.ItemBodyMoney1>{item.location}</s.ItemBodyMoney1>
                      <s.ItemBodyMoney1>{item.recipient}</s.ItemBodyMoney1>
                      <s.ItemP>{item.description}</s.ItemP>
                      
                      {/* <s.ItemBody> */}
                        <s.ItemBodyMoney1>{item.amountDonated}</s.ItemBodyMoney1>
                        <s.ItemBodyMoney2>{item.amountNeeded}</s.ItemBodyMoney2>
                      {/* </s.ItemBody> */}
                    {/* </s.ItemBodyContainer> */}
                    {/* <s.ItemFooterContainer> */}
                      <s.ItemFooter>
                        <s.ItemFooterDonateText>Số lần ủng hộ</s.ItemFooterDonateText>
                        <s.ItemFooterDonate>800</s.ItemFooterDonate>


                      </s.ItemFooter>
                    {/* </s.ItemFooterContainer> */}

                      {/* </s.ContainerItem> */}
                </s.Container>
            ))};
            </s.ContainerItemBoder  >

            <s.ContainerItemBoder>
            {listDonors.filter(item => item.projectID === id).map((item, index) => (
                <s.Container 
                    key={index} 
                    style={{ padding:"10px 100px"}}
                >
                <s.ContainerItem
                        flex={1} 
                        ai={"center"} 
                        jc={"center"}
                        
                        key={index}
                      >                     
                      <s.ContainerItemTitle>
                      <s.ItemTitle>
                      <s.ItemH3>{item.donorAddress}</s.ItemH3>
                      </s.ItemTitle>
                    </s.ContainerItemTitle>
                      <s.ItemBodyContainer>
                      <s.ItemBodyMoney1>{item.amount}</s.ItemBodyMoney1>
                    </s.ItemBodyContainer>
                      </s.ContainerItem>
                </s.Container>
            ))};
            </s.ContainerItemBoder  >
        </s.Screen>
        
        </>
    )
}

export default Details