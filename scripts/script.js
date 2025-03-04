function sayHello() {

}
//sayHello();

// This logs user out when called
function logout() {
    firebase.auth().signOut().then(() => { console.log("logging out user"); }).catch((error) => { });
}