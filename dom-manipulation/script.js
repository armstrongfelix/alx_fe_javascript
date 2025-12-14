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

// Example Quote Structure
{
  id: 1,
  quoteText: "The only way to do great work is to love what you do.",
  author: "Steve Jobs",
  // A timestamp for comparison is crucial for conflict resolution
  timestamp: Date.now()
}

async function fetchQuotesFromServer() {
  const MOCK_API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';
  // Note: Using a real mock API means you'll need to adapt their data
  // to your expected quote format.
  try {
    const response = await fetch(MOCK_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const serverData = await response.json();

    // Map the mock data to your quote structure
    return serverData.map(item => ({
      id: item.id,
      quoteText: item.title, // or item.body
      author: `User ${item.userId}`, // Mock author
      timestamp: Date.now() // Mock timestamp for demo purposes
    }));

  } catch (error) {
    console.error("Error fetching quotes from server:", error);
    return []; // Return empty array on failure
  }
}
async function postQuotesToServer(localQuotes) {
  const MOCK_API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Using POST for simulation
  try {
    // We only need to simulate a successful send for the task's scope
    const response = await fetch(MOCK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // In a real app, you might only send the *changes*
      body: JSON.stringify(localQuotes),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Local quotes successfully simulated-posted to server.");
    // Return the server response (e.g., the new IDs/timestamps)
    return await response.json(); 

  } catch (error) {
    console.error("Error posting quotes to server:", error);
    // Notify the user of the sync failure (Step 3)
    displayNotification('❌ Sync Failed! Could not save local changes to server.', 'error');
  }
}

// const LOCAL_STORAGE_KEY = 'dynamic_quotes';                                                

// Helper to get local quotes
function getLocalQuotes() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error parsing local storage data:", e);
        return [];
    }
}

// Helper to save local quotes
function saveLocalQuotes(quotes) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quotes));
    // Optional: Re-render UI after saving
    // updateQuoteUI(quotes);
}

/**
 * Main function to sync local data with server.
 * Strategy: Server data takes precedence (overwrite local changes).
 */
async function syncQuotes() {
    console.log("Starting data sync...");
    let conflictsResolved = 0;
    let newQuotesCount = 0;
    
    // 1. Fetch data from the server
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = getLocalQuotes();
    
    // Convert local quotes to a Map for O(1) lookup by ID
    const localQuotesMap = new Map(localQuotes.map(q => [q.id, q]));
    
    // The final set of quotes after resolving conflicts
    const newLocalQuotes = []; 

    serverQuotes.forEach(serverQuote => {
        const localQuote = localQuotesMap.get(serverQuote.id);

        if (localQuote) {
            // Check for conflict (assuming a difference in content/timestamp)
            // In a real app, you would check timestamps or hashes.
            // For this simple simulation, we assume any local change is a 'conflict' 
            // and the server version is always newer/correct (precedence rule).
            
            // Simple check: If quote texts are different, a conflict occurred
            if (localQuote.quoteText !== serverQuote.quoteText) {
                 // **CONFLICT RESOLUTION: Server takes precedence**
                newLocalQuotes.push(serverQuote);
                conflictsResolved++;
                // Remove from map to track remaining local-only quotes
                localQuotesMap.delete(serverQuote.id); 
            } else {
                // No conflict, keep the existing quote (or server's if timestamps match)
                newLocalQuotes.push(serverQuote); 
                localQuotesMap.delete(serverQuote.id);
            }
        } else {
            // Server has a quote that local doesn't have (NEW QUOTE)
            newLocalQuotes.push(serverQuote);
            newQuotesCount++;
        }
    });

    // Handle quotes that exist locally but not on the server (deleted/not yet uploaded)
    // For this basic sync (server precedence), we typically drop them, or 
    // attempt to post them to the server first (simulated in postQuotesToServer).
    
    // **For simplicity and adherence to "server takes precedence"**, 
    // we use ONLY the quotes found on the server.
    
    // 2. Update local storage with the resolved data
    saveLocalQuotes(newLocalQuotes);

    // 3. Notify the user
    if (newQuotesCount > 0) {
        displayNotification(`✅ Sync Complete: ${newQuotesCount} new quotes added from server.`, 'success');
    }
    if (conflictsResolved > 0) {
        displayNotification(`⚠️ Conflicts Resolved: ${conflictsResolved} quote(s) updated with server data (server precedence).`, 'warning');
    }
    if (newQuotesCount === 0 && conflictsResolved === 0) {
        displayNotification('🔄 Sync Complete: Local data is up-to-date.', 'info');
    }

    // 4. (Optional) Simulate posting local *new* quotes back to server 
    // await postQuotesToServer(newLocalQuotes);
}

