import React from 'react'

const Jobcard = ({
  title,
  company,
  date,
  status,
  steps,
  statusColor,
}) => {
  return (
    <div className="bg-[#2a2a28] rounded-2xl p-5 border border-white/10">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-white font-semibold">{title}</h2>
          <p className="text-gray-400 text-sm">{company}</p>
          <p className="text-gray-500 text-sm mt-1">{date}</p>
        </div>

        {/* Status Badge */}
      <span
  className={`px-3 py-1 text-sm rounded-full ${
    statusColor || "bg-[#e5e5e5] text-black"
  }`}
>
  {status}
</span>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            
           <span
  className={`px-3 py-1 rounded-full text-sm ${
    step.active
      ? step.color || "bg-green-200 text-green-800"
      : "bg-[#3a3a38] text-gray-400"
  }`}
>
  {step.label}
</span>

            {index !== steps.length - 1 && (
              <span className="text-gray-500">→</span>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}

export default Jobcard