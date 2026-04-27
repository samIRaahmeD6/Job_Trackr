import React from 'react'

const Badge = ({
  label,
  count,
  active = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-full text-sm font-medium transition-all border-white/10 border-1
        ${
          active
            ? "bg-[#3B6D11] text-white"
            : "bg-[#30302e] text-[#888780] hover:bg-[#3a3a38]"
        }`}
    >
      {label} ({count})
    </button>
  );
};

export default Badge;