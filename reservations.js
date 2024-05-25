document.addEventListener('DOMContentLoaded', loadReservations);

function loadReservations() {
    const reservationsTable = document.getElementById('reservationsTable').getElementsByTagName('tbody')[0];
    reservationsTable.innerHTML = '';

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.forEach((reservation, index) => {
        const row = reservationsTable.insertRow();
        row.insertCell(0).textContent = new Date(reservation.arrival).toLocaleString('it-IT');
        row.insertCell(1).textContent = new Date(reservation.departure).toLocaleString('it-IT');
        row.insertCell(2).textContent = reservation.numDogs;
        row.insertCell(3).textContent = reservation.numCats;
        row.insertCell(4).textContent = `€${reservation.cost}`;

        const actionsCell = row.insertCell(5);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Elimina';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => {
            deleteReservation(index);
        };
        actionsCell.appendChild(deleteButton);
    });
}

function deleteReservation(index) {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    loadReservations();
}
