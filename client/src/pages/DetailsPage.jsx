import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {format} from 'timeago.js'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import app from '../utils/filebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import { async } from '@firebase/util';
import {DispatchContext} from '../Context/ContextApi'
import 'react-toastify/dist/ReactToastify.css';
import {axiosInstance} from '../config'
// below is our styled components
const Container = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 60px );
    overflow: scroll;
    
   
`
const Wrapper = styled.div`
    max-width: 800px;
    min-height: 20rem;
    
    margin: 20px auto;
    padding: 10px;
    display: flex;
    gap: 2rem;
    
    @media(max-width: 600px){
        flex-direction: column-reverse;
    }

`
const RightContainer = styled.div`
    flex: 7;
    
    
`
const LeftContainer = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid gray;
    box-shadow: -1px 2px 12px 3px rgba(0,0,0,0.75);
-webkit-box-shadow: -1px 2px 12px 3px rgba(0,0,0,0.75);
-moz-box-shadow: -1px 2px 12px 3px rgba(0,0,0,0.75);
`
const Topdiv = styled.div`
    width: 100%;
    height: 200px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #7f5656;
    border-bottom: 2px solid black;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
   
`
const EditDiv = styled.div`
    position: absolute;
    padding: 5px;
    background-color: rgba(0,0,0,0.4);
    top: 5px;
    right: 5px;
    border-radius: 5px;
`
const ButtomDiv = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    cursor: default;
`
const Heading = styled.p`
    font-size: 20px;
`
const Span = styled.span`
    font-size: 20px;
    font-weight: bold;
`
const CreatedAt = styled.p`
    font-size: 16px;
    color: gray;
    text-align: end;
`
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const InputGroupWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
`
const InputGroup = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 5px;

`
const Input = styled.input`
    width: 100%;
    padding: 5px;
    color: #063806;
`
const Label = styled.label`
    
`
const TextArea = styled.textarea`
    width: 100%;
    height: 5rem;
    padding: 10px;
`
const Submit = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: green;
    color: white;
    font-weight: bold;
    border: 0px;
    cursor: pointer;
`
const AbsentForm = styled.div`

`
const Message = styled.h5`
    font-size: 24px;
    color: gray;
`
const RightInnerDiv = styled.div`
    padding: 10px;
    border: 1px solid gray;
`
const Deletediv = styled.div`

    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    color: white;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const DeleteHeading = styled.h4`
    font-size: 24px;
    color: white;
    font-weight: bold;
    text-align: center;
`
const DeleteSubDiv = styled.div`
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    
`
const AproveDel = styled.button`
    padding: 0.5rem;
    border-radius: 5px;
    border: 0ch;
    background-color: green;
    color: white;
    cursor: pointer;
    transition: all 0.5s ease-in-out;

    &:hover{
        transform: scale(1.1);
    }
    
`
const RejectDel = styled.button`
     padding: 0.5rem;
    border-radius: 5px;
    border: 0ch;
    background-color: red;
    color: white;
    cursor: pointer;
    transition: all 0.5s ease-in-out;

    &:hover{
        transform: scale(1.1);
    }
