document.addEventListener("DOMContentLoaded", function () {
    const calendarElement = document.getElementById("calendar");
    const monthYearElement = document.getElementById("month-year");

    function generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const weeks = [];
        let currentDay = 1;

        for (let i = 0; i < 6; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay || currentDay > daysInMonth) {
                    week.push("");
                } else {
                    week.push(currentDay++);
                }
            }
            weeks.push(week);
        }

        return weeks;
    }

    function renderCalendar(year, month) {
        const weeks = generateCalendar(year, month);
        calendarElement.querySelector("tbody").innerHTML = "";
        monthYearElement.textContent = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

        weeks.forEach(week => {
            const row = document.createElement("tr");
            week.forEach(day => {
                const cell = document.createElement("td");
                if (day) {
                    cell.dataset.date = new Date(year, month, day).toISOString().split("T")[0];
                }
                cell.textContent = day || "";
                row.appendChild(cell);
            });
            calendarElement.querySelector("tbody").appendChild(row);
        });
    }

    function loadTasks(year, month) {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                console.log("No user is logged in.");
                return;
            }

            db.collection("tasks")
                .where("uid", "==", user.uid)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.empty) {
                        console.log("No tasks found for the user.");
                        return;
                    }

                    querySnapshot.forEach(doc => {
                        const task = doc.data();
                        const taskDate = new Date(task.date).toISOString().split("T")[0];
                        const taskCell = calendarElement.querySelector(`[data-date="${taskDate}"]`);

                        if (taskCell) {
                            const taskDiv = document.createElement("div");
                            taskDiv.className = "event";
                            taskDiv.innerHTML = `
                                <a href="modify_tasks.html?id=${doc.id}" style="text-decoration: none; color: white;">
                                    ${task.name}<br>${new Date(task.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </a>`;
                            taskCell.appendChild(taskDiv);
                        }
                    });
                })
                .catch(error => {
                    console.error("Error loading tasks: ", error);
                });
        });
    }

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    renderCalendar(currentYear, currentMonth);
    loadTasks(currentYear, currentMonth);
});
