var firebaseConfig = {
    apiKey: "AIzaSyC0-ALde5u3T3ydU6G1Gf4pgTkzmSLk6d4",
    authDomain: "trackywebapp.firebaseapp.com",
    projectId: "trackywebapp",
    storageBucket: "trackywebapp.firebasestorage.app",
    messagingSenderId: "1041760049730",
    appId: "1:1041760049730:web:0dc9ab499077b202276bdb"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();