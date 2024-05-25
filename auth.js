function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        alert('Nome utente o password errati.');
    }
}

function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const path = window.location.pathname.split('/').pop();

    if (!isLoggedIn && path !== 'login.html') {
        window.location.href = 'login.html';
    }
    if (isLoggedIn && path === 'login.html') {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', checkLogin);
