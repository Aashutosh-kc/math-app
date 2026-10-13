import './Button.css'

function getButtonType(value){
    if (value === "AC" || value === "DEL") return "action";
    if (value === "+" || value === "-" || value === "*" || value === "/" || value === "%") return "operator";
    if (value === "=") return "equal";
    return "number";
}

export default function CalcButton({value,setDisplay,appendToDisplay,setHistory,calcEvaluate}){

    const buttonType = getButtonType(value);

    return(
        <button className={`basic-btn ${buttonType}`}
            onClick={()=> {
                if (value === "="){
                    calcEvaluate();
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