import './TopicSelector.css'
import { SquareFunction, Box, Calculator, ArrowUpRight } from 'lucide-react';
import {Link} from "react-router-dom"
function TopicSelector({  }) {
    const topics = [
        {
            title: "Polar Coordinates",
            description: "Plot r=f(ϴ) graph, show value tables and symmetry check.",
            status: "working",
            icon: SquareFunction
        },
        {
            title: "Calculator",
            description: "A clean fast calculator for everyday work.",
            status: "working",
            icon: Calculator
        },
        {
            title: "Partial Derivatives",
            description: "Visualize f(x,y) as an interactive 3D surface",
            status: "coming-soon",
            icon: Box
        }
    ]

    return (
    <div className='topic-container'>
    <h2>Select your topic</h2>
    <div className="card-grid">
        {topics.map((topic, index) => (
            <Link key={index} to={`/topics/${topic.title}`}>
            <div className={`card ${topic.status === "coming-soon" ? "coming-soon" : ""}`}>
                <div className="card-preview">
                    <topic.icon size={40} strokeWidth={1.8} />
                </div>
                <div className="card-body">
                    <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                    <span className="card-cta">
                        {topic.status === "coming-soon" ? "COMING SOON" : "OPEN"}
                        {topic.status !== "coming-soon" && <ArrowUpRight size={14} strokeWidth={2.5} />}
                    </span>
                </div>
            </div>
        </Link>))}
    </div>
    </div>
    )
}
export default TopicSelector