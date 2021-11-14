import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData , removeData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import "../../page/styled/styled.scss"
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
      console.log(listDonors.length);
    
    return (
        <>
            <s.Screen
             mgtS={"80px"} 
            //  image={_Bg1}
             >
              
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
   
            <s.ContainerItemBoder>
            {list.filter(item => item.id === id).map((item, index) => (
              <div className="item">
              <div className="title">
                <h3 className="name">Tên chương trình: {item.projectName}</h3>
                <p className="location">Địa điểm: {item.location}</p>
                <p className="stk">Số tài khoản kêu gọi: {item.recipient}</p>
    
              </div>
              <p className="location">Hình ảnh minh hoạ:</p>
    
              <div className="img">
    
                <img src={item.imageUrl} alt=""  />
              </div>
              <div className="tt">
                        <p className="sumary">Mô tả: {item.description}</p>
              </div>
              <div className="tt-right">
                <p className="title money">Số tiền kêu gọi: {item.amountNeeded} wei</p>
                <p className="title money">Số tiền đã kêu gọi được: {item.amountDonated} wei</p>
           
                <s.Container>
            <input
            placeholder={"Số tiền ủng hộ"}
            style={{padding: "10px", margin: "10px"}}
            onChange={e => setValue(e.target.value)}
            />
            <button
            className="log"
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
    
          </div>
          </div>
        
            ))}
            
            </s.ContainerItemBoder  >

         
            <div className='container-table'>
              <h1>Danh sách người ủng hộ</h1>
            {/* <h3>Số người đã ủng hộ: {listDonors.length}</h3> */}


            <table id="customers">
              <tr>
                  <th>Địa chỉ ví</th>
                  <th>Số tiền</th>
              </tr>
            
            {listDonors.filter(item => item.projectID === id).map((item, index) => (
          
                       
                            <tr>
                                <td>{item.donorAddress}</td>
                                <td>{item.amount} Ether</td>
                            </tr>
                   
               
              
            ))}
            
                
            </table>

        </div>
        </s.Screen>
        
        </>
    )
}

export default Details