function loadClients() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const clients = {};

    reservations.forEach(reservation => {
        if (!clients[reservation.ownerName]) {
            clients[reservation.ownerName] = {
                totalReservations: 0,
                totalDogs: 0,
                totalCats: 0,
                totalRevenue: 0
            };
        }
        clients[reservation.ownerName].totalReservations += 1;
        clients[reservation.ownerName].totalDogs += parseInt(reservation.numDogs);
        clients[reservation.ownerName].totalCats += parseInt(reservation.numCats);
        clients[reservation.ownerName].totalRevenue += parseFloat(reservation.cost);
    });

    const tbody = document.querySelector('#clientsTable tbody');
    tbody.innerHTML = '';

    for (const [client, data] of Object.entries(clients)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client}</td>
            <td>${data.totalReservations}</td>
            <td>${data.totalDogs}</td>
            <td>${data.totalCats}</td>
            <td>€${data.totalRevenue.toFixed(2)}</td>
            <td>
                <button class="view-button" onclick="viewClient('${client}')">Visualizza</button>
            </td>
        `;
        tbody.appendChild(row);
    }
}

function viewClient(clientName) {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const clientReservations = reservations.filter(reservation => reservation.ownerName === clientName);
    // Implementa la logica per visualizzare i dettagli delle prenotazioni del cliente
    alert(`Dettagli prenotazioni per ${clientName}: ${JSON.stringify(clientReservations, null, 2)}`);
}

document.addEventListener('DOMContentLoaded', loadClients);
