
import './index.css'
import Login from './components/pages/auth/Login'
import Signup from './components/pages/auth/Signup'
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Card from './components/ui/Card';
import { Routes, Route } from "react-router-dom";
import Applications from './components/pages/Applications/Applications';
import Favourites from './components/pages/Favourites/Favourites';
import Timeline from './components/pages/Timeline/Timeline';
import Reminders from './components/pages/Reminders/Reminders';
import Resume_Analyzer from './components/pages/Resume-Analyzer/Resume_Analyzer';
import Resume from './components/pages/Resume/Resume';
import Skill_Gaps from './components/pages/Skill_Gaps/Skill_Gaps';
function App() {

  return (
    // <>
    // <Login />
    // <Signup/>
    // </>
    <Routes>
      <Route path= "/" element={<Login/>}></Route>
      <Route path= "/signup" element= {<Signup/>}></Route>
      <Route path= "/sidebar" element= {<Sidebar/>}></Route>
      <Route path= "/topbar" element= {<Topbar/>}></Route>
      <Route path= "/dashboard" element= {<Dashboard/>}></Route>
      <Route path = "/card" element={<Card/>}></Route>
      <Route path='/applications' element={<Applications/>}></Route>
      <Route path='/favourites' element={<Favourites/>}></Route>
      <Route path='/timeline' element={<Timeline/>}></Route>
      <Route path='/reminders' element={<Reminders/>}></Route>
      <Route path='/resume-analyzer' element={<Resume_Analyzer/>}></Route>
      <Route path='/resume' element={<Resume/>}></Route>
      <Route path='/skill-gaps' element={<Skill_Gaps/>}></Route>
    </Routes>
  )
}

export default App
