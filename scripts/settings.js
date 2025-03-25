document.addEventListener("DOMContentLoaded", function () {
    const toggleThemeButton = document.getElementById("toggle-theme");
    const timezoneSelect = document.getElementById("timezone-select");
    const defaultViewSelect = document.getElementById("default-view-select");
    const toggleNotificationsButton = document.getElementById("toggle-notifications");
    const talkToChuckButton = document.getElementById("talk-to-chuck");

    // Load saved preferences
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        console.log("Dark mode applied on page load.");
        console.log("Dark mode class applied:", document.body.classList.contains("dark-mode"));
    }
    if (localStorage.getItem("timezone")) {
        timezoneSelect.value = localStorage.getItem("timezone");
    }
    if (localStorage.getItem("defaultView")) {
        defaultViewSelect.value = localStorage.getItem("defaultView");
    }

    // Function to show a temporary popup
    function showPopup(message) {
        const popup = document.createElement("div");
        popup.textContent = message;
        popup.style.position = "fixed";
        popup.style.top = "20px"; // Move the popup to the top
        popup.style.right = "20px"; // Align it to the right
        popup.style.backgroundColor = "#007BFF";
        popup.style.color = "white";
        popup.style.padding = "10px 20px";
        popup.style.borderRadius = "5px";
        popup.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        popup.style.zIndex = "1000";
        popup.style.opacity = "1";
        popup.style.transition = "opacity 0.5s ease-out";

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.style.opacity = "0";
            setTimeout(() => popup.remove(), 500);
        }, 2000);
    }

    // Toggle Light/Dark Mode
    toggleThemeButton.addEventListener("click", function () {
        const isDarkMode = document.body.classList.toggle("dark-mode");
        const theme = isDarkMode ? "dark" : "light";
        localStorage.setItem("theme", theme);
        console.log(`Theme switched to ${theme} mode.`);
        console.log("Dark mode class applied:", document.body.classList.contains("dark-mode"));
        showPopup(`Theme switched to ${theme} mode!`);

        // Ensure dark mode is removed properly
        if (!isDarkMode) {
            document.body.classList.remove("dark-mode");
        }
    });

    // Change Time Zone
    timezoneSelect.addEventListener("change", function () {
        const selectedTimezone = timezoneSelect.value;
        localStorage.setItem("timezone", selectedTimezone);
        showPopup(`Time zone changed to ${selectedTimezone}`);
    });

    // Set Default View
    defaultViewSelect.addEventListener("change", function () {
        const selectedView = defaultViewSelect.value;
        localStorage.setItem("defaultView", selectedView);
        showPopup(`Default view set to ${selectedView}`);
    });

    // Enable/Disable Notifications
    toggleNotificationsButton.addEventListener("click", function () {
        const notificationsEnabled = localStorage.getItem("notifications") === "true";
        localStorage.setItem("notifications", !notificationsEnabled);
        showPopup(`Notifications ${!notificationsEnabled ? "enabled" : "disabled"}!`);
    });

    // Talk to Chuck
    talkToChuckButton.addEventListener("click", function () {
        showPopup("Opening chat with Chuck...");
    });
});
