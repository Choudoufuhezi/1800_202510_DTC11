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
    const taskdoc = await taskRef.get();

    if (taskdoc.exists) {
        const task = taskdoc.data();
        const titleElement = document.getElementById("task-title");
        const descriptionElement = document.getElementById("task-description");
        const taskInfoContainer = document.getElementById("task_info");

        // Display title and description as plain text
        titleElement.innerHTML = `<span>${task.name || ""}</span>`;
        descriptionElement.innerHTML = `<p>${task.description || ""}</p>`;

        // Add a single "Edit" button at the bottom-right of the container
        taskInfoContainer.innerHTML += `
            <button class="btn btn-primary btn-sm position-absolute bottom-0 end-0 m-3" id="edit-task-button" onclick="editTask('${taskid}')">Edit</button>
        `;

        // Load steps
        const stepsContainer = document.getElementById("steps-container");
        stepsContainer.innerHTML = "";
        (task.steps || []).forEach((step, index) => {
            const stepDiv = document.createElement("div");
            stepDiv.className = "d-flex justify-content-between align-items-center mb-2";
            stepDiv.innerHTML = `
                <span>${step}</span>
                <button class="btn btn-danger btn-sm" onclick="removeStep('${taskid}', ${index})">Remove</button>
            `;
            stepsContainer.appendChild(stepDiv);
        });
    }
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

async function addStep(taskid) {
    const newStep = document.getElementById("new-step").value.trim();
    if (!newStep) {
        alert("Please enter a step.");
        return;
    }

    const taskRef = db.collection("tasks").doc(taskid);
    const taskdoc = await taskRef.get();
    const steps = taskdoc.data().steps || [];

    steps.push(newStep);
    await taskRef.update({ steps });
    load_tasks(taskid); // Reload steps
}

async function removeStep(taskid, index) {
    const taskRef = db.collection("tasks").doc(taskid);
    const taskdoc = await taskRef.get();
    const steps = taskdoc.data().steps || [];

    steps.splice(index, 1);
    await taskRef.update({ steps });
    load_tasks(taskid); // Reload steps
}

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

function editTask(taskid) {
    const titleElement = document.getElementById("task-title");
    const descriptionElement = document.getElementById("task-description");
    const editButton = document.getElementById("edit-task-button");

    // Replace title and description with editable inputs
    const currentTitle = titleElement.querySelector("span").innerText;
    const currentDescription = descriptionElement.querySelector("p").innerText;

    titleElement.innerHTML = `
        <input type="text" class="form-control" id="edit-title-input" value="${currentTitle}">
    `;
    descriptionElement.innerHTML = `
        <textarea class="form-control" id="edit-description-textarea" rows="4">${currentDescription}</textarea>
    `;

    // Change the "Edit" button to a "Save" button
    editButton.innerText = "Save";
    editButton.onclick = () => saveTask(taskid);
}

async function saveTask(taskid) {
    const titleInput = document.getElementById("edit-title-input");
    const descriptionTextarea = document.getElementById("edit-description-textarea");
    const editButton = document.getElementById("edit-task-button");

    const newTitle = titleInput.value.trim();
    const newDescription = descriptionTextarea.value.trim();

    if (!newTitle || !newDescription) {
        alert("Title and description cannot be empty.");
        return;
    }

    const taskRef = db.collection("tasks").doc(taskid);
    await taskRef.update({
        name: newTitle,
        description: newDescription
    });

    // Revert to plain text display
    const titleElement = document.getElementById("task-title");
    const descriptionElement = document.getElementById("task-description");

    titleElement.innerHTML = `<span>${newTitle}</span>`;
    descriptionElement.innerHTML = `<p>${newDescription}</p>`;

    // Change the "Save" button back to an "Edit" button
    editButton.innerText = "Edit";
    editButton.onclick = () => editTask(taskid);

    showAlert("Changes to the task have been successfully saved");
}

function editTitle(taskid) {
    const titleElement = document.getElementById("task-title");
    const currentTitle = titleElement.querySelector("span").innerText;

    // Replace title with an input box and a save button
    titleElement.innerHTML = `
        <input type="text" class="form-control" id="edit-title-input" value="${currentTitle}">
        <button class="btn btn-success btn-sm ms-2" onclick="saveTitle('${taskid}')">Save</button>
    `;
}

async function saveTitle(taskid) {
    const titleInput = document.getElementById("edit-title-input");
    const newTitle = titleInput.value.trim();

    if (!newTitle) {
        alert("Title cannot be empty.");
        return;
    }

    const taskRef = db.collection("tasks").doc(taskid);
    await taskRef.update({ name: newTitle });

    // Revert to plain text display
    const titleElement = document.getElementById("task-title");
    titleElement.innerHTML = `<span>${newTitle}</span>`;
    titleElement.innerHTML += `<button class="btn btn-primary btn-sm ms-2" onclick="editTitle('${taskid}')">Edit</button>`;
}

function editDescription(taskid) {
    const descriptionElement = document.getElementById("task-description");
    const currentDescription = descriptionElement.querySelector("p").innerText;

    // Replace description with a text area and a save button
    descriptionElement.innerHTML = `
        <textarea class="form-control" id="edit-description-textarea" rows="4">${currentDescription}</textarea>
        <button class="btn btn-success btn-sm mt-2" onclick="saveDescription('${taskid}')">Save</button>
    `;
}

async function saveDescription(taskid) {
    const descriptionTextarea = document.getElementById("edit-description-textarea");
    const newDescription = descriptionTextarea.value.trim();

    if (!newDescription) {
        alert("Description cannot be empty.");
        return;
    }

    const taskRef = db.collection("tasks").doc(taskid);
    await taskRef.update({ description: newDescription });

    // Revert to plain text display
    const descriptionElement = document.getElementById("task-description");
    descriptionElement.innerHTML = `<p>${newDescription}</p>`;
    descriptionElement.innerHTML += `<button class="btn btn-primary btn-sm ms-2" onclick="editDescription('${taskid}')">Edit</button>`;
}

