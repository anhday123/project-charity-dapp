import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import _Bg from "../../assets/images/bg/hand.jpg";
import _Bg1 from "../../assets/images/bg/blockchain1.png";
import contentProgramData from "./fake-data/contentProgram"
import ContentProgram from "./fake-data/contentProgram1"
import contentData from "./fake-data/contentUser"
import ContentUse from "./fake-data/contenUser1"
import Footer from "./fake-data/Footer"


const Home = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
    console.log(data);
    console.log(data.AllProjects);
  
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
     
          <s.Container flex={1} ai={"center"} jc={"center"} >

            <s.TextTitle wt={"60%"} style={{textAlign: "center", fontSize: "70px", color: "#ffffff"}}>
              Nền tảng quyên góp minh bạch
            </s.TextTitle>

              <s.TextTitle style={{textAlign: "center", fontSize: "24px"}}>
                Tổ chức từ thiện Blockchain đang mở ra sức mạnh của blockchain 
                để giúp xóa đói giảm nghèo, chống bất bình đẳng và đảm bảo sức 
                khỏe của con người và hành tinh của chúng ta.
                </s.TextTitle>
          </s.Container> 
        </s.Screen>
        <s.TextTitle wt={"100%"} style={{textAlign:"center", color:"#000", fontSize:"40px", marginTop:"80px"}}>
        All children have a right to survive, thrive and fulfill their potential – to the benefit of a better world.
            </s.TextTitle>
        <s.Screen style={{alignItems:"center"}}>
        <iframe width="1170" height="657px" src="https://www.youtube.com/embed/LjkayYf36bQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </s.Screen>
        <s.Screen image={_Bg1} >
        <s.Container flex={1} ai={"center"} jc={"center"} >

          <s.TextTitle wt={"70%"} style={{textAlign: "center", fontSize: "70px", color: "#ffffff"}}>
            Cách mạng hoá cho đi bằng tiền điện tử
          </s.TextTitle>

            <s.TextTitle style={{textAlign: "center", fontSize: "24px"}}>
            Chúng tôi hình dung một thế giới nơi blockchain giúp
             chấm dứt bất bình đẳng và thúc đẩy sự phát triển 
             bền vững. Chúng tôi đang mở khóa sự đổi mới và 
             hành động, để biến điều này từ tầm nhìn của chúng 
             tôi thành hiện thực.
              </s.TextTitle>
          </s.Container>
        </s.Screen>
        <s.Container ai={"center"}>
            <s.TextTitle 
                style={{
                    textAlign: "center", 
                    fontSize: "36px", 
                    color: "#7053ee"}}
            >
            Người sử dụng có thể?
            </s.TextTitle>      
        </s.Container>
        <s.ContainerContent>
        {
            contentData.map((item, index) => 
              <ContentUse
                key={index}
                namecontent={item.namecontent}
                sub={item.sub}
                btn={item.btn}
              />
                         
            )
        }
        </s.ContainerContent>
        <s.Container ai={"center"}>
            <s.TextTitle 
                style={{
                    textAlign: "center", 
                    fontSize: "36px", 
                    color: "#5c5ce9"}}
            >
            Một nền tảng khác biệt!
            </s.TextTitle>      
        </s.Container>
        <s.ContainerContent>
        {
          contentProgramData.map((item, index) =>   
            <ContentProgram
              key={index}
              name={item.name}
              sub={item.sub}
            />  
          )
        }
        </s.ContainerContent>
        
        <s.Screen mgtS={"80px"}>
          <Footer/>

        </s.Screen>        
     </>
    );
}

export default Home;
