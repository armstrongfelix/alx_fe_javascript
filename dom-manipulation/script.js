const newQuoteText = document.querySelector("#newQuoteText");
const newQuoteCategory = document.querySelector("#newQuoteCategory");
const addQuote = document.querySelector("#addQuote");
const showQuote = document.querySelector("#showQuote");
const displayScreen = document.querySelector("#displayScreen");
const quoteKey = document.querySelector("#quoteKey");
const showAll = document.querySelector("#showAll");
const quoteList = [];
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
    console.log(quoteList);
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
    displayScreen.innerHTML = "<p>No quotes available. Please add a quote.</p>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quoteList.length);
  const randomQuote = quoteList[randomIndex];
  displayScreen.innerHTML = `<p> Quote: "${randomQuote.quote} <br> "Category: ${randomQuote.quoteCategory}</p>`;
};

const All = () => {
  let all = document.createElement("p");
  quoteList.forEach((quoteObj) => {
    all.innerHTML += `Quote: "${quoteObj.quote}" | Category: ${quoteObj.quoteCategory} <br>`;
  });
  displayScreen.appendChild(all);
};

addQuote.addEventListener("click", quoteAdd);
showQuote.addEventListener("click", displayquote);
showAll.addEventListener("click", All);
