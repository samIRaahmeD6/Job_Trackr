import React, { useEffect, useState, useMemo } from 'react'
import Topbar from '../../layout/Topbar'
import Sidebar from '../../layout/Sidebar'
import Card from '../../ui/Card'
import Progressbar from '../../ui/Progressbar'
import TrackerLogo from '../../../assets/trackerLogo.png'
import { getJob, showJobStats } from '../../../services/jobService'
import { getSmartInsights } from '../../../services/insightsService'

const Dashboard = ({ children }) => {
  const [stats, setStats] = useState(null)
  const [jobs, setJobs] = useState([]);
  const [insights, setInsights] = useState([]);
  const [insightsLoading, setInsightsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // stats
        const statsData = await showJobStats();
        setStats(statsData);

        // jobs
        const jobsData = await getJob();
        setJobs(jobsData);

      } catch (error) {
        console.log("Dashboard fetch error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    getSmartInsights()
      .then(setInsights)
      .catch((err) => console.error("Failed to load insights:", err))
      .finally(() => setInsightsLoading(false));
  }, []);

  const getActivityMessage = (stage) => {
    switch (stage) {
      case "Applied":
        return "Application submitted";

      case "Interview":
        return "Interview scheduled";

      case "TechnicalExam":
        return "Technical exam completed";

      case "Offer":
        return "Status moved to Offer";

      case "Rejected":
        return "Application rejected";

      default:
        return "Application updated";
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();

    const past = new Date(date);

    const diffMs = now - past;

    const minutes = Math.floor(diffMs / (1000 * 60));

    const hours = Math.floor(diffMs / (1000 * 60 * 60));

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    if (hours < 24) {
      return `${hours}hr ago`;
    }

    return `${days}d ago`;
  };

  const recentActivities = jobs
    .filter((job) => job.timeline?.length > 0)
    .flatMap((job) =>
      job.timeline.map((item) => ({
        companyName: job.companyName,
        position: job.position,
        stage: item.stage,
        date: item.date,
      }))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const applied = stats?.Applied || 0;
  const interview = stats?.Interview || 0;
  const offer = stats?.Offer || 0;
  const techincalExam = stats?.TechnicalExam || 0
  const rejected = stats?.Rejected || 0;
  const overdue = stats?.overdue || 0;
  const total = applied + interview + offer + rejected;
  const thisWeek = stats?.thisWeekApplied || 0;
  const interviewRate = total ? (interview / total) * 100 : 0;
  const offerRate = total ? (offer / total) * 100 : 0
  const secondRoundRate = total ? (techincalExam / total) * 100 : 0
  const awaiting = Math.max(
    applied - (interview + offer + rejected + techincalExam),
    0
  );
const categorizeRole = (position = "") => {
  const p = position.toLowerCase();
  if (/front.?end|react|vue|angular/.test(p)) return "Frontend Dev";
  if (/back.?end|node|django|spring/.test(p)) return "Backend Dev";
  if (/full.?stack/.test(p)) return "Full Stack Dev";
  if (/flutter|android|\bios\b|mobile/.test(p)) return "Mobile Dev";
  if (/data|machine learning|\bml\b|\bai\b/.test(p)) return "Data/ML";
  if (/devops|cloud|infra/.test(p)) return "DevOps";
  return "Other";
};

const ADVANCED_STAGES = ["Interview", "TechnicalExam", "Offer"];

const wasAdvanced = (job) => {
  if (ADVANCED_STAGES.includes(job.status)) return true;
  return (job.timeline || []).some((t) => ADVANCED_STAGES.includes(t.stage));
};

// Top role: category with the most applications
const topRole = useMemo(() => {
  if (!jobs.length) return "—";
  const counts = {};
  jobs.forEach((job) => {
    const cat = categorizeRole(job.position);
    counts[cat] = (counts[cat] || 0) + 1;
  });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || "—";
}, [jobs]);

// Best source: source with highest advancement rate (min 2 applications), fallback to most frequent
const bestSource = useMemo(() => {
  if (!jobs.length) return "—";

  const bySource = {};
  jobs.forEach((job) => {
    const src = job.source?.trim() || "Unknown";
    if (!bySource[src]) bySource[src] = { total: 0, advanced: 0 };
    bySource[src].total += 1;
    if (wasAdvanced(job)) bySource[src].advanced += 1;
  });

  const eligible = Object.entries(bySource).filter(([, s]) => s.total >= 2);
  const pool = eligible.length ? eligible : Object.entries(bySource);

  const sorted = pool.sort((a, b) => {
    const rateA = a[1].advanced / a[1].total;
    const rateB = b[1].advanced / b[1].total;
    if (rateB !== rateA) return rateB - rateA;
    return b[1].total - a[1].total; // tiebreaker: most applications
  });

  return sorted[0]?.[0] || "—";
}, [jobs]);

// Average response time: days between appliedDate and first status change after "Applied"
const averageResponseDays = useMemo(() => {
  const responseTimes = jobs
    .map((job) => {
      const firstUpdate = (job.timeline || []).find((t) => t.stage !== "Applied");
      if (!firstUpdate) return null;

      const applied = new Date(job.appliedDate);
      const responded = new Date(firstUpdate.date);
      const diffDays = (responded - applied) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 ? diffDays : null;
    })
    .filter((d) => d !== null);

  if (!responseTimes.length) return null;

  const avg = responseTimes.reduce((sum, d) => sum + d, 0) / responseTimes.length;
  return avg.toFixed(1);
}, [jobs]);
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1">

        {/* Topbar */}
        <Topbar title="Dashboard" subTitle="Your job search at a glance" />

        {/* Page content */}
        <div className="flex-1 p-4 bg-[#141413] overflow-auto">
          {children}
          <div className='flex gap-7 ml-4 mt-4 mb-6 mr-4'>
            <div className='bg-[#262624] h-50 w-53 rounded-lg flex flex-col p-8 gap-3'>
              <p className='text-[#888780]'>Total Applied</p>
              <h1 className='text-white text-4xl'>{stats?.Applied || 0}</h1>
              <p className='text-[#3B6D11] text-sm'>+{thisWeek} this week</p>
            </div>
            <div className='bg-[#262624] h-50 w-53 rounded-lg flex flex-col p-8 gap-3'>
              <p className='text-[#888780]'>Technical Exam</p>
              <h1 className='text-white text-4xl'>{stats?.TechnicalExam || 0}</h1>
              <p className='text-[#3B6D11] text-sm'>{secondRoundRate.toFixed(1)}% rate</p>
            </div>
            <div className='bg-[#262624] h-50 w-53 rounded-lg flex flex-col p-8 gap-3'>
              <p className='text-[#888780]'>Interview</p>
              <h1 className='text-white text-4xl'>{stats?.Interview || 0}</h1>
              <p className='text-[#854F0B] text-sm'>{interviewRate.toFixed(1)}% rate</p>
            </div>
            <div className='bg-[#262624] h-50 w-53 rounded-lg flex flex-col p-8 gap-3'>
              <p className='text-[#888780]'>Offer</p>
              <h1 className='text-white text-4xl'>{stats?.Offer || 0}</h1>
              <p className='text-[#3B6D11] text-sm'>{offerRate.toFixed(1)}% rate</p>
            </div>
            <div className='bg-[#262624] h-50 w-53 rounded-lg flex flex-col p-8 gap-3'>
              <p className='text-[#888780]'>Awaiting Reply</p>
              <h1 className='text-white text-4xl'>{awaiting}</h1>
              <p className='text-[#A32D2D] text-sm'>{overdue}  overdue</p>
            </div>

          </div>
          <div className='flex p-4 gap-6 '>
            <Card title="Application Funnel">
              <div className='flex flex-col gap-3 border-b pr-6 pb-6 pt-6 border-white/16'>
                <Progressbar label="Applied" value={stats?.Applied || 0} side_label={stats?.Applied || 0} max={50} color="bg-[#378ADD] " />
                <Progressbar label="Interview" side_label={stats?.Interview || 0} value={stats?.Interview || 0} max={50} color="bg-[#EF9F27]" />
                <Progressbar label="Rejected" side_label={stats?.Rejected || 0} value={stats?.Rejected || 0} max={50} color="bg-[#639922]" />
                <Progressbar label="Pending" side_label={awaiting} value={awaiting} max={50} color="bg-[#E24B4A] " />
              </div>
              <div className='pt-6 flex gap-28'>
  <div>
    <p className='text-[14px] text-[#888780]'>Top role</p>
    <h1 className='text-white'>{topRole}</h1>
  </div>
  <div>
    <p className='text-[14px] text-[#888780]'>Best source</p>
    <h1 className='text-white'>{bestSource}</h1>
  </div>
  <div>
    <p className='text-[14px] text-[#888780]'>Average Response</p>
    <h1 className='text-white'>
      {averageResponseDays !== null ? `${averageResponseDays} days` : "—"}
    </h1>
  </div>
</div>
            </Card>
            <Card title="Smart Insight">
              <div>
                {insightsLoading ? (
                  <p className="text-[#888780] text-sm p-4">Loading insights...</p>
                ) : insights.length === 0 ? (
                  <p className="text-[#888780] text-sm p-4">No insights yet — apply to more jobs to see patterns here.</p>
                ) : (
                  <ul>
                    {insights.map((insight, index) => (
                      <div
                        key={index}
                        className={index !== insights.length - 1 ? "border-b p-4 border-white/16" : "p-4"}
                      >
                        <li className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: insight.color }}
                          ></span>
                          <span className="text-[#888780] text-sm font-medium">
                            <span className="font-bold text-white">{insight.boldText}</span> {insight.text}
                          </span>
                        </li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </div>
          <div className='m-4'>
            <Card title="Recent activity">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className='flex justify-between pb-6 border-b mb-6 border-b-white/16'
                >
                  {/* LEFT */}
                  <div className='flex gap-4 items-center'>
                    <img
                      src={TrackerLogo}
                      alt=""
                      className='h-10 w-10 rounded-lg'
                    />

                    <div>
                      <h1 className='text-white'>
                        {activity.companyName} — {activity.position}
                      </h1>

                      <p className='text-[12px] text-[#888780]'>
                        {getActivityMessage(activity.stage)}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className='flex gap-4 items-center'>
                    <div
                      className={`rounded-3xl pl-2 pr-2 h-7 justify-center flex items-center
                        ${
                          activity.stage === "Offer"
                            ? "bg-[#EAF3DE] text-[#3B6D11]"
                            : activity.stage === "Rejected"
                            ? "bg-[#FCEBEB] text-[#A32D2D]"
                            : activity.stage === "Interview"
                            ? "bg-[#FAEEDA] text-[#854F0B]"
                            : activity.stage === "TechnicalExam"
                            ? "bg-[#E6F1FB] text-[#185FA5]"
                            : "bg-[#EAF3DE] text-[#3B6D11]"
                        }
                      `}
                    >
                      {activity.stage}
                    </div>

                    <div>
                      <p className='text-[#888780]'>
                        {getTimeAgo(activity.date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* EMPTY STATE */}
              {recentActivities.length === 0 && (
                <div className='text-center text-[#888780] py-6'>
                  No recent activity
                </div>
              )}
            </Card>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
