// Array of quotes
const quotes = [
    "The best way to get started is to quit talking and begin doing.",
    "Don't let yesterday take up too much of today.",
    "It's not whether you get knocked down, it's whether you get up."
];

// Select the HTML elements
const quoteDisplay = document.getElementById('quote-display');
const newQuoteBtn = document.getElementById('new-quote-btn');

// Function to generate a random quote
function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex];
}

// Event listener for button click
newQuoteBtn.addEventListener('click', generateQuote);

// Generate a quote when the page loads
generateQuote();
