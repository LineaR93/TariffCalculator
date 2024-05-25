document.addEventListener('DOMContentLoaded', loadAppointments);

function saveAppointment() {
    const ownerName = document.getElementById('ownerName').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const numDogs = document.getElementById('numDogs').value;
    const numCats = document.getElementById('numCats').value;
    const notes = document.getElementById('notes').value;

    if (!ownerName || !appointmentDate) {
        alert('Per favore, completa tutti i campi obbligatori.');
        return;
    }

    const appointment = {
        ownerName,
        appointmentDate,
        numDogs,
        numCats,
        notes
    };

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    alert('Appuntamento salvato con successo!');
    loadAppointments();
}

function loadAppointments() {
    const appointmentsTable = document.getElementById('appointmentsTable').getElementsByTagName('tbody')[0];
    appointmentsTable.innerHTML = '';

    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.forEach((appointment, index) => {
        const row = appointmentsTable.insertRow();
        row.insertCell(0).textContent = appointment.ownerName;
        row.insertCell(1).textContent = new Date(appointment.appointmentDate).toLocaleString('it-IT');
        row.insertCell(2).textContent = appointment.numDogs;
        row.insertCell(3).textContent = appointment.numCats;
        row.insertCell(4).textContent = appointment.notes;

        const actionsCell = row.insertCell(5);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Elimina';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => {
            deleteAppointment(index);
        };
        actionsCell.appendChild(deleteButton);
    });
}

function deleteAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    loadAppointments();
}
