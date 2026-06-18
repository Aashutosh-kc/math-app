import { useState } from "react"
import * as math from "mathjs"
function PolarCoordinates() {
    const [input,setInput] = useState("");
    function calculatePoints(){
        const points = [];
        for (let theta = 0; theta <= 2 * theta * Math.PI; theta += 0.01){
            try{
            const r = math.evaluate(input,{ theta : theta} );
            points.push({theta, r});
            }
            catch{
                return [];
            }
        }
        return points;
    }
    return (
        <div>
        <h1>Polar Coordinates</h1>
        <p>Enter your function (use theta for θ)</p>
        <input type="text" 
        onChange={(e) => setInput(e.target.value)}
        placeholder =" e.g. 1 + cos(theta)"
        value ={input}
        />
        <p>You typed: {input}</p>


        </div>
    )
}
export default PolarCoordinates