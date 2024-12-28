const apiBaseUrl = 'http://localhost:3000';

// Function to handle user registration
async function registerUser(event) {
    event.preventDefault(); // Prevent form submission

    // Get user input from the form
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        // Send registration request to the backend
        const response = await fetch(`${apiBaseUrl}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        // Parse the response
        const data = await response.json();

        if (response.ok) {
            alert('Registration successful. You can now log in.');
            // Optionally redirect to login or clear the form
        } else {
            throw new Error(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert(error.message || 'An error occurred during registration.');
    }
}

// Attach event listener to the registration form
document.getElementById('register-form').addEventListener('submit', registerUser);
