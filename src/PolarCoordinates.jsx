import { useState,useRef,useEffect } from "react"
import * as math from "mathjs"
import './PolarCoordinates.css';
import { Table,ChartSpline } from 'lucide-react';
function PolarCoordinates() {
    const [input,setInput] = useState("");
    const canvasRef = useRef(null);
    const [showResult, setShowResult] = useState(false);
function plotGrid(){
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2;
    const cy = canvas.height /2;
    
    ctx.fillStyle = "#111111";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    for(let r = 50; r <= 250; r += 50){
        ctx.beginPath();
        ctx.arc(cx,cy,r,0,2*Math.PI);
        ctx.stroke();  
    }
    

    //x-axis
    ctx.beginPath();
    ctx.strokeStyle= "#fff";
    ctx.moveTo(0,cy);
    ctx.lineTo(canvas.width,cy);
    ctx.stroke();

    //y-axis
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.moveTo(cx,0);
    ctx.lineTo(cx,canvas.width);
    ctx.stroke();


    // angle lines
    const angles = [0,30,45,60,90,120,135,150];
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 1
    angles.forEach((deg)=>{
        const rad = Math.PI /180 * deg;
        //for 30,60,...
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(cx + 250 * Math.cos(rad), cy - 250 * Math.sin(rad));
        ctx.stroke();
       //for 210,240..
       ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(cx - 250 * Math.cos(rad), cy + 250 * Math.sin(rad));
        ctx.stroke();
    })
}
useEffect (() =>
    plotGrid()
    ,[]);

function calculatePoints(){
    const points = [];
    for (let theta= 0; theta <= 2 * Math.PI; theta += 0.01){
        try{
        const r = math.evaluate(input,{theta: theta});
        points.push({r,theta});
        }
        catch{
            return [];
        }
    }
    return points;
}
function torad(deg){
    const rad = Math.PI/180 * deg;
    return rad;
}

const majorAngles = [
    0,30,45,60,90,
    120,135,150,180,
    210,225,240,270,
    300,315,330,360
];

const tableData = majorAngles.map((angle) => {
    try{
    const r = math.evaluate(input,{theta: torad(angle)});
    return {
        angle,
        r: r.toFixed(3)
    }}
    catch{
        return {
            angle,
            r: "error",
        }
    }
});

function plotCurve(){
    const points = calculatePoints();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2 ;
    const cy = canvas.height/ 2;
    const scale = 50;
    plotGrid();

    ctx.strokeStyle= "#FF6B2B";
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach(({r,theta},index)  => {
        
        const x = cx + r * Math.cos(theta)*scale;
        const y = cy - r * Math.sin(theta)*scale;
        if (index === 0 ) {
            ctx.moveTo(x,y);
        }
        else{
            ctx.lineTo(x,y);
        }
       
    } );
    ctx.stroke();
    setShowResult(true);
}

    
    return (
        <div className = "topic">
            <h1>Polar Coordinates</h1>
                <p className="instructions">Enter your function (use theta for θ) : </p>
                <div className="user-input">
                <input type="text" 
                onChange={(e) => setInput(e.target.value)}
                placeholder =" e.g. 1 + cos(theta)"
                value ={input}
                />
                <button className = "plot-button" onClick={() => plotCurve()}>Plot</button>
            </div>
            <div className="data">
            { showResult && <>
            <div className="table-card">
             <div className="table-title">
            < Table size={24} color="#FFFF" strokeWidth={1.5}/>
             <p>r - θ Table</p>
             </div>
            <table className="polar-table">
            <thead>
            <tr>
                <th>θ (degrees)</th>
                <th>r</th>
            </tr>
            </thead>
            <tbody>
                {tableData.map(({angle,r},index) =>
                (<tr key={index}>
                    <td>{angle}</td>
                    <td>{r}</td>
                </tr>))
                }
            </tbody>
            </table>
            </div>
            </>
                }

            <div className="graph">
            <div className="graph-title">
                <ChartSpline color="#fff"/>
                <p>Graph</p>
            </div>
            <canvas 
            ref={canvasRef}
                height = {500}
                width = {500}
                className ="polar-canvas"
            />
            </div>
            </div>
        </div>
    )
}
export default PolarCoordinates