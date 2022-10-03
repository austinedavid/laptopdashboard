import React, {useState, useEffect} from 'react'
import Users from '../components/Users'

import styled from 'styled-components'
import axios from 'axios'

// our styled component
const Input = styled.input`
  padding: 5px;

  border: 0px;

  &:focus{
    outline: none;
  }
`
const Container = styled.div`
   width: 100%;
   height: calc(100vh - 60px);
    padding: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
   
`
const InputWrapper = styled.div`
  width: 250px;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px  black;
`
// our jsx
const FindUser = () => {
  const[query, setquery] = useState('')
  const[Userfile, setUserfile] = useState([])

  // useEffect to fetch all users
  useEffect(()=>{
    const getUsers = async()=>{
      try {
        const result = await axios.get('/getusers').then(res=>setUserfile(res.data))
      } catch (error) {
        console.log(error)
      }
      
    }
    getUsers()
  },[])

const filterUser = (data)=>{
  
    return data.filter((value)=>value.username.includes(query))
  
 
}

  return (
    <Container>
      <InputWrapper>
      <Input placeholder='search for users' onChange={(e)=>setquery(e.target.value)}/>
      </InputWrapper>
      <Users User={filterUser(Userfile)}/>
    </Container>
  )
}

export default FindUser