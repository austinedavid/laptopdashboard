import React, {useState,useEffect} from 'react'
import {format} from 'timeago.js'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { async } from '@firebase/util'

// below is our styled component
const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  padding: 20px;
  overflow-y: auto;
  background-color: #a6a6a6;
`

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  cursor: pointer;

  @media(max-width: 1104px){
    grid-template-columns: repeat(3, 1fr);
  }

  @media(max-width: 750px){
    grid-template-columns: repeat(2, 1fr);
  }

  @media(max-width: 500px){
    grid-template-columns: 1fr;
  }
  
`
const EachProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
  border: 1px solid black;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition: all 1s ease-in-out;

  &:hover .blurdiv{
    display: block;
    transition: all 1s ease-in-out;
  }
`
const ImgContainer = styled.div`
  width: 100%;
  height: 200px;
`
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
const Hr = styled.hr`
  
`
const DetailCon = styled.div`
  width: 100%;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const Name = styled.h5`
  font-size: 20px;
  font-weight: bold;
`
const Desc = styled.h5`
  font-size: 17px;
  color: gray;
`
const Price = styled.p`
  color: blue;
  font-size: 20px;
`
const CreatedAt = styled.p`
  font-size: 12px;
  color: gray;
  text-align: end;
`
const TopBlur = styled.div`
 
  
`
const TopBlurWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ViewDetails = styled.button`
  background-color: green;
  cursor: pointer;
  padding: 10px;
  border: 0px;
  border-radius: 10px;
  color: white;
  align-content: center;
`
// below is our jsx

const GetProduct = () => {
  const[laptops, setlaptops] = useState([])

  // useEffect to fetch our data from server
  useEffect(()=>{
    const FetchLaptops = async()=>{
      try {
        const result = await axios.get('/getlaptopall',).then((res)=>setlaptops(res.data))
      } catch (error) {
        
      }
    }
    FetchLaptops()
  },[])
  return (
    <Container>
      <Wrapper>
        {
          laptops.map((laptop)=>(
            <div>
            <EachProduct key={laptop._id}>
              <ImgContainer>
                <Img src={laptop.laptopImg}/>
              </ImgContainer>
                <Hr/>
                <DetailCon>
                  <Name>{laptop.laptopName}</Name>
                  <Desc>{laptop.laptopDesc}</Desc>
                  <Price>${laptop.laptopPrice}</Price>
                  <CreatedAt>{format(laptop.createdAt)}</CreatedAt>
                </DetailCon>
              <div className='blurdiv'>
                <TopBlurWrapper>
                <Link to={`/detailspage/${laptop._id}`} style={{textDecoration: "none", color: "inherit"}}>
                <ViewDetails>
                  EDIT OR DELETE
                </ViewDetails>
                </Link>
                </TopBlurWrapper>
              </div>
            </EachProduct>
            </div>
          ))
        }
      </Wrapper>
    </Container>
  )
}

export default GetProduct