import { NavLink } from "react-router-dom";
import Logo from "../../assets/trackerLogo.png";
import { getProfile } from "../../services/profileService";
import { useState, useEffect } from "react";
// Icons
import { RiDashboardFill } from "react-icons/ri";
import { IoIosDocument } from "react-icons/io";
import { MdFavorite, MdTimeline, MdAutoGraph } from "react-icons/md";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { TbAnalyzeFilled } from "react-icons/tb";
import { GrDocumentPdf } from "react-icons/gr";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 w-full p-2 rounded-md transition ${
      isActive
        ? "bg-white text-[#3B6D11]"
        : "text-white hover:bg-white/10"
    }`;


    const [user, setUser] = useState(null)

    useEffect(() => {
  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      console.log("Profile fetch error:", error);
    }
  };

  fetchProfile(); // ✅ call it here

}, []);
  return (
    <div className="bg-[#30302e] h-screen w-70">

      {/* Logo Section */}
      <div className="h-28 border-r border-b border-white/16">
        <div className="flex items-center pt-8 pl-6 gap-4">
          <img src={Logo} alt="" className="h-8 w-8 rounded-lg" />
          <h3 className="text-white text-lg font-semibold">JobTrackr</h3>
        </div>

        <div className="pl-6 pt-1">
          <p className="text-[#888780] text-[14px]">
            Smart Application Tracker
          </p>
        </div>
      </div>

      {/* Overview */}
      <div className="pl-6 pt-4 pb-2 border-r border-r-white/16">
        <h4 className="text-[#888780] font-semibold text-sm">OVERVIEW</h4>
      </div>

      <div className="flex flex-col px-6 pb-4 space-y-3 border-r border-r-white/16">
        <NavLink to="/dashboard" className={linkClass}>
          <RiDashboardFill />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/applications" className={linkClass}>
          <IoIosDocument />
          <span>Applications</span>
        </NavLink>

        <NavLink to="/favourites" className={linkClass}>
          <MdFavorite />
          <span>Favourites</span>
        </NavLink>
      </div>

      {/* Tracking */}
      <div className="pl-6 pt-2 pb-2 border-r border-r-white/16">
        <h4 className="text-[#888780] font-semibold text-sm">TRACKING</h4>
      </div>

      <div className="flex flex-col px-6 pb-4 space-y-3 border-r border-r-white/16">
        <NavLink to="/timeline" className={linkClass}>
          <MdTimeline />
          <span>Timeline</span>
        </NavLink>

        <NavLink to="/reminders" className={linkClass}>
          <RiNotificationBadgeFill />
          <span>Reminders</span>
        </NavLink>
      </div>

      {/* Tools */}
      <div className="pl-6 pt-2 pb-2 border-r border-r-white/16">
        <h4 className="text-[#888780] font-semibold text-sm">INTELLIGENCE</h4>
      </div>

      <div className="flex flex-col px-6 space-y-3 border-r border-r-white/16">
        <NavLink to="/resume-analyzer" className={linkClass}>
          <TbAnalyzeFilled />
          <span>Resume Analyzer</span>
        </NavLink>

        <NavLink to="/resume" className={linkClass}>
          <GrDocumentPdf />
          <span>Resume</span>
        </NavLink>

        <NavLink to="/skill-gaps" className={linkClass}>
          <MdAutoGraph />
          <span>Skill Gaps</span>
        </NavLink>
      </div>
      <div className="h-5 border-b border-white/16 border-r border-r-white/16">
      <div className="pt-8 pl-6 flex items-center gap-3">
        <div  className="h-8 w-8 rounded-full bg-white text-[#A32D2D] font-semibold flex justify-center items-center" >{user ? user.avatarInitials : ""}</div>
        <div className="flex flex-col"><h1 className="text-white  border-r-white/16">{user ? `${user.firstName} ${user.lastName}` : "Loading..."}</h1>
        <p className="text-[#888780] text-[10px] font-medium">{user ? user.role : ""}</p></div>
      </div>
      
      </div>
    </div>
  );
}