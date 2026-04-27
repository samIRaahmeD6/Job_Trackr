import React from 'react'
import Topbar from '../../layout/Topbar'
import Sidebar from '../../layout/Sidebar'
import Card from '../../ui/Card'
import Progressbar from '../../ui/Progressbar'
import TrackerLogo from '../../../assets/trackerLogo.png'
import Badges from '../../ui/Badges'
import FavouriteButton from '../../ui/FavouriteButton'
import { useState } from 'react'
import Jobcard from '../../timeline/Card/Jobcard'
import StatusDot from '../../timeline/Timelineitems/StatusDot'
import TImeline from '../../timeline/Timelineitems/TImeline'
import { IoDocumentTextOutline } from "react-icons/io5";
const Resume = ({children}) => {
  return (
      <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        
        {/* Topbar */}
        <Topbar title= "Resume" subTitle="
Uploaded skills and experience" />

        {/* Page content */}
        <div className="flex-1 p-8 bg-[#141413] overflow-auto">
          {children}
         
         <div className='flex gap-6' >
          <div className='flex flex-col gap-6 w-[600px] '>
            <div className='bg-[#262624] rounded-xl border-dotted border-1 p-12 border-white/16'>
              <div className='flex flex-col justify-center items-center gap-3'>
                <IoDocumentTextOutline className='text-white text-6xl' />
                <div>
                <h1 className='font-semibold text-white'>Drop your resume PDF here</h1>
                <p className='text-[12px] text-[#888780]'>or click to browse · PDF, DOCX up to 5MB</p>
                </div>
              </div>
            </div>
            <Card title="Extracted experience">
              <div className='flex flex-col gap-3'>
              <div className='bg-[#262624] rounded-lg p-4'>
                <h1 className='font-semibold text-white'>Frontend Dev at TechCorp</h1>
                <p className='text-[14px] text-[#888780]'>Jan 2023 – present · 1y 3m</p>
              </div>
              <div className='bg-[#262624] rounded-lg p-4'>
                <h1 className='font-semibold text-white'>UI Intern at StartupXYZ</h1>
                <p className='text-[14px] text-[#888780]'>Jun 2022 – Dec 2022 · 6m</p>
              </div>
              </div>
             
            </Card>
          </div>
          <div className='flex w-[600px]'>
            <Card title="Detected skills">
              <div className='flex flex-col gap-3 pr-10 pb-6 pt-6 border-white/16'>
            <Progressbar label="React" value={45} side_label="Expert" max={50} color="bg-[#639922] " />
            <Progressbar label="TypeScript" side_label="Advanced" value={40} max={50} color="bg-[#639922]" />
            <Progressbar label="Next.js" side_label="Advanced" value={35} max={50} color="bg-[#639922]" />
            <Progressbar label="CSS / Tailwind" side_label="Expert" value={30} max={50} color="bg-[#639922] " />
            <Progressbar label="Redux" side_label="Beginner" value={15} max={50} color="bg-[#639922]" />
            <Progressbar label="GraphQL" side_label="Beginner" value={15} max={50} color="bg-[#639922] " />
            </div> 
            </Card>
      
          </div>
         </div>
     

    </div>
          </div>
      </div>
  )
}

export default Resume