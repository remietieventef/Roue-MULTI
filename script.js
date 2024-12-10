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
let easing = 0.1; // Plus petit pour une animation plus douce
let isSpinning = false;

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
        ctx.translate(250, 250);
        ctx.rotate(angle + arc / 2);
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
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

function rotateWheel(ctx, startAngle, gifts, resultDiv) {
    if (isSpinning) return; // Empêche de démarrer une nouvelle rotation avant la fin de la précédente

    isSpinning = true; // Démarre la rotation

    spinAngleStart = Math.random() * 10 + 10; // Une vitesse initiale aléatoire
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000; // Durée de la rotation

    let currentAngle = startAngle;

    function rotate() {
        spinAngleStart *= 1 - easing; // Appliquer un effet de ralentissement
        currentAngle += spinAngleStart; // Incrémenter l'angle de rotation

        drawWheel(ctx, gifts, currentAngle); // Dessiner la roue

        spinTime += 30; // Ajouter du temps à l'animation

        if (spinTime >= spinTimeTotal) {
            const degrees = (currentAngle * 180) / Math.PI + 90; // Convertir en degrés
            const arcd = (arc * 180) / Math.PI; // Longueur d'un arc
            const index = Math.floor((360 - (degrees % 360)) / arcd) % gifts.length;

            resultDiv.textContent = `Résultat: ${gifts[index]}`; // Afficher le résultat
            isSpinning = false; // La rotation est terminée
            return;
        }

        requestAnimationFrame(rotate); // Utiliser requestAnimationFrame pour plus de fluidité
    }

    rotate(); // Lancer la rotation
}

spinButton1.addEventListener("click", () => rotateWheel(ctx1, startAngle1, gifts1, result1));
spinButton2.addEventListener("click", () => rotateWheel(ctx2, startAngle2, gifts2, result2));
spinButton3.addEventListener("click", () => rotateWheel(ctx3, startAngle3, gifts3, result3));

document.getElementById("customizeButton").addEventListener("click", () => {
    document.getElementById("popup").classList.remove("hidden");
});

document.getElementById("saveButton").addEventListener("click", () => {
    gifts1 = [
        document.getElementById("gift1_1").value, 
        document.getElementById("gift2_1").value,
        document.getElementById("gift3_1").value,
        document.getElementById("gift4_1").value,
        document.getElementById("gift5_1").value,
        document.getElementById("gift6_1").value
    ];
    gifts2 = [
        document.getElementById("gift1_2").value,
        document.getElementById("gift2_2").value,
        document.getElementById("gift3_2").value,
        document.getElementById("gift4_2").value,
        document.getElementById("gift5_2").value,
        document.getElementById("gift6_2").value
    ];
    gifts3 = [
        document.getElementById("gift1_3").value,
        document.getElementById("gift2_3").value,
        document.getElementById("gift3_3").value,
        document.getElementById("gift4_3").value,
        document.getElementById("gift5_3").value,
        document.getElementById("gift6_3").value
    ];
    document.getElementById("popup").classList.add("hidden");
    drawWheel(ctx1, gifts1, startAngle1);
    drawWheel(ctx2, gifts2, startAngle2);
    drawWheel(ctx3, gifts3, startAngle3);
});

drawWheel(ctx1, gifts1, startAngle1);
drawWheel(ctx2, gifts2, startAngle2);
drawWheel(ctx3, gifts3, startAngle3);
