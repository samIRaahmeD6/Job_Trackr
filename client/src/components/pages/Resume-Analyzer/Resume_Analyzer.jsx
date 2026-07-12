import React, { useState } from 'react'
import Topbar from '../../layout/Topbar'
import Sidebar from '../../layout/Sidebar'
import Card from '../../ui/Card'
import JobDescriptionBox from '../../ui/JobDescriptionBox'
import AnalyzeButton from '../../ui/AnalyzeButton'
import MatchScoreSection from '../../ui/MatchScoreSection'
import { analyzeJobDescription } from "../../../services/resumeServices";

const Resume_Analyzer = ({ children }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
  if (!jobDescription.trim()) {
    setError("Please paste a job description first.");
    return;
  }
  setError("");
  setLoading(true);
  try {
    const data = await analyzeJobDescription(jobDescription);
    setResult(data);
  } catch (err) {
    console.error("Analyze error:", err);
    setError(err.response?.data?.message || "Failed to analyze. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar title="Resume Analyzer" subTitle="Compare your resume to any job description" />

        <div className="flex-1 p-6 bg-[#141413] overflow-auto">
          {children}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#141413]">
            {/* Left Card */}
            <Card title="Job description">
              <JobDescriptionBox
                text={jobDescription}
                onChange={setJobDescription}
              />
              <AnalyzeButton onClick={handleAnalyze} loading={loading} />
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </Card>

            {/* Right Card */}
            <Card title="Match score">
              <MatchScoreSection result={result} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume_Analyzer