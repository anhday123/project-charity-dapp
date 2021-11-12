import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div `
  margin-top: 80px;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};

  background-size: cover;
  /* background-position: center; */
  width: 100%;
  min-height: 100vh;
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
  background-image: ${({ image }) => (image ? `
url($ { image })
` : "none")};
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  /* border: 1px solid #ffffff; */
`;

export const InputTransfer = styled.input.attrs({ type: "text" })
`
  display: inline-block;
  width: 35%;
  height: 40px;
  border: 1px solid #ffffff;
  background: #333;
  outline: none;
  box-sizing: border-box;
  border-radius: 0.4rem;
  padding: 0 10px;
  font-size: 15px;
  color: #fff;
  transition: 0.3s;

  &:focus {
    border-color: #00aec9;
    box-shadow: 0 0 0 0.2rem rgba(19, 162, 228, 0.25);
  }
`;

export const ContainerDetails = styled.div `
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 350px;
  padding: 0.8rem 2rem;
  box-sizing: border-box;
  border-radius: 0.8rem;
  margin-left: 4rem;
  border: 1px solid #ffffff;
  /* box-shadow: -15px -15px 15px rgba(255, 255, 255, 0.2),
    15px  15px 15px rgba(0, 0, 0, 0.1),
    inset -5px -5px 5px rgba(255, 255, 255, 0.2),
    inset 5px 5px 5px rgba(0, 0, 0, 0.1)
  ; */
`;

export const Box = styled.div `
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 0.8rem;
`;

export const StyledImg = styled.div `
  width: 200px;
  height: 200px;
  border: 1px solid #ffffff;
  border-radius: 0.8rem;
  cursor: pointer;
`;

export const StyledImgDetails = styled.div `
  width: 350px;
  height: 350px;
  border-radius: 0.8rem;
  box-shadow: 0 0 2em 10px #fff;
  cursor: pointer;
`;

export const StyledTextBox = styled.div `
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTextBoxName = styled.div `
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledTextBoxNameDetails = styled.div `
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  margin-bottom: 60px;
`;

export const TextTitle = styled.p `
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  line-height: 0px;
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

export const TextDescriptionDetail = styled.p `
  color: #ffffff;
  font-size: 30px;
  letter-spacing: 0.8px;
  font-weight: 600;
  height: 5px;
`;

export const StyledClickable = styled.div `
  :active {
    opacity: 0.6;
  }
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

  /* &:disabled {
    opacity: 0.2;
    pointer-events: none;
  } */
`;

export const StyledButtonAction = styled.button `
  display: block;
  height: 40px;
  width: 100%;
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
  padding: 0 50px;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: #fff;
    visibility: none;
    color: #010606;
  }
`;

export const StyledButtonLoadingAction = styled.div `
  display: inline-block;
  align-items: center;
  width: 20px;
  height: 20px;
  background: transparent;
  border: 4px dotted #3498db;
  border-radius: 50%;
  border-top-color: transparent;
  animation: button-loading-spinner 1.2s linear infinite;

  @keyframes button-loading-spinner {
    to {
      transform: rotate(360deg);
    }
  }
`

export const StyledButtonLoading = styled.div `
  display: inline-block;
  align-items: center;
  width: 30px;
  height: 30px;
  background: transparent;
  border: 4px dotted #3498db;
  border-radius: 50%;
  border-top-color: transparent;
  animation: button-loading-spinner 1.2s linear infinite;

  @keyframes button-loading-spinner {
    to {
      transform: rotate(360deg);
    }
  }
`
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
    // max-width: 1060px;
    // padding: 0px 0px 40px;
    margin: 0;
    padding: 0;
    // display: grid;
    // grid-template-columns: repeat(2, 1fr); 
`
export const ContainerItemBoder = styled.div `
    max-width: 1060px;
    // width: 510px;
    margin: 0px auto;
    padding: 0px 0px 40px;
    display: flex;
    // display: grid;
    // grid-template-columns: repeat(2, 1fr);
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
    // box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;
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

//FORM
export const FormContainer = styled.button ``
export const FormTitle = styled.button ``
export const Form = styled.button ``
export const FormDiv = styled.button ``
export const FormInput = styled.button ``
export const FormLable = styled.button ``
export const FormButton = styled.button ``