const newQuoteText = document.querySelector("#newQuoteText");
const newQuoteCategory = document.querySelector("#newQuoteCategory");
const addQuotebtn = document.querySelector("#addQuotebtn");
const showQuote = document.querySelector("#showQuote");
const displayScreen = document.querySelector("#displayScreen");
const quoteKey = document.querySelector("#quoteKey");
const showAll = document.querySelector("#showAll");
const quoteList = [];
const addQuote = () => {
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
    console.log(quoteList);
    // localStorage.setItem(quoteKey, JSON.stringify(quotobject));
    alert("Quote added successfully!");
    newQuoteCategory.value = "";
    newQuoteText.value = "";
    quoteKey.value = "";
  }
  return;
};

const displayRandomQuote = () => {
  if (quoteList.length === 0) {
    displayScreen.innerHTML = "<p>No quotes available. Please add a quote.</p>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quoteList.length);
  const randomQuote = quoteList[randomIndex];
  displayScreen.innerHTML = `<p> Quote: "${randomQuote.quote} <br> "Category: ${randomQuote.quoteCategory}</p>`;
};

const All = () => {
  quoteList.forEach((quoteObj) => {
    let all = document.createElement("p");
    all.innerHTML = `<br> Quote: "${quoteObj.quote}" <br> Category: ${quoteObj.quoteCategory}<br>`;
    all.style.margin = "10px";
    all.style.padding = "5px";
    all.style.color = "blue";
    displayScreen.appendChild(all);
  });
};

// addQuotebtn.addEventListener("click", addQuote);
showQuote.addEventListener("click", displayRandomQuote);
showAll.addEventListener("click", All);
