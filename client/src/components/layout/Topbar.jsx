import Button from "../ui/Button";
import AddJobModal from "../../features/jobs/AddJobModal";
import { useState } from "react";
import { exportJobsToCSV } from "../../utils/exportCSV";

const Topbar = ({ title, subTitle, jobs, onJobAdded, showExport = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddJob = (newJob) => {
    onJobAdded(newJob);
  };

  return (
    <div className="h-28 w-full bg-[#30302e] flex items-center justify-between px-4 text-white border-b border-b-white/16">
      {/* Left side */}
      <div className="flex flex-col pl-5 gap-1">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-[14px] text-[#888780]">{subTitle}</p>
      </div>

      {/* Right side */}
      <div className="flex gap-3 items-center pr-10">
        {showExport && (
  <Button onClick={() => exportJobsToCSV(jobs)}>
    Export CSV
  </Button>
)}
      

        <div>
          <Button onClick={() => setIsOpen(true)}>+ Add Job</Button>

          <AddJobModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onJobAdded={handleAddJob}
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;