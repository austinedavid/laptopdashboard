import React from 'react'
import styled from 'styled-components'
import coverPix from '../images/coverpix.webp'
import dp from '../images/passport.webp'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// below we write our styled components
const Container = styled.div`
    width: 100%;
    height: 200px;
    background-color: white;
    position: relative;
    padding-bottom: 20px;
    margin-bottom: 20px;
`
const ProfileWrapper = styled.div`
    width: 100px;
    height: 100px;
    
    border-radius: 50%;
    position: absolute;
    top: 100px;
    left: 85px;
    
    
`
const CoverWrapper = styled.div`
    
`
const CoverImg = styled.img`
    width: 100%;
    height: 150px;
`
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
`
const Camerabackdrop = styled.div`
    background-color: rgba(0,0,0,0.7);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
`
const ProfileContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`
const CamerabackdropPix = styled.div`
     background-color: rgba(0,0,0,0.7);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    right: -1px;
    top: 50px;
    cursor: pointer;
`
// below we write our jsx
const Profilepix = () => {
  return (
    <Container>
        <CoverWrapper>
            <CoverImg src={coverPix}/>
            <Camerabackdrop>
                <CameraAltIcon style={{color: "white"}}/>
            </Camerabackdrop>
        </CoverWrapper>
        <ProfileWrapper>
            <ProfileContainer>
                <ProfileImg src={dp}/>
                <CamerabackdropPix>
                    <CameraAltIcon style={{color: "white", fontSize: "1rem"}}/>
                </CamerabackdropPix>
            </ProfileContainer>
        </ProfileWrapper>
    </Container>
  )
}

export default Profilepix