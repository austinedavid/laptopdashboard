import React from 'react'
import styled from 'styled-components'
import {DispatchContext} from '../Context/ContextApi'

// below is our styled component 
const Container = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
`
const Heading = styled.h4`
    font-size: 30px;
     cursor: default;
     color: gray;

     text-align: center;
`

// below is our jsx
const AboutUs = () => {
  const {userInfo} = DispatchContext()
  return (
    <Container>
        <Heading>
            hello, {userInfo.username} welcome to AustineGlobals
        </Heading>
    </Container>
  )
}

export default AboutUs