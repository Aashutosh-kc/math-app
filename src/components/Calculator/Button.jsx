import './Button.css'
import * as math from "mathjs"
export default function CalcButton({value,setDisplay,appendToDisplay}){

    function calcEvaluate(expr){
        try{
            return String(math.evaluate(expr))
        }
        catch{
            return "Error"
        }
    }

    
    return(
        <button className="basic-btn" 
            onClick={()=> {
                if (value === "="){
                    setDisplay(prev => calcEvaluate(prev))
                }
                else if(value === "AC"){
                    setDisplay('')
                }
                else if(value === "DEL"){
                    setDisplay(prev => prev.slice(0,-1))
                }
                else{
                appendToDisplay(value)
                }
            }
        }>
            {value}
        </button>
    )
}
