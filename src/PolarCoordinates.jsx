import { useState,useRef,useEffect } from "react"
import * as math from "mathjs"
function PolarCoordinates() {
    const [input,setInput] = useState("");
    const canvasRef = useRef(null);

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

function plotCurve(){
    const points = calculatePoints();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2 ;
    const cy = canvas.height/ 2;
    const scale = 50;
    plotGrid();

    ctx.strokeStyle= "#00FF99";
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
        <button onClick={() => plotCurve()}>Plot</button>
        <canvas 
        ref={canvasRef}
            height = {500}
            width = {500}
            style={{ border: "1px solid black", display: "block", marginTop: "20px" }}
        />
        </div>
    )
}
export default PolarCoordinates