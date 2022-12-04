import React from 'react'
import { Link,useNavigate} from 'react-router-dom'

export default function Home() {
    const navigate=useNavigate()
    const handlefunction=()=>{
     navigate("/")
     localStorage.clear("phoneNumber")
    }

  return (
    <center>
    <div className='App'>
      <h1>Successfuly login </h1>
      <h5>{localStorage.getItem("phoneNumber")}</h5>
      <input className="signin-phone" type="submit" value="Log Out" onClick={handlefunction} /> 
    </div>
    </center>
  )
}
