document.addEventListener('DOMContentLoaded', () => {
    loadTariffs();
    loadCustomers();
    calculateCost();
    loadUpcomingAppointment();
    loadNextAppointment();
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

let customers = [];

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

function loadCustomers() {
    customers = JSON.parse(localStorage.getItem('customers')) || [];
    const existingCustomerSelect = document.getElementById('existingCustomer');
    existingCustomerSelect.innerHTML = '<option value="">Seleziona Cliente</option>';

    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = `${customer.ownerName} - ${customer.dogName || ''} ${customer.catName || ''}`;
        existingCustomerSelect.appendChild(option);
    });
}

function toggleCustomerFields() {
    const customerType = document.getElementById('customerType').value;
    const existingCustomerGroup = document.getElementById('existingCustomerGroup');
    const newCustomerGroup = document.getElementById('newCustomerGroup');

    if (customerType === 'existing') {
        existingCustomerGroup.style.display = 'block';
        newCustomerGroup.style.display = 'none';
    } else {
        existingCustomerGroup.style.display = 'none';
        newCustomerGroup.style.display = 'block';
        updateDogFields();
        updateCatFields();
    }
}

function updateDogFields() {
    const numDogs = document.getElementById('numDogs').value;
    const dogNamesGroup = document.getElementById('dogNamesGroup');
    dogNamesGroup.innerHTML = '';

    for (let i = 1; i <= numDogs; i++) {
        const label = document.createElement('label');
        label.setAttribute('for', `dogName${i}`);
        label.textContent = `Nome Cane ${i}:`;

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', `dogName${i}`);
        input.className = 'dog-name';

        dogNamesGroup.appendChild(label);
        dogNamesGroup.appendChild(input);
    }
}

function updateCatFields() {
    const numCats = document.getElementById('numCats').value;
    const catNamesGroup = document.getElementById('catNamesGroup');
    catNamesGroup.innerHTML = '';

    for (let i = 1; i <= numCats; i++) {
        const label = document.createElement('label');
        label.setAttribute('for', `catName${i}`);
        label.textContent = `Nome Gatto ${i}:`;

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', `catName${i}`);
        input.className = 'cat-name';

        catNamesGroup.appendChild(label);
        catNamesGroup.appendChild(input);
    }
}

function loadCustomerData() {
    const customerId = document.getElementById('existingCustomer').value;
    const customer = customers.find(c => c.id == customerId);

    if (customer) {
        document.getElementById('numDogs').value = customer.numDogs;
        document.getElementById('numCats').value = customer.numCats;
        calculateCost();
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
    const customerType = document.getElementById('customerType').value;
    const existingCustomerId = document.getElementById('existingCustomer').value;

    let dogTariff = tariffs.dogs[numDogs] || 0;
    let catTariff = tariffs.cats[numCats] || 0;

    if (customerType === 'existing' && existingCustomerId) {
        const customer = customers.find(c => c.id == existingCustomerId);
        if (customer) {
            dogTariff = customer.dogTariff || dogTariff;
            catTariff = customer.catTariff || catTariff;
        }
    }

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
    const customerType = document.getElementById('customerType').value;
    const existingCustomerId = document.getElementById('existingCustomer').value;
    const resultText = document.getElementById('result').innerText;

    if (!arrival || !departure || (!numDogs && !numCats) || !resultText) {
        alert('Per favore, completa tutti i campi prima di salvare la prenotazione.');
        return;
    }

    let ownerName = '';
    let dogNames = [];
    let catNames = [];
    let customerId = existingCustomerId;

    if (customerType === 'new') {
        ownerName = document.getElementById('ownerName').value;

        for (let i = 1; i <= numDogs; i++) {
            dogNames.push(document.getElementById(`dogName${i}`).value);
        }
        for (let i = 1; i <= numCats; i++) {
            catNames.push(document.getElementById(`catName${i}`).value);
        }

        if (!ownerName || (numDogs > 0 && dogNames.includes('')) || (numCats > 0 && catNames.includes(''))) {
            alert('Per favore, inserisci il nome del proprietario e i nomi degli animali.');
            return;
        }

        customerId = `customer_${Date.now()}`;
        const newCustomer = {
            id: customerId,
            ownerName,
            dogNames,
            catNames,
            numDogs,
            numCats,
            dogTariff: tariffs.dogs[numDogs],
            catTariff: tariffs.cats[numCats]
        };

        customers.push(newCustomer);
        localStorage.setItem('customers', JSON.stringify(customers));
        loadCustomers();
    } else {
        const customer = customers.find(c => c.id == existingCustomerId);
        if (customer) {
            ownerName = customer.ownerName;
            dogNames = customer.dogNames;
            catNames = customer.catNames;
        }
    }

    const reservation = {
        arrival,
        departure,
        numDogs,
        numCats,
        cost: resultText.split('€')[1],
        customerId,
        ownerName,
        dogNames,
        catNames
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

function loadNextAppointment() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    if (appointments.length === 0) {
        document.getElementById('nextAppointmentMessage').textContent = "Prossimo appuntamento: Nessuno";
        return;
    }

    const nextAppointment = appointments.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))[0];
    const appointmentDate = new Date(nextAppointment.appointmentDate);
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formattedDate = appointmentDate.toLocaleDateString('it-IT', options);

    document.getElementById('nextAppointmentMessage').textContent = `Prossimo appuntamento: ${formattedDate} con ${nextAppointment.ownerName} (Cani: ${nextAppointment.numDogs}, Gatti: ${nextAppointment.numCats})`;
}
