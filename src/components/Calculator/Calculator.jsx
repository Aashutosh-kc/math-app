import { useState } from "react";
import CalcButton from './Button'
import './Calculator.css'
import { Calculator as CalculatorIcon } from "lucide-react";
import * as math from "mathjs"

export default function SimpCalculator(){

    const [display,setDisplay] = useState('');
    const [history,setHistory] = useState([]);

    function appendToDisplay(newValue){
        setDisplay((prev)=>{
            return (prev + String(newValue))
        })
    }

    function calcEvaluate(){
        if (display === "") return;
        try{
            const result = String(math.evaluate(display))
            setHistory((prev)=>[...prev,{expression: display, result: result}]);
            setDisplay(result);
        }
        catch(error){
            console.error(error);
            setDisplay("Error");
        }
    }

    const keys = [
        "(", ")", "DEL", "AC",
        7, 8, 9, "/",
        4, 5, 6, "*",
        1, 2, 3, "-",
        0, ".", "=", "+"
    ];

    return(
    <div className="calculator">
        <div className="calc-title">
            <CalculatorIcon color="#fff" size={18}/>
            <p>Calculator</p>
        </div>
        <textarea className="display" readOnly value={display} />

        <div className="grid">
            {keys.map((key, index) => (
                <CalcButton key={index} value={key} setDisplay={setDisplay} appendToDisplay={appendToDisplay} calcEvaluate={calcEvaluate}/>
            ))}
        </div>
        <div className="calculator-history">
            <h3>History</h3>
            {history.length === 0 && <p>No history yet</p>}
            {history.map((prev,index)=><div className="expression" key={index}>
                <p>{`${prev.expression} = ${prev.result}`}</p>
                
            </div>)}
            {history.length !== 0 && <button className="delete-history" onClick={()=> setHistory([])}>Clear</button>}
        </div>
    </div>
    )
}