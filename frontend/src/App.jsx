import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watch from "./pages/Watch";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Channel from "./pages/Channel";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/history" element={<History />} />
      <Route path="/channel/:username" element={<Channel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;