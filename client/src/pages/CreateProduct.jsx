import React,{useRef, useEffect, useState} from 'react'
import styled from 'styled-components'
import app from '../utils/filebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {DispatchContext} from '../Context/ContextApi'


// below is our styled
const Container = styled.div`
 width: 100%;
 height: calc(100vh - 60px);
 background-color: #a6a6a6;
 overflow-y: auto;
 display: flex;
 flex-direction: column;
 align-items: center;
 padding-top: 2rem;
 gap: 1rem;
`
const Wrapper = styled.div`
  width: 400px;
  
  padding: 30px 10px;
  background-color: white;
  border-radius: 10px;

  @media(max-width: 500px){
    width: 90%;
  }
`
const Heading = styled.h5`
  font-size: 30px;
  cursor: default;
  color: white;

  @media(max-width: 500px){
    font-size: 20px;
  }
`
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const Label = styled.label`
  
`
const Input = styled.input`
  width: 100%;
  padding: 10px;
`
const InputWrapper = styled.div`
  display: flex; 
  flex-direction: column;
  gap: 5px;
`
const Span = styled.span`
  color: red;
`
const SubmitInput = styled.input`
  padding: 10px;
  background-color: #c6ffb3;
  font-weight: bold;
  border: 0px;
  cursor: pointer;
  
`
const Desc = styled.textarea`
  height: 4rem;
  padding: 10px;
`

// below is our jsx
const CreateProduct = () => {
  const inputRef = useRef()
  const{userInfo} = DispatchContext()
  // creating our use state for the inputs
  const[laptopName, setlaptopName] = useState()
  const[laptopImg, setlaptopImg] = useState()
  const[category, setcategory] = useState()
  const[laptopPrice, setlaptopPrice] = useState()
  const[laptopRatting, setlaptopRatting] = useState()
  const[laptopDesc, setlaptopDesc] = useState()
  const[img, setimg] = useState()
  const[progress, setprogress] = useState()

  useEffect(()=>{
   inputRef.current.focus()
  },[])
  // here we handle the function that will upload our picture to firebase
  const uploadToFirebase = ()=>{
    const storage = getStorage(app);
    const imgName = new Date().getTime() + img.name
    const storageRef = ref(storage, imgName);
    
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setprogress(Math.floor(progress))
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setlaptopImg(downloadURL)
      console.log(downloadURL)
    });
  }
);
  }

  // this use effect is to handle anychange and upload our picture to firebase
  useEffect(()=>{
    img && uploadToFirebase()
  },[img])
console.log(userInfo.token)


  // here we upload everything to our database
  const handleUpload = async(e)=>{
    const config = {
      headers:{
        "Content-Type": "application/json",
        token: `Bearer ${userInfo.token}`
      }
    }
    e.preventDefault()
    try {
      const dbUpload = await axios.post('/postlaptop', {
        laptopDesc, laptopImg, laptopName, laptopPrice, laptopRatting, category
      }, config).then((result)=>toast.success("upload successfully added to database"))
      setcategory('')
      setlaptopDesc('')
      setlaptopName('')
      setlaptopPrice('')
      setprogress('')
      setcategory('')
      setlaptopRatting('')
    } catch (error) {
      
    }

  }

  return (
    <Container>
      <Heading>UPLOAD LAPTOPS HERE</Heading>
      <Wrapper>
      
        <Form onSubmit={handleUpload}>
          <InputWrapper>
          <Label>laptop name<Span>*</Span></Label>
          <Input value={laptopName} ref={inputRef} type='text' onChange={(e)=>setlaptopName(e.target.value)}/>
          </InputWrapper>
          <InputWrapper>
          <Label>laptop desc<Span>*</Span></Label>
          <Desc value={laptopDesc} onChange={(e)=>setlaptopDesc(e.target.value)}/>
          </InputWrapper>
          <InputWrapper>
          <Label>laptop category<Span>*</Span></Label>
          <Input value={category} onChange={(e)=>setcategory(e.target.value)}/>
          </InputWrapper>
          <InputWrapper>
          <Label>laptop price<Span>*</Span></Label>
          <Input value={laptopPrice} onChange={(e)=>setlaptopPrice(e.target.value)}/>
          </InputWrapper>
          <InputWrapper>
          <Label>laptop ratting<Span>*</Span> ranging 1-5</Label>
          <Input value={laptopRatting} type='number' onChange={(e)=>setlaptopRatting(e.target.value)}/>
          </InputWrapper>
          
          {
            progress > 0 ?(<div>loading: {progress}%</div>):
            (
              <InputWrapper>
                 <Label>laptop image<Span>*</Span></Label>
                <Input type='file' accept='image/*' onChange={(e)=>setimg(e.target.files[0])}/>
              </InputWrapper>
            )
          }
         
          <SubmitInput type='submit'/>
        </Form>
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

export default CreateProduct