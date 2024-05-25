// Configurazione di Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function backupData() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    db.collection("backups").add({
        reservations: reservations,
        appointments: appointments,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert('Backup effettuato con successo!');
    }).catch(error => {
        console.error('Errore durante il backup:', error);
    });
}

function restoreData() {
    db.collection("backups").orderBy("timestamp", "desc").limit(1).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = doc.data();
                localStorage.setItem('reservations', JSON.stringify(data.reservations));
                localStorage.setItem('appointments', JSON.stringify(data.appointments));
                alert('Ripristino dati effettuato con successo!');
            });
        }).catch(error => {
            console.error('Errore durante il ripristino:', error);
        });
}
