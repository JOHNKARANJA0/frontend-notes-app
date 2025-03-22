import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { Refresh_Token, Access_Token } from "../constants"
import api from "../apis"
import { useState, useEffect } from "react"


export default function ProtectedRoute({ children }) {
  const [isAuthorised, setisAuthorised] = useState(null)

  useEffect(() => {
    auth().catch(()=> setisAuthorised(false))
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(Refresh_Token);
    try{
        const res = await api.post("/api/token/refresh/", {refresh: refreshToken});
        if (res.status ===200){
          localStorage.setItem(Access_Token, res.date.access)
          setisAuthorised(true)
        }
        else{
          setisAuthorised(false)
        }
    }catch (error) {
        console.log(error)
        setisAuthorised(false)
    }
  }
  const auth = async () => {
    const token = localStorage.getItem(Access_Token)
    if(!token){
        setisAuthorised(false)
        return
    }
    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp
    const now = Date.now()/1000
    if(tokenExpiration < now){
        await refreshToken()
    }
    else{
        setisAuthorised(true)
    }
  }

  if (isAuthorised === null) {
    return <div>Loading...</div>
  }

  return isAuthorised? children : <Navigate to='/login'/>
}
