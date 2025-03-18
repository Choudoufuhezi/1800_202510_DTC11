// Use this as a template for diffrent functionalities to be included
// Works in tandem with html.html

document.addEventListener("DOMContentLoaded", function () {
    // Real-Time Clock
    function updateClock() {
        const clockElement = document.getElementById("clock");
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        clockElement.textContent = timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Timer System
    const timerInput = document.getElementById("timer-input");
    const startTimerBtn = document.getElementById("start-timer");
    const timerDisplay = document.getElementById("timer-display");
    const background = document.getElementById("background-colorizer");
    let timerInterval;

    startTimerBtn.addEventListener("click", function () {
        if (timerInterval) clearInterval(timerInterval);
        let timeLeft = parseInt(timerInput.value, 10);
        if (isNaN(timeLeft) || timeLeft <= 0) {
            alert("Please enter a valid number of seconds.");
            return;
        }
        const totalTime = timeLeft;

        function updateTimer() {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "Time's up!";
                return;
            }
            timerDisplay.textContent = `${timeLeft} seconds remaining`;

            // Gradually change the background from blue to red
            let redIntensity = Math.min(255, Math.floor((1 - timeLeft / totalTime) * 255));
            background.style.backgroundColor = `rgb(${redIntensity}, 0, ${255 - redIntensity})`;

            timeLeft--;
        }

        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    });

    // Cool Animated Notification with White Checkmark
    const notificationButton = document.createElement("button");
    notificationButton.textContent = "Show Notification";
    notificationButton.style.padding = "10px 20px";
    notificationButton.style.fontSize = "16px";
    notificationButton.style.cursor = "pointer";
    document.body.appendChild(notificationButton);

    notificationButton.addEventListener("click", showNotification);

    function showNotification() {
        const notification = document.createElement("div");
        notification.style.position = "fixed";
        notification.style.top = "50%";
        notification.style.left = "50%";
        notification.style.width = "100px";
        notification.style.height = "100px";
        notification.style.display = "flex";
        notification.style.alignItems = "center";
        notification.style.justifyContent = "center";
        notification.style.borderRadius = "50%";
        notification.style.transform = "translate(-50%, -50%) scale(0)";
        notification.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-in-out";
        notification.style.zIndex = "9999";

        const checkmark = document.createElement("div");
        checkmark.innerHTML = "&#10003;"; // Unicode checkmark
        checkmark.style.fontSize = "50px";
        checkmark.style.color = "white";
        checkmark.style.fontWeight = "bold";

        notification.appendChild(checkmark);
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = "translate(-50%, -50%) scale(3)";
        }, 10);

        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
});
