import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import StudentDashboard from "./Components/StudentDashboard";
import ProgramDetails from "./Components/ProgramDetails";
import CouncilDashboard from "./Components/CouncilDashboard";
import StudentProfile from "./Components/StudentProfile";
import About from "./Components/About";
import Program from "./Components/Program";
import CouncilProfile from "./Components/CouncilProfile";
import CouncilProgram from "./Components/CouncilProgram";
import CouncilAbout from "./Components/CouncilAbout";
import JoinedDetails from "./Components/JoinedDetails";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
import Guidelines from "./Components/Guidelines";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/ProgramDetails/:programId" element={<ProgramDetails />} />
        <Route path="/councilDashboard" element={<CouncilDashboard />} />
        <Route path="/StudentProfile" element={<StudentProfile/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/Program" element={<Program/>}/>
        <Route path="/CouncilProfile" element={<CouncilProfile/>}/>
        <Route path="/CouncilProgram" element={<CouncilProgram/>}/>
        <Route path="/CouncilAbout" element={<CouncilAbout/>}/>
        <Route path="/JoinedDetails/:programId" element={<JoinedDetails />} />
        <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
        <Route path="/ResetPassword" element={<ResetPassword/>}/>
        <Route path="/guidelines" element={<Guidelines />} />
      </Routes>
    </Router>
  );
}

export default App;
