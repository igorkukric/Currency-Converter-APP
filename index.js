const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result")

// Event listener for currency dropdowns (select)

  [fromCur, toCur].forEach((select, i)=> {
    for(let curCode in Country_list) {
      const selected = (i === 0 && curCode ==="USD") || (i === 1 && curCode === "RSD") ? "selected" : ""
      select.insertAdjacentHTML("beforeend", `<option value="${curCode}"${selected}>${curCode}</option>`)
    }
    select.addEventListener("change", ()=> {
      const code = select.value
      const imgTag = select.parentElement.querSelector("img")
      imgTag.src = `https://flagcdn.com/48x36/${Country_list[code].toLowerCase()}.png`
    })
  })