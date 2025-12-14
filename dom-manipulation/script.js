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
importFile = document.querySelector("#importFile");
exportButton = document.querySelector("#exportButton");
const LOCAL_STORAGE_KEY = "quotesData";
const SESSION_STORAGE_KEY = "lastViewedQuoteIndex";

/**
 * Check 2: Implements displayRandomQuote function.
 * Check 3: Logic to select a random quote and update the DOM.
 */
function createAddQuoteForm() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  // Basic validation
  if (text === "" || category === "") {
    alert("Please enter both the quote text and a category.");
    return; // Stop the function if validation fails
  }

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

  // 1. Create a new quote object
  const newQuote = {
    text: text,
    category: category,
  };

  // 2. Add the new quote to the global array
  quotes.push(newQuote);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quoteList));

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

function saveQuotes() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quotes));
}
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

/**
 * Step 2: JSON Export
 * Allows the user to download the current quotes array as a JSON file.
 * NOTE: Assumes 'quotes' is your global array containing the quote objects.
 */
function exportQuotes() {
  // 1. Convert the JavaScript object (quotes array) into a JSON string
  // The 'null, 2' arguments make the JSON output nicely formatted (pretty-printed)
  const jsonString = JSON.stringify(quoteList, null, 2);

  // 2. Create a Blob from the JSON string with the correct MIME type
  const blob = new Blob([jsonString], { type: "application/json" });

  // 3. Create a temporary URL for the Blob object
  const url = URL.createObjectURL(blob);

  // 4. Create a temporary <a> link element
  const a = document.createElement("a");

  // 5. Set the link's attributes for download
  a.href = url;
  a.download = "quotes_export.json"; // Suggested filename

  // 6. Programmatically click the link to start the download
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // 7. Clean up the temporary object URL to free up memory
  URL.revokeObjectURL(url);

  alert("Quotes exported as quotes_export.json!");
}

importFile.addEventListener("onchange", importFromJsonFile);
exportButton.addEventListener("click", exportQuotes);

// script.js (Continuing from Task 0)

// Function to save quotes to Local Storage
function saveQuotes() {
  // Convert the JavaScript array to a JSON string before saving
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to load quotes from Local Storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    // Parse the JSON string back into a JavaScript array
    quotes = JSON.parse(storedQuotes);
  }
  // If no stored quotes, the initial array from Task 0 is used.
}

// Modify addQuote to use saveQuotes()
function addQuote() {
  // ... (existing code for getting input and validation) ...
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({
      text: newQuoteText,
      category: newQuoteCategory,
    });

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // **NEW:** Save the updated array to Local Storage
    saveQuotes();

    showRandomQuote();
    alert("Quote added successfully!");
  } else {
    alert("Please enter both quote text and category.");
  }
}

// Call loadQuotes() before the initial display
loadQuotes();
// showRandomQuote() is called here or after loadQuotes()
showRandomQuote();

// script.js (Continuing from Task 0 and 1)

// Function to export quotes to a JSON file
function exportToJsonFile() {
  // 1. Convert the quotes array to a JSON string
  const jsonString = JSON.stringify(quotes, null, 2);

  // 2. Create a Blob (a file-like object) from the JSON string
  const blob = new Blob([jsonString], { type: "application/json" });

  // 3. Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // 4. Create a temporary link element for downloading
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes_export.json";

  // 5. Programmatically click the link to start the download
  document.body.appendChild(a);
  a.click();

  // 6. Clean up the temporary elements and URL
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file (provided in the task)
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      // Parse the imported JSON string
      const importedQuotes = JSON.parse(event.target.result);

      // Validate that it's an array of objects (basic check)
      if (
        Array.isArray(importedQuotes) &&
        importedQuotes.every((q) => q.text && q.category)
      ) {
        // Add the imported quotes to the existing array
        quotes.push(...importedQuotes);

        // Save the combined array to local storage
        saveQuotes();

        // Refresh display and categories (for later tasks)
        showRandomQuote();

        alert("Quotes imported successfully!");
      } else {
        alert(
          "Invalid JSON file format. Please ensure it is an array of quote objects."
        );
      }
    } catch (e) {
      alert("Error parsing JSON file: " + e.message);
    }
  };
  // Read the file content as text
  fileReader.readAsText(event.target.files[0]);
  // Clear the file input for re-use
  document.getElementById("importFile").value = "";
}
