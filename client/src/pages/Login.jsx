
import React,{useState} from 'react'
import styled from 'styled-components'
import google from '../images/google.webp'
import {Link, useNavigate} from 'react-router-dom'
import {DispatchContext} from '../Context/ContextApi'
import {auth, provider} from '../utils/filebase'
import {signInWithPopup} from 'firebase/auth'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    min-height: 200px;
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
const Login = () => {
    const{setuserInfo} = DispatchContext()
    const[email, setemail] = useState()
    const[password, setpassword] = useState()
    const navigate = useNavigate()

    // below here we login with normal form
    const handleLogin = async(e)=>{
        e.preventDefault()
        try {
            const loginResult = await axios.post('/signin', {email, password}).then((res)=>{
                setuserInfo(res.data)
                localStorage.setItem("accessToken", JSON.stringify(res.data))
                navigate('/')
            })
        } catch (error) {
            toast.error(error.response.data)
        }
    }

    // here we handle login with google
    const googleSubmit = async(e)=>{
        e.preventDefault()
        signInWithPopup(auth, provider).then((result)=>{
           
                axios.post('/withemail', {
                    username: result.user.displayName,
                    email: result.user.email
                }).then((res)=>{
                    setuserInfo(res.data)
                    localStorage.setItem("accessToken", JSON.stringify(res.data))
                    navigate('/')
                })
           
        })
    }
  return (
    <Container>
        <Heading>Login</Heading>
        <Wrapper>
            <Form onSubmit={handleLogin}>
               
                <FormGroup>
                    <Label>Email<Span>*</Span></Label>
                    <Input type='email' onChange={(e)=>setemail(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password<Span>*</Span></Label>
                    <Input type='password' onChange={(e)=>setpassword(e.target.value)}/>
                </FormGroup>
               
                <SubmitBtn type='submit'/>
            </Form>
            <Hr/>
            <GoogleBtn onClick={googleSubmit}>
                <Image src={google}/>
                <GoogleText>signin with google</GoogleText>
            </GoogleBtn>
            <Hr/>
                <ToLogin>
                    I don't have an account <Link to='/' >register</Link>
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

export default Login