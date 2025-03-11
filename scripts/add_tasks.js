async function modlify_description() {
    try {
        const tasks = db.collection("tasks");
        description = await get_description();
        await tasks.add({
            task_description: description
        });
    } catch (error) {
        console.log("error", error)
    }
}

async function modlify_task_name() {
    try {
        const tasks = db.collection("tasks");
        taskName = await get_task_name();
        await tasks.add({
            task_name: taskName
        });
    } catch (error) {
        console.log("error", error)
    }
}

function get_task_name() {
    return new Promise((resolve, reject) => {
        const form = document.getElementById("task_name");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const taskName = document.getElementById("task_name_text").value.trim();
            console.log(taskName);
            if (taskName) {
                resolve(String(taskName))
            } else {
                reject("failed")
            }
        });
    })
}


function get_description() {
    return new Promise((resolve, reject) => {
        const form = document.getElementById("description");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const description = document.getElementById("description_text").value.trim();
            console.log(description);
            if (description) {
                resolve(String(description))
            } else {
                reject("failed")
            }
        });
    })

}

document.getElementById("description").addEventListener("submit", function (event) {
    event.preventDefault();
    modlify_description();
});

document.getElementById("task_name").addEventListener("submit", function (event) {
    event.preventDefault();
    modlify_task_name()
});

