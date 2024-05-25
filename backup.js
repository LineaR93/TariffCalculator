import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, orderBy, query, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtNsDjH7oivnrDU7Bi_5fR62ksa4-2N9Q",
    authDomain: "petsitter-d69ed.firebaseapp.com",
    projectId: "petsitter-d69ed",
    storageBucket: "petsitter-d69ed.appspot.com",
    messagingSenderId: "119772151716",
    appId: "1:119772151716:web:2fd12bfab1972bb3354b31",
    measurementId: "G-9J4RWJLTQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export function backupData() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    addDoc(collection(db, "backups"), {
        reservations: reservations,
        appointments: appointments,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert('Backup effettuato con successo!');
    }).catch(error => {
        console.error('Errore durante il backup:', error);
    });
}

export function restoreData() {
    const q = query(collection(db, "backups"), orderBy("timestamp", "desc"), limit(1));
    getDocs(q).then(querySnapshot => {
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
