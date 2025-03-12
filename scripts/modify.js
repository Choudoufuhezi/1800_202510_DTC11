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

