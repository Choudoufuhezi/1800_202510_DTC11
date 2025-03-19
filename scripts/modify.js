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
            let date = taskdoc.data().description;

            if (name != null) {
                document.getElementById("task_name_text").value = name
            }

            if (description != null) {
                document.getElementById("description_text").value = description
            }
        });
}
// modifyDate(id, push) {

//     db.collection("tasks").doc(id).set({

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
            window.location.href = "main.html";
        })
        .catch(error => {
            console.error("Error updating task: ", error);
        });
}

load_tasks(taskId);

