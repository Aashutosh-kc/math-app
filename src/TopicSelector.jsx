function TopicSelector( { onSelect }){
    return (
    <div>
        <h2>Select your topic</h2>
        <button onClick={() => onSelect("polar")}>Polar Coordinates</button>
    </div>
    )
}
export default TopicSelector