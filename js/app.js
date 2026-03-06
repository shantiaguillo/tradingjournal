const form = document.getElementById("tradeForm");
const list = document.getElementById("tradeList");
const downloadBtn = document.getElementById("download");

let editIndex = null;

form.addEventListener("submit", function(e){

e.preventDefault();

const trade = {

date: document.getElementById("date").value,
time: document.getElementById("time").value,
session: document.getElementById("session").value,
direction: document.getElementById("direction").value,
entry: document.getElementById("entry").value,
sl: document.getElementById("sl").value,
tp: document.getElementById("tp").value,
risk: document.getElementById("risk").value,
result: document.getElementById("result").value,
notes: document.getElementById("notes").value

};

let trades = JSON.parse(localStorage.getItem("trades")) || [];

if(editIndex !== null){

trades[editIndex] = trade;
editIndex = null;

}else{

trades.push(trade);

}

localStorage.setItem("trades", JSON.stringify(trades));

displayTrades();

form.reset();

});


function displayTrades(){

let trades = JSON.parse(localStorage.getItem("trades")) || [];

list.innerHTML="";

trades.forEach((t,index)=>{

list.innerHTML += `

<div class="trade">

<b>${t.date} ${t.time}</b><br>

Sesión: ${t.session}<br>

Dirección: ${t.direction}<br>

Entry: ${t.entry} | SL: ${t.sl} | TP: ${t.tp}<br>

Risk: ${t.risk}%<br>

Resultado: ${t.result}<br>

Notas: ${t.notes}<br><br>

<button onclick="editTrade(${index})">Editar</button>

<button onclick="deleteTrade(${index})">Borrar</button>

</div>

`;

});

}

displayTrades();


function deleteTrade(index){

let trades = JSON.parse(localStorage.getItem("trades")) || [];

trades.splice(index,1);

localStorage.setItem("trades", JSON.stringify(trades));

displayTrades();

}


function editTrade(index){

let trades = JSON.parse(localStorage.getItem("trades")) || [];

let t = trades[index];

document.getElementById("date").value = t.date;
document.getElementById("time").value = t.time;
document.getElementById("session").value = t.session;
document.getElementById("direction").value = t.direction;
document.getElementById("entry").value = t.entry;
document.getElementById("sl").value = t.sl;
document.getElementById("tp").value = t.tp;
document.getElementById("risk").value = t.risk;
document.getElementById("result").value = t.result;
document.getElementById("notes").value = t.notes;

editIndex = index;

window.scrollTo({top:0,behavior:"smooth"});

}


downloadBtn.addEventListener("click", function(){

let trades = localStorage.getItem("trades");

let blob = new Blob([trades], {type:"application/json"});

let a = document.createElement("a");

a.href = URL.createObjectURL(blob);

a.download = "trading-journal.json";

a.click();

});
