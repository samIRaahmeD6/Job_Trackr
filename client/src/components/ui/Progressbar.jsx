import React from 'react'

const Progressbar = ({
  label,
  value,
  max = 100,
  color = "bg-blue-400",
  side_label 
}) => {
  const percentage = (value / max) * 100;

  return (
    <div className="flex items-center gap-4 w-full">
      
      <span className="text-[#888780] text-sm w-20">
        {label}
      </span>

      <div className="flex-1 bg-[#3a3a38] rounded-full h-[10px] overflow-hidden">
        <div
          className={`${color} h-[10px] rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="text-[#888780] text-sm w-6 text-right">
        {side_label}
      </span>

    </div>
  );
};

export default Progressbar;