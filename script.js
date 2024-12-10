const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const editButton = document.getElementById("editButton");
const popup = document.getElementById("popup");
const prizeList = document.getElementById("prizeList");
const saveButton = document.getElementById("saveButton");
const resultDiv = document.getElementById("result");

// Liste initiale des cadeaux
let prizes = ["Cadeau 1", "Cadeau 2", "Cadeau 3", "Cadeau 4", "Cadeau 5"];

let startAngle = 0;
const arc = (2 * Math.PI) / prizes.length;
let spinTimeout = null;
let spinAngle = 0;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les sections avec les noms des cadeaux
    prizes.forEach((prize, i) => {
        const angle = startAngle + i * arc;

        // Dessiner une section
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? "#ffcccc" : "#ff9999";
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 200, angle, angle + arc, false);
        ctx.fill();

        // Dessiner le texte
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angle + arc / 2);
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(prize, 150, 0);
        ctx.restore();
    });

    // Cercle central
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
    const index = Math.floor((360 - (degrees % 360)) / arcd) % prizes.length;

    resultDiv.textContent = `Résultat: ${prizes[index]}`;
}

// Gérer l'ouverture du popup
editButton.addEventListener("click", () => {
    popup.classList.remove("hidden");
    prizeList.innerHTML = "";

    // Créer des champs pour modifier les noms des cadeaux
    prizes.forEach((prize, index) => {
        const li = document.createElement("li");
        const input = document.createElement("input");
        input.type = "text";
        input.value = prize;
        input.dataset.index = index;
        li.appendChild(input);
        prizeList.appendChild(li);
    });
});

// Gérer la sauvegarde des cadeaux
saveButton.addEventListener("click", () => {
    const inputs = prizeList.querySelectorAll("input");
    prizes = Array.from(inputs).map(input => input.value);
    popup.classList.add("hidden");
    drawWheel();
});

// Lancer la roue
spinButton.addEventListener("click", () => {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
});

drawWheel();
