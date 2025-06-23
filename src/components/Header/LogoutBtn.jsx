import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/config"
import logout  from "../../appwrite/auth.js"

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logOutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())              // to update the state
        })
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg=blue-100 rounded-full'
    onClick={logOutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutBtn