// login.js

const apiBaseUrl = 'http://localhost:3000';

// Function to handle user login
async function loginUser(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get user input from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Send login request to the backend
        const response = await fetch(`${apiBaseUrl}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        // Parse the response
        const data = await response.json();

        if (response.ok) {
            // Store the JWT token in local storage
            localStorage.setItem('token', data.token);
            alert('Login successful!');

            // Redirect the user or update the UI as needed
            loadAuthenticatedContent();
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert(error.message || 'An error occurred during login.');
    }
}

// Function to load authenticated content
async function loadAuthenticatedContent() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must log in first.');
        return;
    }

    try {
        // Fetch stocks data using the stored token
        const response = await fetch(`${apiBaseUrl}/stocks`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const stocks = await response.json();
            displayStocks(stocks);
        } else {
            throw new Error('Failed to load authenticated content');
        }
    } catch (error) {
        console.error('Error loading authenticated content:', error);
        alert(error.message || 'Failed to load content.');
    }
}

// Function to handle user logout
function logoutUser() {
    // Remove the JWT token from localStorage
    localStorage.removeItem('token');
    alert('Logged out successfully.');

    // Optionally reload the page or redirect to the login screen
    location.reload();
}

// Function to decode JWT and check expiration
function isTokenExpired(token) {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return payload.exp < currentTime;
}

// Modify loadAuthenticatedContent to validate the token
async function loadAuthenticatedContent() {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token');
        return;
    }

    try {
        // Fetch stocks data using the valid token
        const response = await fetch(`${apiBaseUrl}/stocks`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const stocks = await response.json();
            displayStocks(stocks);
        } else {
            throw new Error('Failed to load authenticated content');
        }
    } catch (error) {
        console.error('Error loading authenticated content:', error);
        alert(error.message || 'Failed to load content.');
    }
}


// Attach logout event listener to a logout button
document.getElementById('logout-button').addEventListener('click', logoutUser);


// Attach event listener to the login form
document.getElementById('login-form').addEventListener('submit', loginUser);
