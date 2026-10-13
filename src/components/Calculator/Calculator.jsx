import { useEffect, useState } from "react";
import CalcButton from './Button'
import './Calculator.css'
import { Calculator as CalculatorIcon } from "lucide-react";
import { History as HistoryIcon } from 'lucide-react';
import * as math from "mathjs"

export default function SimpCalculator(){

    const [display,setDisplay] = useState('');
    const [history,setHistory] = useState(()=>{
        try{
        const saved = localStorage.getItem('calculator-history');
        return saved?JSON.parse(saved):[];
        }
        catch{
            return [];
        }
    });
    const[showHistory,setShowHistory] = useState(false);

    useEffect(()=>{
        localStorage.setItem('calculator-history',JSON.stringify(history));
    },[history])

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
    <div className="calculator-layout">
    <div className="calculator">
        <div className="calc-title">
            <CalculatorIcon color="#fff" size={24}/>
            <p>Calculator</p>
            <button className={`history-icon ${showHistory ? "active" : ""}`} onClick={() => setShowHistory(prev => !prev)} aria-label="Toggle history"
>
    <HistoryIcon size={24} />
</button>
        </div>
        <textarea className="display" readOnly value={display} />
        
            <div className="grid">
            {keys.map((key, index) => (
                <CalcButton key={index} value={key} setDisplay={setDisplay} appendToDisplay={appendToDisplay} calcEvaluate={calcEvaluate}/>
            ))}
            </div>
        </div>
        {showHistory && (
        <div className="calculator-history">
            <h3>History</h3>
            {history.length === 0 && <p className="history-empty">No history yet</p>}
            {history.map((item, index) => (
                <div className="history-entry" key={index}>
                    <span className="history-expression">{item.expression} =</span>
                    <span className="history-result">{item.result}</span>
                </div>
            ))}
            {history.length !== 0 && (
                <button className="clear-btn" onClick={() => setHistory([])}>Clear</button>
            )}
        </div>
)}
    </div>
    )
}