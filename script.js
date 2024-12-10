const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultDiv = document.getElementById("result");

const prizes = [
    { label: "Cadeau 1", image: "gift1.png" },
    { label: "Cadeau 2", image: "gift2.png" },
    { label: "Cadeau 3", image: "gift3.png" },
    { label: "Cadeau 4", image: "gift4.png" },
    { label: "Cadeau 5", image: "gift5.png" },
];

let startAngle = 0;
const arc = (2 * Math.PI) / prizes.length;
let spinTimeout = null;
let spinAngle = 0;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    prizes.forEach((prize, i) => {
        const angle = startAngle + i * arc;
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? "#ffcccc" : "#ff9999";
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 200, angle, angle + arc, false);
        ctx.fill();
        ctx.save();
        ctx.translate(
            250 + Math.cos(angle + arc / 2) * 150,
            250 + Math.sin(angle + arc / 2) * 150
        );
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        const img = new Image();
        img.src = prize.image;
        img.onload = () => ctx.drawImage(img, -25, -25, 50, 50);
        ctx.restore();
    });
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

    resultDiv.textContent = `Résultat: ${prizes[index].label}`;
}

spinButton.addEventListener("click", () => {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
});

drawWheel();
