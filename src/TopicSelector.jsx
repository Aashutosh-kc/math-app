import './TopicSelector.css'
function TopicSelector( { onSelect }){
    return (
    <div className='topic-container' onClick={() => onSelect("polar")}>
        <h2>Select your topic</h2>
        <div className='card'>
            <h3>Polar Coordinates</h3>
            <p>Plot any r = f(theta) curve.</p>
        </div>
    </div>
    )
}
export default TopicSelector