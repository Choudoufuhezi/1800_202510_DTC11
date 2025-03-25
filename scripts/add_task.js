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

document.getElementById('submit').addEventListener('click', async function () {
    const title = document.getElementById("tasktitle").value;
    const desc = document.getElementById("taskdesc").value;
    const date = document.getElementById("taskdate").value;
    const importance = document.getElementsByClassName("taskimportance")

    let task_importance = null
    for (radio of importance) {
        if (radio.checked) {
            task_importance = radio.value
        }
    }

    if (!title || !desc || !date || !task_importance) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    await writeTasks(title, desc, date, task_importance);
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




