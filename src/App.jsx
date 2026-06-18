import { useState } from "react"
import TopicSelector from "./TopicSelector"
import PolarCoordinates from "./PolarCoordinates"

function App(){
  const [topic,setTopic] = useState(null);
  return(
  <>
    <h1>Math App</h1>
    { topic === null && <TopicSelector onSelect={setTopic} />}
    { topic === "polar" && <PolarCoordinates />}
  </>
  )
}
export default App