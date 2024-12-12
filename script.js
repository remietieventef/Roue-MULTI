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

// Variables modifiées
let gifts1 = ["Cadeau 1", "Cadeau 2", "Cadeau 3", "Cadeau 4", "Cadeau 5", "Cadeau 6", "Cadeau 7", "Cadeau 8", "Cadeau 9", "Cadeau 10", "Cadeau 11", "Cadeau 12"];
let gifts2 = ["Cadeau 1", "Cadeau 2", "Cadeau 3", "Cadeau 4", "Cadeau 5", "Cadeau 6", "Cadeau 7", "Cadeau 8", "Cadeau 9", "Cadeau 10", "Cadeau 11", "Cadeau 12"];
let gifts3 = ["Cadeau 1", "Cadeau 2", "Cadeau 3", "Cadeau 4", "Cadeau 5", "Cadeau 6", "Cadeau 7", "Cadeau 8", "Cadeau 9", "Cadeau 10", "Cadeau 11", "Cadeau 12"];

const arc = (2 * Math.PI) / 12; // Mise à jour pour 12 segments

function drawWheel(ctx, gifts, startAngle) {
    ctx.clearRect(0, 0, 500, 500);

    gifts.forEach((gift, i) => {
        const angle = startAngle + i * arc;

        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? "#FF0000" : "#00FF00"; // Rouge et Vert
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 200, angle, angle + arc, false);
        ctx.fill();

        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angle + arc / 2);
        ctx.fillStyle = "#FFFFFF"; // Texte blanc
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(gift, 150, 10);
        ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(250, 250, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.stroke();
}

// Mise à jour de la personnalisation
function updateGifts() {
    gifts1 = Array.from({ length: 12 }, (_, i) => document.getElementById(`gift${i + 1}_1`).value);
    gifts2 = Array.from({ length: 12 }, (_, i) => document.getElementById(`gift${i + 1}_2`).value);
    gifts3 = Array.from({ length: 12 }, (_, i) => document.getElementById(`gift${i + 1}_3`).value);

    drawWheel(ctx1, gifts1, startAngle1);
    drawWheel(ctx2, gifts2, startAngle2);
    drawWheel(ctx3, gifts3, startAngle3);
}

document.getElementById("saveButton").addEventListener("click", () => {
    updateGifts();
    document.getElementById("popup").classList.add("hidden");
});

drawWheel(ctx1, gifts1, startAngle1);
drawWheel(ctx2, gifts2, startAngle2);
drawWheel(ctx3, gifts3, startAngle3);
