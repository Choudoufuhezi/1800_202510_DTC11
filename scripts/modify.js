const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

async function load_tasks(taskid) {
    const taskRef = db.collection("tasks").doc(taskid);
    taskRef.get()
        .then(taskdoc => {
            let name = taskdoc.data().name;
            let description = taskdoc.data().description;
            let date = taskdoc.data().description;

            if (name != null) {
                document.getElementById("task_name_text").value = name
            }

            if (description != null) {
                document.getElementById("description_text").value = description
            }
        });
}

async function save_task(taskid) {
    const taskRef = db.collection("tasks").doc(taskid);

    const name = document.getElementById("task_name_text").value;
    const description = document.getElementById("description_text").value;

    await taskRef.update({
        name: name,
        description: description
    })
        .then(() => {
            console.log("Task updated successfully!");
        })
        .catch(error => {
            console.error("Error updating task: ", error);
        });
}


load_tasks(taskId);

