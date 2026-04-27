import React from 'react'
import Topbar from '../../layout/Topbar'
import Sidebar from '../../layout/Sidebar'
import Card from '../../ui/Card'
import Progressbar from '../../ui/Progressbar'
import TrackerLogo from '../../../assets/trackerLogo.png'
import Badges from '../../ui/Badges'
import FavouriteButton from '../../ui/FavouriteButton'
import { useState } from 'react'
const Favourites = ({children}) => {
    const [fav, setFav] = useState(false);
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        
        {/* Topbar */}
        <Topbar title= "Applications" subTitle="5 priority jobs " />

        {/* Page content */}
        <div className="flex-1 p-4 bg-[#141413] overflow-auto">
          {children}
          <div className='flex ml-4 mt-4 mb-6 mr-4 gap-4'>
            <p className=' text-[#888780]'>Jobs you've marked as priority — review these first.</p>
          </div>
          <div className='m-4'>
            <Card>
                <div className='flex justify-between items-center mb-6 border-b-white/16'>
                <div className='flex gap-4 items-center'>
                                  <img src={TrackerLogo} alt=""  className='h-10 w-10 rounded-lg'/>
                                  <div className=''>
                                    <h1 className='text-white font-semibold'>
                                    Frontend Engineer</h1>
                                    <p className='text-[16px] text-[#888780] mb-2 font-semibold'>Stripe · San Francisco, CA</p>
                                    <p className='text-[12px] text-[#888780]'>$140k–$180k · Applied Apr 12</p>
                                  </div>
                                </div>
                                <div className='flex gap-4'>
                  <div className='bg-[#EAF3DE] text-[#3B6D11] rounded-3xl pl-2 pr-2 h-7 justify-center flex align-middle'>Offer</div>
                  <div><FavouriteButton
  isFavorite={fav}
  onToggle={() => setFav(!fav)}
/></div>
                </div>
                </div>
            </Card>
            
          </div>
           
           <div className='m-4'>
            
            
          </div>
           <div className='m-4'>
            <Card>
                <div className='flex justify-between items-center mb-6 border-b-white/16'>
                <div className='flex gap-4 items-center'>
                                  <img src={TrackerLogo} alt=""  className='h-10 w-10 rounded-lg'/>
                                  <div className=''>
                                    <h1 className='text-white font-semibold'>
                                    UI Engineer</h1>
                                    <p className='text-[16px] text-[#888780] font-semibold'>Shopify · Toronto, CA</p>
                                    <p className='text-[12px] text-[#888780]'>$105k–$130k·Applied Mar 28      </p>
                                  </div>
                                </div>
                                <div className='flex gap-4'>
                  <div className='bg-[#FCEBEB] text-[#A32D2D] rounded-3xl pl-2 pr-2 h-7 justify-center flex align-middle'>Rejected</div>
                  <div><FavouriteButton
  isFavorite={fav}
  onToggle={() => setFav(!fav)}
/></div>
                </div>
                </div>
            </Card>
            
          </div>
           <div className='m-4'>
           
            
          </div>
          </div>
      </div>
    </div>
  )
}
 
export default Favourites