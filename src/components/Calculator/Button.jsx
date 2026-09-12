import './Button.css'
import * as math from "mathjs"

function getButtonType(value){
    if (value === "AC" || value === "DEL") return "action";
    if (value === "+" || value === "-" || value === "*" || value === "/" || value === "%") return "operator";
    if (value === "=") return "equal";
    return "number";
}

export default function CalcButton({value,setDisplay,appendToDisplay}){

    function calcEvaluate(expr){
        try{
            return String(math.evaluate(expr))
        }
        catch{
            return "Error"
        }
    }

    const buttonType = getButtonType(value);

    return(
        <button className={`basic-btn ${buttonType}`}
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