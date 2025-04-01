async function writeTasks(taskname, desc, taskdate, task_importance) {
    const user = firebase.auth().currentUser; // Get the currently logged-in user
    if (!user) {
        alert("You must be logged in to add tasks.");
        return;
    }

    const tasks = db.collection("tasks");

    // Check if the user already has 10 tasks
    // const taskCount = await tasks.where("uid", "==", user.uid).get().then(snapshot => snapshot.size);
    // if (taskCount >= 10) {
    //     alert("Task limit reached. You cannot create more than 10 tasks.");
    //     return;
    // }

    time = new Date(taskdate);
    return tasks.add({
        name: taskname,
        description: desc,
        date: time.toString(),
        importance: parseInt(task_importance),
        uid: user.uid, // Associate the task with the logged-in user's UID
    });
}

let selectedImportance = null;

document.querySelectorAll(".bookmark").forEach(bookmark => {
    bookmark.addEventListener("click", function () {
        // Unfill all bookmarks (set to outlined state)
        document.querySelectorAll(".bookmark").forEach(b => {
            b.setAttribute("fill", "none"); // Reset fill to none
        });

        // Fill the clicked bookmark and set it as selected
        selectedImportance = this.getAttribute("data-value");
        this.setAttribute("fill", this.getAttribute("stroke")); // Use the stroke color as the fill color
    });
});

document.getElementById('submit').addEventListener('click', async function () {
    const title = document.getElementById("tasktitle").value;
    const desc = document.getElementById("taskdesc").value;
    const date = document.getElementById("taskdate").value;

    if (!title || !desc || !date || !selectedImportance) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    await writeTasks(title, desc, date, selectedImportance);
    showAlert("Task has been successfully added");
});

function showAlert(message) {
    const modal = new bootstrap.Modal(document.getElementById('messageModal'));
    document.getElementById('modalMessage').innerHTML = message;
    modal.show();
}

function return_to_main() {
    window.location.href = "main.html"
}




