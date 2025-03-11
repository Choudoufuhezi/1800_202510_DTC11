//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0-ALde5u3T3ydU6G1Gf4pgTkzmSLk6d4",
    authDomain: "trackywebapp.firebaseapp.com",
    projectId: "trackywebapp",
    storageBucket: "trackywebapp.firebasestorage.app",
    messagingSenderId: "1041760049730",
    appId: "1:1041760049730:web:0dc9ab499077b202276bdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebase.firestore();

