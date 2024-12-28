// Function to fetch stocks data from the backend and display it
async function fetchStocks() {
    try {
        // Make the GET request to the /stocks endpoint
        const response = await fetch('http://localhost:3000/stocks');
        
        // Check if the response is successful (status 200)
        if (!response.ok) {
            throw new Error('Failed to fetch stock data');
        }

        // Parse the JSON data from the response
        const stocks = await response.json();

        // Call the function to display stocks on the page
        displayStocks(stocks);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('market-data').innerHTML = `<p>Error loading stocks data: ${error.message}</p>`;
    }
}

// Function to display stocks data on the page as cards
function displayStocks(stocks) {
    const marketDataContainer = document.getElementById('market-data');
    
    // Clear any existing content
    marketDataContainer.innerHTML = '';

    // Check if there are any stocks to display
    if (stocks.length === 0) {
        marketDataContainer.innerHTML = '<p>No stocks available.</p>';
        return;
    }

    // Loop through each stock and create a card for it
    stocks.forEach(stock => {
        // Create a card container
        const card = document.createElement('div');
        card.classList.add('stock-card');
        
        // Create the stock icon with the symbol as the main part
        const icon = document.createElement('div');
        icon.classList.add('stock-icon');
        icon.innerText = stock.symbol; // Display stock symbol in the icon

        // Create a div for stock details
        const details = document.createElement('div');
        details.classList.add('stock-details');

        // Create and add stock name, price, and volume
        const name = document.createElement('h3');
        name.innerText = stock.name;

        const price = document.createElement('p');
        price.innerText = `Price: $${stock.price}`;

        const volume = document.createElement('p');
        volume.innerText = `Volume: ${stock.volume}`;

        // Append the details to the card
        details.appendChild(name);
        details.appendChild(price);
        details.appendChild(volume);

        // Append the icon and details to the card
        card.appendChild(icon);
        card.appendChild(details);

        // Append the card to the market data container
        marketDataContainer.appendChild(card);
    });
}

// Call the fetchStocks function when the page loads
document.addEventListener('DOMContentLoaded', fetchStocks);
