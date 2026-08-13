import { useState,useRef,useEffect } from "react"
import * as math from "mathjs"
import './PolarCoordinates.css';
import { Table,ChartSpline,ChartPie, PieChart } from 'lucide-react';
function PolarCoordinates() {

    const [input,setInput] = useState("");
    const canvasRef = useRef(null);
    const [showResult, setShowResult] = useState(false);
    const [symmetry, setSymmetry] = useState(null);
    const [plottedEquation, setPlottedEquation] = useState("");
function plotGrid(scale,maxR){
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2;
    const cy = canvas.height /2;
    const lineLength = maxR * scale;

    ctx.fillStyle = "#111111";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;

    for(let r = 1; r <= maxR; r += 1){
        ctx.beginPath();
        ctx.arc(cx,cy,r*scale,0,2*Math.PI);
        ctx.stroke();  
    }
    const step = Math.max(1, Math.ceil(maxR/8));
    for (let r = step; r <= maxR ; r+= step ){
        ctx.fillStyle = "#333";
        ctx.font = "12px sans-serif";
        ctx.fillText(r.toString(),cx + r * scale + 5, cy -5);
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
        ctx.lineTo(cx + lineLength* Math.cos(rad), cy - lineLength * Math.sin(rad));
        ctx.stroke();
       //for 210,240..
       ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(cx - lineLength * Math.cos(rad), cy + lineLength * Math.sin(rad));
        ctx.stroke();
    })
}

useEffect (() =>
    plotGrid(50,5)
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
    if (input === "")
        return;
    setSymmetry(checkSymmetry());
    const points = calculatePoints();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2 ;
    const cy = canvas.height/ 2;

    const maxR = Math.max(...points.map((p)=> Math.abs(p.r)));
    const scale = 220 / maxR;

    plotGrid(scale,maxR);

    ctx.strokeStyle= "#FF6B2B";
    ctx.lineWidth = 1;
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
    setPlottedEquation(input);
}
function checkSymmetry(){
    //for symmetry about x-axis 
    const xSymmetry = majorAngles.every((angle) => {
        const r1 = math.evaluate(input, {theta: torad(angle)})
        const r2 = math.evaluate(input, {theta: torad(360 - angle)})
        return Math.abs(r1 - r2) < 0.01;
    });
    //for symmetry about y-axis 
    const ySymmetry = majorAngles.every((angle) => {
        const r1 = math.evaluate(input, {theta: torad(angle)})
        const r2 = math.evaluate(input, {theta: torad(180 - angle)})
        return Math.abs(r1 - r2) < 0.01;
    })
    //for symmetry about pole
    const poleSymmetry = majorAngles.every((angle) => {
        const r1 = math.evaluate(input, {theta: torad(angle)})
        const r2 = math.evaluate(input, {theta: torad(180 + angle)})
        return Math.abs(r1 - r2) < 0.01;
    })
    return {xSymmetry,ySymmetry,poleSymmetry};
    
}
    
    return (
        <div className = "topic">
            <h1>Polar Coordinates</h1>
                <p className="instructions">Enter your function (use theta for θ) : </p>
                <div className="user-input">
                <input type="text" 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                         plotCurve();
                         console.log("Enter pressed");
                    }
                }}
                placeholder =" e.g. 1 + cos(theta)"
                value ={input}
                />
                <button className = "plot-button" onClick={() => plotCurve()}>Plot</button>
            </div>
            <div className="data">
            {showResult && 
            <>
            
                <div className="table-card">
                <div className="table-title">
                    <Table size={24} color="#FFFF" strokeWidth={1.5}/>
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
                        {tableData.map(({angle,r},index) => (
                            <tr key={index}>
                                <td>{angle}</td>
                                <td>{r}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="desc-card">
                <div className="desc-title"><PieChart size={24} color="#ffff"/><p className="title">Curve Analysis</p></div>
                <p>X-axis: <span className={symmetry?.xSymmetry ? "sym-yes" : "sym-no"}>{symmetry?.xSymmetry ? "Symmetric" : "Not Symmetric"}</span></p>
                <p>Y-axis: <span className={symmetry?.ySymmetry ? "sym-yes" : "sym-no"}>{symmetry?.ySymmetry ? "Symmetric" : "Not Symmetric"}</span></p>
                <p>Pole: <span className={symmetry?.poleSymmetry ? "sym-yes" : "sym-no"}>{symmetry?.poleSymmetry ? "Symmetric" : "Not Symmetric"}</span></p>
            </div>
        
        </>}

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
            {plottedEquation && <p className="graph-equation">r = {plottedEquation}</p>}
            </div>
            </div>
        </div>
    )
}
export default PolarCoordinates