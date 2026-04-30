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
const Skill_Gaps = ({children}) => {
  return (
     <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        
        {/* Topbar */}
        <Topbar title= "Skill Gaps" subTitle="
What to learn based on your rejections
" />

        {/* Page content */}
        <div className="flex-1 p-8 bg-[#141413] overflow-auto">
          {children}
         
         <div className='flex gap-4'>
           <Card title="Top skill gaps (from rejected jobs)">

  {/* ITEM 1 */}
  <div className='flex items-start gap-3 border-b border-white/16 pb-4'>
    <span className="w-2 h-2 bg-[#E24B4A] rounded-full mt-2"></span>

    <div className='flex justify-between w-full'>
      <h1 className='text-white font-medium'>
        Redux / State Management
      </h1>

      <div className='flex items-center text-sm gap-6'>
        <p className='text-[#888780]'>8 jobs</p>
        <a href="" className='text-blue-400'>Learn →</a>
      </div>
    </div>
  </div>

  {/* ITEM 2 */}
  <div className='flex items-start gap-3 border-b border-white/16 py-4'>
    <span className="w-2 h-2 bg-[#E24B4A] rounded-full mt-2"></span>

    <div className='flex justify-between w-full'>
      <h1 className='text-white font-medium'>
        System Design
      </h1>

      <div className='flex items-center text-sm gap-6'>
        <p className='text-[#888780]'>7 jobs</p>
        <a href="" className='text-blue-400'>Learn →</a>
      </div>
    </div>
  </div>

  {/* ITEM 3 */}
  <div className='flex items-start gap-3 border-b border-white/16 py-4'>
    <span className="w-2 h-2 bg-[#EF9F27] rounded-full mt-2"></span>

    <div className='flex justify-between w-full'>
      <h1 className='text-white font-medium'>
        GraphQL
      </h1>

      <div className='flex items-center text-sm gap-6'>
        <p className='text-[#888780]'>5 jobs</p>
        <a href="" className='text-blue-400'>Learn →</a>
      </div>
    </div>
  </div>

  {/* ITEM 4 */}
  <div className='flex items-start gap-3 border-b border-white/16 py-4'>
    <span className="w-2 h-2 bg-[#EF9F27] rounded-full mt-2"></span>

    <div className='flex justify-between w-full'>
      <h1 className='text-white font-medium'>
        Docker / DevOps basics
      </h1>

      <div className='flex items-center text-sm gap-6'>
        <p className='text-[#888780]'>4 jobs</p>
        <a href="" className='text-blue-400'>Learn →</a>
      </div>
    </div>
  </div>

  {/* ITEM 5 */}
  <div className='flex items-start gap-3 pt-4'>
    <span className="w-2 h-2 bg-[#97C459] rounded-full mt-2"></span>

    <div className='flex justify-between w-full'>
      <h1 className='text-white font-medium'>
        AWS / Cloud basics
      </h1>

      <div className='flex items-center text-sm gap-6'>
        <p className='text-[#888780]'>3 jobs</p>
        <a href="" className='text-blue-400'>Learn →</a>
      </div>
    </div>
  </div>

</Card>
            <Card title="Recommended learning path">
                <div className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <div className='flex flex-col border-1 border-white/16 rounded-lg p-4'>
                    <div className='flex gap-4 '>
                        <div className='bg-[#FCEBEB] text-[#A32D2D] h-6 w-6 rounded-full flex justify-center'>1</div>
                        <h1 className='font-medium text-white'>Redux Toolkit</h1>
                    </div>
                    <div className='flex'>
                        <p className='text-[#888780] text-sm'>Appears in 8 rejections · ~2 weeks to learn</p>
                    </div>
                       
                    </div>
                </div>
                 <div className='flex flex-col'>
                    <div className='flex flex-col border-1 border-white/16 rounded-lg p-4'>
                    <div className='flex gap-4 '>
                        <div className='bg-[#FAEEDA] text-[#854F0B] h-6 w-6 rounded-full flex justify-center'>2</div>
                        <h1 className='font-medium text-white'>System Design basics</h1>
                    </div>
                    <div className='flex'>
                        <p className='text-[#888780] text-sm'>7 rejections mention it · ~4 weeks to learn</p>
                    </div>
                       
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col border-1 border-white/16 rounded-lg p-4'>
                    <div className='flex gap-4 '>
                        <div className='bg-[#EAF3DE] text-[#3B6D11] h-6 w-6 rounded-full flex justify-center'>3</div>
                        <h1 className='font-medium text-white'>GraphQL</h1>
                    </div>
                    <div className='flex'>
                        <p className='text-[#888780] text-sm'>5 rejections mention it · ~1.5 weeks to learn</p>
                    </div>
                       
                    </div>
                </div>
                </div>
            </Card>
         </div>
        

    </div>
          </div>
      </div>
  )
}

export default Skill_Gaps