document.getElementById('validate-button').addEventListener('click', function() {

    const input = document.getElementById('cc-input').value;

    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = '';



    const cards = input.split('\n');

    cards.forEach(card => {

        const [cardNumber, expiryMonth, expiryYear, cvv] = card.split('|').map(item => item.trim());



        // Validate card number (Luhn algorithm)

        if (!validateCardNumber(cardNumber)) {

            resultDiv.innerHTML += `<p style="color: red;">Invalid card number: ${cardNumber}</p>`;

            return;

        }



        // Validate expiry date

        const currentDate = new Date();

        const expiryDate = new Date(`${expiryYear}-${expiryMonth}-01`);

        if (expiryDate < currentDate) {

            resultDiv.innerHTML += `<p style="color: red;">Card has expired: ${cardNumber}</p>`;

            return;

        }



        // Validate CVV

        if (!/^\d{3,4}$/.test(cvv)) {

            resultDiv.innerHTML += `<p style="color: red;">Invalid CVV: ${cardNumber}</p>`;

            return;

        }



        resultDiv.innerHTML += `<p style="color: green;">Card is valid: ${cardNumber}</p>`;

    });

});



function validateCardNumber(cardNumber) {

    // Luhn algorithm for card number validation

    let sum = 0;

    let alternate = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {

        let n = parseInt(cardNumber.charAt(i), 10);

        if (alternate) {

            n *= 2;

            if (n > 9) n -= 9;

        }

        sum += n;

        alternate = !alternate;

    }

    return sum % 10 === 0;

}
