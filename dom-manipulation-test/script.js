const newQuoteText = document.querySelector("#newQuoteText");
const newQuoteCategory = document.querySelector("#newQuoteCategory");
const addQuote = document.querySelector("#addQuote");
const showQuote = document.querySelector("#showQuote");
const displayScreen = document.querySelector("#displayScreen");
const quoteKey = document.querySelector("#quoteKey");
const showAll = document.querySelector("#showAll");
importFile = document.querySelector("#importFile");
exportButton = document.querySelector("#exportButton");
const quoteList = [];
const LOCAL_STORAGE_KEY = "quotesData";
const SESSION_STORAGE_KEY = "lastViewedQuoteIndex";

const quoteAdd = () => {
  if (
    newQuoteText.value.trim() === "" ||
    newQuoteCategory.value.trim() === "" ||
    quoteKey.value.trim() === ""
  ) {
    alert("Please enter both quote text and category.");
    newQuoteCategory.value = "";
    newQuoteText.value = "";
    quoteKey.value = "";
    return;
  } else {
    let quotobject = {
      quote: newQuoteText.value.trim(),
      quoteCategory: newQuoteCategory.value.trim(),
      key: quoteKey.value.trim(),
    };

    quoteList.push(quotobject);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quoteList));
    // localStorage.setItem(quoteKey, JSON.stringify(quotobject));
    alert("Quote added successfully!");
    newQuoteCategory.value = "";
    newQuoteText.value = "";
    quoteKey.value = "";
  }
  return;
};

const displayquote = () => {
  if (quoteList.length === 0) {
    displayScreen.innerHTML = "";
    displayScreen.innerHTML = "<p>No quotes available. Please add a quote.</p>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quoteList.length);
  const randomQuote = quoteList[randomIndex];
  displayScreen.innerHTML = `<p> Quote: "${randomQuote.quote} <br> "Category: ${randomQuote.quoteCategory}</p>`;
};

const All = () => {
  displayScreen.innerHTML = "";
  quoteList.forEach((quoteObj) => {
    let all = document.createElement("p");
    all.innerHTML = `<br>Quote: "${quoteObj.quote}" <br> Category: ${quoteObj.quoteCategory}<br>`;
    all.style.margin = "10px";
    all.style.padding = "5px";
    all.style.color = "blue";
    displayScreen.appendChild(all);
  });
};

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

addQuote.addEventListener("click", quoteAdd);
showQuote.addEventListener("click", displayquote);
showAll.addEventListener("click", All);
importFile.addEventListener("onchange", importFromJsonFile);
exportButton.addEventListener("click", exportQuotes);
