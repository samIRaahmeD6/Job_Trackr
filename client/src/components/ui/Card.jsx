import React from 'react'

const Card = ({title, children,  className = "" }) => {
  return (
    <div className="bg-[#30302e] rounded-2xl mb-4 p-8 shadow-md w-full border-white/16 border ${className}">
      {/* Header */}
      {title && (
        <h2 className="text-white text-lg font-semibold mb-4">
          {title}
        </h2>
      )}

      {/* Body */}
      <div>{children}</div>
    </div>
  )
}

export default Card