//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {

    apiKey: "AIzaSyCmxU5QmPY_5UEF9cLcfXjU6lu8GlQgqhg",

    authDomain: "comp1800-202510-demo-e.firebaseapp.com",

    projectId: "comp1800-202510-demo-e",

    storageBucket: "comp1800-202510-demo-e.firebasestorage.app",

    messagingSenderId: "798025107088",

    appId: "1:798025107088:web:15e00df1d2c58267003a15"

};


//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

