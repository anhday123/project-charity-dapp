import styled from "styled-components";
import { FaCheckSquare } from 'react-icons/fa'

// Used for wrapping a page component
export const Screen = styled.div `
  margin-top: ${({ mgtS }) => (mgtS ? mgtS : "0px")};
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};

  background-size: cover;
  /* background-position: center; */
  width: 100%;
  min-height: 120vh;
  display: flex;
  flex-direction: column;
  font-family: var( --font-family-Sora);
  padding-bottom: 200px;
`;

// Used for providing space between components
export const SpacerXSmall = styled.div `
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div `
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div `
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div `
  height: 32px;
  width: 32px;
`;

// Used for providing space between components
export const SpacerSuperLarge = styled.div `
  height: 52px;
  width: 52px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div `
  /* margin-top: 80px; */
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ bgc }) => (bgc ? bgc : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  /* border: 1px solid #ffffff; */
`;

export const TextTitle = styled.p `
  color: #ffffff;
  width: ${({ wt }) => (wt ? wt : "50%")};
  font-size: 20px;
  font-weight: 600;
  /* line-height: 0px; */
`;

export const TextSubTitle = styled.p `
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  width: 44%;
  line-height: 0;
`;

export const TextDescription = styled.p `
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 0.8px;
  font-weight: 600;
  height: 5px;
`;

export const StyledButton = styled.button `
  display: block;
  height: 70px;
  width: 180px;
  border-radius: 10px;
  border: 2px solid #fff;
  background: none;
  color: #fff;
  cursor: pointer;
  font-family: var( --font-family-Sora);
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.5s ease-in-out;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: #fff;
    visibility: none;
    color: #010606;
  }
`;

export const StyledButtonTransfer = styled.button `
  display: block;
  height: 40px;
  width: auto;
  border-radius: 0.4rem;
  border: 1px solid #fff;
  background: none;
  color: #fff;
  cursor: pointer;
  font-family: var( --font-family-Sora);
  font-size: 12px;
  letter-spacing: 2px;
  transition: all 0.5s ease-in-out;
  font-weight: 600;
  padding: 0 20px;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: #fff;
    visibility: none;
    color: #010606;
  }
`;

export const TextSubTitleFooter = styled.p `
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  margin: 0px 20px;
`;

//navbarhelpers
export const MenuTabs = styled.div `
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

export const Tabs = styled.a `
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 19rem 0 1.2rem;
  height: 100%;
  cursor: pointer;
  transition: 0.5s;
  font-size: 16px;
  font-weight: 600;
  transition: 0.5s ease-in-out;

  &.active-tab {
    background: #333;
    border-radius: 0.7rem 0.7rem 0 0;
  }

`;

export const Footer = styled.div `
  overflow: hidden;
  display: flex;
  /* display: none; */
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30px;
  background: #2B2B2B;
  color: #ffffff;
  padding: 5px 0px;
`;
//ITEM
export const ContainerI = styled.div `
    margin: 0;
    padding: 0;
`
export const ContainerItemBoder = styled.div `
    max-width: 1060px;
    margin: 0px auto;
    padding: 0px 0px 40px;
    display: flex;
    flex-flow: row wrap;
    animation: 0.3s linear 0s 1 normal none running animation-1t3yl1m;
`
export const ContainerItem = styled.div `
    width: 510px;
    margin: 10px;
    position: relative;
    background: rgb(255, 255, 255);
    box-shadow: 0 1px 6px rgba(0, 0, 0, .1), 0 2px 24px rgba(0, 0, 0, .05);
    border: 0;
    border-radius: 4px;
    overflow: hidden;
    transform: translate3d(0px, 0px, 0px);
    transition: all 0.3s ease 0s;`

export const ContainerItemTitle = styled.div `
    width: 100%;
    height: 240px;
    position: relative;
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    `
export const ItemImg = styled.img `
    width: 100%;
    height: 100%;
    object-fit: cover;`
export const ItemTitle = styled.div `
    width: 100%;
    padding: 16px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);`

export const ItemH3 = styled.h3 `
    margin: 0px 0px 4px;
    font-size: 18px;
    line-height: 24px;
    color: rgb(255, 255, 255);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;`
export const ItemP = styled.p `
    height: 20px;
    font-size: 16px;
    line-height: 16px;
    color: rgb(0, 0, 0);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;`
export const ItemBodyContainer = styled.div `
  margin: 16px 16px 16px;`
export const ItemBody = styled.div `
  margin: 0px 0px 4px;  `
export const ItemBodyMoney1 = styled.span `
    margin: 0px 6px 0px 0px;
    font-size: 18px;
    line-height: 21px;
    font-weight: 500;
    color: rgb(0, 0, 0);`
export const ItemBodyMoney2 = styled.span `
    font-size: 12px;
    line-height: 16px;
    color: rgb(94, 102, 115);`
export const ItemFooterContainer = styled.div `
    position: relative;
    margin: 0px 24px 16px;`
export const ItemFooter = styled.div `
    margin-right: 18px;`
export const ItemFooterDonateText = styled.div `
    font-size: 14px;
    line-height: 24px;
    color: rgb(94, 102, 115);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;`
export const ItemFooterDonate = styled.div `
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    color: rgb(30, 32, 38);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;`
export const ItemBtn = styled.button `    
    width: 124px;
    height: 40px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    position: absolute;
    right: 0px;
    bottom: 10px;
    font-size: 16px;
    font-weight: 400;
    color: rgb(30, 35, 41);
    background: rgb(252, 213, 53);
    border-radius: 4px;
    outline: none;
    border: none;
    cursor: pointer;`


//ContenHome
export const ContainerContent = styled.div`
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 100%;
    margin-top: 24px;
    padding: 24px 120px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
`

export const ContentHd = styled.div `
box-shadow:0px 8px 20px rgba(0,0,0,0.06);
border:0;

    @media screen and (max-width: 768px){
       width: 100%;
       margin-top: 28px;
    }

`
export const ContentBg = styled.div `

    height: 400px;
    background-color: ${({bg}) => bg || '#FFEDDA'};
    padding: 16px;

 
`

export const ContentLogo = styled.div `
    font-size: 50px;
    margin-left: auto;
    margin-right: auto;
    display: inline-block;
    width: 100px;
    height: 100px;
    color: #fff;
    border-radius: 50%;
    background-color: ${({bg}) => bg || 'rgb(236, 70, 70)'};
    margin-top: -56px;

`

export const Icon = styled(FaCheckSquare)` 
  margin-top: 24px;
`
export const ContentH1 = styled.h1 `
        margin-top: 40px;
        font-size: 24px;
        letter-spacing: 3px;
`

export const ContentP = styled.p `
        margin-top: 28px;
        font-size: 20px;
        letter-spacing: 2px;
        height: 200px;
`
export const ContentHd2 = styled.div `
    box-shadow:0px 8px 20px rgba(0,0,0,0.06);
    border:0;
    text-align: left;


    @media screen and (max-width: 768px){
       width: 100%;
       margin-top: 26px;
    }

`
export const ContentBg2 = styled.div `

    height: 320px;
    background-color: ${({bg}) => bg || '#FFEDDA'};
    padding: 16px;
    color: #28a0e6;
 
`

export const Icon2= styled(FaCheckSquare)` 
    font-size: 120px;
    background-color: ${({bg}) => bg || '#FFEDDA'};
`
export const ContentH12 = styled.h1 `
        margin-top: 16px;
        font-size: 24px;
        letter-spacing: 3px;
`

export const ContentP2 = styled.p `
        margin-top: 28px;
        font-size: 20px;
        letter-spacing: 2px;
`
