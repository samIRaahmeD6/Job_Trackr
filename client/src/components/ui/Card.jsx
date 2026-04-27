import React from 'react'

const Card = ({title, children}) => {
  return (
    <div className="bg-[#30302e] rounded-2xl p-6 shadow-md w-full border-white/16 border">
      {/* Header */}
      <h2 className="text-white text-lg font-semibold mb-4">
        {title}
      </h2>

      {/* Body (dynamic content) */}
      <div>{children}</div>
    </div>
  )
}

export default Card