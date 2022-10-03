import React from 'react'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu';
import {DispatchContext} from '../Context/ContextApi'
import CloseIcon from '@mui/icons-material/Close';

// our styled components
const Container = styled.div`
    width: 100%;
    height: 60px;
    background-color:  #4d4d4d;
    position: sticky;
    top: 0;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
`
const Logo = styled.h5`
    color: white;
    font-weight:bold;
    font-size: 25px;

    @media(max-width: 600px){
        font-size: 16px;
    }
`
const MenuContainer = styled.div`
    display: none;

    @media(max-width: 1010px){
        display: block;
    }
`
// our jsx
const Navbar = () => {
    const {setshowMenu, showMenu} = DispatchContext()

  return (
    <Container>
        <Wrapper>
            <Logo>AustineGlobal</Logo>
            <MenuContainer>
                {
                    showMenu? (<CloseIcon onClick={()=>setshowMenu(false)} style={{color: "white", cursor: "pointer", fontSize: "2rem"}}/>):(
                        <MenuIcon onClick={()=>setshowMenu(true)} style={{color: "white", cursor: "pointer", fontSize: "2rem"}}/>
                    )
                }
                

            </MenuContainer>
        </Wrapper>
    </Container>
  )
}

export default Navbar