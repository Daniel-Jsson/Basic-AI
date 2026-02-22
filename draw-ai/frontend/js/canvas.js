const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d')

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
const lineWidth = 10;

const getMousePos = (e) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
};

function clearCanvas(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

async function getPrediction() {
    const imageData = canvas.toDataURL["image/png"];

    try {
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: {"Context-Type": "application/json"},
            body: JSON.stringify({image: imageData})
        });

        const result= await response.json();
        console.log("Prediction", result);
        alert(`I am ${Math.round(result.confidence * 100)}% sure that is a ${result.prediction}`)

    } catch (error) {
        console.log("Error connecting to server:", error);
        alert("Server Error. check if app.py is running")
    }
}

const draw = (e) => {
    if(!isPainting) return;

    const pos = getMousePos(e);

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "black";

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
    isPainting = true;
    const pos = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
});

canvas.addEventListener("mouseup", e => {
    isPainting = false;
    ctx.stroke();
});

canvas.addEventListener("mousedown", draw);

canvas.addEventListener("mousemove", draw);