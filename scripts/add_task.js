async function writeTasks(taskname, desc, taskdate) {
    const tasks = db.collection("tasks");

    // Check if the user already has 10 tasks
    const taskCount = await tasks.get().then(snapshot => snapshot.size);
    if (taskCount >= 10) {
        alert("Task limit reached. You cannot create more than 10 tasks.");
        return;
    }

    return tasks.add({
        name: taskname,
        description: desc,
        date: taskdate
    });
}

document.getElementById('submit').addEventListener('click', async function () {
    const title = document.getElementById("tasktitle").value;
    const desc = document.getElementById("taskdesc").value;
    const date = document.getElementById("taskdate").value;

    if (!title || !desc || !date) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    await writeTasks(title, desc, date);
    window.location.href = "main.html";
});





