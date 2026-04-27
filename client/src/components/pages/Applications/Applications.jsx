import React from 'react'
import Topbar from '../../layout/Topbar'
import Sidebar from '../../layout/Sidebar'
import Card from '../../ui/Card'
import Progressbar from '../../ui/Progressbar'
import TrackerLogo from '../../../assets/trackerLogo.png'
import Badges from '../../ui/Badges'
import FavouriteButton from '../../ui/FavouriteButton'
import { useState } from 'react'
const Applications = ({children}) => {
    const [fav, setFav] = useState(false);
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        
        {/* Topbar */}
        <Topbar title= "Applications" subTitle="All 24 applications · sorted by date" />

        {/* Page content */}
        <div className="flex-1 p-4 bg-[#141413] overflow-auto">
          {children}
          <div className='flex ml-4 mt-4 mb-6 mr-4 gap-4'>
            <input type="text" className='bg-[#30302e] border-1 border-white/16 h-10 w-70 rounded-lg pl-4 placeholder-[#888780] text-lg' placeholder='Search by company or role..' />
            <Badges label='All' count='11'></Badges>
             <Badges label='Applied' count='11'></Badges>
              <Badges label='Interview' count='7'></Badges>
               <Badges label='Offer' count='2'></Badges>
                <Badges label='Rejected' count='4'></Badges>
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
           <div className='ml-4 mr-4 mt-2 mb-2'>
            <Card>
                <div className='flex justify-between items-center mb-6 border-b-white/16'>
                <div className='flex gap-4 items-center'>
                                  <img src={TrackerLogo} alt=""  className='h-10 w-10 rounded-lg'/>
                                  <div className=''>
                                    <h1 className='text-white font-semibold'>
                                   React Developer</h1>
                                    <p className='text-[16px] text-[#888780] mb-2 font-semibold'>Vercel · Remote</p>
                                    <p className='text-[12px] text-[#888780]'>$120k–$150k
·
Applied Apr 8
·
Applied Apr 5</p>
                                  </div>
                                </div>
                                <div className='flex gap-4'>
                  <div className='bg-[#FAEEDA] text-[#854F0B] rounded-3xl pl-2 pr-2 h-7 justify-center flex align-middle'>Interview</div>
                  <div><FavouriteButton
  isFavorite={fav}
  onToggle={() => setFav(!fav)}
/></div>
                </div>
                </div>
            </Card>
            
          </div>
           <div className='m-4'>
            <Card>
                <div className='flex justify-between items-center mb-6 border-b-white/16'>
                <div className='flex gap-4 items-center'>
                                  <img src={TrackerLogo} alt=""  className='h-10 w-10 rounded-lg'/>
                                  <div className=''>
                                    <h1 className='text-white font-semibold'>
                                    UI Engineer</h1>
                                    <p className='text-[16px] text-[#888780] mb-2 font-semibold'>Linear · Remote</p>
                                    <p className='text-[12px] text-[#888780]'>$110k–$140k
·
Applied Apr 5</p>
                                  </div>
                                </div>
                                <div className='flex gap-4'>
                  <div className='bg-[#E6F1FB] text-[#185FA5] rounded-3xl pl-2 pr-2 h-7 justify-center flex align-middle'>Applied</div>
                  <div><FavouriteButton
  isFavorite={fav}
  onToggle={() => setFav(!fav)}
/></div>
                </div>
                </div>
            </Card>
            
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
            <Card>
                <div className='flex justify-between items-center mb-6 border-b-white/16'>
                <div className='flex gap-4 items-center'>
                                  <img src={TrackerLogo} alt=""  className='h-10 w-10 rounded-lg'/>
                                  <div className=''>
                                    <h1 className='text-white font-semibold'>
                                    Frontend Dev</h1>
                                    <p className='text-[16px] text-[#888780] font-semibold'>Notion · New York</p>
                                    <p className='text-[12px] text-[#888780]'>$130k–$160k
·
Applied Mar 24</p>
                                  </div>
                                </div>
                                <div className='flex gap-4'>
                  <div className='bg-[#FAEEDA] text-[#854F0B] rounded-3xl pl-2 pr-2 h-7 justify-center flex align-middle'>Interview</div>
                  <div><FavouriteButton
  isFavorite={fav}
  onToggle={() => setFav(!fav)}
/></div>
                </div>
                </div>
            </Card>
            
          </div>
          </div>
      </div>
    </div>
  )
}

export default Applications