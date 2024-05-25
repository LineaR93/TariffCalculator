document.addEventListener('DOMContentLoaded', loadClients);

function loadClients() {
    const clientsTable = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];
    clientsTable.innerHTML = '';

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const clients = {};

    reservations.forEach(reservation => {
        const ownerName = reservation.ownerName || 'Anonimo';
        if (!clients[ownerName]) {
            clients[ownerName] = {
                name: ownerName,
                reservations: 0,
                notes: reservation.notes || ''
            };
        }
        clients[ownerName].reservations++;
    });

    Object.values(clients).forEach(client => {
        const row = clientsTable.insertRow();
        row.insertCell(0).textContent = client.name;
        row.insertCell(1).textContent = client.reservations;
        row.insertCell(2).textContent = client.notes;
    });
}
