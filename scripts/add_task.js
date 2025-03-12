function writeTasks(taskname, desc, taskdate) {
    //define a variable for the collection you want to create in Firestore to populate data
    var tasks = db.collection("tasks");

    tasks.add({
        name: taskname,
        description: desc,
        date: taskdate
    });
}

document.getElementById('submit').addEventListener('click', function () {
    title = document.getElementById("tasktitle").value;
    desc = document.getElementById("taskdesc").value;
    date = document.getElementById("taskdate").value;

    writeTasks(title, desc, date);

    window.location.href = "main.html"
});





