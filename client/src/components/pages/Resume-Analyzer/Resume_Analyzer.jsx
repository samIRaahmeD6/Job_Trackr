import React from 'react'
import Topbar from '../../layout/Topbar'
import Sidebar from '../../layout/Sidebar'
import Card from '../../ui/Card'
import JobDescriptionBox from '../../ui/JobDescriptionBox'
import AnalyzeButton from '../../ui/AnalyzeButton'
import MatchScoreSection from '../../ui/MatchScoreSection'
import CircularProgress from '../../ui/CircularProgress'
const Resume_Analyzer = ({children}) => {
  return (
     <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        
        {/* Topbar */}
        <Topbar title= "Resume Analyzer" subTitle="Compare your resume to any job description" />

        {/* Page content */}
        <div className="flex-1 p-6 bg-[#141413] overflow-auto">
          {children}
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#141413]">
      
      {/* Left Card */}
      <Card title="Job description">
        
        <JobDescriptionBox text="Paste the job description here..." />
       <AnalyzeButton />
      </Card>
   

      {/* Right Card */}
      <Card title="Match score">
        <MatchScoreSection />
      </Card>

    </div>
          </div>
      </div>
    </div>
  )
}

export default Resume_Analyzer