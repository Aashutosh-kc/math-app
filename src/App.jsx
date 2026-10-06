import { PencilRuler, MoveUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Route, Routes, Outlet } from "react-router-dom";
import TopicSelector from "./TopicSelector";
import PolarCoordinates from "./components/PolarCoordinates/PolarCoordinates";
import SimpCalculator from "./components/Calculator/Calculator";

import "./App.css";

function Layout() {
    return (
        <>
            <header className="nav-bar">
                <a className="brand" href="/" aria-label="Go to Locus home">
                    <span className="brand-icon">
                        <PencilRuler size={21} strokeWidth={2.2} />
                    </span>
                    <span className="title">Locus</span>
                </a>

                <a
                    className="github-link"
                    href="https://github.com/Aashutosh-kc/math-app"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaGithub size={19} />
                    <span>GitHub</span>
                    <MoveUpRight size={15} strokeWidth={2} />
                </a>
            </header>

            <main className="page-content">
                <Outlet />
            </main>
        </>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<TopicSelector />} />
                <Route path="topics/Polar Coordinates" element={<PolarCoordinates />} />
                <Route path="topics/Calculator" element={<SimpCalculator />} />
                <Route path="topics/Partial Derivatives" element={<div className="coming-soon">Coming soon</div>} />
            </Route>
        </Routes>
    );
}

export default App;