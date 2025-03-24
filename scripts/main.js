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

        db.collection("tasks").where("uid", "==", user.uid).orderBy("date", "desc").get().then((querySnapshot) => {
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
        taskDiv.className = "border border-primary m-3 card shadow-sm task-card";

        // Apply dark mode styles dynamically if the body has the dark-mode class
        if (document.body.classList.contains("dark-mode")) {
            taskDiv.classList.add("dark-mode-task");
        }

        const parse_date = Date.parse(task.date)
        const current_date = Date.parse(new Date())
        const expired = parse_date < current_date

        if (expired) {
            taskDiv.innerHTML = `
                    <a href="#" class="bg-opacity-25 bg-secondary text-muted">
                        <div class="card-body">
                            <h3>${task.name}</h3>
                            <p>${task.description}</p>
                            <p>DUE: ${task.date}</p>
                        </div>
                    </a>
                `;
        } else {
            taskDiv.innerHTML = `
                    <a href="modify_tasks.html?id=${taskId}" class="stretched-link">
                        <div class="card-body">
                            <h3>${task.name}</h3>
                            <p>${task.description}</p>
                            <p>DUE: ${task.date}</p>
                        </div>
                    </a>
                `;
        }

        taskList.appendChild(taskDiv);
    })
}

document.addEventListener("DOMContentLoaded", loadTasks);