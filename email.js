function sendEmail(subject, body, recipient) {
    emailjs.init('YOUR_USER_ID');

    const templateParams = {
        to_name: recipient,
        subject: subject,
        message: body
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email inviata con successo!', response.status, response.text);
        }, function(error) {
            console.error('Errore nell\'invio dell\'email:', error);
        });
}
