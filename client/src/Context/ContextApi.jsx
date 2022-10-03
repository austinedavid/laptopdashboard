import {useContext, createContext, useState, useEffect} from 'react'

// creating our context below
const ourContext = createContext({})

// creating our Exported function
const OurContextProvider = ({children})=>{
    const[userInfo, setuserInfo] = useState([])
    const[showMenu, setshowMenu] = useState(false)
    useEffect(()=>{
        if(userInfo.length === 0){
            const localGotten = localStorage.getItem("accessToken")
            const parsedData = JSON.parse(localGotten)
            setuserInfo(parsedData)
        }
        
    },[])
    console.log(userInfo)
    return(
        <ourContext.Provider value={{userInfo, setuserInfo, setshowMenu, showMenu}}>
            {children}
        </ourContext.Provider>
        )
}

export const DispatchContext = ()=>{
    return useContext(ourContext)
}

export default OurContextProvider