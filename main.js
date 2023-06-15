let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads();
  console.log(localStorage.getItem("myLeads"));
});

tabBtn.addEventListener("click", () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      renderLeads();
    }
  );
});

deleteBtn.addEventListener("dblclick", () => {
  myLeads = [];
  localStorage.clear();
  renderLeads();
});

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads();
}
console.log(leadsFromLocalStorage);

function renderLeads() {
  ulEl.innerHTML = "";
  for (let i = 0; i < myLeads.length; i++) {
    ulEl.innerHTML += `
        <li>
            <a href="${myLeads[i]}" target=_blank">${myLeads[i]}</a>
        </li>
    `;
  }
}
