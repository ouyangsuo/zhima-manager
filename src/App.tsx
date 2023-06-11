import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* 一级页面 */
import Dashboard from "@/views/dashboard/Dashboard"
import Interview from "@/views/Interview"
import Library from "@/views/libo/Library"
import Mine from "@/views/mine/Mine"

/* 二级页面 */
import Module from "./views/Interview/Module";
import Question from "@/views/Interview/Question";
import Blog from "@/views/Interview/Blog";
import Video from "@/views/Interview/Video";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* <Route path="/interview" element={<Interview />} /> */}
        <Route path='/interview' element={<Interview />}>
          {/* <Route index element={<Module />} /> */}
          <Route path='module' element={<Module />} />
          <Route path='question' element={<Question />} />
          <Route path='blog' element={<Blog />} />
          <Route path='video' element={<Video />} />
        </Route>

        <Route path="/library" element={<Library />} />

        <Route path="/mine" element={<Mine />} />
      </Routes>
    </Router>
  );
}

export default App;
