async function modlify_description(description) {
    try {
        const tasks = db.collection("tasks");
        await tasks.add({
            task_description: description
        });
    } catch (error) {
        console.log("error", error);
    }
}

async function modlify_task_name(taskName) {
    try {
        const tasks = db.collection("tasks");
        await tasks.add({
            task_name: taskName
        });
    } catch (error) {
        console.log("error", error);
    }
}


document.getElementById("task_name").addEventListener("submit", async function (event) {
    event.preventDefault();
    const taskName = document.getElementById("task_name_text").value.trim();
    console.log(taskName);

    if (taskName) {
        await modlify_task_name(taskName);
    } else {
        console.log("Task name cannot be empty.");
    }
});


document.getElementById("description").addEventListener("submit", async function (event) {
    event.preventDefault();
    const description = document.getElementById("description_text").value.trim();
    console.log(description);

    if (description) {
        await modlify_description(description);
    } else {
        console.log("Description cannot be empty.");
    }
});
