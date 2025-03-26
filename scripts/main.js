function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}

function loadTasks() {
    const taskList = document.getElementById("tasks");
    taskList.innerHTML = "";

    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            console.log("No user is logged in.");
            taskList.innerHTML = "<p>Please log in to view your tasks.</p>";
            return;
        }

        db.collection("tasks").where("uid", "==", user.uid).orderBy("date", "desc").orderBy("importance", "desc").get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                taskList.innerHTML = "<p>No tasks found. Add a task to get started!</p>";
                return;
            }

            query_task(querySnapshot, taskList)

            refreshInterval = setInterval(() => {
                while (taskList.childElementCount != 0) {
                    taskList.removeChild(taskList.firstChild)
                }
                query_task(querySnapshot, taskList)
            }, 30 * 1000);
        }).catch((error) => {
            console.error("Error loading tasks: ", error);
            taskList.innerHTML = "<p>Error loading tasks. Please try again later.</p>";
        });
    });
}

function query_task(querySnapshot, taskList) {
    querySnapshot.forEach((doc) => {
        const task = doc.data();
        const taskId = doc.id;

        const taskDiv = document.createElement("div");
        taskDiv.className = "m-3 bg-white card shadow-sm task-card shadow-lg position-relative";

        // Apply dark mode styles dynamically if the body has the dark-mode class
        if (document.body.classList.contains("dark-mode")) {
            taskDiv.classList.add("dark-mode-task");
        }

        const parse_date = Date.parse(task.date);
        const current_date = Date.parse(new Date());
        const expired = parse_date < current_date;

        if (expired) {
            taskDiv.innerHTML = `
                    <a href="modify_tasks.html?id=${taskId}" class="bg-opacity-25 bg-secondary text-muted">
                        <div class="card-body">
                            <h3>${task.name}</h3>
                            <p>${task.description}</p>
                            <p>DUE: ${task.date}</p>
                            ${render_importance_svg(task.importance)}
                        </div>
                    </a>
                    <button class="btn btn-success position-absolute top-50 end-0 translate-middle-y me-3 rounded-square"
                        onclick="showConfirmation('${taskId}', this)" style="z-index: 2;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </button> 
                `;
        } else {
            taskDiv.innerHTML = `
                    <a href="modify_tasks.html?id=${taskId}" class="stretched-link">
                        <div class="card-body">
                            <h3>${task.name}</h3>
                            <p>${task.description}</p>
                            <p>DUE: ${task.date}</p>
                            ${render_importance_svg(task.importance)}
                        </div>
                    </a>
                    <button class="btn btn-success position-absolute top-50 end-0 translate-middle-y me-3 rounded-square"
                        onclick="showConfirmation('${taskId}', this)" style="z-index: 2;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </button> 
                `;
        }

        if (parse_date == current_date || (current_date <= parse_date + 30000 && current_date >= parse_date)) {
            const modal = new bootstrap.Modal(document.getElementById('messageModal'));
            document.getElementById('modalMessage').innerHTML = `Your task "${task.name}" is due!`;
            modal.show();
        }

        taskList.appendChild(taskDiv);
    });
}

function showConfirmation(taskId, button) {
    const taskCard = button.closest(".task-card");

    // Add a semi-transparent overlay to disable background clicks
    const overlay = document.createElement("div");
    overlay.className = "confirmation-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent background
    overlay.style.zIndex = "3"; // Ensure it is above other elements

    overlay.innerHTML = `
        <div class="bg-white p-3 rounded shadow text-center" style="z-index: 4;">
            <p>Are you sure you want to complete this task?</p>
            <button class="btn btn-danger me-2" onclick="deleteTask('${taskId}', this)">Yes</button>
            <button class="btn btn-secondary" onclick="cancelConfirmation(this)">No</button>
        </div>
    `;

    taskCard.appendChild(overlay);
    button.style.display = "none"; // Hide the original button
}

function cancelConfirmation(button) {
    const overlay = button.closest(".confirmation-overlay");
    const taskCard = overlay.closest(".task-card");
    const completeButton = taskCard.querySelector(".btn-success");

    overlay.remove(); // Remove the confirmation overlay
    if (completeButton) {
        completeButton.style.display = "block"; // Restore the original button
    }
}

async function deleteTask(taskId, button) {
    try {
        await db.collection("tasks").doc(taskId).delete();
        const taskCard = button.closest(".task-card");
        taskCard.remove(); // Remove the task card from the DOM
    } catch (error) {
        console.error("Error deleting task: ", error);
        alert("Failed to delete the task. Please try again.");
    }
}

function render_importance_svg(importance) {
    const importanceColors = {
        1: "#94d82d",
        2: "#1952fc",
        3: "#f1fc19",
        4: "#fcc419",
        5: "#f50000"
    };
    const color = importanceColors[importance] || "#94d82d";

    return `
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="50" height="50" 
             viewBox="0 0 256 256"
             aria-hidden="true">
            <g fill="${color}" fill-rule="nonzero" stroke="none" 
               stroke-width="1" stroke-linecap="butt"
               stroke-linejoin="miter" stroke-miterlimit="10">
                <g transform="scale(8,8)">
                    <path d="M7,5v23l1.59375,-1.1875l7.40625,-5.5625l7.40625,5.5625l1.59375,1.1875v-23zM9,7h14v17l-6.40625,-4.8125l-0.59375,-0.4375l-0.59375,0.4375l-6.40625,4.8125z"/>
                </g>
            </g>
        </svg>
    `;
}

document.addEventListener("DOMContentLoaded", loadTasks);