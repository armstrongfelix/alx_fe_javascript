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

// script.js (Continuing from Task 0 and 1)

const categoryFilter = document.getElementById("categoryFilter");

// Function to populate the category filter dropdown
function populateCategories() {
  // 1. Get unique categories from the quotes array
  const categories = [...new Set(quotes.map((quote) => quote.category))];

  // 2. Clear existing options (except 'All Categories')
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // 3. Create and append a new option for each category
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = categoryFilter.value;

  // Save the selected filter to local storage for persistence (Step 2)
  localStorage.setItem("lastSelectedCategory", selectedCategory);

  // Determine which quotes to display
  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((quote) => quote.category === selectedCategory);

  // If no quotes match the filter
  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = `<p>No quotes found in the "${selectedCategory}" category.</p>`;
    return;
  }

  // Display a random quote from the filtered list
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  quoteDisplay.innerHTML = "";

  const quoteElement = document.createElement("p");
  quoteElement.textContent = `"${quote.text}"`;

  const categoryElement = document.createElement("em");
  categoryElement.textContent = `Category: ${quote.category}`;

  quoteDisplay.appendChild(quoteElement);
  quoteDisplay.appendChild(categoryElement);
}

// Function to restore the last selected filter on load (Step 2)
function restoreFilter() {
  const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
}

// **MODIFIED** Initialization flow
loadQuotes(); // Load existing quotes
populateCategories(); // Populate the dropdown with categories
restoreFilter(); // Set the dropdown to the last filter
filterQuotes(); // Display quotes based on the restored filter

// **MODIFIED** addQuote to also update categories
function addQuote() {
  // ... (existing code for getting input and adding to quotes array) ...

  if (newQuoteText && newQuoteCategory) {
    quotes.push({
      text: newQuoteText,
      category: newQuoteCategory,
    });

    // ... (clear inputs) ...
    saveQuotes();

    // **NEW:** Update the categories dropdown
    populateCategories();

    // If the new category is different, it will be added to the dropdown.
    // It's good practice to re-apply the filter after adding
    filterQuotes();

    alert("Quote added successfully!");
  } else {
    alert("Please enter both quote text and category.");
  }
}

// script.js (Continuing from all previous tasks)

// Simulated server data (can be replaced with fetch to a real API)
let serverQuotes = [
  {
    text: "Server: Consistency is the key to mastery.",
    category: "Discipline",
    id: 1,
  },
  {
    text: "Server: Code is read much more often than it is written.",
    category: "Programming",
    id: 2,
  },
];

// Helper function to simulate fetching data from a server
async function getServerQuotes() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app: const response = await fetch('YOUR_API_ENDPOINT/quotes');
  // const data = await response.json();
  // return data;

  return serverQuotes; // Return the simulated data
}

// Function to sync local data with server data
async function syncQuotes() {
  console.log("Starting data sync...");

  const serverData = await getServerQuotes();

  if (!serverData) {
    console.error("Failed to fetch server data.");
    return;
  }

  // Server-Wins Conflict Resolution Strategy (Step 2)
  // The server's quotes array is considered the source of truth.
  // We append any *unique* local quotes that are missing from the server.

  let mergedQuotes = [...serverData];
  let conflictCount = 0;
  let newLocalCount = 0;

  // Simple resolution: quotes with the same text/category are considered conflicts,
  // and the server's version (if any) is kept.
  // For a robust system, you'd use unique IDs and timestamps.
  const serverQuoteTexts = new Set(serverData.map((q) => q.text));

  quotes.forEach((localQuote) => {
    if (!serverQuoteTexts.has(localQuote.text)) {
      // This is a new quote only available locally
      mergedQuotes.push(localQuote);
      newLocalCount++;
    } else {
      // A quote with the same text exists on the server.
      // Under the "Server Wins" rule, we discard the local copy if it's different.
      conflictCount++;
    }
  });

  quotes = mergedQuotes; // Update the local array with the merged data
  saveQuotes(); // Save the new array to local storage
  populateCategories(); // Update filter options
  filterQuotes(); // Refresh display

  // Notification System (Step 3)
  let syncMessage = `Sync complete. ${serverData.length} quotes from server.`;
  if (newLocalCount > 0) {
    syncMessage += ` ${newLocalCount} new local quotes added.`;
  }
  if (conflictCount > 0) {
    syncMessage += ` ${conflictCount} potential local conflicts resolved (Server Wins).`;
  }

  alert(`Data Sync Status:\n${syncMessage}`);
  console.log(syncMessage);
}

// Set up periodic syncing (e.g., every 60 seconds)
// Note: In a real app, this should only happen when the user is active.
// setInterval(syncQuotes, 60000);

// Add a manual sync button to index.html
// <button onclick="syncQuotes()">Manual Sync with Server</button>

// Initial sync on page load (after loading local quotes)
// loadQuotes();
// syncQuotes();
// populateCategories();
// restoreFilter();
// filterQuotes();
