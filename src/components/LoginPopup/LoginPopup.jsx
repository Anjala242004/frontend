import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
const LoginPopup = ({setShowLogin}) => {

  const {url,setToken}=useContext(StoreContext)

   const[currState,setCurrState]=useState("Login")
   const [data,setData]=useState({
    name:"",
    email:"",
    password:""
   })

   const onChangeHandler=(event)=>{
        const name =event.target.name
        const value =event.target.value
        setData(data=>({...data,[name]:value}))
   }

   const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
        newUrl += "/user/login";
    } else {
        newUrl += "/user/register";
    }

    try {
        console.log("Sending request to:", newUrl, "with data:", data); // Debugging
        const response = await axios.post(newUrl, data, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("Response:", response.data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("userId", response.data.userId);
            setShowLogin(false);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            alert(response.data.message || response.data.msg || "Something went wrong");
        }
    } catch (error) {
        console.error("Axios error:", error.response?.data || error.message);
        alert(error.response?.data?.message || error.response?.data?.msg || "Error occurred");
    }
};


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/>
        </div>
        <div className='login-popup-inputs'>
            {currState==="Login"?<></>:<input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required/>
            <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required/>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
           <input type="checkbox"  required/>
           <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have an acccount?<span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
