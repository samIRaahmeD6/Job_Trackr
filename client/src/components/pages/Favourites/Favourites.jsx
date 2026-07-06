import React, { useState, useEffect } from 'react'
import Topbar from '../../layout/Topbar'
import Sidebar from '../../layout/Sidebar'
import Card from '../../ui/Card'
import FavouriteButton from '../../ui/FavouriteButton'

import { getFavourites, toggleFavorite } from '../../../services/favouriteService'

const statusStyles = {
  Applied: "bg-[#E6F1FB] text-[#185FA5]",
  Interview: "bg-[#FAEEDA] text-[#854F0B]",
  Offer: "bg-[#EAF3DE] text-[#3B6D11]",
  Rejected: "bg-[#FCEBEB] text-[#A32D2D]",
  TechnicalExam: "bg-[#FCEBEB] text-[#A32D2D]",
};

const Favourites = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavourites();
        setFavorites(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavorites();
  }, []);

  // ✅ FIX: missing function
  const handleFavorite = async (id) => {
    try {
      await toggleFavorite(id);

      // remove instantly from UI
      setFavorites((prev) =>
        prev.filter((job) => job._id !== id)
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen">
      
      <Sidebar />

      <div className="flex flex-col flex-1">
        
        <Topbar title="Applications" subTitle="5 priority jobs" />

        <div className="flex-1 p-4 bg-[#141413] overflow-auto">

          {children}

          <div className='flex ml-4 mt-4 mb-6 mr-4 gap-4'>
            <p className='text-[#888780]'>
              Jobs you've marked as priority — review these first.
            </p>
          </div>

          <div className='m-4'>
            {favorites.map((job) => (
              <Card key={job._id}>
                
                <div className='flex justify-between items-center '>

                  <div className='flex gap-4 items-center'>

                    <div className='h-10 w-10 rounded-lg bg-white text-[#3B6D11] font-semibold flex items-center justify-center'>
                      {job.companyName?.charAt(0)}
                    </div>

                    <div>
                      <h1 className='text-white font-semibold'>
                        {job.position}
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

                  <div className='flex gap-4 items-center'>

                    <div className={`${statusStyles[job.status]} rounded-3xl px-3 py-1`}>
                      {job.status}
                    </div>

                    <FavouriteButton
                      isFavorite={job.favorite}
                      onToggle={() => handleFavorite(job._id)}
                    />

                  </div>

                </div>

              </Card>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Favourites