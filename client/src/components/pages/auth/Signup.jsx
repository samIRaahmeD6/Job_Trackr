import React from 'react'
import Button from '../../ui/Button'
import Logo from '../../../assets/trackerLogo.png'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { registerUser } from '../../../services/authService';
const Signup = () => {
  const[form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: ""
  });
  const handleChange=(e)=>{setForm({
    ...form,
    [e.target.name] : e.target.value,
  })

  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const data = await registerUser(form)
      console.log("User Created:", data);
      alert("Signup Successful")
      
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Error")
      
    }
  }
  return (
    <>
    <div className='flex flex-col gap-4 items-center justify-center h-screen bg-[#141413]'>
      <div className='gap-2 flex'>
         <Link to="/"><Button variant='secondary'>Login Page</Button></Link>
      <Link to='/signup'><Button variant='secondary'>SignUp Page</Button></Link>
      </div>
      <div className='flex'>
        <div className='flex flex-col bg-[#3B6D11] rounded-l-lg h-150 w-75'>
          <div className='flex items-center p-8 gap-4 '>
            <img src={Logo} alt="" className='h-8 w-8 rounded-lg'/>
          <h3 className='text-white text-lg font-lg font-semibold flex align-center'>JobTrackr</h3>
          </div>
          <div className=' flex pl-8 pr-10 pb-4'>
            <h1 className='font-semibold text-white text-2xl font-inter'>Start your smarter job search today.</h1></div>
            <div className='flex pl-8 pr-6 pb-8'>
          <p className='text-[#97C459] font-normal text-sm'>Set up your free account in under 2 minutes.</p>

        </div>
        <div className='pl-8'>
          <ul className="space-y-3">
  <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#97C459] rounded-full shrink-0"></span>
    <span className="text-[#97C459] text-sm font-medium">
      Free forever — no credit card
    </span>
  </li>

  <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#97C459] rounded-full shrink-0"></span>
    <span className="text-[#97C459] text-sm font-medium">
      Track unlimited applications
    </span>
  </li>

  <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#97C459] rounded-full shrink-0"></span>
    <span className="text-[#97C459] text-sm font-medium">
      AI resume analyzer included
    </span>
  </li>

  <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#97C459] rounded-full shrink-0"></span>
    <span className="text-[#97C459] text-sm font-medium">
      Skill gap insights from day one
    </span>
  </li>
</ul>
        </div>
        </div>
        <div className='bg-[#30302e] rounded-r-lg h-150 w-112.5'>
        <div className='flex flex-col pl-8 pt-8 text-white text-2xl font-semibold'>
          <h1>Create your account</h1>
        </div>
        <div><p className='text-sm pl-8 text-[14px] text-[#888780]'>
          Free to use, no credit card required</p></div>
        <form className='p-9' onSubmit={handleSubmit}>
          <div className='pb-4'>
            <div className='flex gap-4'>
              <div className=''>
           <label htmlFor="firstname" className='text-sm text-[#D3D1C7] pb-2 '>First Name</label>
          <div className='flex pt-1'>
            <input onChange={handleChange} id='firstname' type="text" placeholder='John' name='firstName' className='border border-white/16 rounded-md h-10 w-45 placeholder-[#5F5E5A] p-2'/>
          </div>
          </div>
           <div className=''>
          <label htmlFor="lastname" className='text-sm text-[#D3D1C7] pb-2 '>Last name</label>
          <div className='flex pt-1'>
            <input  onChange={handleChange} id='lastname' type="text" placeholder='Doe' name='lastName' className='border border-white/16 rounded-md h-10 w-45 placeholder-[#5F5E5A] p-2'/>
          </div>
          </div>
            </div>
          
          </div>
          <div className='pb-2'>
          <label htmlFor="email"  className='text-sm text-[#D3D1C7] pb-2 '>Email Address</label>
          <div className='flex pt-1'>
            <input autoComplete='off' type='email' id='email' onChange={handleChange} placeholder='you@example.com' name='email' className='border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2'/>
          </div>
          </div>
          <div className='pb-2'>
          <label htmlFor="role" className='text-sm text-[#D3D1C7] pb-2 '>Current role/Goal</label>
          <div className='flex pt-1'>
            <select name="role" id="role" onChange={handleChange} placeholder='Select your current status' className='cursor-pointer text-white border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2'>
                <option value="" disabled hidden>
                Select your current status
                </option>
                <option value="student" className='bg-[#30302e]'>Student/Fresh Graduate</option>
                <option value="junior developer" className='bg-[#30302e]'>Junior Developer (0-2Years)</option>
                <option value="mid level developer" className='bg-[#30302e]'>Mid Level Developer (2-5Years)</option>
                <option value="senior developer"className='bg-[#30302e]'>Senior Developer (5+ Years)</option>
                <option value="career switcher" className='bg-[#30302e]'>Carrier Switcher</option>
            </select>
          </div>
          </div>
           <div className='pb-8'>
          <label htmlFor="" htmlFor="password" className='text-sm text-[#D3D1C7] pb-2 '>Password</label>
          <div className='flex pt-1'>
            <input type='password' id='password' onChange={handleChange} name='password' placeholder='Enter a password'  className='border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2'/>
          </div>
          </div>
          <div className='pb-4 cursor-pointer' >
          <div className='flex pt-1 justify-center'>
          <button type='submit' className='cursor-pointer border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2 text-white font-semibold'>Create account</button>
          </div>
          </div>
        </form>

        </div>
           
        
      </div>
  
    </div>
    </>
  )
}

export default Signup