`


// below is our jsx
const DetailsPage = () => {
    const[right, setright] = useState(false)
    const[laptop, setlaptop] = useState([])
    const[laptopName, setlaptopName] = useState()
    const[laptopImg, setlaptopImg] = useState()
    const[category, setcategory] = useState()
    const[laptopPrice, setlaptopPrice] = useState()
    const[laptopRatting, setlaptopRatting] = useState()
    const[laptopDesc, setlaptopDesc] = useState()
    const[img, setimg] = useState()
    const[progress, setprogress] = useState()
    const[deleteDiv, setdeleteDiv] = useState(false)
    const navigate = useNavigate()
  
    const{userInfo} = DispatchContext()
    // making use of use params to get particular id from the url
    const{id} = useParams()

    // making use of useEffect to get the details of a particular laptop
    console.log(laptop)
    useEffect(()=>{
        
        const getEach = async()=>{
            try {
                const result = await axiosInstance.get(`/getspec/${id}`).then((res)=>setlaptop(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        getEach()

       
    },[right])


    // here is to show or close the edit platform at the right handside
    const setUpdateForm = ()=>{
        setright(!right)

        setlaptopName(laptop.laptopName)
        setlaptopPrice(laptop.laptopPrice)
        setlaptopDesc(laptop.laptopDesc)
        setcategory(laptop.category)
        setlaptopRatting(laptop.laptopRatting)
    }

    // here we upload pictures to the firebase

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

    // making use of this useEffect to trigger upload of file
    useEffect(()=>{
        img && uploadToFirebase()
    }, [img])


    // here we handle update of individual laptop posted
    const handleUpdate = async(e)=>{
        e.preventDefault()
        // creating the required header
        const config = {
            headers: {
                "Content-Type": "application/json",
                token: `Bearer ${userInfo.token}`
            }
        }
        // executing the put request
        try {
            const dBupdate = await axiosInstance.put(`/updatelaptop/${id}`, {
                laptopDesc,
                laptopImg,
                laptopName,
                laptopRatting,
                laptopPrice
            }, config)
           
        } catch (error) {
            console.log(error)
        }

        
        setright(false)
        window.location.reload(false)
    }

    // here we handle our delete button
    const handleDelete = async()=>{
        const config = {
            headers: {
                "Content-Type": "application/json",
                token: `Bearer ${userInfo.token}`
            }
        }
        try {
            const result = await axiosInstance.delete(`/deletelaptop/${id}`, config).then(res=>console.log(res.data))
            navigate('/getproduct')
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <Container>
        <Wrapper>
            <LeftContainer>
                <Topdiv>
                    <Image src={laptop.laptopImg}/>
                    <EditDiv>
                        <EditIcon onClick={setUpdateForm} style={{color: "white", cursor: "pointer"}}/>
                        <DeleteIcon onClick={()=>setdeleteDiv(true)} style={{color: "white", cursor: "pointer"}}/>
                    </EditDiv>
                </Topdiv>
                <ButtomDiv>
                    <Heading><Span>CATEGORY: </Span>{laptop.category}</Heading>
                    <Heading><Span>NAME: </Span>{laptop.laptopName}</Heading>
                    <Heading><Span>DESCRIPTION: </Span>{laptop.laptopDesc}</Heading>
                    <Heading><Span>PRICE: </Span> ${laptop.laptopPrice}</Heading>
                    <Heading><Span>RATTING: </Span>{laptop.laptopRatting}</Heading>
                    <CreatedAt> {format(laptop.createdAt)}</CreatedAt>
                </ButtomDiv>
            </LeftContainer>
            
            <RightContainer right={right}>
            <RightInnerDiv>
                {
                    right? (
                        <Form onSubmit={handleUpdate}>
                        <InputGroupWrapper>
                            <InputGroup >
                                <Label>laptop Name</Label>
                                <Input onChange={(e)=>setlaptopName(e.target.value)} value={laptopName} />
                            </InputGroup>
                            <InputGroup >
                                <Label>laptop Ratting</Label>
                                <Input value={laptopRatting} onChange={(e)=>setlaptopRatting(e.target.value)}/>
                            </InputGroup>
                        </InputGroupWrapper>
                        <InputGroupWrapper>
                            <InputGroup >
                                <Label>laptop Category</Label>
                                <Input value={category} onChange={(e)=>setcategory(e.target.value)}/>
                            </InputGroup>
                            <InputGroup >
                                <Label>laptop Price</Label>
                                <Input value={laptopPrice} onChange={(e)=>setlaptopPrice(e.target.value)}/>
                            </InputGroup>
                        </InputGroupWrapper>
                        <InputGroupWrapper>
                        {
                            progress > 0 ? (<div>loading: {progress}%</div>):
                            (
                                <InputGroup >
                                    <Label>laptop Picture</Label>
                                    <Input type='file' onChange={(e)=>setimg(e.target.files[0])}/>
                                </InputGroup>
                            )
                        }
                           
                        </InputGroupWrapper>
                        <InputGroupWrapper>
                        
                            <InputGroup >
                                <Label>laptop Desc</Label>
                                <TextArea value={laptopDesc} onChange={(e)=>setlaptopDesc(e.target.value)}/>
                            </InputGroup>
                        </InputGroupWrapper>
                        <Submit type='submit'/>
                    </Form>
                    ): (
                        <AbsentForm>
                            <Message>CLICK ON THE EDIT ICON TO EDIT YOUR POST, OR DELETE ICON TO DELETE YOUR POST</Message>
                        </AbsentForm>
                    )
                }
              </RightInnerDiv>  
            </RightContainer>
           
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
        {
            deleteDiv && (
                <Deletediv>
                    <DeleteHeading>Do you really want to delete the post!!!</DeleteHeading>
                    <DeleteSubDiv>
                        <AproveDel onClick={handleDelete}>YES</AproveDel>
                        <RejectDel onClick={()=>setdeleteDiv(false)}>NO</RejectDel>
                    </DeleteSubDiv>
                </Deletediv>
            )
        }
        
    </Container>
  )
}

export default DetailsPage