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

const Reminders = ({children}) => {
     const [fav, setFav] = useState(false);
  return (
     <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        
        {/* Topbar */}
        <Topbar title= "Reminders" subTitle="3 follow-ups need attention" />

        {/* Page content */}
        <div className="flex-1 p-6 bg-[#141413] overflow-auto">
          {children}
          <div className='flex p-10 gap-20'>
          <Card>
            <div className=' h-40 rounded-lg flex flex-col p-4 gap-3'>
            <p className='text-[#888780]'>Pending follow-ups</p>
            <h1 className='text-white text-4xl'>3</h1>
          </div>
          </Card>
          <Card>
            <div className=' h-40 rounded-lg flex flex-col p-6 gap-3'>
            <p className='text-[#888780]'>Upcoming this week</p>
            <h1 className='text-white text-4xl'>5</h1>
          </div>
          </Card>
          </div>
           <div className='m-8'>
           <Card title="Active Reminders">
            <div>
             <ul>

  {/* ITEM 1 */}
  <div className="border-b p-4 border-white/16">
    <li className="flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 bg-[#A32D2D] rounded-full shrink-0"></span>

        <div>
          <h1 className="text-white text-[16px] font-semibold">
            Stripe — Frontend Engineer
          </h1>
          <p className="text-[#888780] text-[14px]">
            Offer received · Decision deadline approaching
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-[#FCEBEB] text-[#A32D2D] rounded-3xl px-3 h-7 flex items-center">
        Due today
      </div>

    </li>
  </div>

  {/* ITEM 2 */}
  <div className="border-b p-4 border-white/16">
    <li className="flex items-center justify-between">

      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 bg-[#854F0B] rounded-full shrink-0"></span>

        <div>
          <h1 className="text-white text-[16px] font-semibold">
            Linear — UI Engineer
          </h1>
          <p className="text-[#888780] text-[14px]">
            No response after 7 days · Follow up recommended
          </p>
        </div>
      </div>

      <div className="bg-[#FAEEDA] text-[#854F0B] rounded-3xl px-3 h-7 flex items-center">
        2 days left
      </div>

    </li>
  </div>

  {/* ITEM 3 */}
  <div className="border-b p-4 border-white/16">
    <li className="flex items-center justify-between">

      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 bg-[#854F0B] rounded-full shrink-0"></span>

        <div>
          <h1 className="text-white text-[16px] font-semibold">
            Vercel — React Developer
          </h1>
          <p className="text-[#888780] text-[14px]">
            Technical interview scheduled Friday
          </p>
        </div>
      </div>

      <div className="bg-[#FAEEDA] text-[#854F0B] rounded-3xl px-3 h-7 flex items-center">
        4 days left
      </div>

    </li>
  </div>

  {/* ITEM 4 */}
  <div className="border-b p-4 border-white/16">
    <li className="flex items-center justify-between">

      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 bg-[#97C459] rounded-full shrink-0"></span>

        <div>
          <h1 className="text-white text-[16px] font-semibold">
            Notion — Frontend Dev
          </h1>
          <p className="text-[#888780] text-[14px]">
            Phone screen completed · Awaiting next step
          </p>
        </div>
      </div>

      <div className="bg-[#EAF3DE] text-[#3B6D11] rounded-3xl px-3 h-7 flex items-center">
        6 days left
      </div>

    </li>
  </div>

</ul>
            </div>
          </Card>
        </div>
          </div>
      </div>
    </div>
  )
}

export default Reminders