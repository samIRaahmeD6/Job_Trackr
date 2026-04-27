const CircularProgress = ({ value = 0 }) => {
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);
  const degree = safeValue * 3.6;

  const circleStyle = {
    backgroundImage: `conic-gradient(#65a30d ${degree}deg, #3a3a38 ${degree}deg)`
  };

  return (
    <div className="relative w-28 h-28">
      
      <div
        className="w-full h-full rounded-full"
        style={circleStyle}
      ></div>

      <div className="absolute inset-2 bg-[#30302e] rounded-full flex flex-col items-center justify-center">
        <p className="text-lg font-semibold text-white">{safeValue}%</p>
        <p className="text-xs text-gray-400">match</p>
      </div>

    </div>
  );
};

export default CircularProgress;