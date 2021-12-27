import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';
import { useDispatch, useSelector } from "react-redux";
import { connect } from '../../redux/blockchain/blockchainActions';
import { useEffect } from "react";
import { fetchData } from "../../redux/data/dataActions"
import logo from "../../assets/images/bg/logo.png"

const Navbar = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const dispatch = useDispatch();
  const account = blockchain.account;

    useEffect(() => {
      if (account !== "" && account !== null) {
        dispatch(fetchData(account));
      }
    }, [account, dispatch]);
  
    console.log(account);
    
    const links = account != null 
      ? (
      <>
        <NavLink to="/" exact activeStyle>Trang chủ</NavLink>
        <NavLink to="/allprojects" activeStyle>Chương trình</NavLink>
        {/* <NavLink to="/ambassadors" activeStyle>Đại sứ</NavLink> */}
        <NavLink to="/about" activeStyle>Về chúng tôi</NavLink>
      </>
    ) : null

  return (
    <>
    <Nav>
      
      <NavLink to='/' >
        {/* <h1>Chairity-Dapp</h1> */}
        <img src={logo} style={{width:'100px', marginLeft:'20px', opacity:'100%'}}></img>
      </NavLink>
      
      <Bars />
      
      <NavMenu>
        {links}
      </NavMenu>
        {blockchain.account !== null ? (
          <NavBtn>
          <NavBtnLink to='/formcreate' activeStyle>
            Tạo chương trình
          </NavBtnLink>
          <NavBtnLink to='/myproject' activeStyle >
            {account.substring(0, 6)}....
            {account.substring(account.length - 6)}
            
          </NavBtnLink>
          
        </NavBtn>
        ) : (
          
        // <NavBtn>
            
        //   <NavBtnLink to='/'  
        //     onClick={(e) => {
        //       e.preventDefault();
        //       dispatch(connect());
        //     }}>
        //     Tham gia
        //   </NavBtnLink>
        //   <NavBtn>
          
        //   <NavBtnLink to='/formcreate' >
        //     Tạo chương trình
        //   </NavBtnLink>
          
        // </NavBtn>
          
        // </NavBtn>
        null)}
    </Nav>
  </>
  );
}

export default Navbar
