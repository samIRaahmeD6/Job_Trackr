import React from 'react'

const TImeline = ({children}) => {
  return (
    <div className="relative pl-10">  {/* IMPORTANT */}
      
      {/* Vertical line */}
      <div className="absolute left-3 top-0 h-full w-[1px] bg-gray-700"></div>

      <div className="space-y-6">
        {children}
      </div>
    </div>
  )
}

export default TImeline