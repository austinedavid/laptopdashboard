import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import styled from 'styled-components'
import './App.css';
import Navbar from './components/Navbar';
import Menu from './pages/Menu';
import AboutUs from './pages/Welcome';
import CreateProduct from './pages/CreateProduct'
import FindUser from './pages/FindUser'
import GetProduct from './pages/GetProduct'
import PendingBuy from './pages/PendingBuy'
import SuccessfulBuy from './pages/SuccessfulBuy'
import DetailsPage from './pages/DetailsPage';
import Register from './pages/Register';
import Login from './pages/Login';
import OurContextProvider from './Context/ContextApi';
import {DispatchContext} from './Context/ContextApi'



// below is our styled components
const Container = styled.div`

`
const Rightside = styled.div`
   flex: 9.5;
`
const Leftside = styled.div`
  flex: 2.5;
  height: calc(100vh - 60px);
  position: sticky;
  top: 60px;
  background-color: #f2f2f2;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.5s ease-in-out;
 
 @media(max-width: 1010px){
  transform: translateX(${(prop)=>prop.showMenu? "0%": "-100%"});
  /* display: ${(prop)=> prop.showMenu? "block": "none"}; */
  position: absolute;
  top: 60px;
  z-index: 9999;
 }
`
const Wrapper = styled.div`
  width: 100%;
  
  display: flex;
`
const RegisterWrapper = styled.div`

`


// below is our jsx
function App() {
  const {userInfo, showMenu} = DispatchContext()
  console.log(userInfo)
  return (
    
      <Container>
        <Router>
        <Navbar/>
          {
            userInfo?(
              <Wrapper>
            <Leftside showMenu={showMenu}>
              <Menu/>
            </Leftside>
            <Rightside>
            <Routes>
              <Route path='/' element={<AboutUs/>}/>
              <Route path='createproduct' element={<CreateProduct/>}/>
              <Route path='getproduct'  element={<GetProduct/>}/>
              <Route path='finduser' element={<FindUser/>}/>
              <Route path='pendingbuy' element={<PendingBuy/>}/>
              <Route path='successfulbuy' element={<SuccessfulBuy/>}/>
              <Route path='detailspage/:id' element={<DetailsPage/>}/>
            </Routes>
            </Rightside>
          </Wrapper>
            ): (
              <RegisterWrapper>
                <Routes>
                  <Route path='/' element={<Register/>}/>
                  <Route path='login' element={<Login/>}/>
                </Routes>
              </RegisterWrapper>
            )
          }
          
          </Router>
      </Container>
     
   
  );
}

export default App;
