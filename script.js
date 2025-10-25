// Load quotes from localStorage or use default
let quotesArray = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "Life is beautiful", category: "Life" },
    { text: "Knowledge is power", category: "Education" },
    { text: "Stay positive", category: "Motivation" }
];

// Populate categories dropdown dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    const categories = [...new Set(quotesArray.map(q => q.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected filter
    const savedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = savedCategory;
}

// Display quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory);

    const container = document.getElementById('quotesContainer');
    container.innerHTML = '';

    const filteredQuotes = selectedCategory === 'all' 
        ? quotesArray 
        : quotesArray.filter(q => q.category === selectedCategory);

    filteredQuotes.forEach(q => {
        const div = document.createElement('div');
        div.textContent = `"${q.text}" — ${q.category}`;
        container.appendChild(div);
    });
}

// Add a new quote
function addQuote(text, category) {
    if (!text || !category) return alert("Please enter both text and category.");
    quotesArray.push({ text, category });
    localStorage.setItem('quotes', JSON.stringify(quotesArray));
    populateCategories();
    filterQuotes();
}

// Handle add quote button click
function handleAddQuote() {
    const text = document.getElementById('quoteText').value.trim();
    const category = document.getElementById('quoteCategory').value.trim();
    addQuote(text, category);

    // Clear inputs
    document.getElementById('quoteText').value = '';
    document.getElementById('quoteCategory').value = '';
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    filterQuotes();
});
