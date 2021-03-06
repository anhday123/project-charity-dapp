import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import Swal from 'sweetalert2'

import {   Link  } from "react-router-dom";
import { fetchData } from "../redux/data/dataActions";
import * as s from "../styles/globalStyles";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import "./styled/formcreate.scss"
import "./styled/footer.css"
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import { useHistory } from "react-router-dom";

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
const FormCreate = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);


  const [loading, setLoading] = useState(false);
  const [nameCharity, setNameCharity] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [amountNeed, setAmountNeed] = useState("");
  const [recipient, setRecipient] = useState();
  const [fileImg, setFileImg] = useState();
  const [fileImg1, setFileImg1] = useState();
  const [error, setError] = useState(false);

 
  
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
      setFileImg(url)
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
      setFileImg1(url1);
    } catch (error) {
      setError(true);
      
      // console.log('Error uploading file: ', error)
    }  
  }
    // console.log(data);

    const createProjectStruct = (_account, _name, _location, _description, _amountNeeded, _imageUrl, _imageUrl1,_recipient) => {
      setLoading(true);
      blockchain.Charity.methods
        .createProjectStruct(_name, _location, _description, _amountNeeded, _imageUrl,_imageUrl1, _recipient)
        .send({
          from: _account,
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
          
          Swal.fire({
            
            title: 'Ch??c m???ng b???n ???? t???o ch????ng tr??nh th??nh c??ng!',
            width: 600,
            padding: '3em',
            icon: 'success',
            background: '#fff url(/images/trees.png)',

          })
          history.push("/");
        });
    };

    //console.log(data.AllProjects)
    const ShowError = () => {
      store.addNotification({
        title: "???? c?? l???i x???y ra",
        message: "Vui l??ng ki???m tra l???i",
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
 

    useEffect(() => {
        if (blockchain.account !== "" && blockchain.Charity !== null) {
            dispatch(fetchData(blockchain.account));
        }
    }, [blockchain.Charity, blockchain.account, dispatch]);
      

    return (
      <>
        
        <s.Screen mgtS={"80px"}>
        <ReactNotification />
        {blockchain.account === "" || blockchain.Charity === null ? (
            <s.Container flex={1} ai={"center"} jc={"center"}>
              <h1>H??y ????ng nh???p ????? t???o ch????ng tr??nh</h1>   
              {blockchain.errorMsg !== "" ? (
                <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
              ) : null}
            </s.Container>
          ) : (
            
            <s.Container flex={1} ai={"center"} jc={"center"} > 
          {!loading &&
          <div className="l-form">
          <form action="" className="form">
              <h1 className="form__title">T???o ch????ng tr??nh</h1>

              <div className="form__div">
                  <input required type="text" className="form__input" placeholder="T??n ch????ng tr??nh " onChange={e => setNameCharity(e.target.value)}/>
              </div>

              <div className="form__div">
                  <input required type="text" className="form__input" placeholder="?????a ??i???m " onChange={e => setLocation(e.target.value)}/>
              </div>
              <div className="form__div">
                  <input required type="text" className="form__input" placeholder="M?? t??? ch????ng tr??nh " onChange={e => setDescription(e.target.value)}/>
              </div>
           
              <div className="form__div">
                  <input required type="number" className="form__input" placeholder="S??? ti???n k??u g???i ????n v??? ETH" onChange={e => setAmountNeed(e.target.value)}/>
              </div>
              <div className="form__div">
                  <input required type="text" className="form__input" placeholder="?????a ch??? ng?????i nh???n " onChange={e => setRecipient(e.target.value)}/>
              </div>
              <div className="containerDis">
              <div className="container">
                <div className="containerItem">
                  {error && <p className="errorMsg">File kh??ng h??? tr???</p>}
                  <div className="imgPreview" 
                  style={{
                    background: fileImg
                    ? `url("${fileImg}") no-repeat center/cover`
                    : "#fff"
                  }}
                >
                    {
                        !fileImg && (
                            <>
                                <p style={{color:"#000"}}>????nh k??m h??nh ???nh minh ho???</p>
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
                  fileImg && (
                    <button className="buttonPriview" onClick={() => setFileImg(null)}>T???i l???i</button>
                  )
                }  
            </div>
        </div>
        <div className="container">
                <div className="containerItem">
                  {error && <p className="errorMsg">File kh??ng h??? tr???</p>}
                  <div className="imgPreview" 
                  style={{
                    background: fileImg1
                    ? `url("${fileImg1}") no-repeat center/cover`
                    : "#fff"
                  }}
                >
                    {
                        !fileImg1 && (
                            <>
                                <p style={{color:"#000"}}>????nh k??m h??nh ???nh minh ho???</p>
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
                  fileImg1 && (
                    <button className="buttonPriview" onClick={() => setFileImg1(null)}>T???i l???i</button>
                  )
                }  
            </div>
        </div>
        </div>

              <input type="submit" className="form__button" value="Ho??n th??nh"
                     onClick={() => {
                       if(!nameCharity || !location || !description || !amountNeed || !fileImg || !fileImg1 || !recipient){
                          alert("Vui l??ng nh???p ?????y ????? th??ng tin")
                       }else{
                        createProjectStruct(
                          blockchain.account,
                          nameCharity,
                          location,
                          description,
                          blockchain.web3.utils.toWei(amountNeed),
                          fileImg,  
                          fileImg1,
                          recipient,
                        )
                        setFileImg1(null);
                        setFileImg(null);
                       }
                      }}
                      />
              
          </form>
      </div>
          }   
        </s.Container>
      )}
      </s.Screen>
   

             
     </>
    );
}

export default FormCreate;
