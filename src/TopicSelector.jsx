import './TopicSelector.css'
import {SquareFunction} from 'lucide-react';
function TopicSelector( { onSelect }){
    return (
    <div className='topic-container' onClick={() => onSelect("polar")}>
        <h2>Select your topic</h2>
        <div className='card'>
            < SquareFunction  size ={36} color = "#FF6B2B" />
            <div className='topic-preview'>
            <h3>Polar Coordinates</h3>
            <p>Plot any r = f(theta) curve.</p>
            </div>
        </div>
    </div>
    )
}
export default TopicSelector