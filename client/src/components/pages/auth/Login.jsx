import React from 'react'
import Button from '../../ui/Button'
import Logo from '../../../assets/trackerLogo.png'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
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
            <h1 className='font-semibold text-white text-2xl font-inter'>Track Every Application. Land Faster</h1></div>
            <div className='flex pl-8 pr-6 pb-8'>
          <p className='text-[#97C459] font-normal text-sm'>Your smart job search companion from first apply to final offer.</p>

        </div>
        <div className='pl-8'>
          <ul className="space-y-3">
  <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#97C459] rounded-full shrink-0"></span>
    <span className="text-[#97C459] text-sm font-medium">
      Visual application timeline
    </span>
  </li>

  <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#97C459] rounded-full shrink-0"></span>
    <span className="text-[#97C459] text-sm font-medium">
      Resume vs job description analyzer
    </span>
  </li>

  <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#97C459] rounded-full shrink-0"></span>
    <span className="text-[#97C459] text-sm font-medium">
      Smart follow-up reminders
    </span>
  </li>

  <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#97C459] rounded-full shrink-0"></span>
    <span className="text-[#97C459] text-sm font-medium">
      Skill gap recommendations
    </span>
  </li>
</ul>
        </div>
        </div>
        <div className='bg-[#30302e] rounded-r-lg h-[600px] w-[450px]'>
        <div className='flex flex-col pl-8 pt-24 text-white text-2xl font-semibold'>
          <h1>Welcome back</h1>
        </div>
        <div><p className='text-sm pl-8 text-[14px] text-[#888780]'>
          Sign in to your account to continue</p></div>
        <div className='p-9'>
          <div className='pb-4'>
          <label htmlFor="" className='text-sm text-[#D3D1C7] pb-2 '>Email Address</label>
          <div className='flex pt-1'>
            <input type="email" placeholder='you@exmaple.com' className='border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2'/>
          </div>
          </div>
          <div className='pb-2'>
          <label htmlFor="" className='text-sm text-[#D3D1C7] pb-2 '>Password</label>
          <div className='flex pt-1'>
            <input type='password' placeholder="Enter password" className='border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2'/>
          </div>
          </div>
          <div className='flex justify-end pb-5'>
            <p className='text-[#3B6D11] text-[13px]'>Forgot password?</p>
          </div>
          <div className='pb-4'>
          <div className='flex pt-1 justify-center'>
          <button className='cursor-pointer border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2 text-white font-semibold'>Sign in</button>
          </div>
          </div>
        </div>

        </div>
           
        
      </div>
  
    </div>
  )
}

export default Login