import React, { useEffect } from 'react'
import Topbar from '../../layout/Topbar'
import Sidebar from '../../layout/Sidebar'
import Card from '../../ui/Card'
import Progressbar from '../../ui/Progressbar'
import TrackerLogo from '../../../assets/trackerLogo.png'
import Badges from '../../ui/Badges'
import FavouriteButton from '../../ui/FavouriteButton'
import { getJob } from '../../../services/jobService'
import { showJobStats } from '../../../services/jobService'
import { useState } from 'react'
const Applications = ({children}) => {
    const [fav, setFav] = useState(false);
    const [jobs, setJobs] = useState([])

    useEffect(()=>{
      const fetchJobs = async ()=>{
       try {
        const data = await getJob()
        console.log("API response:", data); 
        setJobs(data)
       } catch (error) {
        console.log("Jobs fetch error:", error);
       }
      };  fetchJobs();

    }, [])

    const statusStyles = {
  Applied: "bg-[#E6F1FB] text-[#185FA5]",
  Interview: "bg-[#FAEEDA] text-[#854F0B]",
  Offer: "bg-[#EAF3DE] text-[#3B6D11]",
  Rejected: "bg-[#FCEBEB] text-[#A32D2D]",
  TechnicalExam: "bg-[#FCEBEB] text-[#A32D2D]",
};
const[stats, setStats]  = useState(null)

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const data = await showJobStats();
      console.log("API response:", data); 
      setStats(data);
    } catch (error) {
      console.log("Jobs fetch error:", error);
    }
  };

  fetchJobs(); // ✅ REQUIRED
}, []);
const applied = stats?.Applied || 0;
const interview = stats?.Interview || 0;
const technicalExam = stats?.TechnicalExam || 0
const offer = stats?.Offer || 0;
const rejected = stats?.Rejected || 0;
const total =
  applied + interview + offer + rejected + technicalExam;
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
            <input type="text" className='bg-[#30302e] border border-white/16 h-10 w-70 rounded-lg pl-4 placeholder-[#888780] text-lg' placeholder='Search by company or role..' />
            <Badges label='All' count={total}></Badges>
             <Badges label='Applied' count={applied}></Badges>
             <Badges label='Technical Exam' count={technicalExam}></Badges>
              <Badges label='Interview' count={interview}></Badges>
               <Badges label='Offer' count={offer}></Badges>
                <Badges label='Rejected' count={rejected}></Badges>
          </div>
          <div className='m-4'>
            <Card>
            {jobs.map((job) => (
  <div key={job._id} className='flex justify-between items-center mb-6 border-b-white/16'>
    
    <div className='flex gap-4 items-center'>
      <div className='h-10 w-10 rounded-lg bg-white text-[#3B6D11] font-semibold flex items-center justify-center'>
        {job.companyName?.slice(0, 2).toUpperCase()}
      </div>

      <div>
        <h1 className='text-white font-semibold'>
          Frontend Engineer
        </h1>

        <p className='text-[16px] text-[#888780] mb-2 font-semibold'>
          {job.companyName}
        </p>

        <p className='text-[12px] text-[#888780]'>
          {job.salaryMin}K–{job.salaryMax}K · Applied{" "}
          {new Date(job.appliedDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>

    <div className='flex gap-4'>
      <div
        className={`${statusStyles[job.status]} rounded-3xl pl-2 pr-2 h-7 justify-center flex items-center`}
      >
        {job.status}
      </div>

      <FavouriteButton
        isFavorite={fav}
        onToggle={() => setFav(!fav)}
      />
    </div>
  </div>
))}
            </Card>
            
          </div>
          </div>
      </div>
    </div>
  )
}

export default Applications