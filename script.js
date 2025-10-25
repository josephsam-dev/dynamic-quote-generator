// Select HTML elements
const quoteDisplay = document.getElementById('quote-display');
const newQuoteBtn = document.getElementById('new-quote-btn');
const addQuoteInput = document.getElementById('add-quote-input');
const addQuoteBtn = document.getElementById('add-quote-btn');
const exportBtn = document.getElementById('export-btn');
const importInput = document.getElementById('import-input');

// Load stored quotes from localStorage or use default quotes
const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
const quotesArray = storedQuotes && storedQuotes.length ? storedQuotes : [
    "The best way to get started is to quit talking and begin doing.",
    "Don't let yesterday take up too much of today.",
    "It's not whether you get knocked down, it's whether you get up.",
    "You learn more from failure than from success.",
    "Dream big and dare to fail."
];

// Save current quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotesArray));
}

// Generate a random quote
function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    quoteDisplay.textContent = quotesArray[randomIndex];
}

// Add a new quote
function addQuote() {
    const newQuote = addQuoteInput.value.trim();
    if (newQuote) {
        quotesArray.push(newQuote);
        saveQuotes();
        addQuoteInput.value = '';
        generateQuote(); // Show the new quote immediately
    } else {
        alert("Please enter a quote before adding!");
    }
}

// Export quotes to JSON file
function exportQuotes() {
    const dataStr = JSON.stringify(quotesArray, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importQuotes(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            importedQuotes.forEach(q => {
                if (!quotesArray.includes(q)) quotesArray.push(q); // Avoid duplicates
            });
            saveQuotes();
            generateQuote();
            alert("Quotes imported successfully!");
        } catch (err) {
            alert("Invalid JSON file!");
        }
    };
    reader.readAsText(file);
}

// Event listeners
newQuoteBtn.addEventListener('click', generateQuote);
addQuoteBtn.addEventListener('click', addQuote);
exportBtn.addEventListener('click', exportQuotes);
importInput.addEventListener('change', importQuotes);

// Generate a quote when the page loads
generateQuote();
