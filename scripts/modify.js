function modifyDesc(id, desc) {
    db.collection("tasks").doc(id).set({         //write to firestore. We are using the UID for the ID in users collection
        description: desc                    //optional default profile info
    })
}

function modifyName(id, nombre) {
    db.collection("tasks").doc(id).set({
        name: nombre
    })
}

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

async function load_tasks(taskid) {
    const taskRef = db.collection("tasks").doc(taskid);
    taskRef.get()
        .then(taskdoc => {
            let name = taskdoc.data().name;
            let description = taskdoc.data().description;
            let date = taskdoc.data().date;

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

    // Fetch the current task data to avoid unnecessary writes
    const currentTask = await taskRef.get().then(doc => doc.data());

    if (currentTask.name === name && currentTask.description === description) {
        alert("No changes detected.");
        return;
    }

    await taskRef.update({
        name: name,
        description: description
    })
        .then(() => {
            showAlert("Changes to the task has been successfully saved");
        })
        .catch(error => {
            console.error("Error updating task: ", error);
        });

}

load_tasks(taskId);


async function a_week(taskid) {
    const taskRef = db.collection("tasks").doc(taskid);
    const taskdoc = await taskRef.get();

    if (!taskdoc.exists) {
        throw new Error("Task not found");
    }

    let date = taskdoc.data().date;
    let current_date = new Date(date);
    current_date.setDate(current_date.getDate() - 7);
    string_current_date = current_date.toString()

    await taskRef.update({
        date: string_current_date
    })
        .then(() => {
            showAlert("Task has been successfully push forward a week");
        })
        .catch(error => {
            console.error("Error updating task: ", error);
        });
}

async function a_day(taskid) {
    const taskRef = db.collection("tasks").doc(taskid);
    const taskdoc = await taskRef.get();

    if (!taskdoc.exists) {
        throw new Error("Task not found");
    }

    let date = taskdoc.data().date;
    let current_date = new Date(date);
    current_date.setDate(current_date.getDate() - 1);
    string_current_date = current_date.toString()

    await taskRef.update({
        date: string_current_date
    })
        .then(() => {
            showAlert("Task has been successfully push forward a day");
        })
        .catch(error => {
            console.error("Error updating task: ", error);
        });
}

async function a_day(taskid) {
    const taskRef = db.collection("tasks").doc(taskid);
    const taskdoc = await taskRef.get();

    if (!taskdoc.exists) {
        throw new Error("Task not found");
    }

    let date = taskdoc.data().date;
    let current_date = new Date(date);
    current_date.setDate(current_date.getDate() - 1);
    string_current_date = current_date.toString()

    await taskRef.update({
        date: string_current_date
    })
        .then(() => {
            showAlert("Task has been successfully push forward a day");
        })
        .catch(error => {
            console.error("Error updating task: ", error);
        });
}

async function an_hour(taskid) {
    const taskRef = db.collection("tasks").doc(taskid);
    const taskdoc = await taskRef.get();

    if (!taskdoc.exists) {
        throw new Error("Task not found");
    }

    let date = taskdoc.data().date;
    let current_date = new Date(date);
    current_date.setHours(current_date.getHours() - 1);
    string_current_date = current_date.toString()

    await taskRef.update({
        date: string_current_date
    })
        .then(() => {
            showAlert("Task has been successfully push forward an hour");
        })
        .catch(error => {
            console.error("Error updating task: ", error);
        });
}

function showAlert(message) {
    const modal = new bootstrap.Modal(document.getElementById('messageModal'));
    document.getElementById('modalMessage').innerHTML = message;
    modal.show();
}

function return_to_main() {
    window.location.href = "main.html"
}

