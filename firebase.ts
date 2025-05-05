// firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, Auth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCO01xsnxjiaNJ3n8KjM2Oihad6BEG7w8E",
    authDomain: "notes-49060.firebaseapp.com",
    projectId: "notes-49060",
    storageBucket: "notes-49060.firebasestorage.app",
    messagingSenderId: "838375669588",
    appId: "1:838375669588:web:6e0b6baf0037c1b82792c1",
    measurementId: "G-HJ211C7885"
}

const app = initializeApp(firebaseConfig)
const auth: Auth = getAuth(app)

export { auth };
