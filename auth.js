function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        localStorage.setItem('isLoggedIn', true);
        window.location.href = 'index.html';
    } else {
        alert('Nome utente o password errati.');
    }
}

function checkLogin() {
    const path = window.location.pathname;
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn && !path.endsWith('login.html')) {
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', checkLogin);
