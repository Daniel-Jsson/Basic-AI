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