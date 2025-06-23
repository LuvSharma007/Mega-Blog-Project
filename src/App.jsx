import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login , logout} from "./store/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { Outlet } from 'react-router-dom';

const App = () => {

  const [loading , setLoading] = useState(true);
  
  const dispatch = useDispatch();


  useEffect(()=>{
    authService.isLogin()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())   // to update state again
      }
    }).catch((err)=>{
      console.log(`Error while getting login user ${err}`);      
    })
    .finally(()=>setLoading(false))
  },[])
   
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
          <Header />
          <main>
            <Outlet/>
          </main>
          <Footer />
      </div>
    </div>
  ) : <div>
    <h1>User is Logout</h1>
  </div>

}

export default App