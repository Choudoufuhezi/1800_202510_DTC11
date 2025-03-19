firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let userId = user.uid; // Get authenticated user's ID
        let userRef = firebase.firestore().collection("users").doc(userId);

        userRef.get().then((doc) => {
            if (doc.exists) {
                let userData = doc.data();
                document.getElementById("User-name").innerText = userData.name || "No Username";
                document.getElementById("email-address").innerText = userData.email || "No Email";
            } else {
                console.log("No user data found!");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    } else {
        console.log("No user logged in");
    }
});
