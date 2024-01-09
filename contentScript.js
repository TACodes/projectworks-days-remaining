var config = { attributes: true, characterData:true, subtree: true };

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
  afterDOMLoaded();
  var observer =  new MutationObserver(reload);
  observer.observe(document.body, config);
}

function afterDOMLoaded() {
  var year = document.getElementsByClassName("js-text")[0].innerText;
  var leaveTable = document.getElementsByTagName("table")[0];
  var totalVacationHours = 0;
  if (leaveTable) {
    for (let row of leaveTable.rows) {
      if (row.cells[1].innerText.includes("Annual vacation") &&
        row.cells[11].innerText === " Approved") {
        let duration = parseInt(row.cells[7].innerText);
        totalVacationHours += parseInt(duration);
      }
    }

    var leaveCollection = document.getElementsByClassName("cu-displayHorizontalGroup");
    var leaveVacationDays = 0;
    for (let leave of leaveCollection) {
      if (leave.innerText.includes(year)) {
        let value = leave.getElementsByClassName("cu-displayHorizontalValue")[0];
        leaveVacationDays = parseInt(value.innerText);
      }
    }

    var remainingVacationDays = leaveVacationDays - (totalVacationHours / 8);
    var newPage = document.getElementById("PageContent");
    var dataCell = document.createElement("div");
    var spanTag = document.createElement("span");
    dataCell.setAttribute("id", "remaining-days");
    dataCell.style.cssText = `white-space: nowrap; font-weight: bold; background-color: #ffff;
                              max-width: 600px; padding: 15px;`;
    spanTag.style.cssText = "display:block; font-weight: normal;";
    if (Number(year) > 0) {
      dataCell.innerText = `Remaining Vacation Days ${year}`;
      spanTag.innerText = `${remainingVacationDays}`;
    } else {
      dataCell.innerText = "Remaining Vacation Days";
      spanTag.innerText = "Please select a year number to see the remaining days, etc. 2023, 2024..";
    }
    dataCell.appendChild(spanTag);
    newPage.appendChild(dataCell);
  }
};

function reload() {
  if (!document.getElementById("remaining-days")) {
    afterDOMLoaded();
  }
}