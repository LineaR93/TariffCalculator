// Configurazione di Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBtNsDjH7oivnrDU7Bi_5fR62ksa4-2N9Q",
    authDomain: "petsitter-d69ed.firebaseapp.com",
    projectId: "petsitter-d69ed",
    storageBucket: "petsitter-d69ed.appspot.com",
    messagingSenderId: "119772151716",
    appId: "1:119772151716:web:2fd12bfab1972bb3354b31",
    measurementId: "G-9J4RWJLTQ2"
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
