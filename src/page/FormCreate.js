import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchData } from "../redux/data/dataActions";
import * as s from "../styles/globalStyles";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import "./styled/formcreate.scss"
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
// import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

// import _Bg from "../../assets/images/bg/1.jpg";
// import { BiDna } from "react-icons/bi";
// import {Link} from "react-router-dom";
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
const FormCreate = () => {
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
      console.log('Error uploading file: ', error)
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
      console.log('Error uploading file: ', error)
    }  
  }
    console.log(data);

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
          ShowSuccess();
        });
    };

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
        title: "Tạo thành công",
        message: "Bạn đã tạo 1 chương trình thành công",
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

    // const handlePreviewImg = (e) => {
    //   const file = e.target.files[0];
    //   file.preview = URL.createObjectURL(file);
    //   setFileImg(file);
    // }

    
    useEffect(() => {
        if (blockchain.account !== "" && blockchain.Charity !== null) {
            dispatch(fetchData(blockchain.account));
        }
    }, [blockchain.Charity, blockchain.account, dispatch]);
      
    console.log(blockchain.account)

    return (
      <>
      
        <s.Screen mgtS={"80px"}>
        <ReactNotification />
        {blockchain.account === "" || blockchain.Charity === null ? (
            <s.Container flex={1} ai={"center"} jc={"center"}>
              <h1>Hãy đăng nhập để tạo chương trình</h1>   
              {blockchain.errorMsg !== "" ? (
                <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
              ) : null}
            </s.Container>
          ) : (
            
            <s.Container flex={1} ai={"center"} jc={"center"} > 
          {!loading &&
          <div className="l-form">
          <form action="" className="form">
              <h1 className="form__title">Tạo chương trình</h1>

              <div className="form__div">
                  <input required type="text" className="form__input" placeholder="Tên chương trình " onChange={e => setNameCharity(e.target.value)}/>
                  {/* <label  className="form__label">Tên chương trình</label> */}
              </div>

              <div className="form__div">
                  <input required type="text" className="form__input" placeholder=" " onChange={e => setLocation(e.target.value)}/>
                  <label  className="form__label">Địa điểm </label>
              </div>
              <div className="form__div">
                  <input required type="text" className="form__input" placeholder=" " onChange={e => setDescription(e.target.value)}/>
                  <label  className="form__label">Mô tả chương trình</label>
              </div>
           
              <div className="form__div">
                  <input required type="number" className="form__input" placeholder=" " onChange={e => setAmountNeed(e.target.value)}/>
                  <label  className="form__label">Số tiền kêu gọi</label>
              </div>
              <div className="form__div">
                  <input required type="text" className="form__input" placeholder=" " onChange={e => setRecipient(e.target.value)}/>
                  <label  className="form__label">Địa chỉ người nhận</label>
              </div>
              <input 
              className="form__button"
              type="file"
              placeholder=" Chọn ảnh minh hoạ"
            //   style={{color : "#ffffff"}}
              onChange={onChange}
              
          />
          <input 
              className="form__button"
              type="file"
              placeholder=" Chọn ảnh minh hoạ"
            //   style={{color : "#ffffff"}}
              onChange={onChange1}
              
          />
         
         
          
              {/* <Link to="/allprojects"> */}
              <input  type="submit" className="form__button" value="Hoàn thành"
            
                     onClick={() => {
                        createProjectStruct(
                          blockchain.account,
                          nameCharity,
                          location,
                          description,
                          amountNeed,
                          fileImg,
                          fileImg1,
                         
                          recipient,
                        )
                      }}
                      />
              {/* </Link> */}
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
