import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData  } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import "../../page/styled/formcreate.scss"
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "../../page/styled/styled.scss"


const Details = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [loading, setLoading] = useState(false);
    const [sotien, setValue] = useState();
    const { id } = useParams();
    console.log(id);
    
    const [nameR, setnameR] = useState("");
    const [locationR, setlocationR] = useState("");
    const [descriptionR, setDescriptionR] = useState("");
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
      
    
      const receiver = async (_account, _nameR, _locationR, _descriptionR) => {
        setLoading(true);
        await blockchain.Charity.methods
          .createRegistered_recipientStruct(id,_nameR, _locationR, _descriptionR)
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
                <h3  style={{
                    textAlign: "center", 
                    fontSize: "28px", 
                    marginLeft:"auto",
                    marginRight: "auto"
                   }}
                    >Thời gian kêu gọi còn lại: {timerDays} Ngày {timerHours} Giờ {timerMinutes} Phút {timerSeconds} Giây</h3>
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
                <p className="title money">Số tiền kêu gọi: {blockchain.web3.utils.fromWei(item.amountNeeded, "ether")} ETH ( trị giá {blockchain.web3.utils.fromWei(item.amountNeeded, "ether")*95074746} VNĐ) </p>
                <p className="title money">Số tiền đã kêu gọi được: {blockchain.web3.utils.fromWei(item.amountDonated, "ether")} ETH ( trị giá {blockchain.web3.utils.fromWei(item.amountDonated, "ether")*95074746} VNĐ)</p>
                
                  
                
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
            <button
            className="form__button"
                onClick={() => {
                  if(!sotien){
                    alert("Vui lòng nhập số tiền ủng hộ")
                  }else{
                    donate(
                      blockchain.account,
                      sotien, 
                  )
                  }
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
              <form action="" className="form" style={{height: "500px", marginTop: "16px"}}>
              <h1 className="form__title">Đăng ký nhận hỗ trợ</h1>

              <div className="form__div">
                  <input type="text" className="form__input" placeholder="Tên người đăng ký " onChange={e => setnameR(e.target.value)}/>
              </div>

              <div className="form__div">
                  <input type="text" className="form__input" placeholder="Địa chỉ " onChange={e => setlocationR(e.target.value)}/>
              </div>
              <div className="form__div">
                  <input type="text" className="form__input" placeholder="Mô tả hoàn cảnh " onChange={e => setDescriptionR(e.target.value)}/>
              </div>
           
              
              <input  type="submit" className="form__button" value="Hoàn thành"
            
                     onClick={() => {
                        if(!nameR || !locationR || ! descriptionR){
                           alert("Vui lòng nhập đầy đủ thông tin")
                        }else{
                        receiver(
                          blockchain.account,
                          nameR,
                          locationR,
                          descriptionR,
                        )
                        setShowForm1(!showForm1);
                        }}
                      }
                      
                      />
                      <input  type="submit" className="form__button" value="Đóng"
                        onClick={() => {
                        setShowForm1(!showForm1);

                        }}
                      />
          </form>
            )}
            {blockchain.account === item.program_creator.toLowerCase() ? (
              <>
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
              </>
            ): (
              null
              
            )}
            </s.Container>
          </div>
          </div>
        
            ))}
            
            </s.ContainerItemBoder  >
            
            {listDonors.filter(item => item.projectID === id ).map(result =>result.amount) >= "0" ? (
              <>
               <div className='container-table'>
              <h1>Danh sách người ủng hộ</h1>

            <table id="customers">
              <tr>
                  <th>Địa chỉ ví</th>
                  <th>Số tiền</th>
              </tr>
            
            {listDonors.filter(item => item.projectID === id).map((item, index) => (
           
                            <tr>
                                <td>{item.donorAddress}</td>
                                <td>{blockchain.web3.utils.fromWei(item.amount, "ether")} ETH</td>
                            </tr>
 
            ))}
    
            </table>
        </div>
              </>
            ):(null)}

            {listReceiver.filter(item => item.projectID === id ).map(result =>result.locationR) != "" ? (
              <>
               <div className='container-table'>
              <h1>Danh sách đăng kí nhận hỗ trợ</h1>

                  <table id="customers">
                    <tr>
                        <th>Tên người đăng ký</th>
                        <th>Địa chỉ</th>
                        <th>Địa chỉ ví</th>
                    </tr>
                  
                  {listReceiver.filter(item => item.projectID === id).map((item, index) => (
                                  
                                  <tr>
                                      <td>{item.nameR}</td>
                                      <td>{item.locationR}</td>
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
    title: "Ủng hộ thất bại",
    message: "Vui lòng kiểm tra lại",
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
    message: "Vui lòng kiểm tra lại",
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
    title: "Đăng kí nhận hỗ trợ thất bại",
    message: "Vui lòng kiểm tra lại",
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