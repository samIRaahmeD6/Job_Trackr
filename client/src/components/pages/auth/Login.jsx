import React from 'react'
import Button from '../../ui/Button'
import Logo from '../../../assets/trackerLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../services/authService'
import { useState } from 'react'
const Login = () => {
  const[formData, setFormData] = useState({
    email : "",
    password: ""
  })
  const navigate = useNavigate()
  const[error, setError] = useState("")
  const handleChange = (e)=>{
     setFormData({
      ...formData, [e.target.name] : e.target.value
     })
  }

  const handleSubmit =async(e) =>{
    e.preventDefault()
    const {email, password} = formData
    try {
     const data = await loginUser(formData)
     localStorage.setItem("token", data.token)
     navigate("/dashboard")
      
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "Login failed");
      
    }
  }

  return (
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
        <div className='bg-[#30302e] rounded-r-lg h-150 w-112.5'>
        <div className='flex flex-col pl-8 pt-24 text-white text-2xl font-semibold'>
          <h1>Welcome back</h1>
        </div>
        <div><p className='text-sm pl-8 text-[14px] text-[#888780]'>
          Sign in to your account to continue</p></div>
        <form className='p-9' onSubmit={handleSubmit}>
          <div className='pb-4'>
          <label htmlFor="email" className='text-sm text-[#D3D1C7] pb-2 '>Email Address</label>
          <div className='flex pt-1'>
            <input name='email' id='email' onChange={handleChange} type="email" placeholder='you@exmaple.com' className='border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2'/>
          </div>
          </div>
          <div className='pb-2'>
          <label htmlFor="password" className='text-sm text-[#D3D1C7] pb-2 '>Password</label>
          <div className='flex pt-1'>
            <input name='password' onChange={handleChange} id='password' type='password' placeholder="Enter password" className='border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2'/>
          </div>
          </div>
          <div className='flex justify-end pb-5'>
            <p className='text-[#3B6D11] text-[13px]'>Forgot password?</p>
          </div>
          <div className='pb-4'>
          <div className='flex pt-1 justify-center'>
          <button type='submit' className='cursor-pointer border border-white/16 w-96 rounded-md h-10 placeholder-[#5F5E5A] p-2 text-white font-semibold'>Sign in</button>
          </div>
          </div>
        </form>

        </div>
           
        
      </div>
  
    </div>
  )
}

export default Login