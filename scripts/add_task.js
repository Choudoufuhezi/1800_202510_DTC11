function writeTasks(taskname, desc, taskdate) {
    //define a variable for the collection you want to create in Firestore to populate data
    var tasks = db.collection("tasks");

    return tasks.add({
        name: taskname,
        description: desc,
        date: taskdate
    });
}

document.getElementById('submit').addEventListener('click', async function () {
    title = document.getElementById("tasktitle").value;
    desc = document.getElementById("taskdesc").value;
    date = document.getElementById("taskdate").value;

    await writeTasks(title, desc, date)
    window.location.href = "main.html"

});





