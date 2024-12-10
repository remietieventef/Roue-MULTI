const canvas1 = document.getElementById("wheelCanvas1");
const canvas2 = document.getElementById("wheelCanvas2");
const canvas3 = document.getElementById("wheelCanvas3");

const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const ctx3 = canvas3.getContext("2d");

const spinButton1 = document.getElementById("spinButton1");
const spinButton2 = document.getElementById("spinButton2");
const spinButton3 = document.getElementById("spinButton3");

const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");
const result3 = document.getElementById("result3");

let gifts1 = ["Cadeau 1", "Cadeau 2", "Cadeau 3", "Cadeau 4", "Cadeau 5", "Cadeau 6"];
let gifts2 = ["Cadeau 1", "Cadeau 2", "Cadeau 3", "Cadeau 4", "Cadeau 5", "Cadeau 6"];
let gifts3 = ["Cadeau 1", "Cadeau 2", "Cadeau 3", "Cadeau 4", "Cadeau 5", "Cadeau 6"];

let startAngle1 = 0, startAngle2 = 0, startAngle3 = 0;
const arc = (2 * Math.PI) / 6;
let spinTimeout = null;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel(ctx, gifts, startAngle) {
    ctx.clearRect(0, 0, 500, 500);

    gifts.forEach((gift, i) => {
        const angle = startAngle + i * arc;

        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? "#ffcccc" : "#ff9999";
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 200, angle, angle + arc, false);
        ctx.fill();

        ctx.save();
        ctx.translate(250, 
