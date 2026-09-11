import { useState } from "react";
import CalcButton from './Button'
import './Calculator.css'
import { Calculator } from "lucide-react";

export default function SimpCalculator(){

    const [display,setDisplay] = useState('');

    function appendToDisplay(newValue){
        setDisplay((prev)=>{
            return (prev + String(newValue))
        })
    }
    
    return(
    <div className="calculator">
        <div className="calc-title" >
            <Calculator color="#fff"size={18}/>
            <p>Calculator</p>
        </div>
        <textarea className="display" readOnly value={display} onChange={(e)=>setDisplay(e.target.value)}/>

        <div className="grid" >
        
        <div className="row 1">  
            <CalcButton value="(" setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value=")" setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value="DEL" setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value="AC" setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
        </div>

        <div className="row 2" >
            <CalcButton value={7} setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value={8} setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value={9} setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value="/" setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
        </div>

        <div className="row 3">
            <CalcButton value={4} setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value={5} setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value={6} setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value="*" setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
        </div>

        <div className="row 4">
            <CalcButton value={1} setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value={2} setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value={3} setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value="-" setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
        </div>

        <div className="row 5">
            <CalcButton value={0} setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value="." setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value="=" setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
            <CalcButton value="+" setDisplay={setDisplay} appendToDisplay={appendToDisplay} />
        </div>
        
        </div>
    </div>
    )
}