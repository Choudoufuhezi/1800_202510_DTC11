document.addEventListener("DOMContentLoaded", function () {
    const calendarElement = document.getElementById("calendar");
    const monthYearElement = document.getElementById("month-year");
    let currentDate = new Date();

    // Function to generate the calendar
    function generateCalendar(tasks) {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();


        monthYearElement.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${currentYear}`;

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const taskIds = 0
        let calendarHTML = "";
        let dayCounter = 1;

        for (let week = 0; week < 6; week++) {
            calendarHTML += "<tr>";
            for (let day = 0; day < 7; day++) {
                if (week === 0 && day < firstDayOfMonth) {
                    calendarHTML += "<td></td>";
                } else if (dayCounter > daysInMonth) {
                    calendarHTML += "<td></td>";
                } else {
                    const taskHTML = tasks
                        .filter(task => {
                            const taskDate = new Date(task.date);
                            console.log(task)

                            return (
                                taskDate.getDate() === dayCounter &&
                                taskDate.getMonth() === currentMonth &&
                                taskDate.getFullYear() === currentYear
                            );
                        })
                        .map(task => {
                            const taskDate = new Date(task.date);
                            const time = taskDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            return `<a href="modify_tasks.html?id=${task.id}" class="task-link">
                                <div class="event">${task.name}<br>${time}</div>
                            </a>`;
                        })
                        .join("");

                    calendarHTML += `<td>${dayCounter}${taskHTML}</td>`;
                    dayCounter++;
                }
            }
            calendarHTML += "</tr>";
        }

        calendarElement.querySelector("tbody").innerHTML = calendarHTML;

        // Apply dark mode styles dynamically if the body has the dark-mode class
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.add("dark-mode");
        }
    }

    function updateCalendar(direction) {
        currentDate.setMonth(currentDate.getMonth() + direction);
        firebase.auth().onAuthStateChanged(user => {
            if (!user) return;
            db.collection("tasks")
                .where("uid", "==", user.uid)
                .get()
                .then(querySnapshot => {
                    const tasks = querySnapshot.docs.map(doc => {
                        const task = doc.data();
                        task.id = doc.id;
                        return task;
                    });
                    generateCalendar(tasks);
                });
        });
    }

    document.getElementById("next-month").addEventListener("click", () => updateCalendar(1));
    document.getElementById("prev-month").addEventListener("click", () => updateCalendar(-1));

    // Fetch tasks from Firestore and generate the calendar
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            console.log("No user is logged in.");
            calendarElement.innerHTML = "<p>Please log in to view your calendar.</p>";
            return;
        }

        db.collection("tasks")
            .where("uid", "==", user.uid)
            .get()
            .then(querySnapshot => {
                const tasks = querySnapshot.docs.map(doc => {
                    const task = doc.data();
                    task.id = doc.id; // Include the task ID for linking
                    return task;
                });
                generateCalendar(tasks);
            })
            .catch(error => {
                console.error("Error loading tasks: ", error);
                calendarElement.innerHTML = "<p>Error loading calendar. Please try again later.</p>";
            });
    });
});
