import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import _Bg from "../../assets/images/bg/1.jpg";
// import { BiDna } from "react-icons/bi";
// import {Link} from "react-router-dom";
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
const Home = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);
  const [nameCharity, setNameCharity] = useState("");
  const [description, setDescription] = useState("");
  const [amountNeed, setAmountNeed] = useState();
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

    const createProjectStruct = (_account, _name, _description, _amountNeeded, _imageUrl) => {
      setLoading(true);
      blockchain.Charity.methods
        .createProjectStruct(_name, _description, _amountNeeded, _imageUrl)
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
        <s.Screen image={_Bg}>
        {blockchain.account === "" || blockchain.Charity === null ? (
            <s.Container flex={1} ai={"center"} jc={"center"}>

              <s.TextTitle style={{textAlign: "center", fontSize: "36px"}}>Một cách tạo chương trình từ thiện khác biệt!</s.TextTitle>
              <s.TextTitle style={{textAlign: "center", fontSize: "24px"}}>Hãy tạo chương trình hoặc ủng hộ chương trình mà bạn quan tâm</s.TextTitle>
              <s.SpacerSmall />
              <s.StyledButton 
              
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                }}
              >
                Tham gia
              </s.StyledButton>
              <s.SpacerXSmall />
              {blockchain.errorMsg !== "" ? (
                <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
              ) : null}
            </s.Container>
          ) : (
            
            <s.Container flex={1} ai={"center"} jc={"center"} > 
          {!loading &&
          <>
          <s.TextDescription> 
            Tài khoản hưởng thụ {blockchain.account}
          </s.TextDescription>
          <input
            placeholder={"Nhập Tên Chương Trình"}
            style={{padding: "10px", margin: "10px"}}
            onChange={e => setNameCharity(e.target.value)}
          />
          <input
            placeholder={"Mo ta? "}
            style={{padding: "10px", margin: "10px"}}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder={"so tien can keu goi "}
            style={{padding: "10px", margin: "10px"}}
            onChange={e => setAmountNeed(e.target.value)}
          />
          <input 
              type="file"
              style={{color : "#ffffff"}}
              onChange={onChange}
          />
          {fileImg && (
            <img 
              src={fileImg.preview} 
              alt="" 
              style={{backgroundSize: "cover", backgroundPosition: "cover", width: "400px", height: "cover"}}
            />
          )}

          <button
            onClick={() => {
              createProjectStruct(
                blockchain.account,
                nameCharity,
                description,
                amountNeed,
                fileImg
              )
            }}
          >
            tạo chương trình
          </button>
          </>
          }   
        </s.Container>
      )}
      </s.Screen>
      <s.Container bgc={"#71a5f2"} flex={1} ai={"center"} jc={"center"} >
      <s.TextTitle style={{textAlign: "center", fontSize: "36px", color: "#000"}}>CHƯƠNG TRÌNH NỔI BẬT</s.TextTitle>      
      
      <s.Container >
              {data.AllProjects.map((item, index) => {
                  return (
                    
                    <s.Container
                      flex={1} 
                      ai={"center"} 
                      jc={"center"}
                      
                      key={index}
                    >                     

                    </s.Container>
                  );
              })}
            </s.Container>
        
      </s.Container>

      <s.ContainerI>
        <s.ContainerItemBoder>
        {data.AllProjects.map((item, index) => {
                  return (
                    
                    <s.ContainerItem
                      flex={1} 
                      ai={"center"} 
                      jc={"center"}
                      
                      key={index}
                    >                     
                    <s.ContainerItemTitle>
                        <img src={item.imageUrl} alt="img"/>

                    <s.ItemTitle>
                    <s.ItemH3>#{item.id}</s.ItemH3>
                    <s.ItemH3>{item.projectName}</s.ItemH3>
                    </s.ItemTitle>
                  </s.ContainerItemTitle>
                    <s.ItemBodyContainer>
                    <s.ItemBodyMoney1>{item.recipient}</s.ItemBodyMoney1>
                    <s.ItemP>{item.description}</s.ItemP>
                    
                    <s.ItemBody>
                      <s.ItemBodyMoney1>{item.amountDonated}</s.ItemBodyMoney1>
                      <s.ItemBodyMoney2>{item.amountNeeded}</s.ItemBodyMoney2>
                    </s.ItemBody>
                  </s.ItemBodyContainer>
                  <s.ItemFooterContainer>
                    <s.ItemFooter>
                      <s.ItemFooterDonateText>Số lần ủng hộ</s.ItemFooterDonateText>
                      <s.ItemFooterDonate>800</s.ItemFooterDonate>
                      <s.ItemBtn>Tham gia</s.ItemBtn>
                    </s.ItemFooter>
                  </s.ItemFooterContainer>

                    </s.ContainerItem>
                  );
              })}
    
        </s.ContainerItemBoder>
      </s.ContainerI>        
     </>
    );
}

export default Home;
