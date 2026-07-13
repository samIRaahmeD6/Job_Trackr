import React, { useState, useEffect } from 'react'
import Topbar from '../../layout/Topbar'
import Sidebar from '../../layout/Sidebar'
import Card from '../../ui/Card'
import { getSkillGaps, getLearningRoadmap } from '../../../services/skillGapServices'

// Color tiers for the dot + roadmap badge, based on rank
const dotColors = ["#E24B4A", "#E24B4A", "#EF9F27", "#EF9F27", "#97C459"];
const badgeStyles = [
  { bg: "#FCEBEB", text: "#A32D2D" },
  { bg: "#FAEEDA", text: "#854F0B" },
  { bg: "#EAF3DE", text: "#3B6D11" },
  { bg: "#EAF3DE", text: "#3B6D11" },
  { bg: "#EAF3DE", text: "#3B6D11" },
];

const Skill_Gaps = ({ children }) => {
  const [skillGaps, setSkillGaps] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gaps, path] = await Promise.all([
          getSkillGaps(),
          getLearningRoadmap(),
        ]);
        setSkillGaps(gaps || []);
        setRoadmap(path || []);
      } catch (err) {
        console.error("Failed to load skill gap data:", err);
        setError("Failed to load skill gap data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar title="Skill Gaps" subTitle="What to learn based on your rejections" />

        <div className="flex-1 p-8 bg-[#141413] overflow-auto">
          {children}

          {loading ? (
            <p className="text-gray-400">Loading skill gaps...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <div className='flex gap-4'>
              <Card title="Top skill gaps (from rejected jobs)">
                {skillGaps.length === 0 ? (
                  <p className="text-[#888780] text-sm">
                    No skill gaps yet — they'll show up here once you have rejected job applications with matching resume analysis.
                  </p>
                ) : (
                  skillGaps.map((gap, index) => (
                    <div
                      key={gap.skill}
                      className={`flex items-start gap-3 ${
                        index !== skillGaps.length - 1 ? "border-b border-white/16" : ""
                      } ${index === 0 ? "pb-4" : "py-4"}`}
                    >
                      <span
                        className="w-2 h-2 rounded-full mt-2"
                        style={{ backgroundColor: dotColors[Math.min(index, dotColors.length - 1)] }}
                      ></span>

                      <div className='flex justify-between w-full'>
                        <h1 className='text-white font-medium'>{gap.skill}</h1>

                        <div className='flex items-center text-sm gap-6'>
                          <p className='text-[#888780]'>{gap.jobCount} job{gap.jobCount !== 1 ? "s" : ""}</p>
                          <a href="/skill-gaps" className='text-blue-400'>Learn →</a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </Card>

              <Card title="Recommended learning path">
                <div className='flex flex-col gap-4'>
                  {roadmap.length === 0 ? (
                    <p className="text-[#888780] text-sm">
                      Your learning path will appear here once skill gaps are detected.
                    </p>
                  ) : (
                    roadmap.map((item, index) => {
                      const style = badgeStyles[Math.min(index, badgeStyles.length - 1)];
                      return (
                        <div className='flex flex-col' key={item.skill}>
                          <div className='flex flex-col border-1 border-white/16 rounded-lg p-4'>
                            <div className='flex gap-4'>
                              <div
                                className='h-6 w-6 rounded-full flex justify-center'
                                style={{ backgroundColor: style.bg, color: style.text }}
                              >
                                {index + 1}
                              </div>
                              <h1 className='font-medium text-white'>{item.skill}</h1>
                            </div>
                            <div className='flex'>
                              <p className='text-[#888780] text-sm'>
                                {item.rejectionCount} rejection{item.rejectionCount !== 1 ? "s" : ""} mention it · {item.estimatedTime} to learn
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Skill_Gaps