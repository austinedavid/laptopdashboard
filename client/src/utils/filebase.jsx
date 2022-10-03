
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkMgYlJ1TWY_dItdJNR7N6SdHh_uJiDTw",
  authDomain: "laptop-67c59.firebaseapp.com",
  projectId: "laptop-67c59",
  storageBucket: "laptop-67c59.appspot.com",
  messagingSenderId: "458674858148",
  appId: "1:458674858148:web:f2fcf9acdcbb34e470de31"
};


const app = initializeApp(firebaseConfig);
export const  auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export default app