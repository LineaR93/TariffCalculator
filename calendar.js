$(document).ready(function() {
    $('#calendar').fullCalendar({
        events: loadEvents()
    });
});

function loadEvents() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const events = appointments.map(appointment => ({
        title: `Appuntamento con ${appointment.ownerName}`,
        start: appointment.appointmentDate,
        description: `Cani: ${appointment.numDogs}, Gatti: ${appointment.numCats}`
    }));

    return events;
}
