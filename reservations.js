function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const tbody = document.querySelector('#reservationsTable tbody');
    tbody.innerHTML = '';

    reservations.forEach((reservation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.ownerName}</td>
            <td>${reservation.dogName}</td>
            <td>${reservation.arrival}</td>
            <td>${reservation.departure}</td>
            <td>${reservation.numDogs}</td>
            <td>${reservation.numCats}</td>
            <td>€${reservation.cost}</td>
            <td><input type="text" class="notes-input" value="${reservation.notes || ''}" onchange="saveNotes(${index}, this.value)"></td>
            <td>
                <button class="edit-button" onclick="editReservation(${index})">Modifica</button>
                <button class="delete-button" onclick="deleteReservation(${index})">Elimina</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function saveNotes(index, value) {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations[index].notes = value;
    localStorage.setItem('reservations', JSON.stringify(reservations));
}

function deleteReservation(index) {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    loadReservations();
}

function editReservation(index) {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservation = reservations[index];

    document.getElementById('ownerName').value = reservation.ownerName;
    document.getElementById('dogName').value = reservation.dogName;
    document.getElementById('arrival').value = reservation.arrival;
    document.getElementById('departure').value = reservation.departure;
    document.getElementById('numDogs').value = reservation.numDogs;
    document.getElementById('numCats').value = reservation.numCats;
    document.getElementById('notes').value = reservation.notes;

    reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    document.querySelector('.button-group button').innerText = 'Aggiorna Prenotazione';
}

document.addEventListener('DOMContentLoaded', loadReservations);
