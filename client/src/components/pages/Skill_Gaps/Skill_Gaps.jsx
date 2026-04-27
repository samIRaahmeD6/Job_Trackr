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
        <Topbar title= "Resume" subTitle="
Uploaded skills and experience" />

        {/* Page content */}
        <div className="flex-1 p-8 bg-[#141413] overflow-auto">
          {children}
         
        

    </div>
          </div>
      </div>
  )
}

export default Skill_Gaps