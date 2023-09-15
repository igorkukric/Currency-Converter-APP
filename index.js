const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

// Event listener for currency dropdowns (select)

for (let curCode in Country_list) {
  const fromSelected = curCode === "USD" ? "selected" : "";
  const toSelected = curCode === "RSD" ? "selected" : "";

  fromCur.insertAdjacentHTML(
    "beforeend",
    `<option value="${curCode}" ${fromSelected}>${curCode}</option>`
  );
  toCur.insertAdjacentHTML(
    "beforeend",
    `<option value="${curCode}" ${toSelected}>${curCode}</option>`
  );
}

[fromCur, toCur].forEach((select, i) => {
  for (let curCode in Country_list) {
    const selected =
      (i === 0 && curCode === "USD") || (i === 1 && curCode === "RSD");
    const selectedAttribute = selected ? "selected" : "";
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${curCode}"${selectedAttribute}>${curCode}</option>`
    );
  }
  select.addEventListener("change", () => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${Country_list[
      code
    ].toLowerCase()}.png`;
  });
});

// Function to get exchange rate from api

async function getExchangeRate() {
  const amountVal = amount.value || 1;
  exRateTxt.innerText = "Getting exchange rate...";
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/149aea97991275ee88700935/latest/${fromCur.value}`);
    const result = await response.json();
    const exchangerate = result.conversion_rates[toCur.value];
    const totalExRate = (amountVal * exchangerate).toFixed(2);
    exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
  } catch (error) {
    exRateTxt.innerText = "Something went wrong";
  }
}

// Event listeners for button and exchange icon click

window.addEventListener("load", getExchangeRate);
getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

exIcon.addEventListener("click", () => {
  const [fromValue, toValue] = [toCur, fromCur];

  [fromValue, toValue].forEach((select) => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${Country_list[
      code
    ].toLowerCase()}.png`;
  });

  getExchangeRate();
});
