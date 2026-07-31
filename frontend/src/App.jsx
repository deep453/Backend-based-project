import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout.jsx";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Watch from "./pages/Watch";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Channel from "./pages/Channel";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Keeping your existing placeholder pages as-is until they're built out.
function Explore() {
    return <h1 className="p-7 font-display font-bold text-2xl text-zinc-50">Explore</h1>;
}

function AIHub() {
    return <h1 className="p-7 font-display font-bold text-2xl text-zinc-50">AI Hub</h1>;
}

function Saved() {
    return <h1 className="p-7 font-display font-bold text-2xl text-zinc-50">Saved</h1>;
}

function App() {
    return (
        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Layout />}>

                <Route path="/" element={<Home />} />

                <Route path="/explore" element={<Explore />} />

                <Route path="/ai" element={<AIHub />} />

                <Route path="/saved" element={<Saved />} />

                <Route path="/upload" element={<Upload />} />

                <Route path="/watch/:id" element={<Watch />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/history" element={<History />} />

                <Route path="/search" element={<Search />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route
                    path="/channel/:username"
                    element={<Channel />}
                />

            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default App;
