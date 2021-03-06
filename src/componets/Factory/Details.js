import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchData  } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import "../../page/styled/formcreate.scss"
import { create as ipfsHttpClient } from 'ipfs-http-client'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "../../page/styled/styled.scss"



const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
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
    const [CMND, setCMND] = useState("");
    const [fileImgR, setFileImgR] = useState();
    const [fileImg1R, setFileImg1R] = useState();
    const [error, setError] = useState(false);

    const list = data.AllProjects;
    const listDonors = data.Donors; 
    const listReceiver = data.Receivers;

    const [timerDays,setTimerDays] = useState(0);
    const [timerHours,setTimerHours] = useState(0);
    const [timerMinutes,setTimerMinutes] = useState(0);
    const [timerSeconds,setTimerSeconds] = useState(0);

    async function onChange(e) {
      const file = e.target.files[0]
      try {
        const added = await client.add(
          file,
          {
            progress: (prog) => console.log(`received: ${prog}`)
          }
        )
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        setFileImgR(url)
      } catch (error) {
              setError(true);
  
        // console.log('Error uploading file: ', error)
      }  
    }
    async function onChange1(e) {
      const file = e.target.files[0]
      try {
        const added = await client.add(
          file,
          {
            progress: (prog) => console.log(`received: ${prog}`)
          }
        )
        const url1 = `https://ipfs.infura.io/ipfs/${added.path}`
        setFileImg1R(url1);
      } catch (error) {
        setError(true);
        
      }  
    }


    useEffect(() => {
      const startCouterTimer = setInterval(() => {
        const seconds  = list.filter(item => item.id === id ).map(result =>
          parseInt(result.readyTime - Date.now() / 1000)
        )
  
        var remaining = {hours: 0, minutes: 0, seconds: 0 };
        if (seconds < 0){
          return remaining;
        } 
  
        const minutes = `0${Math.floor(seconds / 60)}`;
        const hours = `0${Math.floor(minutes / 60)}`;
        const days = `0${Math.floor(hours / 24)}`;
  
        remaining.days = days;
        remaining.hours = hours - remaining.days * 24;
        remaining.minutes = minutes - remaining.days * 24 * 60 - remaining.hours * 60;
        remaining.seconds = seconds - remaining.days * 24 * 60 * 60 - remaining.hours * 60 * 60 - remaining.minutes * 60;

        setTimerDays(remaining.days)
        setTimerHours(remaining.hours > 9 ? remaining.hours: '0' + remaining.hours)
        setTimerMinutes(remaining.minutes > 9 ? remaining.minutes: '0' + remaining.minutes)
        setTimerSeconds(remaining.seconds > 9 ? remaining.seconds: '0' + remaining.seconds)
      }, 1000);
  
      return () => {
        clearInterval(startCouterTimer);
      }
    })

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
      
    
      const receiver = async (_account, _nameR, _locationR, _descriptionR, _cnmd, _imageUrlR, _imageUrl1R) => {
        setLoading(true);
        await blockchain.Charity.methods
          .createRegistered_recipientStruct(id,_nameR, _locationR, _descriptionR,  _cnmd, _imageUrlR, _imageUrl1R)
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
      setShowForm1(!showForm1);
    }
      useEffect(() => {
        if(id && id !== "") 
        dispatch(fetchData(blockchain.account))
      }, [blockchain.account, dispatch, id])
      useEffect(() => {
        if (blockchain.account !== "" && blockchain.Charity !== null) {
            dispatch(fetchData(blockchain.account));
        }
    }, [blockchain.Charity, blockchain.account, dispatch]);

    const [searchNameD, setSearchNameD] = React.useState("");
    const [searchResultsD, setSearchResultsD] = React.useState([]);

    const handleChangeD = event => {
      setSearchNameD(event.target.value);
   };

   useEffect(() => {
    const resultsD = data.Donors.filter(item =>
        item.donorAddress.includes(searchNameD)
      );
      setSearchResultsD(resultsD);
 }, [searchNameD])
    const [searchNameR, setSearchNameR] = React.useState("");
    const [searchResultsR, setSearchResultsR] = React.useState([]);

    const handleChangeR = event => {
      setSearchNameR(event.target.value);
    };

    useEffect(() => {
    const resultsR = data.Receivers.filter(item =>
        item.nameR.includes(searchNameR)
      );
      setSearchResultsR(resultsR);
    }, [searchNameR])

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
            Chi ti???t ch????ng tr??nh
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
                    >Th???i gian k??u g???i c??n l???i: {timerDays} Ng??y {timerHours} Gi??? {timerMinutes} Ph??t {timerSeconds} Gi??y</h3>
              <div className="title">
                <h3 className="name">T??n ch????ng tr??nh: {item.projectName}</h3>
                <p className="location">?????a ??i???m: {item.location}</p>
                <p className="stk">S??? t??i kho???n k??u g???i: {item.program_creator}</p>
                <p className="stk">S??? t??i kho???n ng?????i nh???n: {item.recipient}</p>
                {item.readyTime > Date.now() /1000 ? (<h2 className="stk">T??nh tr???ng: ??ang ho???t ?????ng</h2>):(<h2 className="stk">T??nh tr???ng: Ch????ng tr??nh ???? k???t th??c</h2>)}
                {/* {item.ongoing == true ? (<h2 className="stk">T??nh tr???ng: ??ang ho???t ?????ng</h2>) : (<h2 className="stk">T??nh tr???ng: Ch????ng tr??nh ???? k???t th??c</h2>) } */}
              </div>
              <p className="location">H??nh ???nh minh ho???:</p>
    
              <div className="img">
                <img src={item.imageUrl} alt=""  />
                <img src={item.imageUrl1} alt=""  />

              </div>
             
              <div className="tt">
                <p className="sumary">M?? t???: {item.description}</p>
              </div>
              <div className="tt-right">
                <p className="title money">S??? ti???n k??u g???i: {blockchain.web3.utils.fromWei(item.amountNeeded, "ether")} ETH ( tr??? gi?? {blockchain.web3.utils.fromWei(item.amountNeeded, "ether")*95074746} VN??) </p>
                <p className="title money">S??? ti???n ???? k??u g???i ???????c: {blockchain.web3.utils.fromWei(item.amountDonated, "ether")} ETH ( tr??? gi?? {blockchain.web3.utils.fromWei(item.amountDonated, "ether")*95074746} VN??)</p>
                
                  
                
                <s.Container 
                style={{
                  textAlign: "center", 
                   
                  }}>
            <input
            className="unghott"
            placeholder={"S??? ti???n ???ng h??? ????n v??? BNB"}
            style={{padding: "10px",  height:"50px", width: "500px"}}
            onChange={e => setValue(e.target.value)}
            />
            <button
            className="form__button"
                onClick={() => {
                  if(!sotien){
                    alert("Vui l??ng nh???p s??? ti???n ???ng h???")
                  }else{
                    donate(
                      blockchain.account,
                      sotien, 
                  )
                  }
                }}
            >
                ???ng h???
            </button>
            {!showForm1 && (
              <button
              className="form__button"
                onClick={showForm}>
                  ????ng k?? nh???n h??? tr???
              </button>
            )}
            
            {showForm1 && (
              <form action="" className="form" style={{height: "800px", marginTop: "16px"}}>
              <h1 className="form__title">????ng k?? nh???n h??? tr???</h1>

              <div className="form__div">
                  <input type="text" className="form__input" placeholder="H??? v?? t??n " onChange={e => setnameR(e.target.value)}/>
              </div>

              <div className="form__div">
                  <input type="text" className="form__input" placeholder="?????a ch??? th?????ng tr?? " onChange={e => setlocationR(e.target.value)}/>
              </div>
              <div className="form__div">
                  <input type="text" className="form__input" placeholder="M?? t??? ho??n c???nh " onChange={e => setDescriptionR(e.target.value)}/>
              </div>
              <div className="form__div">
                  <input type="number" className="form__input" placeholder="S??? CMND/CCCD" onChange={e => setCMND(e.target.value)}/>
              </div>
              <div className="containerDis">
              <div className="container">
                <div className="containerItem">
                  {error && <p className="errorMsg">File kh??ng h??? tr???</p>}
                  <div className="imgPreview" 
                  style={{
                    background: fileImgR
                    ? `url("${fileImgR}") no-repeat center/cover`
                    : "#fff"
                  }}
                >
                    {
                        !fileImgR && (
                            <>
                                <p style={{color:"#000"}}>????nh k??m ???nh CMND/CCCD</p>
                                <label htmlFor="fileUpload" className="customFileUpload">
                                    Ch???n File
                                </label>
                                <input type="file" id="fileUpload" onChange={onChange}/>
                                <span style={{color:"#000"}}>(jpg, png or jpeg)</span>
                            </>
                        )
                    }
                </div>  
                {
                  fileImgR && (
                    <button className="buttonPriview" onClick={() => setFileImgR(null)}>T???i l???i</button>
                  )
                }  
            </div>
        </div>
        <div className="container">
                <div className="containerItem">
                  {error && <p className="errorMsg">File kh??ng h??? tr???</p>}
                  <div className="imgPreview" 
                  style={{
                    background: fileImg1R
                    ? `url("${fileImg1R}") no-repeat center/cover`
                    : "#fff"
                  }}
                >
                    {
                        !fileImg1R && (
                            <>
                                <p style={{color:"#000"}}>????nh k??m ???nh ch??n dung (khu??n m???t)</p>
                                <label htmlFor="fileUpload" className="customFileUpload">
                                    Ch???n File
                                </label>
                                <input type="file" id="fileUpload" onChange={onChange1}/>
                                <span style={{color:"#000"}}>(jpg, png or jpeg)</span>
                            </>
                        )
                    }
                </div>  
                {
                  fileImg1R && (
                    <button className="buttonPriview"  onClick={() => setFileImg1R(null)}>T???i l???i</button>
                  )
                }  
            </div>
        </div>
        </div>
              
              <input  type="submit" className="form__button" value="Ho??n th??nh"
            
                     onClick={() => {
                        if(!nameR || !locationR || ! descriptionR){
                           alert("Vui l??ng nh???p ?????y ????? th??ng tin")
                        }else{
                        receiver(
                          blockchain.account,
                          nameR,
                          locationR,
                          descriptionR,
                          CMND,
                          fileImgR,  
                          fileImg1R,
                        )
                        setShowForm1(!showForm1);
                        setFileImg1R(null);
                        setFileImgR(null);
                        

                        }}
                      }
                      
                      />
                      <input  type="submit" className="form__button" value="????ng"
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
                              D???ng k??u g???i
                          </button>
                          <button
                          className="form__button"
                              onClick={() => {
                              pay(
                                  blockchain.account,
                              )
                              }}
                          >
                              Gi???i ng??n
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
              <h1>Danh s??ch ng?????i ???ng h???</h1>
              <s.InputSearch
                type="search"
                placeholder="T??m ki???m"
                value={searchNameD}
                onChange={handleChangeD}
               />   
                {searchNameD != null ? (
                  <>
                  {listDonors.filter(item => item.donorAddress === searchNameD).filter(item => item.projectID === id).map((item, index) => (
                    <table id="customers" >
                    <tr>
                      <td>{item.donorAddress}</td>
                      <td>{blockchain.web3.utils.fromWei(item.amount, "ether")} ETH</td>
                    </tr>
                    </table>
                    ))}
                  </>
                ):(null)}
                <table id="customers">
                <tr>
                    <th>?????a ch??? v??</th>
                    <th>S??? ti???n</th>
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

            {listReceiver.filter(item => item.projectID === id ).map(result =>result.nameR) != "" ? (
              <>
               <div className='container-table'>
              <h1>Danh s??ch ????ng k?? nh???n h??? tr???</h1>
              <s.InputSearch
                type="search"
                placeholder="T??m ki???m"
                value={searchNameR}
                onChange={handleChangeR}
                />  
                {searchNameR != null ? (
                  <>
                  {listReceiver.filter(itemR => itemR.nameR === searchNameR).filter(itemR => itemR.projectID === id).map((itemR, index) => (
                    <table id="customers" >
                       <tr>
                                      <td>{itemR.nameR}</td>
                                      <td>{itemR.receiverAddress}</td>
                                      <td>{itemR.take == true ? (<p>???? ???????c duy???t</p>) : (<p>Ch??a ???????c duy???t</p>)}</td>
                                      <td>
                                        <Link to={`/detailRever/${itemR.projectID}?${itemR.receiverAddress} `}>
                                            <button>
                                                Xem th??m
                                            </button>
                                            </Link>
                                          </td>
                                  </tr>
                    </table>
                    ))}
                  </>
                ):(null)}
                
                  <table id="customers">
                    <tr>
                        <th>T??n ng?????i ????ng k??</th>
                        {/* <th>?????a ch???</th> */}
                        <th>?????a ch??? v??</th>
                        <th>Tr???ng th??i</th>
                        <th style={{textAlign:"center"}}>Chi ti???t</th>
                    </tr>
                  {listReceiver.filter(itemR => itemR.projectID === id).map((itemR, index) => ( 
                                  <tr>
                                      <td>{itemR.nameR}</td>
                                      {/* <td>{item.locationR}</td> */}
                                      <td>{itemR.receiverAddress}</td>
                                      <td>{itemR.take == true ? (<p>???? ???????c duy???t</p>) : (<p>Ch??a ???????c duy???t</p>)}</td>
                                      <td>
                                        <Link to={`/detailRever/${itemR.projectID}?${itemR.receiverAddress} `}>
                                            <button>
                                                Xem th??m
                                            </button>
                                            </Link>
                                          </td>
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
    title: "???ng h??? th???t b???i",
    message: "Vui l??ng ki???m tra l???i",
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
    title: "???ng h??? th??nh c??ng",
    message: "B???n ???? ???ng h??? th??nh c??ng cho ch????ng tr??nh",
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
    title: "???? c?? l???i x???y ra",
    message: "Vui l??ng ki???m tra l???i",
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
    title: "D???ng k??u g???i th??nh c??ng",
    message: "Ch????ng tr??nh ???? ???????c ????ng",
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
    title: "Gi???i ng??n th???t b???i",
    message: "H??y ki???m tra l???i",
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
    title: "Gi???i ng??n th??nh c??ng",
    message: "Ti???n ???? ???????c chuy???n ?????n nh???ng ng?????i trong danh s??ch nh???n",
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
    title: "????ng k?? nh???n h??? tr??? th???t b???i",
    message: "Vui l??ng ki???m tra l???i",
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
    title: "????ng k?? th??nh c??ng",
    message: "B???n ???? ????ng k?? nh???n h??? tr??? th??nh c??ng ",
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