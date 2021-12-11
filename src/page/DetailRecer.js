import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as s from "../styles/globalStyles";
import "./styled/formcreate.scss"
import "./styled/styled.scss"
import { Link, useParams } from "react-router-dom";
import { fetchData  } from "../redux/data/dataActions";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'


const DetailRecer = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { id } = useParams();
    const querystring = window.location.search.substring(1);

    const list = data.AllProjects; 
    const listReceiver = data.Receivers;


    const approveReceiver = async (_account) => {
        setLoading(true);
        await blockchain.Charity.methods
          .approveReceiver(id,querystring)
          .send({
            from: _account,
          })
          .once("error", (err) => {
            setLoading(false);
            console.log(err);
            
          })
          .then((receipt) => {
            setLoading(false);
            console.log(receipt);
            dispatch(fetchData(blockchain.account));
            Swal.fire({
            
                title: ' Duyệt người nhận thành công!',
                width: 600,
                padding: '3em',
                icon: 'success',
                background: '#fff url(/images/trees.png)',
    
              })
              history.push(`/details/${id}`);
          });
      };
    return (
        <>
        <s.Screen
             mgtS={"80px"} 
             >

            <s.ContainerItemBoder>
            {listReceiver.filter(itemR => itemR.receiverAddress === querystring).map((itemR, index) => (
              <div className="item">
                        <div className="title">
                          <h2>Chi tiết thông tin người nhận hỗ trợ</h2>
                          <p>Họ và tên: {itemR.nameR}</p>
                          <p>Số CMND/CCCD: {itemR.CMND}</p>
                          <p>Địa chỉ ví: {itemR.receiverAddress}</p>
                          <p>Địa chỉ thường trú: {itemR.locationR}</p>
                          <p>Mô tả hoàn cảnh: {itemR.descriptionR}</p>
                          {itemR.take == true ? (<p>Tình trạng phê duyệt: Đã được duyệt</p>) : (<p>Tình trạng phê duyệt: Chưa được duyệt</p>)}

                          {/* <div style={{display:"flex", marginLeft: "auto", marginRight:"auto", justifyContent:"center"}}>
                            <img style={{height: "200px", padding:"8px"}} src={itemR.imageUrlR} alt=""  /><br></br>
                            <img style={{height: "200px", padding:"8px"}} src={itemR.imageUrl1R} alt=""  />

                          </div> */}
                          <div className="img">
                            <img src={itemR.imageUrlR} alt=""  />
                            <img src={itemR.imageUrl1R} alt=""  />
                           </div>
                          <p style={{textAlign:"center", fontSize:"16px"}}>Hình ảnh CMND/CCCD và khuôn mặt: </p>

                        </div>
              </div>



                      ))}
                      
                      {listReceiver.filter(itemR => itemR.receiverAddress === querystring).map((itemR, index) => (
                        <div>
                          {itemR.take === false ? (
                            <div style={{marginLeft:"auto", marginRight:"auto"}}>
                              {list.filter(item => item.id === id).map((item) => (
                            blockchain.account === item.program_creator.toLowerCase() ? (
                                <button className="form__button" 
                                onClick={() => {
                                    approveReceiver(blockchain.account);
                                    
                                }}
                                > Duyệt</button>
                        ) : (null) 
                      ))} 
                            </div>
                          ):(null)}
                        </div>
                      ))}
                      
            </s.ContainerItemBoder>
            </s.Screen>
        </>
    )
}

export default DetailRecer

