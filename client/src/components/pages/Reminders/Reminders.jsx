import React, { useState, useEffect } from "react";
import Topbar from "../../layout/Topbar";
import Sidebar from "../../layout/Sidebar";
import Card from "../../ui/Card";
import { getTimelineJobs } from "../../../services/timelineService";

const Reminders = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getTimelineJobs();
        setJobs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  // Calculate follow-up info
  const getFollowUpInfo = (job) => {
    const appliedDate = new Date(job.appliedDate);

    const followUpDate = new Date(appliedDate);
    followUpDate.setDate(
      appliedDate.getDate() + Number(job.followUp)
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = followUpDate - today;

    const diffDays = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) {
      return {
        label: "Overdue",
        color: "bg-[#FCEBEB] text-[#A32D2D]",
        dot: "bg-[#A32D2D]",
        diffDays,
      };
    }

    if (diffDays === 0) {
      return {
        label: "Due today",
        color: "bg-[#FCEBEB] text-[#A32D2D]",
        dot: "bg-[#A32D2D]",
        diffDays,
      };
    }

    return {
      label: `${diffDays} days left`,
      color: "bg-[#FAEEDA] text-[#854F0B]",
      dot: "bg-[#854F0B]",
      diffDays,
    };
  };

  // Dynamic reminder message
  const getReminderMessage = (job, diffDays) => {
    if (job.status === "Offer") {
      return "Offer received · Decision pending";
    }

    if (job.status === "Rejected") {
      return "Application closed";
    }

    if (job.status === "Interview") {
      if (diffDays < 0) {
        return `Interview done · No update after ${job.followUp} days`;
      }
      return "Interview completed · Awaiting next response";
    }

    if (job.status === "TechnicalExam") {
      if (diffDays < 0) {
        return `Technical exam done · No update after ${job.followUp} days`;
      }
      return "Technical exam completed · Awaiting feedback";
    }

    // Applied / default flow
    if (diffDays < 0) {
      return `No response after ${job.followUp} days · Follow up overdue`;
    }

    if (diffDays === 0) {
      return "Follow up due today";
    }

    return `No response after ${job.followUp} days · Follow up recommended`;
  };

  // Filters
  const activeJobs = jobs.filter((job) =>
    ["Applied", "TechnicalExam", "Interview"].includes(job.status)
  );

  const pendingFollowUps = activeJobs.length;

  const upcomingThisWeek = activeJobs.filter((job) => {
    if (!job.followUp) return false;

    const appliedDate = new Date(job.appliedDate);
    const followUpDate = new Date(appliedDate);

    followUpDate.setDate(
      appliedDate.getDate() + Number(job.followUp)
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return followUpDate >= today && followUpDate <= nextWeek;
  }).length;

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar
          title="Reminders"
          subTitle={`${pendingFollowUps} follow-ups need attention`}
        />

        <div className="flex-1 p-6 bg-[#141413] overflow-auto">
          {children}

          {/* STATS */}
          <div className="flex p-10 gap-20">
            <Card>
              <div className="h-40 flex flex-col p-4 gap-3">
                <p className="text-[#888780]">Pending follow-ups</p>
                <h1 className="text-white text-4xl">
                  {pendingFollowUps}
                </h1>
              </div>
            </Card>

            <Card>
              <div className="h-40 flex flex-col p-6 gap-3">
                <p className="text-[#888780]">Upcoming this week</p>
                <h1 className="text-white text-4xl">
                  {upcomingThisWeek}
                </h1>
              </div>
            </Card>
          </div>

          {/* LIST */}
          <div className="m-8">
            <Card title="Active Reminders">
              <ul>
                {activeJobs.map((job) => {
                  const reminder = getFollowUpInfo(job);
                  const message = getReminderMessage(
                    job,
                    reminder.diffDays
                  );

                  return (
                    <li
                      key={job._id}
                      className="border-b p-4 border-white/16 flex items-center justify-between"
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${reminder.dot}`}
                        ></span>

                        <div>
                          <h1 className="text-white text-[16px] font-semibold">
                            {job.companyName} — {job.position}
                          </h1>

                          <p className="text-[#888780] text-[14px]">
                            {message}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div
                        className={`rounded-3xl px-3 h-7 flex items-center ${reminder.color}`}
                      >
                        {reminder.label}
                      </div>
                    </li>
                  );
                })}

                {activeJobs.length === 0 && (
                  <li className="p-4 text-[#888780] text-center">
                    No active reminders
                  </li>
                )}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;