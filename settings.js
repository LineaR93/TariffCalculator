document.addEventListener('DOMContentLoaded', loadTariffs);

function saveTariffs() {
    localStorage.setItem('dogTariff1', document.getElementById('dogTariff1').value);
    localStorage.setItem('dogTariff2', document.getElementById('dogTariff2').value);
    localStorage.setItem('dogTariff3', document.getElementById('dogTariff3').value);
    localStorage.setItem('catTariff1', document.getElementById('catTariff1').value);
    localStorage.setItem('catTariff2', document.getElementById('catTariff2').value);
    localStorage.setItem('catTariff3', document.getElementById('catTariff3').value);

    alert('Tariffe salvate con successo!');
}

function loadTariffs() {
    if (localStorage.getItem('dogTariff1')) {
        document.getElementById('dogTariff1').value = localStorage.getItem('dogTariff1');
    }
    if (localStorage.getItem('dogTariff2')) {
        document.getElementById('dogTariff2').value = localStorage.getItem('dogTariff2');
    }
    if (localStorage.getItem('dogTariff3')) {
        document.getElementById('dogTariff3').value = localStorage.getItem('dogTariff3');
    }
    if (localStorage.getItem('catTariff1')) {
        document.getElementById('catTariff1').value = localStorage.getItem('catTariff1');
    }
    if (localStorage.getItem('catTariff2')) {
        document.getElementById('catTariff2').value = localStorage.getItem('catTariff2');
    }
    if (localStorage.getItem('catTariff3')) {
        document.getElementById('catTariff3').value = localStorage.getItem('catTariff3');
    }
}
