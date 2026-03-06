const form = document.getElementById("tradeForm");
const table = document.querySelector("#tradeTable tbody");

form.addEventListener("submit", function(e){

e.preventDefault();

const trade = {
date: document.getElementById("date").value,
direction: document.getElementById("direction").value,
entry: document.getElementById("entry").value,
sl: document.getElementById("sl").value,
tp: document.getElementById("tp").value,
result: document.getElementById("result").value
};

let trades = JSON.parse(localStorage.getItem("trades")) || [];

trades.push(trade);

localStorage.setItem("trades", JSON.stringify(trades));

displayTrades();

});

function displayTrades(){

let trades = JSON.parse(localStorage.getItem("trades")) || [];

table.innerHTML="";

trades.forEach(t=>{

let row = `
<tr>
<td>${t.date}</td>
<td>${t.direction}</td>
<td>${t.entry}</td>
<td>${t.sl}</td>
<td>${t.tp}</td>
<td>${t.result}</td>
</tr>
`;

table.innerHTML += row;

});

}

displayTrades();
