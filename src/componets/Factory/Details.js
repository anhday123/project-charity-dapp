import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData , removeData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import "../../page/styled/formcreate.scss"
// import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from '../Navbar/NavbarElements';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "../../page/styled/styled.scss"
// import _Bg1 from "../../assets/images/bg/blockchain1.png";

const Details = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [loading, setLoading] = useState(false);
    const [sotien, setValue] = useState();
    const { id } = useParams();
    console.log(id);
    
    const [nameCharity, setNameCharity] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const list = data.AllProjects;
    const listDonors = data.Donors;
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
            ShowError1();
          })
          .then((receipt) => {
            setLoading(false);
            console.log(receipt);
            dispatch(fetchData(blockchain.account));
            ShowSuccess1();

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
            ShowError2();
          })
          .then((receipt) => {
            setLoading(false);
            console.log(receipt);
            dispatch(fetchData(blockchain.account));
            ShowSuccess2();

          });
      };
      
    
      const receiver = async (_account, _name, _location, _disadvantaged) => {
        setLoading(true);
        await blockchain.Charity.methods
          .createRegistered_recipientStruct(id,_name, _location, _disadvantaged)
          .send({
            from: _account,
          })
          .once("error", (err) => {
            setLoading(false);
            console.log(err);
            ShowError3();
          })
          .then((receipt) => {
            setLoading(false);
            console.log(receipt);
            dispatch(fetchData(blockchain.account));
            ShowSuccess3();

          });
      };

    const [showForm1, setShowForm1] = useState(false);

    const showForm = () => {
      setShowForm1(!showForm1);}
    

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
            <h3  style={{
                    textAlign: "center", 
                    fontSize: "28px", 
                   }}
                    >Thời gian kêu gọi còn lại: {timerDays} Ngày {timerHours} Giờ {timerMinutes} Phút {timerSeconds} Giây</h3>
          
            {/* <s.TextTitle 
                style={{
                    textAlign: "center", 
                    fontSize: "36px", 
                    color: "#000"}}
        >
            {timerDays} Ngày {timerHours} Giờ {timerMinutes} Phút {timerSeconds} Giây
            </s.TextTitle>        */}
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
                <img src={item.imageUrl1} alt=""  />

              </div>
             
              <div className="tt">
                <p className="sumary">Mô tả: {item.description}</p>
              </div>
              <div className="tt-right">
                <p className="title money">Số tiền kêu gọi: {item.amountNeeded} wei</p>
                <p className="title money">Số tiền đã kêu gọi được: {item.amountDonated} wei</p>
                
                  
                
                <s.Container 
                style={{
                  textAlign: "center", 
                   
                  }}>
            <input
            className="unghott"
            placeholder={"Số tiền ủng hộ đơn vị ETH"}
            style={{padding: "10px",  height:"50px", width: "500px"}}
            onChange={e => setValue(e.target.value)}
            />
            {/* <div className="container-btn"> */}
            <button
            className="form__button"
                onClick={() => {
                donate(
                    blockchain.account,
                    sotien, 
                )
                }}
            >
                Ủng hộ
            </button>
            {!showForm1 && (
              <button
              className="form__button"
                onClick={showForm}>
                  Đăng kí nhận hỗ trợ
              </button>
            )}
            
            {showForm1 && (
              <form action="" className="form">
              {/* <h1 className="form__title">Tạo chương trình</h1> */}

              <div className="form__div">
                  <input type="text" className="form__input" placeholder=" " onChange={e => setNameCharity(e.target.value)}/>
                  <label  className="form__label">Tên chương trình</label>
              </div>

              <div className="form__div">
                  <input type="text" className="form__input" placeholder=" " onChange={e => setLocation(e.target.value)}/>
                  <label  className="form__label">Địa điểm </label>
              </div>
              <div className="form__div">
                  <input type="text" className="form__input" placeholder=" " onChange={e => setDescription(e.target.value)}/>
                  <label  className="form__label">Mô tả chương trình</label>
              </div>
           
              
              <input  type="submit" className="form__button" value="Hoàn thành"
            
                     onClick={() => {
                      receiver(
                        blockchain.account,
                        nameCharity,
                        location,
                        description,
                      )
                      setShowForm1(!showForm1);
                      }}
                      />
          </form>
            )}
            {blockchain.account === item.program_creator.toLowerCase() ? (
              <div>
                                          <button
                          className="form__button"
                              onClick={() => {
                              end(
                                  blockchain.account,
                              )
                              }}
                          >
                              Dừng kêu gọi
                          </button>
                          <button
                          className="form__button"
                              onClick={() => {
                              pay(
                                  blockchain.account,
                              )
                              }}
                          >
                              Giải ngân
                          </button>
              </div>
            ): (
              null
            )}
            </s.Container>
          </div>
          </div>
        
            ))}
            
            </s.ContainerItemBoder  >
            {console.log("Hello :" + listDonors.filter(item => item.projectID === id ).map(result =>result.amount))}
            {listDonors.filter(item => item.projectID === id ).map(result =>result.amount) >= "0" ? (
              <>
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
                                <td>{item.amount} wei</td>
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
              </>
            ):(null)}
        </s.Screen>
        
        </>
    )
}
const ShowError = () => {
  store.addNotification({
    title: "Ủng hộ không thành công",
    message: "Chương trình đã dừng kêu gọi",
    type: "danger",
    insert: "top",
    container: "top-left",
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
    title: "Ủng hộ thành công",
    message: "Bạn đã ủng hộ thành công cho chương trình",
    type: "success",
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 10000,
      showIcon: true,
      onScreen: true
    },
  })
}
const ShowError1 = () => {
  store.addNotification({
    title: "Đã có lỗi xảy ra",
    message: "Hãy kiểm tra lại",
    type: "danger",
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 10000,
      showIcon: true,
      onScreen: true,
    },
  })
}

const ShowSuccess1 = () => {
  store.addNotification({
    title: "Dừng kêu gọi thành công",
    message: "Chương trình đã được đóng",
    type: "success",
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 10000,
      showIcon: true,
      onScreen: true
    },
  })
}
const ShowError2 = () => {
  store.addNotification({
    title: "Giải ngân thất bại",
    message: "Hãy kiểm tra lại",
    type: "danger",
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 10000,
      showIcon: true,
      onScreen: true,
    },
  })
}

const ShowSuccess2 = () => {
  store.addNotification({
    title: "Giải ngân thành công",
    message: "Tiền đã được chuyển đến những người trong danh sách nhận",
    type: "success",
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 10000,
      showIcon: true,
      onScreen: true
    },
  })
}
const ShowError3 = () => {
  store.addNotification({
    title: "Đăng kí nhận hỗ trợ không thành công",
    message: "Chương trình đã dừng tiếp nhận đăng kí",
    type: "danger",
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 10000,
      showIcon: true,
      onScreen: true,
    },
  })
}

const ShowSuccess3 = () => {
  store.addNotification({
    title: "Đăng kí thành công",
    message: "Bạn đã đăng kí nhận hỗ trợ thành công ",
    type: "success",
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 10000,
      showIcon: true,
      onScreen: true
    },
  })
}

export default Details;