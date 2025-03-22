import { useState } from "react";
import api from "../apis";
import { Access_Token, Refresh_Token } from "../constants";
import { useNavigate } from "react-router-dom";
import '../styles/Form.css'
import LoadingIndicator from "./LoadingIndicator";

export default function Form({route, method}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(method)
  console.log(route)

  const name = method === "login" ? "Login" : "Register";
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try{
        const res = await api.post(route, {username, password})
        if (method === 'login'){
            localStorage.setItem(Access_Token, res.data.access)
            localStorage.setItem(Refresh_Token, res.data.refresh)
            navigate('/')
        }else{
            navigate('/login')
        }
    }
    catch (error){
        alert(error)
    }
    finally{
        setLoading(false)
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
}
