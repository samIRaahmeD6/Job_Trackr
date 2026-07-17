import React, { useState, useEffect } from "react";
import Topbar from "../../layout/Topbar";
import Sidebar from "../../layout/Sidebar";
import Jobcard from "../../timeline/Card/Jobcard";
import StatusDot from "../../timeline/Timelineitems/StatusDot";
import TImeline from "../../timeline/Timelineitems/TImeline";
import { getTimelineJobs } from "../../../services/timelineService";

const Timeline = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const data = await getTimelineJobs();
        setJobs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTimeline();
  }, []);

  // format helper
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar
          title="Timeline"
          subTitle="Visual progression of your applications"
        />

        {/* Page content */}
        <div className="flex-1 p-4 bg-[#141413] overflow-auto">
          {children}

          <div className="flex ml-4 mt-4 mb-6 mr-4 gap-4">
            <p className="text-[#888780]">
              Visual progression of all your applications over time.
            </p>
          </div>

          <div className="bg-[#141413] min-h-screen p-6">
            <TImeline>
              {jobs.map((job) => {
                const startDate = job.timeline?.[0]?.date;
                const endDate =
                  job.timeline?.[job.timeline.length - 1]?.date;

                const dateRange =
                  startDate && endDate
                    ? `${formatDate(startDate)} → ${formatDate(endDate)}`
                    : startDate
                    ? formatDate(startDate)
                    : "No timeline";

                return (
                  <StatusDot
                    key={job._id}
                    color={
                      job.status === "Interview"
                        ? "bg-[#EF9F27]"
                        : job.status === "Offer"
                        ? "bg-[#97C459]"
                        : job.status === "Rejected"
                        ? "bg-[#E24B4A]"
                        : "bg-[#378ADD]"
                    }
                  >
                    <Jobcard
                      title={job.position}
                      company={job.companyName}
                      date={dateRange}
                      status={job.status}
                      statusColor={
                        job.status === "Interview"
                          ? "bg-[#FAEEDA] text-[#854F0B]"
                          : job.status === "Offer"
                          ? "bg-[#EAF3DE] text-[#3B6D11]"
                          : job.status === "Rejected"
                          ? "bg-[#FCEBEB] text-[#A32D2D]"
                          : "bg-[#E6F1FB] text-[#185FA5]"
                      }
                      steps={(job.timeline || []).map((item) => ({
                        label: item.stage,
                        active: true,
                        color:
                          item.stage === "Rejected"
                            ? "bg-[#FCEBEB] text-[#A32D2D]"
                            : item.stage === "Interview"
                            ? "bg-[#FAEEDA] text-[#854F0B]"
                            : "bg-[#EAF3DE] text-[#3B6D11]",
                      }))}
                    />
                  </StatusDot>
                );
              })}
            </TImeline>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;