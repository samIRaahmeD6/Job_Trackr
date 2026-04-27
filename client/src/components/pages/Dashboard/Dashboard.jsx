import React from 'react'
import Topbar from '../../layout/Topbar'
import Sidebar from '../../layout/Sidebar'
import Card from '../../ui/Card'
import Progressbar from '../../ui/Progressbar'
import TrackerLogo from '../../../assets/trackerLogo.png'
const Dashboard = ({ children }) => {
  return (
     <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        
        {/* Topbar */}
        <Topbar title= "Dashboard" subTitle="Your job search at a glance" />

        {/* Page content */}
        <div className="flex-1 p-4 bg-[#141413] overflow-auto">
          {children}
          <div className='flex gap-6 ml-4 mt-4 mb-6 mr-4'>
          <div className='bg-[#262624] h-60 w-70 rounded-lg flex flex-col p-8 gap-3'>
            <p className='text-[#888780]'>Total Applied</p>
            <h1 className='text-white text-4xl'>24</h1>
            <p className='text-[#3B6D11] text-sm'>+3 this week</p>
          </div>
          <div className='bg-[#262624] h-60 w-70 rounded-lg flex flex-col p-8 gap-3'>
            <p className='text-[#888780]'>Interview</p>
            <h1 className='text-white text-4xl'>7</h1>
            <p className='text-[#854F0B] text-sm'>29% rate</p>
          </div>
          <div className='bg-[#262624] h-60 w-70 rounded-lg flex flex-col p-8 gap-3'>
            <p className='text-[#888780]'>Offer</p>
            <h1 className='text-white text-4xl'>2</h1>
            <p className='text-[#3B6D11] text-sm'>8% rate</p>
          </div>
          <div className='bg-[#262624] h-60 w-70 rounded-lg flex flex-col p-8 gap-3'>
            <p className='text-[#888780]'>Awaiting Reply</p>
            <h1 className='text-white text-4xl'>11</h1>
            <p className='text-[#A32D2D] text-sm'>5 overdue</p>
          </div>
          
        </div>
        <div className='flex p-4 gap-6 '>
          <Card title="Application Funnel">
            <div className='flex flex-col gap-3 border-b-1 pr-6 pb-6 pt-6 border-white/16'>
            <Progressbar label="Applied" value={20} side_label="20" max={50} color="bg-[#378ADD] " />
            <Progressbar label="Interview" side_label="7" value={7} max={50} color="bg-[#EF9F27]" />
            <Progressbar label="Rejected" side_label="2" value={2} max={50} color="bg-[#639922]" />
            <Progressbar label="Pending" side_label="11" value={11} max={50} color="bg-[#E24B4A] " />
            </div> 
            <div className='pt-6 flex gap-28'>
              <div>
                <p className='text-[14px] text-[#888780]'>Top role</p>
                <h1 className='text-white'>Frontend Dev</h1>
              </div>
               <div>
                <p className='text-[14px] text-[#888780]'>Best source</p>
                <h1 className='text-white'>Linkedin</h1>
              </div>
               <div>
                <p className='text-[14px] text-[#888780]'>Average Response</p>
                <h1 className='text-white'>6.2 days</h1>
              </div>
              </div>   
          </Card>
          <Card title="Smart Insight">
            <div>
              <ul>
                <div className='border-b p-4 border-white/16'>
                 <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#97C459] rounded-full shrink-0"></span>
    <span className="text-[#888780] text-sm font-medium">
      <span className='font-bold text-white'>Frontend roles</span> have your highest interview rate at 43%.
    </span>
  </li>
  </div>
  <div className='border-b p-4 border-white/16'>
                 <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#EF9F27] rounded-full shrink-0"></span>
    <span className="text-[#888780] text-sm font-medium">
      <span className='font-bold text-white'>
Redux & System Design</span> appear in 8 jobs where you were rejected.
    </span>
  </li>
  </div>
  <div className='border-b p-4 border-white/16'>
                 <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#E24B4A] rounded-full shrink-0"></span>
    <span className="text-[#888780] text-sm font-medium">
      <span className='font-bold text-white'>

5 applications</span> have had no follow-up in over 7 days.
    </span>
  </li>
  </div>
   <div className='border-b p-4 border-white/16'>
                 <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#378ADD] rounded-full shrink-0"></span>
    <span className="text-[#888780] text-sm font-medium">
      <span className='font-bold text-white'>

Stripe</span> offer expires in 3 days — consider responding.
    </span>
  </li>
  </div>
              </ul>
            </div>
          </Card>
        </div>
        <div className='m-4'>
            <Card title="Recent activity">
              <div className='flex justify-between pb-6 border-b-1 mb-6 border-b-white/16'>
                <div className='flex gap-4 items-center'>
                  <img src={TrackerLogo} alt=""  className='h-10 w-10 rounded-lg'/>
                  <div className=''>
                    <h1 className='text-white'>
                    Stripe — Frontend Engineer</h1>
                    <p className='text-[12px] text-[#888780]'>Status moved to Offer</p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='bg-[#EAF3DE] text-[#3B6D11] rounded-3xl pl-2 pr-2 h-7 justify-center flex align-middle'>Offer</div>
                  <div><p className='text-[#888780]'>2hr ago</p></div>
                </div>
              </div>
              <div className='flex justify-between  pb-6 border-b-1 mb-6 border-b-white/16'>
                <div className='flex gap-4 items-center'>
                  <img src={TrackerLogo} alt=""  className='h-10 w-10 rounded-lg'/>
                  <div className=''>
                    <h1 className='text-white'>
                    Vercel — React Developer</h1>
                    <p className='text-[12px] text-[#888780]'>Interview scheduled for Friday</p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='bg-[#FAEEDA] text-[#854F0B] rounded-3xl pl-2 pr-2 h-7 justify-center flex align-middle'>Interview</div>
                  <div><p className='text-[#888780]'>2d ago</p></div>
                </div>
              </div>
               <div className='flex justify-between  pb-6 border-b-1 mb-6 border-b-white/16'>
                <div className='flex gap-4 items-center'>
                  <img src={TrackerLogo} alt=""  className='h-10 w-10 rounded-lg'/>
                  <div className=''>
                    <h1 className='text-white'>
                    Shopify — UI Engineer</h1>
                    <p className='text-[12px] text-[#888780]'>Application rejected</p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='bg-[#FCEBEB] text-[#A32D2D] rounded-3xl pl-2 pr-2 h-7 justify-center flex align-middle'>Rejected</div>
                  <div><p className='text-[#888780]'>3d ago</p></div>
                </div>
              </div>
            </Card>
        </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard