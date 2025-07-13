import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/auth';
import {login , logout} from "./store/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { Outlet } from 'react-router-dom';

const App = () => {

  const [loading , setLoading] = useState(true);
  
  const dispatch = useDispatch();


  useEffect(() => {
  const getCurrentUser = async () => {
    try {
      const currentUser = await authService.isLogin();
      if (currentUser) {
        dispatch(login(currentUser));
        // console.log('App render - user found :', currentUser);
      } else {
        dispatch(logout());
        console.log('App render - no user found');
      }
    } catch (err) {
      console.log(`Error while getting login user: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  getCurrentUser();
  
      // authService.isLogin()
      // .then((userData)=>{
      //   if(userData){
      //     dispatch(login(userData))
      //   console.log('App render - auth status:', authStatus)
  
      //   }else{
      //     dispatch(logout())   // to update state again
      //   }
      //   console.log('App render - auth status:', authStatus)
      // }).catch((err)=>{
      //   console.log(`Error while getting login user ${err}`);      
      // })
      // .finally(()=>setLoading(false))

}, [dispatch]);

    





   
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
  ) : null

}

export default App