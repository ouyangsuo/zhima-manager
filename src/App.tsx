import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/views/dashboard/Dashboard"
import Interview from "@/views/interview/Interview"
import Library from "@/views/libo/Library"
import Mine from "@/views/mine/Mine"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/library" element={<Library />} />
        <Route path="/mine" element={<Mine />} />
      </Routes>
    </Router>
  );
}

export default App;
