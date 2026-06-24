import { useState } from "react"
import TopicSelector from "./TopicSelector"
import PolarCoordinates from "./PolarCoordinates"
import './App.css'
function App(){
  const [topic,setTopic] = useState(null);
  return(
  <>
    <h1 className="title">Locus</h1>
    { topic === null && <TopicSelector onSelect={setTopic} />}
    { topic === "polar" && <PolarCoordinates />}
  </>
  )
}
export default App