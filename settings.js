document.addEventListener('DOMContentLoaded', loadStatistics);

function loadStatistics() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const monthlyData = {};

    reservations.forEach(reservation => {
        const month = new Date(reservation.arrival).toLocaleString('it-IT', { month: 'long', year: 'numeric' });
        if (!monthlyData[month]) {
            monthlyData[month] = 0;
        }
        monthlyData[month] += parseFloat(reservation.cost);
    });

    const labels = Object.keys(monthlyData);
    const data = Object.values(monthlyData);

    const ctx = document.getElementById('statisticsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Entrate Mensili (€)',
                data: data,
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