// ----------------------------------------------------
// PERIODIC CHECK AND UI ELEMENTS
// ----------------------------------------------------

// Step 1: Implement periodic data fetching
const SYNC_INTERVAL_MS = 60000; // Sync every 60 seconds (1 minute)
// Call syncQuotes() every minute
let syncIntervalId = setInterval(syncQuotes, SYNC_INTERVAL_MS); 
console.log(`Periodic sync started (interval: ${SYNC_INTERVAL_MS / 1000}s)`);


// Step 3: Add a UI element or notification system
function displayNotification(message, type = 'info') {
    const notificationArea = document.getElementById('notification-area');
    if (!notificationArea) {
        console.warn(`Notification Area not found. Message: ${message}`);
        return;
    }

    // Create a simple notification div
    const div = document.createElement('div');
    div.textContent = message;
    div.className = `notification notification-${type}`; // Use CSS for styling
    
    // Append and automatically remove after 5 seconds
    notificationArea.prepend(div);
    setTimeout(() => {
        div.remove();
    }, 5000);
}

// Example: Manual conflict resolution option (triggered by a button)
function promptManualConflictResolution() {
    // In a real application, this would bring up a modal
    // showing the local version vs. the server version
    alert("Option to manually resolve conflicts is not fully implemented in this simulation. Default resolution (Server Precedence) has been applied.");
    // A button in the UI could call: syncQuotes().then(() => displayNotification("Manual sync requested and completed.", 'info'));
}

// Ensure the HTML has a container for notifications:
/*
<div id="notification-area"></div>
<button onclick="syncQuotes()">Manual Sync Now</button>
<button onclick="promptManualConflictResolution()">Manual Conflict Resolution</button> 
*/

// Step 3: Add a UI element or notification system
function displayNotification(message, type = 'info') {
    const notificationArea = document.getElementById('notification-area');
    // IMPORTANT: Make sure you have a div with id="notification-area" in your HTML
    if (!notificationArea) {
        console.warn(`Notification Area not found. Message: ${message}`);
        return;
    }

    // Create a simple notification div
    const div = document.createElement('div');
    div.textContent = message;
    // Add CSS classes for styling: e.g., notification-success, notification-warning, etc.
    div.className = `notification notification-${type}`; 
    
    // Append and automatically remove after 5 seconds
    notificationArea.prepend(div);
    setTimeout(() => {
        if(div.parentElement) div.remove();
    }, 5000);
}

// Inside the syncQuotes function, replace the old notification block with this:
    
    // 2. Update local storage with the resolved data
    saveLocalQuotes(newLocalQuotes);

    // 3. Notify the user based on the outcome
    let syncSuccessMessage = "Quotes synced with server!"; // The specific check you required
    
    if (newQuotesCount > 0 || conflictsResolved > 0) {
        // If there were specific changes, use a more detailed message
        let detail = [];
        if (newQuotesCount > 0) detail.push(`${newQuotesCount} new quote(s)`);
        if (conflictsResolved > 0) detail.push(`${conflictsResolved} conflict(s) resolved`);
        
        displayNotification(`✅ ${syncSuccessMessage} (${detail.join(' and ')}).`, 'success');
        
    } else {
        // If the data was already consistent
        displayNotification(`🔄 ${syncSuccessMessage} (Data is up-to-date).`, 'info');
    }