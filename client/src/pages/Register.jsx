
import React,{useState} from 'react'
import styled from 'styled-components'
import google from '../images/google.webp'
import {Link, useNavigate} from 'react-router-dom'
import {signInWithPopup,} from "firebase/auth";
import {auth,provider} from '../utils/filebase'
import axios from 'axios'
import {DispatchContext} from '../Context/ContextApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {axiosInstance} from '../config'


// below is our styled components
const Container = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 300px;
    min-height: 300px;
    padding: 10px;
    background-color: #c6ead6;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`
const Heading = styled.h5`
    font-size: 23px;
    font-weight: bold;
`
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const FormGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
`
const Label = styled.label`
    font-size: 14px;
`
const Input = styled.input`
    padding: 5px;
    border-radius: 5px;
`
const SubmitBtn = styled.input`
    padding: 5px;
    color: white;
    border: 0px;
    background-color: green;
    border-radius: 10px;
    cursor: pointer;
`
const GoogleBtn = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    background-color: white;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.4s ease-in-out;

    &:hover{
        background-color: #578b57;
        color: white;
    }
`
const Hr = styled.hr`
    
`
const Span = styled.span`
    font-size: 14px;
    color: red;
`
const GoogleText = styled.p`
    
`
const Image = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
`
const ToLogin = styled.p`
    
`
// below is our jsx
const Register = () => {
    // my states
    const[username, setusername] = useState()
    const[email, setemail] = useState()
    const[password, setpassword] = useState()
    const[confirmpassword, setconfirmpassword] = useState()
    const[errorMessage, seterrorMessage] = useState()
    const navigate = useNavigate()

    const {setuserInfo} = DispatchContext()
    
    // here we handle normal login 
    const normalLogin = async(e)=>{
            e.preventDefault()
            if(password !== confirmpassword){
                return toast.error("password and confirmpassword must match")
            }
            try {
                const regUser = await axiosInstance.post('/signup', {username, email, password})
                navigate('/login')
            } catch (error) {
                console.log(error)
            }
    }

    // here we handle our google login
    const googleSubmit = async(e)=>{
        e.preventDefault()
        signInWithPopup(auth, provider).then((result)=>{
           
                axiosInstance.post('/withemail', {
                    username: result.user.displayName,
                    email: result.user.email
                }).then((res)=>{
                    setuserInfo(res.data)
                    localStorage.setItem("accessToken", JSON.stringify(res.data))
                })
           
        })
    }

  return (
    <Container>
        <Heading>Register</Heading>
        <Wrapper>
            <Form onSubmit={normalLogin}>
                <FormGroup>
                    <Label>Username<Span>*</Span></Label>
                    <Input type='text' required onChange={(e)=>setusername(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Email<Span>*</Span></Label>
                    <Input type='email' required onChange={(e)=>setemail(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password<Span>*</Span></Label>
                    <Input type='password' required onChange={(e)=>setpassword(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Confirm-Password<Span>*</Span></Label>
                    <Input type='password' required onChange={(e)=>setconfirmpassword(e.target.value)}/>
                </FormGroup>
                <SubmitBtn type='submit'/>
            </Form>
            <Hr/>
            <GoogleBtn  onClick={googleSubmit}>
                <Image src={google}/>
                <GoogleText>signin with google</GoogleText>
            </GoogleBtn>
            <Hr/>
                <ToLogin>
                    already have an account <Link to='/login' >login</Link>
                </ToLogin>
        </Wrapper>
        <ToastContainer
        position="top-right"
        autoClose={10000}
        type="warning"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Container>
  )
}

export default Register