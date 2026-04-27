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
const Timeline = ({children}) => {
    const [fav, setFav] = useState(false);
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        
        {/* Topbar */}
        <Topbar title= "Timeline" subTitle="Visual progression of your applications" />

        {/* Page content */}
        <div className="flex-1 p-4 bg-[#141413] overflow-auto">
          {children}
          <div className='flex ml-4 mt-4 mb-6 mr-4 gap-4'>
            <p className=' text-[#888780]'>Visual progression of all your applications over time.</p>
          </div>
           <div className="bg-[#141413] min-h-screen p-6">
      
      <TImeline>

        <StatusDot color="bg-[#97C459]">
          <Jobcard
            title="Frontend Engineer"
            company="Stripe"
            date="Apr 12 → Apr 20"
            status="Offer"
            statusColor="bg-[#EAF3DE] text-[#3B6D11]"
            steps={[
              { label: "Applied", active: true,  color: "bg-[#EAF3DE] text-[#3B6D11]"  },
              { label: "Phone screen", active: true, color: "bg-[#EAF3DE] text-[#3B6D11]" },
              { label: "Technical", active: true, color: "bg-[#EAF3DE] text-[#3B6D11]" },
              { label: "Offer", active: true, color: "bg-[#FAEEDA] text-[#854F0B]" },
            ]}
          />
        </StatusDot>

        <StatusDot color="bg-[#EF9F27]">
          <Jobcard
            title="React Developer"
            company="Vercel"
            date="Apr 8 → present"
            status="Interview"
            statusColor="bg-[#EAF3DE] text-[#3B6D11]"
            steps={[
              { label: "Applied", active: true, color: "bg-[#EAF3DE] text-[#3B6D11]" },
              { label: "Interview", active: true, color: "bg-[#FAEEDA] text-[#854F0B] " },
              { label: "Technical", active: false },
              { label: "Offer", active: false },
            ]}
          />
        </StatusDot>

        <StatusDot color="bg-[#E24B4A]">
          <Jobcard
            title="UI Engineer"
            company="Shopify"
            date="Mar 28 → Apr 10"
            status="Rejected"
            statusColor="bg-[#FCEBEB] text-[#A32D2D]"
            steps={[
              { label: "Applied", active: true, color: "bg-[#EAF3DE] text-[#3B6D11]" },
              { label: "Phone screen", active: true, color: "bg-[#EAF3DE] text-[#3B6D11]"  },
              { label: "Rejected", active: true, color: "bg-[#FCEBEB] text-[#A32D2D]" },
            ]}
          />
        </StatusDot>
       
       <StatusDot color="bg-[#378ADD]">
          <Jobcard
            title="UI Engineer"
            company="Linear"
            date="Apr 5 → present"
            status="Applied"
            statusColor="bg-[#E6F1FB] text-[#185FA5]"
            steps={[
              { label: "Applied", active: true, color: "bg-[#EAF3DE] text-[#3B6D11]" },
              { label: "Interview", active: false, },
              { label: "Technical", active: false, },
              { label: "Offer", active: false, },
            ]}
          />
        </StatusDot>
      </TImeline>

    </div>
          </div>
      </div>
    </div>
  )
}

export default Timeline