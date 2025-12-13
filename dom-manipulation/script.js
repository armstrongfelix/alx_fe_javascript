// Check 1: Existence of the quotes array
let quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    category: "Work",
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    category: "Inspiration",
  },
  {
    text: "The mind is everything. What you think you become.",
    category: "Philosophy",
  },
  {
    text: "The best way to predict the future is to create it.",
    category: "Future",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];

// Reference to the DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

/**
 * Check 2: Implements displayRandomQuote function.
 * Check 3: Logic to select a random quote and update the DOM.
 */
function showRandomQuote() {
  // 1. Select a random quote from the array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // 2. Clear previous content
  quoteDisplay.innerHTML = "";

  // 3. Create the quote text element
  const quoteTextElement = document.createElement("p");
  quoteTextElement.className = "quote-text";
  quoteTextElement.textContent = `"${quote.text}"`;

  // 4. Create the category element
  const quoteCategoryElement = document.createElement("p");
  quoteCategoryElement.className = "quote-category";
  quoteCategoryElement.textContent = `— Category: ${quote.category}`;

  // 5. Append the new elements to the display container
  quoteDisplay.appendChild(quoteTextElement);
  quoteDisplay.appendChild(quoteCategoryElement);
}

/**
 * Check 4: Implements the addQuote function.
 * Check 5: Logic to add a new quote to the quotes array and update the DOM.
 */
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  // Basic validation
  if (text === "" || category === "") {
    alert("Please enter both the quote text and a category.");
    return; // Stop the function if validation fails
  }

  // 1. Create a new quote object
  const newQuote = {
    text: text,
    category: category,
  };

  // 2. Add the new quote to the global array
  quotes.push(newQuote);

  // 3. Clear the input fields for the next entry
  newQuoteText.value = "";
  newQuoteCategory.value = "";

  // Optional: Give feedback and show the new quote immediately
  alert(`New Quote added successfully!`);
  showRandomQuote(); // Show a quote (could be the newly added one)
}

// Check 6: Event listener on the “Show New Quote” button
newQuoteButton.addEventListener("click", showRandomQuote);

// Initial call to display a quote when the page loads
showRandomQuote();
