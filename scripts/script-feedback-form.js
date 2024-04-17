// Fetch API key from config.json
fetch('config.json')
    .then(response => response.json())
    .then(config => {
        const formApiKey = config.formApiKey;  // Retrieve formApiKey from config.json

        // Update access_key value in feedback form
        const feedbackForm = document.querySelector('.feedback-form form');
        const accessKeyInput = feedbackForm.querySelector('input[value="YOUR_ACCESS_KEY_HERE"]');
        accessKeyInput.value = formApiKey;
    })
    .catch(error => {
        console.error('Error fetching API key:', error);
    });
