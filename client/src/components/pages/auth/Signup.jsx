import React from 'react'
import Button from '../../ui/Button'
import Logo from '../../../assets/trackerLogo.png'
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <>
    <div className='flex flex-col gap-4 items-center justify-center h-screen bg-[#141413]'>
      <div className='gap-2 flex'>
         <Link to="/"><Button variant='secondary'>Login Page</Button></Link>
      <Link to='/signup'><Button variant='secondary'>SignUp Page</Button></Link>
      </div>
      <div className='flex'>
        <div className='flex flex-col bg-[#3B6D11] rounded-l-lg h-[600px] w-[300px]'>
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
        <div className='bg-[#30302e] rounded-r-lg h-[600px] w-[450px]'>
        <div className='flex flex-col pl-8 pt-8 text-white text-2xl font-semibold'>
          <h1>Create your account</h1>
        </div>
        <div><p className='text-sm pl-8 text-[14px] text-[#888780]'>
          Free to use, no credit card required</p></div>
        <div className='p-9'>
          <div className='pb-4'>
          <label htmlFor="" className='text-sm text-[#D3D1C7] pb-2 '>Name</label>
          <div className='flex pt-1'>
            <input type="text" placeholder='John Doe' className='border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2'/>
          </div>
          </div>
          <div className='pb-2'>
          <label htmlFor="" className='text-sm text-[#D3D1C7] pb-2 '>Email Address</label>
          <div className='flex pt-1'>
            <input type='email' placeholder='you@example.com'  className='border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2'/>
          </div>
          </div>
          <div className='pb-2'>
          <label htmlFor="" className='text-sm text-[#D3D1C7] pb-2 '>Current role/Goal</label>
          <div className='flex pt-1'>
            <select name="" id="" placeholder='Select your current status' className='cursor-pointer text-white border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2'>
                <option value="" disabled hidden>
                Select your current status
                </option>
                <option value="" className='bg-[#30302e]'>Student/Fresh Graduate</option>
                <option value="" className='bg-[#30302e]'>Junior Developer (0-2Years)</option>
                <option value="" className='bg-[#30302e]'>Mid Level Developer (2-5Years)</option>
                <option value="" className='bg-[#30302e]'>Senior Developer (5+ Years)</option>
                <option value="" className='bg-[#30302e]'>Carrier Switcher</option>
            </select>
          </div>
          </div>
           <div className='pb-8'>
          <label htmlFor="" className='text-sm text-[#D3D1C7] pb-2 '>Password</label>
          <div className='flex pt-1'>
            <input type='password' placeholder='Enter a password'  className='border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2'/>
          </div>
          </div>
          <div className='pb-4 cursor-pointer' >
          <div className='flex pt-1 justify-center'>
          <button className='cursor-pointer border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2 text-white font-semibold'>Create account</button>
          </div>
          </div>
        </div>

        </div>
           
        
      </div>
  
    </div>
    </>
  )
}

export default Signup