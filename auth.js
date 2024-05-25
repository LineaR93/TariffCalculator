// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtNsDjH7oivnrDU7Bi_5fR62ksa4-2N9Q",
    authDomain: "petsitter-d69ed.firebaseapp.com",
    projectId: "petsitter-d69ed",
    storageBucket: "petsitter-d69ed.appspot.com",
    messagingSenderId: "119772151716",
    appId: "1:119772151716:web:2fd12bfab1972bb3354b31",
    measurementId: "G-9J4RWJLTQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            localStorage.setItem('isLoggedIn', true);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            alert('Credenziali non valide');
        });
}

function checkLogin() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.querySelector('.icon-container').style.display = 'block';
        } else {
            window.location.href = 'login.html';
        }
    });
}

function logout() {
    signOut(auth).then(() => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });
}

document.addEventListener('DOMContentLoaded', checkLogin);
