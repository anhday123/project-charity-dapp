import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData , removeData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
// import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from '../Navbar/NavbarElements';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "../../page/styled/styled.scss"
import _Bg1 from "../../assets/images/bg/blockchain1.png";

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
    const listReceiver = data.Receivers;

    const [timerDays,setTimerDays] = useState(0);
    const [timerHours,setTimerHours] = useState(0);
    const [timerMinutes,setTimerMinutes] = useState(0);
    const [timerSeconds,setTimerSeconds] = useState(0);


    useEffect(() => {
      const startCouterTimer = setInterval(() => {
        const seconds  = list.filter(item => item.id === id ).map(result =>
          // console.log(parseInt(result.readyTime - Date.now() /1000))
          parseInt(result.readyTime - Date.now() / 1000)
        )
  
        var remaining = {hours: 0, minutes: 0, seconds: 0 };
        if (seconds < 0) return remaining;
  
        const minutes = `0${Math.floor(seconds / 60)}`;
        const hours = `0${Math.floor(minutes / 60)}`;
        const days = `0${Math.floor(hours / 24)}`;
  
        remaining.days = days;
        remaining.hours = hours - remaining.days * 24;
        remaining.minutes = minutes - remaining.days * 24 * 60 - remaining.hours * 60;
        remaining.seconds = seconds - remaining.days * 24 * 60 * 60 - remaining.hours * 60 * 60 - remaining.minutes * 60;
  
        setTimerDays(remaining.days)
        setTimerHours(remaining.hours)
        setTimerMinutes(remaining.minutes)
        setTimerSeconds(remaining.seconds)
      }, 1000);
  
      return () => {
        clearInterval(startCouterTimer);
      }
    })

    console.log(data.AllProjects)
    const ShowError = () => {
      store.addNotification({
        title: "failed",
        message: "Transaction failed",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 10000,
          showIcon: true,
          onScreen: true,
        },
      })
    }

    const ShowSuccess = () => {
      store.addNotification({
        title: "Thành công",
        message: "Bạn đã ủng hộ thành công cho chương trình",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 10000,
          showIcon: true,
          onScreen: true
        },
      })
    }

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
            ShowError();
          })
          .then((receipt) => {
            setLoading(false);
            console.log(receipt);
            dispatch(fetchData(blockchain.account));
            ShowSuccess();
          });
      };
      const end = async (_account) => {
        setLoading(true);
        await blockchain.Charity.methods
          .endProject(id)
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
          });
      };
      const pay = async (_account) => {
        setLoading(true);
        await blockchain.Charity.methods
          .pay(id)
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
          });
      };
      const receiver = async (_account) => {
        setLoading(true);
        await blockchain.Charity.methods
          .Registered_recipient(id)
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
          });
      };

      useEffect(() => {
        if(id && id !== "") 
        dispatch(fetchData(blockchain.account))
      }, [blockchain.account, dispatch, id])
      useEffect(() => {
        if (blockchain.account !== "" && blockchain.Charity !== null) {
            dispatch(fetchData(blockchain.account));
        }
    }, [blockchain.Charity, blockchain.account, dispatch]);
    return (
        <>
            <s.Screen
             mgtS={"80px"} 
            //  image={_Bg1}
             >
        <ReactNotification />

              
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
                <p className="stk">Số tài khoản kêu gọi: {item.program_creator}</p>
                <p className="stk">Số tài khoản người nhận: {item.recipient}</p>

    
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
            style={{padding: "10px",  height:"50px", width: "500px"}}
            onChange={e => setValue(e.target.value)}
            />
            {/* <div className="container-btn"> */}
            <button
            className="log"
                onClick={() => {
                donate(
                    blockchain.account,
                    sotien, 
                )
                }}
            >
                Ủng hộ
            </button>

            <button
            className="log"
                onClick={() => {
                receiver(
                    blockchain.account,
                )
                }}
            >
                Đăng kí nhận hỗ trợ
            </button>

            <button
            className="log"
                onClick={() => {
                end(
                    blockchain.account,
                )
                }}
            >
                Dừng kêu gọi
            </button>
            <button
            className="log"
                onClick={() => {
                pay(
                    blockchain.account,
                )
                }}
            >
                Giải ngân
            </button>
            {/* </div> */}

            </s.Container>
                <h1>{timerDays} days {timerHours} hours {timerMinutes} minutes {timerSeconds} seconds</h1>
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

        <div className='container-table'>
              <h1>Danh sách đăng kí nhận hỗ trợ</h1>

            <table id="customers">
              <tr>
                  <th>Địa chỉ ví</th>
              </tr>
            
            {listReceiver.filter(item => item.projectID === id).map((item, index) => (
                            
                            <tr>
                                <td>{item.receiverAddress}</td>
                            </tr>
 
            ))}
    
            </table>
        </div>
        
        {/* <button
            className="log"
                onClick={() => {
                end(
                    blockchain.account,
                )
                }}
            >
                END PROJECT
            </button>
            <button
            className="log"
                onClick={() => {
                pay(
                    blockchain.account,
                )
                }}
            >
                PAY
            </button> */}

        </s.Screen>
        
        </>
    )
}

export default Details