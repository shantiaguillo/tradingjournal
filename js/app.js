const form=document.getElementById("tradeForm")
const tableBody=document.querySelector("#tradeTable tbody")
const darkBtn=document.getElementById("darkModeBtn")
const pdfBtn=document.getElementById("downloadPdfBtn")

const simbolo=document.getElementById("simbolo")
const fecha=document.getElementById("fecha")
const hora=document.getElementById("hora")
const sesion=document.getElementById("sesion")
const direccion=document.getElementById("direccion")
const entry=document.getElementById("entry")
const sl=document.getElementById("sl")
const tp=document.getElementById("tp")
const risk=document.getElementById("risk")
const resultado=document.getElementById("resultado")

let trades=JSON.parse(localStorage.getItem("trades"))||[]
let editIndex=null

function renderTrades(){

tableBody.innerHTML=""

trades.forEach((trade,index)=>{

const row=document.createElement("tr")

let resultClass=""

if(trade.resultado==="Win") resultClass="win"
if(trade.resultado==="Loss") resultClass="loss"
if(trade.resultado==="BE") resultClass="be"

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
<td class="${resultClass}">${trade.resultado}</td>

<td>
<button class="action-btn edit-btn" onclick="editTrade(${index})">Editar</button>
<button class="action-btn delete-btn" onclick="deleteTrade(${index})">Eliminar</button>
</td>
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

if(editIndex===null){
trades.push(trade)
}else{
trades[editIndex]=trade
editIndex=null
}

localStorage.setItem("trades",JSON.stringify(trades))

renderTrades()
form.reset()

})

function deleteTrade(index){

trades.splice(index,1)

localStorage.setItem("trades",JSON.stringify(trades))

renderTrades()

}

function editTrade(index){

const trade=trades[index]

simbolo.value=trade.simbolo
fecha.value=trade.fecha
hora.value=trade.hora
sesion.value=trade.sesion
direccion.value=trade.direccion
entry.value=trade.entry
sl.value=trade.sl
tp.value=trade.tp
risk.value=trade.risk
resultado.value=trade.resultado

editIndex=index

}

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

if(trades.length===0){
alert("No hay trades registrados para descargar.")
return
}

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

doc.save("historial_trades.pdf")

}
