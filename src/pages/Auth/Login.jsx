import React, { useContext, useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/inputs/input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';


const Login = () => {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[error,setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();
  const handleLogin = async (e) =>{
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please Enter Valid Email Address.")
      return;
    }
    if(!password){
      setError("Please enter a password.")
      return;
    }
    setError("");
    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password
      });
      const {token, user} = response.data;
      if(token){
        console.log("This is the user after login: ",user)
        localStorage.setItem("token",token);
        localStorage.setItem("user", JSON.stringify(user));
        updateUser(user)
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong, please try again later");
      }
    }
  }
  return (
    <AuthLayout>
    <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[7px] mb-6'>
          Please Enter Your Deatils To Login
        </p>
        <form onSubmit={handleLogin}>
          <Input value={email} label="Email Address" type='text' placeholder='example@gmail.com' onChange={({target})=>{setEmail(target.value)}} />
          <Input value={password} label="Password" type='password' placeholder='Min 8 characters' onChange={({target})=>{setPassword(target.value)}} />
           {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
           <button
           type='submit' 
           className='btn-primary'>LOGIN</button>
           <p className='text-[13px] text-slate-800 mt-3' >
            Don't have an account?
            <Link className='font-medium text-purple-500 underline' to="/signup">
            Signup
            </Link>
           </p>
        </form>
    </div>
    </AuthLayout>
  )
}

export default Login