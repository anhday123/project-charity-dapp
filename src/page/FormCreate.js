import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchData } from "../redux/data/dataActions";
import * as s from "../styles/globalStyles";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import "./styled/formcreate.scss"
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
  const [amountNeed, setAmountNeed] = useState();
  const [recipient, setRecipient] = useState();
  const [fileImg, setFileImg] = useState();
  
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
    console.log(data);

    const createProjectStruct = (_account, _name, _location, _description, _amountNeeded, _imageUrl, _recipient) => {
      setLoading(true);
      blockchain.Charity.methods
        .createProjectStruct(_name, _location, _description, _amountNeeded, _imageUrl, _recipient)
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

    console.log(data.AllProjects)

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
        <s.Container  flex={1} ai={"center"} jc={"center"} >
        <s.TextTitle style={{textAlign: "center", fontSize: "36px", color: "#000"}}>Tạo chương trình</s.TextTitle>      
        </s.Container>
        {blockchain.account === "" || blockchain.Charity === null ? (
            <s.Container flex={1} ai={"center"} jc={"center"}>
          
              {blockchain.errorMsg !== "" ? (
                <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
              ) : null}
            </s.Container>
          ) : (
            
            <s.Container flex={1} ai={"center"} jc={"center"} > 
          {!loading &&
          <div className="l-form">
          <form action="" className="form">
              {/* <h1 className="form__title">Tạo chương trình</h1> */}

              <div className="form__div">
                  <input type="text" className="form__input" placeholder=" " onChange={e => setNameCharity(e.target.value)}/>
                  <label for="" className="form__label">Tên chương trình</label>
              </div>

              <div className="form__div">
                  <input type="text" className="form__input" placeholder=" " onChange={e => setLocation(e.target.value)}/>
                  <label for="" className="form__label">Địa điểm </label>
              </div>
              <div className="form__div">
                  <input type="text" className="form__input" placeholder=" " onChange={e => setDescription(e.target.value)}/>
                  <label for="" className="form__label">Mô tả chương trình</label>
              </div>
           
              <div className="form__div">
                  <input type="text" className="form__input" placeholder=" " onChange={e => setAmountNeed(e.target.value)}/>
                  <label for="" className="form__label">Số tiền kêu gọi</label>
              </div>
              <div className="form__div">
                  <input type="text" className="form__input" placeholder=" " onChange={e => setRecipient(e.target.value)}/>
                  <label for="" className="form__label">Địa chỉ người nhận</label>
              </div>
              <input 
              className="form__button"
              type="file"
              placeholder=" Chọn ảnh minh hoạ"
            //   style={{color : "#ffffff"}}
              onChange={onChange}
              
          />
          

              <input type="submit" className="form__button" value="Tạo chương trình"
                     onClick={() => {
                        createProjectStruct(
                          blockchain.account,
                          nameCharity,
                          location,
                          description,
                          amountNeed,
                          fileImg,
                          recipient,
                        )
                      }}/>
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
