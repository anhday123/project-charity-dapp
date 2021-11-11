import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import _color from "../../assets/images/bg/1.jpg";
// import { BiDna } from "react-icons/bi";
// import {Link} from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);
  const [nameCharity, setNameCharity] = useState("");
  const [description, setDescription] = useState("");
  const [amountNeed, setAmountNeed] = useState();
  const [fileImg, setFileImg] = useState();
  
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

    const handlePreviewImg = (e) => {
      const file = e.target.files[0];
      file.preview = URL.createObjectURL(file);
      setFileImg(file);
    }


    useEffect(() => {
        if (blockchain.account !== "" && blockchain.Charity !== null) {
            dispatch(fetchData(blockchain.account));
        }
    }, [blockchain.Charity, blockchain.account, dispatch]);
      
    console.log(blockchain.account)

    return (
      <>
        <s.Screen image={_color}>
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
              onChange={handlePreviewImg}
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
        
            {/* <s.Container >
              {data.AllProjects.map((item, index) => {
                  return (
                    <s.Container 
                      flex={1} 
                      ai={"center"} 
                      jc={"center"}
                      
                      key={index}
                    >
                      <s.TextDescription>{item.id}</s.TextDescription>
                      <s.TextDescription>{item.recipient}</s.TextDescription>
                      <s.TextDescription>{item.projectName}</s.TextDescription>
                      <s.TextDescription>{item.description}</s.TextDescription>
                      <s.TextDescription>{item.amountNeeded}</s.TextDescription>
                      <s.TextDescription>{item.amountDonated}</s.TextDescription>
                      <s.TextDescription>{item.imageUrl}</s.TextDescription>
                      <s.TextDescription>{item.ongoing}</s.TextDescription>
                      <s.TextDescription>{item.projectAddress}</s.TextDescription>

                    </s.Container>
                  );
              })}
            </s.Container> */}
          
        </s.Container>
      )}
                {/* <s.Footer>
            <s.TextSubTitleFooter>
              Account: {blockchain.account}
            </s.TextSubTitleFooter>
            <s.TextSubTitleFooter>
              Total Truffle in game: {data.AllProjects.length}
              </s.TextSubTitleFooter>
          </s.Footer> */}


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
                      <s.TextDescription>{item.id}</s.TextDescription>
                      <s.TextDescription>{item.recipient}</s.TextDescription>
                      <s.TextDescription>{item.projectName}</s.TextDescription>
                      <s.TextDescription>{item.description}</s.TextDescription>
                      <s.TextDescription>{item.amountNeeded}</s.TextDescription>
                      <s.TextDescription>{item.amountDonated}</s.TextDescription>
                      <s.TextDescription>{item.imageUrl}</s.TextDescription>
                      <s.TextDescription>{item.ongoing}</s.TextDescription>
                      <s.TextDescription>{item.projectAddress}</s.TextDescription>

                    </s.Container>
                  );
              })}
            </s.Container>
        
      </s.Container>
      </>
    );
}

export default Home;
