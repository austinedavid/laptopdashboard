import React from 'react'
import styled from 'styled-components'
import Profilepix from '../components/Profilepix'
import { NavLink, useNavigate } from 'react-router-dom'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import Shop2Icon from '@mui/icons-material/Shop2';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import InfoIcon from '@mui/icons-material/Info';
import {DispatchContext} from '../Context/ContextApi'


// below is the styled component
const Container = styled.div`
    position: relative;
`
const Text = styled.p`
    font-size: 17px;

`
const Wrapper = styled.div`
    
`
const Ul = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
`
const Li = styled.li`
    color: black;
    font-weight: bold;
    font-size: 24px;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.2s ease-in;
    border-bottom: 1px solid black;

 
    &:hover{
        background-color: #4d4d4d;
        color: white;
    }
`

const Lidiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
`
// below is the jsx
const Menu = () => {
    const navigate = useNavigate()
    const{setshowMenu} = DispatchContext()

    const handleLogout = ()=>{
        localStorage.removeItem("accessToken")
        navigate('/')
        window.location.reload(false)
        

    }
  return (
   <Container>
        <Profilepix/>
        < Wrapper>
            <Ul>
                <Li onClick={()=>setshowMenu(false)}>
                    <NavLink to='/'  style={{textDecoration: "none", color: "inherit"}} >
                    <Lidiv>
                    <InfoIcon/><Text>ABOUT US</Text>
                    </Lidiv>
                    </NavLink>
                </Li>
                <Li onClick={()=>setshowMenu(false)}>
                    <NavLink to='/createproduct' style={{textDecoration: "none", color: "inherit"}}>
                    <Lidiv>
                    <CreateNewFolderIcon/><Text>CREATE PRODUCT</Text>
                    </Lidiv>
                    </NavLink>
                </Li>
                <Li onClick={()=>setshowMenu(false)}>
                    <NavLink to='/getproduct' style={{textDecoration: "none", color: "inherit"}}>
                    <Lidiv>
                    <CompareArrowsIcon/><Text>GET PRODUCTS</Text>
                    </Lidiv>
                    </NavLink>
                </Li>
                <Li onClick={()=>setshowMenu(false)}>
                    <NavLink to='/finduser' style={{textDecoration: "none", color: "inherit"}}>
                    <Lidiv>
                    <PeopleAltIcon/><Text>FIND USERS</Text>
                    </Lidiv>
                    </NavLink>
                </Li>
                <Li onClick={()=>setshowMenu(false)}>
                    <NavLink to='/successfulbuy' style={{textDecoration: "none", color: "inherit"}}>
                    <Lidiv>
                    <Shop2Icon/><Text>SUCCESSFUL BUYS</Text>
                    </Lidiv>
                    </NavLink>
                </Li>
                <Li onClick={()=>setshowMenu(false)}>
                    <NavLink to='/pendingbuy' style={{textDecoration: "none", color: "inherit"}}>
                    <Lidiv>
                    <PendingActionsIcon/><Text>PENDING BUYS</Text>
                    </Lidiv>
                    </NavLink>
                </Li>
                <Li>
                    
                    <Lidiv onClick={handleLogout}>
                    <LogoutIcon/><Text>LOGOUT</Text>
                    </Lidiv>
                   
                </Li>
                
            </Ul>
        </Wrapper>
       
   </Container>
  )
}

export default Menu