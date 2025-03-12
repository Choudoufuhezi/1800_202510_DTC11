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

//     })
// }


document.getElementById('submit').addEventListener('click', function() {
    const id = urlParams.get('id');
    const title = document.getElementById('task_name_text').value;
    modifyName(id, title);

})

document.getElementById('submit1').addEventListener('click', function () {
    const id = urlParams.get('id');
    const title = document.getElementById('description_text').value;
    modifyDesc(id, title);
})

load_tasks(taskId);

