import Button from "../ui/Button";
const Topbar = ({ title, subTitle}) => {
  return (
    <div className="h-28 w-full bg-[#30302e] flex items-center justify-between px-4 text-white border-b-1 border-b-white/16">
      
      {/* Left side */}
      <div className="flex flex-col pl-5 gap-1">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-[14px] text-[#888780]">{subTitle}</p>
      </div>
      {/* Right side */}
      <div className="flex gap-3 items-center pr-10">
        <Button>Export CSV</Button>
        <Button>+ Add Job</Button>
      </div>
 
    </div>
  );
};

export default Topbar;