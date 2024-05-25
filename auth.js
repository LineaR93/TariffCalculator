function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Esempio semplice di autenticazione (da migliorare in produzione)
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('isLoggedIn', true);
        window.location.href = 'index.html';
    } else {
        alert('Credenziali non valide');
    }
}

function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', checkLogin);
