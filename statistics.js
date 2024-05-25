function loadStatistics() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const totalReservations = reservations.length;
    const totalRevenue = reservations.reduce((sum, reservation) => sum + parseFloat(reservation.cost), 0);

    const statsDiv = document.getElementById('statistics');
    statsDiv.innerHTML = `
        <p>Numero totale di prenotazioni: ${totalReservations}</p>
        <p>Entrate totali: €${totalRevenue.toFixed(2)}</p>
    `;

    const ctx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: reservations.map((res, index) => `Prenotazione ${index + 1}`),
            datasets: [{
                label: 'Entrate (€)',
                data: reservations.map(res => parseFloat(res.cost)),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', loadStatistics);
