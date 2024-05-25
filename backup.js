function backupData() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    const data = {
        reservations,
        appointments,
        timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function restoreData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        localStorage.setItem('reservations', JSON.stringify(data.reservations));
        localStorage.setItem('appointments', JSON.stringify(data.appointments));
        alert('Dati ripristinati con successo!');
    };
    reader.readAsText(file);
}
