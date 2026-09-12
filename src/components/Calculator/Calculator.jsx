import { useState } from "react";
import CalcButton from './Button'
import './Calculator.css'
import { Calculator as CalculatorIcon } from "lucide-react";

export default function SimpCalculator(){

    const [display,setDisplay] = useState('');

    function appendToDisplay(newValue){
        setDisplay((prev)=>{
            return (prev + String(newValue))
        })
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
                <CalcButton key={index} value={key} setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            ))}
        </div>
    </div>
    )
}