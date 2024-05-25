function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const tbody = document.querySelector('#appointmentsTable tbody');
    tbody.innerHTML = '';

    appointments.forEach((appointment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.ownerName}</td>
            <td>${new Date(appointment.appointmentDate).toLocaleString('it-IT')}</td>
            <td>${appointment.notes}</td>
            <td>
                <button class="edit-button" onclick="editAppointment(${index})">Modifica</button>
                <button class="delete-button" onclick="deleteAppointment(${index})">Elimina</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function saveAppointment() {
    const ownerName = document.getElementById('ownerName').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const notes = document.getElementById('notes').value;

    if (!ownerName || !appointmentDate) {
        alert('Per favore, inserisci tutti i dati richiesti.');
        return;
    }

    const appointment = {
        ownerName,
        appointmentDate,
        notes
    };

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    alert('Appuntamento salvato con successo!');
    loadAppointments();
}

function deleteAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    loadAppointments();
}

function editAppointment(index) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointment = appointments[index];

    document.getElementById('ownerName').value = appointment.ownerName;
    document.getElementById('appointmentDate').value = appointment.appointmentDate;
    document.getElementById('notes').value = appointment.notes;

    appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    document.querySelector('.button-group button').innerText = 'Aggiorna Appuntamento';
}

document.addEventListener('DOMContentLoaded', loadAppointments);
