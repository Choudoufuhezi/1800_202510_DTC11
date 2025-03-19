document.addEventListener("DOMContentLoaded", function () {
    // Apply saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Apply other settings if needed
    const timezone = localStorage.getItem("timezone");
    const defaultView = localStorage.getItem("defaultView");
    const notificationsEnabled = localStorage.getItem("notifications") === "true";

    console.log(`Timezone: ${timezone}, Default View: ${defaultView}, Notifications: ${notificationsEnabled}`);
});
