const form=document.getElementById("tradeForm")
const tableBody=document.querySelector("#tradeTable tbody")
const darkBtn=document.getElementById("darkModeBtn")
const pdfBtn=document.getElementById("downloadPdfBtn")

let trades=JSON.parse(localStorage.getItem("trades"))||[]

function renderTrades(){

tableBody.innerHTML=""

trades.forEach(trade=>{

const row=document.createElement("tr")

if(trade.resultado==="Win") row.classList.add("win")
if(trade.resultado==="Loss") row.classList.add("loss")
if(trade.resultado==="BE") row.classList.add("be")

row.innerHTML=`
<td>${trade.simbolo}</td>
<td>${trade.fecha}</td>
<td>${trade.hora}</td>
<td>${trade.sesion}</td>
<td>${trade.direccion}</td>
<td>${trade.entry}</td>
<td>${trade.sl}</td>
<td>${trade.tp}</td>
<td>${trade.risk}%</td>
<td>${trade.resultado}</td>
`

tableBody.appendChild(row)

})

}

renderTrades()

form.addEventListener("submit",e=>{

e.preventDefault()

const trade={

simbolo:simbolo.value,
fecha:fecha.value,
hora:hora.value,
sesion:sesion.value,
direccion:direccion.value,
entry:entry.value,
sl:sl.value,
tp:tp.value,
risk:risk.value,
resultado:resultado.value

}

trades.push(trade)

localStorage.setItem("trades",JSON.stringify(trades))

renderTrades()

form.reset()

})

/* DARK MODE */

function applyTheme(){

const theme=localStorage.getItem("theme")

if(theme==="dark"){

document.body.classList.add("dark-mode")
darkBtn.textContent="☀️ Clear Mode"

}else{

darkBtn.textContent="🌙 Dark Mode"

}

}

applyTheme()

darkBtn.onclick=()=>{

if(document.body.classList.contains("dark-mode")){

document.body.classList.remove("dark-mode")
localStorage.setItem("theme","light")
darkBtn.textContent="🌙 Dark Mode"

}else{

document.body.classList.add("dark-mode")
localStorage.setItem("theme","dark")
darkBtn.textContent="☀️ Clear Mode"

}

}

/* PDF */

pdfBtn.onclick=()=>{

const {jsPDF}=window.jspdf
const doc=new jsPDF()

const rows=trades.map(t=>[
t.simbolo,
t.fecha,
t.hora,
t.sesion,
t.direccion,
t.entry,
t.sl,
t.tp,
t.risk+"%",
t.resultado
])

doc.text("Trading Journal",14,15)

doc.autoTable({
head:[['Símbolo','Fecha','Hora','Sesión','Dirección','Entry','SL','TP','Risk','Resultado']],
body:rows,
startY:20
})

doc.save("trades.pdf")

}
