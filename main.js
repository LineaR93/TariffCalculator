document.addEventListener('DOMContentLoaded', () => {
    loadTariffs();
    calculateCost();
    loadUpcomingAppointment();
});

let tariffs = {
    dogs: {
        1: 22,
        2: 35,
        3: 50
    },
    cats: {
        1: 10,
        2: 5,
        3: 5
    }
};

function loadTariffs() {
    if (localStorage.getItem('dogTariff1')) {
        tariffs.dogs[1] = parseFloat(localStorage.getItem('dogTariff1'));
    }
    if (localStorage.getItem('dogTariff2')) {
        tariffs.dogs[2] = parseFloat(localStorage.getItem('dogTariff2'));
    }
    if (localStorage.getItem('dogTariff3')) {
        tariffs.dogs[3] = parseFloat(localStorage.getItem('dogTariff3'));
    }
    if (localStorage.getItem('catTariff1')) {
        tariffs.cats[1] = parseFloat(localStorage.getItem('catTariff1'));
    }
    if (localStorage.getItem('catTariff2')) {
        tariffs.cats[2] = parseFloat(localStorage.getItem('catTariff2'));
    }
    if (localStorage.getItem('catTariff3')) {
        tariffs.cats[3] = parseFloat(localStorage.getItem('catTariff3'));
    }
}

function roundToNearestFive(value) {
    return Math.round(value / 5) * 5;
}

function calculateCost() {
    const arrival = new Date(document.getElementById('arrival').value);
    const departure = new Date(document.getElementById('departure').value);
    const numDogs = document.getElementById('numDogs').value;
    const numCats = document.getElementById('numCats').value;
    const dogTariff = tariffs.dogs[numDogs] || 0;
    const catTariff = tariffs.cats[numCats] || 0;

    if (isNaN(arrival) || isNaN(departure)) {
        document.getElementById('result').innerText = 'Per favore, inserisci tutti i dati correttamente.';
        return;
    }

    const totalHours = (departure - arrival) / (1000 * 60 * 60);
    const fourHourBlocks = totalHours / 4;
    const dogCostPerBlock = dogTariff / 6;
    const catCostPerBlock = catTariff / 6;
    const calculatedTotal = roundToNearestFive(dogCostPerBlock * fourHourBlocks + catCostPerBlock * fourHourBlocks);

    document.getElementById('result').innerHTML = `
        <p>Il costo totale è: €${calculatedTotal}</p>
    `;
}

function saveReservation() {
    const arrival = document.getElementById('arrival').value;
    const departure = document.getElementById('departure').value;
    const numDogs = document.getElementById('numDogs').value;
    const numCats = document.getElementById('numCats').value;
    const resultText = document.getElementById('result').innerText;

    if (!arrival || !departure || (!numDogs && !numCats) || !resultText) {
        alert('Per favore, completa tutti i campi prima di salvare la prenotazione.');
        return;
    }

    const reservation = {
        arrival,
        departure,
        numDogs,
        numCats,
        cost: resultText.split('€')[1]
    };

    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    alert('Prenotazione salvata con successo!');
    loadUpcomingAppointment();
}

function loadUpcomingAppointment() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    if (reservations.length === 0) return;

    const nextReservation = reservations.sort((a, b) => new Date(a.arrival) - new Date(b.arrival))[0];
    const arrivalDate = new Date(nextReservation.arrival);
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formattedDate = arrivalDate.toLocaleDateString('it-IT', options);

    document.getElementById('upcoming-appointment').innerHTML = `
        <p>Prossimo appuntamento: ${formattedDate} con ${nextReservation.numDogs} cani e ${nextReservation.numCats} gatti</p>
    `;
}
