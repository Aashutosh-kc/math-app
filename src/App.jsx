import { useState } from "react";

import { PencilRuler, MoveUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import TopicSelector from "./TopicSelector";
import PolarCoordinates from "./components/PolarCoordinates/PolarCoordinates";
import SimpCalculator from "./components/Calculator/Calculator";

import "./App.css";

function App() {
    const [topic, setTopic] = useState(null);

    return (
        <>
            <header className="nav-bar">

                <button
                    className="brand"
                    onClick={() => setTopic(null)}
                    aria-label="Go to Locus home"
                >
                    <span className="brand-icon">
                        <PencilRuler
                            size={21}
                            strokeWidth={2.2}
                        />
                    </span>

                    <span className="title">
                        Locus
                    </span>
                </button>


                <a
                    className="github-link"
                    href="https://github.com/Aashutosh-kc/math-app"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaGithub size={19} />

                    <span>GitHub</span>

                    <MoveUpRight
                        size={15}
                        strokeWidth={2}
                    />
                </a>

            </header>


            <main className="page-content">

                {topic === null && (
                    <TopicSelector onSelect={setTopic} />
                )}

                {topic === "Polar Coordinates" && (
                    <PolarCoordinates />
                )}

                {topic === "Calculator" && (
                    <SimpCalculator />
                )}

                {topic === "Partial Derivatives" && (
                    <div className="coming-soon">
                        Coming soon
                    </div>
                )}

            </main>
        </>
    );
}

export default App;