// Configurazione di Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            localStorage.setItem('isLoggedIn', true);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            alert('Credenziali non valide');
        });
}

function checkLogin() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.querySelector('.icon-container').style.display = 'block';
        } else {
            window.location.href = 'login.html';
        }
    });
}

function logout() {
    firebase.auth().signOut().then(() => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });
}

document.addEventListener('DOMContentLoaded', checkLogin);
