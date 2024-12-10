const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const customizeButton = document.getElementById("customizeButton");
const popup = document.getElementById("popup");
const saveButton = document.getElementById("saveButton");
const resultDiv = document.getElementById("result");

// Ajout de 6 sections
let gifts = ["Cadeau 1", "Cadeau 2", "Cadeau 3", "Cadeau 4", "Cadeau 5", "Cadeau 6"];

let startAngle = 0;
const arc = (2 * Math.PI) / gifts.length;
let spinTimeout = null;
let spinAngle = 0;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gifts.forEach((gift, i) => {
        const angle = startAngle + i * arc;

        // Dessiner la section
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? "#ffcccc" : "#ff9999";
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 200, angle, angle + arc, false);
        ctx.fill();

        // Dessiner le texte
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angle + arc / 2);
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(gift, 150, 10);
        ctx.restore();
    });

    // Ajouter une bordure au centre
    ctx.beginPath();
    ctx.arc(250, 250, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.stroke();
}

function rotateWheel() {
    spinAngle += spinAngleStart * Math.PI / 180;
    startAngle += spinAngle;
    drawWheel();
    spinTime += 30;

    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }

    spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = (startAngle * 180) / Math.PI + 90;
    const arcd = (arc * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd) % gifts.length;

    resultDiv.textContent = `Résultat: ${gifts[index]}`;
}

// Bouton pour ouvrir la personnalisation
customizeButton.addEventListener("click", () => {
    popup.classList.remove("hidden");
});

// Bouton pour sauvegarder et fermer la popup
saveButton.addEventListener("click", () => {
    gifts = [
        document.getElementById("gift1").value || "Cadeau 1",
        document.getElementById("gift2").value || "Cadeau 2",
        document.getElementById("gift3").value || "Cadeau 3",
        document.getElementById("gift4").value || "Cadeau 4",
        document.getElementById("gift5").value || "Cadeau 5",
        document.getElementById("gift6").value || "Cadeau 6",
    ];
    popup.classList.add("hidden");
    drawWheel();
});

// Bouton pour tourner la roue
spinButton.addEventListener("click", () => {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
});

drawWheel();
