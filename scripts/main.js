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

    db.collection("tasks").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const task = doc.data();
            const taskId = doc.id;

            const taskDiv = document.createElement("div");
            taskDiv.className = "border border-primary m-3 card shadow-sm";
            taskDiv.style = "background-color: #CAE9F5; transition: 0.3s;";
            taskDiv.onmouseover = () => taskDiv.style.backgroundColor = "#B0DFF5";
            taskDiv.onmouseout = () => taskDiv.style.backgroundColor = "#CAE9F5";
            taskDiv.innerHTML = `
                <a href="modify_tasks.html?id=${taskId}" class="stretched-link" style="text-decoration:none">
                    <div class="card-body">
                        <h3 class="text-black">${task.name}</h3>a
                        <p class="text-black">${task.description}</p>
                        <p class="text-black">DUE: ${task.date}</p>
                    </div>
                </a>
            `;

            taskList.appendChild(taskDiv);
        });
    }).catch((error) => {
        console.error("Error loading tasks: ", error);
    });
}

document.addEventListener("DOMContentLoaded", loadTasks);