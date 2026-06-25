import { useState } from "react"
import TopicSelector from "./TopicSelector"
import PolarCoordinates from "./PolarCoordinates"
import './App.css'
import { PencilRuler} from 'lucide-react'

function App(){
  const [topic,setTopic] = useState(null);
  return(
  <>
    <div className="brand" onClick={() => setTopic(null)}>
      < PencilRuler size ={36} color ="#FFFF" />
      <h1 className="title">Locus</h1>
    </div>
    { topic === null && <TopicSelector onSelect={setTopic} />}
    { topic === "polar" && <PolarCoordinates />}
  </>
  )
}
export default App