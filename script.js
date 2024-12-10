const wheels = [
    {
        canvas: document.getElementById("wheelCanvas1"),
        spinButton: document.getElementById("spinButton1"),
        resultDiv: document.getElementById("result1"),
        gifts: ["Cadeau 1", "Cadeau 2", "Cadeau 3", "Cadeau 4", "Cadeau 5", "Cadeau 6"],
        startAngle: 0,
    },
    {
        canvas: document.getElementById("wheelCanvas2"),
        spinButton: document.getElementById("spinButton2"),
        resultDiv: document.getElementById("result2"),
        gifts: ["Cadeau 1", "Cadeau 2", "Cadeau 3", "Cadeau 4", "Cadeau 5", "Cadeau 6"],
        startAngle: 0,
    },
];

const arc = (2 * Math.PI) / 6;
let isPopupVisible = false;

function drawWheel(wheel) {
    const ctx = wheel.canvas.getContext("2d");
    ctx.clearRect(0, 0, wheel.canvas.width, wheel.canvas.height);

    wheel.gifts.forEach((gift, i) => {
        const angle = wheel.startAngle + i * arc;

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

function spinWheel(wheel) {
    const spinAngleStart = Math.random() * 10 + 10;
    let spinTime = 0;
    const spinTimeTotal = Math.random() * 3000 + 4000;

    function rotateWheel() {
        wheel.startAngle += (spinAngleStart * Math.PI) / 180;
        drawWheel(wheel);
        spinTime += 30;

        if (spinTime >= spinTimeTotal) {
            stopWheel(wheel);
            return;
        }
        setTimeout(rotateWheel, 30);
    }

    rotateWheel();
}

function stopWheel(wheel) {
    const degrees = (wheel.startAngle * 180) / Math.PI + 90;
    const arcd = (arc * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd) % wheel.gifts.length;

    wheel.resultDiv.textContent = `Résultat: ${wheel.gifts[index]}`;
}

document.getElementById("customizeButton").addEventListener("click", () => {
    const popup = document.getElementById("popup");
    popup.style.visibility = isPopupVisible ? "hidden" : "visible";
    isPopupVisible = !isPopupVisible;
});

document.getElementById("saveButton").addEventListener("click", () => {
    const form = document.getElementById("customizeForm");
    wheels.forEach((wheel, index) => {
        const giftInputs = form.querySelectorAll(`input[id^="gift"]`);
        wheel.gifts = Array.from(giftInputs).map(input => input.value || `Cadeau ${index + 1}`);
        drawWheel(wheel);
    });
    document.getElementById("popup").style.visibility = "hidden";
});

wheels.forEach(wheel => {
    drawWheel(wheel);

    wheel.spinButton.addEventListener("click", () => {
        spinWheel(wheel);
    });
});
