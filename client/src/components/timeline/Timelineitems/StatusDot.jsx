import React from 'react'

const StatusDot = ({ color = "bg-green-500", children }) => {
  return (
   <div className="relative">
      
      {/* Dot */}
      <div className={`absolute -left-9 top-0 w-4 h-4 rounded-full ${color}`}></div>

      {children}
    </div>
  )
}

export default StatusDot