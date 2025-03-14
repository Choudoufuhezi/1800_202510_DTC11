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
    let timerInterval;

    startTimerBtn.addEventListener("click", function () {
        if (timerInterval) clearInterval(timerInterval);
        let timeLeft = parseInt(timerInput.value, 10);
        if (isNaN(timeLeft) || timeLeft <= 0) {
            alert("Please enter a valid number of seconds.");
            return;
        }

        function updateTimer() {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "Time's up!";
                alert("Timer finished!");
                return;
            }
            timerDisplay.textContent = `${timeLeft} seconds remaining`;
            timeLeft--;
        }

        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    });
});
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
    let timerInterval;

    startTimerBtn.addEventListener("click", function () {
        if (timerInterval) clearInterval(timerInterval);
        let timeLeft = parseInt(timerInput.value, 10);
        if (isNaN(timeLeft) || timeLeft <= 0) {
            alert("Please enter a valid number of seconds.");
            return;
        }

        function updateTimer() {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "Time's up!";
                alert("Timer finished!");
                return;
            }
            timerDisplay.textContent = `${timeLeft} seconds remaining`;
            timeLeft--;
        }

        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    });
});
