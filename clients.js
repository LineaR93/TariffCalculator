document.addEventListener('DOMContentLoaded', loadClients);

function loadClients() {
    const clientsTable = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];
    clientsTable.innerHTML = '';

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const clients = {};

    reservations.forEach(reservation => {
        const ownerName = reservation.ownerName || 'Anonimo';
        const dogName = reservation.dogName || '';
        const catName = reservation.catName || '';
        const clientKey = `${ownerName}-${dogName}-${catName}`;

        if (!clients[clientKey]) {
            clients[clientKey] = {
                ownerName,
                dogName,
                catName,
                reservations: 0,
                notes: reservation.notes || ''
            };
        }
        clients[clientKey].reservations++;
    });

    Object.values(clients).forEach(client => {
        const row = clientsTable.insertRow();
        row.insertCell(0).textContent = client.ownerName;
        row.insertCell(1).textContent = client.dogName;
        row.insertCell(2).textContent = client.catName;
        row.insertCell(3).textContent = client.reservations;
        row.insertCell(4).textContent = client.notes;
    });
}

function searchClients() {
    const filter = document.getElementById('search').value.toLowerCase();
    const rows = document.getElementById('clientsTable').getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j] && cells[j].textContent.toLowerCase().indexOf(filter) > -1) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none';
    }
}
