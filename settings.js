function saveTariffs() {
    const dogTariff1 = parseFloat(document.getElementById('dogTariff1').value);
    const dogTariff2 = parseFloat(document.getElementById('dogTariff2').value);
    const dogTariff3 = parseFloat(document.getElementById('dogTariff3').value);
    const catTariff1 = parseFloat(document.getElementById('catTariff1').value);
    const catTariff2 = parseFloat(document.getElementById('catTariff2').value);
    const catTariff3 = parseFloat(document.getElementById('catTariff3').value);

    if (!isNaN(dogTariff1) && !isNaN(dogTariff2) && !isNaN(dogTariff3) &&
        !isNaN(catTariff1) && !isNaN(catTariff2) && !isNaN(catTariff3)) {
        localStorage.setItem('dogTariff1', dogTariff1);
        localStorage.setItem('dogTariff2', dogTariff2);
        localStorage.setItem('dogTariff3', dogTariff3);
        localStorage.setItem('catTariff1', catTariff1);
        localStorage.setItem('catTariff2', catTariff2);
        localStorage.setItem('catTariff3', catTariff3);
        alert('Tariffe salvate con successo!');
    } else {
        alert('Per favore, inserisci tutte le tariffe correttamente.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
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
});
