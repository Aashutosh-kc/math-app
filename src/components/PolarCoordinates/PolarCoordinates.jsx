import { useState, useRef, useEffect, useMemo } from "react"
import * as math from "mathjs"
import './PolarCoordinates.css'
import { Table, ChartSpline, PieChart } from 'lucide-react'

const ANGLES = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360]
const toRad = deg => (Math.PI / 180) * deg

const TRY_EXAMPLES = [
    { label: "1 + cos(θ)", value: "1 + cos(theta)" },
    { label: "2 sin(3θ)", value: "2 * sin(3*theta)" },
    { label: "circle", value: "5" },
]

// evaluates r for a given theta; returns null if invalid, empty, or non-numeric
const safeEval = (expr, theta) => {
    try {
        const r = math.evaluate(expr, { theta })
        return typeof r === "number" ? r : null
    } catch {
        return null
    }
}

export default function PolarCoordinates() {
    const [input, setInput] = useState("")
    const [plottedEquation, setPlottedEquation] = useState("")
    const [symmetry, setSymmetry] = useState(null)
    const canvasRef = useRef(null)

    // recompute curve points only when a new equation is plotted
    const points = useMemo(() => {
        const pts = []
        for (let theta = 0; theta <= 2 * Math.PI; theta += 0.01) {
            const r = safeEval(plottedEquation, theta)
            if (r === null) return []
            pts.push({ r, theta })
        }
        return pts
    }, [plottedEquation])

    // live preview table, updates as the user types
    const tableData = ANGLES.map(angle => {
        const r = safeEval(input, toRad(angle))
        return { angle, r: r === null ? "error" : r.toFixed(3) }
    })

    function drawGrid(scale, maxR) {
        const ctx = canvasRef.current.getContext("2d")
        const cx = 250, cy = 250, len = maxR * scale

        ctx.fillStyle = "#111"
        ctx.fillRect(0, 0, 500, 500)

        // concentric reference circles
        ctx.strokeStyle = "#333"
        for (let r = 1; r <= maxR; r++) {
            ctx.beginPath()
            ctx.arc(cx, cy, r * scale, 0, 2 * Math.PI)
            ctx.stroke()
        }

        // radius number labels
        const step = Math.max(1, Math.ceil(maxR / 8))
        ctx.fillStyle = "#333"
        ctx.font = "12px sans-serif"
        for (let r = step; r <= maxR; r += step) {
            ctx.fillText(r.toString(), cx + r * scale + 5, cy - 5)
        }

        // axes
        ctx.strokeStyle = "#fff"
        ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(500, cy); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, 500); ctx.stroke()

        // angle guide lines
        ctx.strokeStyle = "#333"
        ;[0, 30, 45, 60, 90, 120, 135, 150].forEach(deg => {
            const rad = toRad(deg)
            ctx.beginPath()
            ctx.moveTo(cx, cy)
            ctx.lineTo(cx + len * Math.cos(rad), cy - len * Math.sin(rad))
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(cx, cy)
            ctx.lineTo(cx - len * Math.cos(rad), cy + len * Math.sin(rad))
            ctx.stroke()
        })
    }

    // initial empty grid on first load
    useEffect(() => drawGrid(50, 5), [])

    // redraw grid + curve whenever memoized points change
    useEffect(() => {
        if (!points.length) return
        const cx = 250, cy = 250
        const maxR = Math.ceil(Math.max(...points.map(p => Math.abs(p.r))))
        const scale = 220 / maxR

        drawGrid(scale, maxR)

        const ctx = canvasRef.current.getContext("2d")
        ctx.strokeStyle = "#FF6B2B"
        ctx.beginPath()
        points.forEach(({ r, theta }, i) => {
            const x = cx + r * Math.cos(theta) * scale
            const y = cy - r * Math.sin(theta) * scale
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        })
        ctx.stroke()
    }, [points])

    function checkSymmetry() {
        const test = offset => ANGLES.every(a => {
            const r1 = safeEval(input, toRad(a))
            const r2 = safeEval(input, toRad(offset(a)))
            return r1 !== null && r2 !== null && Math.abs(r1 - r2) < 0.01
        })
        return {
            xSymmetry: test(a => 360 - a),
            ySymmetry: test(a => 180 - a),
            poleSymmetry: test(a => 180 + a),
        }
    }

    function plotCurve() {
        if (!input) return
        setSymmetry(checkSymmetry())
        setPlottedEquation(input)
    }

    return (
        <div className="topic">
            <h1>Polar Coordinates</h1>
            <p className="instructions">Enter your function (use theta for θ):</p>

            <div className="search-bar">
                <span className="prefix">r =</span>
                <input
                    type="text"
                    value={input}
                    placeholder="1 + cos(theta)"
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && plotCurve()}
                />
                <button className="plot-button" onClick={plotCurve}>Plot curve</button>
            </div>

            <div className="try-row">
                <span className="try-label">Try:</span>
                {TRY_EXAMPLES.map(ex => (
                    <button key={ex.label} className="try-chip" onClick={() => setInput(ex.value)}>
                        {ex.label}
                    </button>
                ))}
            </div>

            <div className="data">
                <div className="graph">
                    <div className="graph-title">
                        <ChartSpline color="#fff" />
                        <p>Graph</p>
                    </div>
                    <canvas ref={canvasRef} height={500} width={500} className="polar-canvas" />
                    {plottedEquation && <p className="graph-equation">r = {plottedEquation}</p>}
                </div>

                {plottedEquation && (
                    <>
                        <div className="table-card">
                            <div className="table-title">
                                <Table size={24} color="#fff" strokeWidth={1.5} />
                                <p>r - θ Table</p>
                            </div>
                            <table className="polar-table">
                                <thead><tr><th>θ (degrees)</th><th>r</th></tr></thead>
                                <tbody>
                                    {tableData.map(({ angle, r }) => (
                                        <tr key={angle}><td>{angle}</td><td>{r}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="desc-card">
                            <div className="desc-title">
                                <PieChart size={24} color="#fff" />
                                <p className="title">Curve Analysis</p>
                            </div>
                            {["xSymmetry", "ySymmetry", "poleSymmetry"].map((key, i) => (
                                <p key={key}>
                                    {["X-axis", "Y-axis", "Pole"][i]}:{" "}
                                    <span className={symmetry?.[key] ? "sym-yes" : "sym-no"}>
                                        {symmetry?.[key] ? "Symmetric" : "Not Symmetric"}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}