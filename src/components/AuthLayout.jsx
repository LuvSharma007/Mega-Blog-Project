import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Protected = ({children,authentication = true}) => {

    const navigate = useNavigate()
    const [loading , setLoading] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{    

      if(authStatus === null) return;

      if(authentication && !authStatus){   // means user is not login
        navigate("/login");
      }else if(!authentication && authStatus){  // 
        navigate("/");
      }else{
        setLoading(false)
      }
    },[authStatus,navigate,authentication])

    if(authStatus === null || loading){
      return <h1>Loading...</h1>
    }

  return (
  <>{children}</>
  )
}

export default Protected