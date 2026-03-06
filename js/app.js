const form=document.getElementById("tradeForm")
const table=document.querySelector("#tradeTable tbody")
const submitBtn=document.getElementById("submitBtn")
const darkBtn=document.getElementById("darkModeBtn")

let trades=JSON.parse(localStorage.getItem("trades"))||[]
let editIndex=null

function save(){
localStorage.setItem("trades",JSON.stringify(trades))
}

function render(){

table.innerHTML=""

trades.forEach((t,i)=>{

let resultClass=""

if(t.resultado==="Win") resultClass="win"
if(t.resultado==="Loss") resultClass="loss"
if(t.resultado==="BE") resultClass="be"

let row=`
<tr>

<td>${t.simbolo}</td>
<td>${t.fecha}</td>
<td>${t.hora}</td>
<td>${t.sesion}</td>
<td>${t.direccion}</td>
<td>${t.entry}</td>
<td>${t.sl}</td>
<td>${t.tp}</td>
<td>${t.risk}</td>

<td class="${resultClass}">${t.resultado}</td>

<td>
<button class="action-btn" onclick="editTrade(${i})">Editar</button>
<button class="action-btn" onclick="deleteTrade(${i})">Eliminar</button>
</td>

</tr>
`

table.innerHTML+=row

})

}

form.addEventListener("submit",(e)=>{

e.preventDefault()

let trade={

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
submitBtn.textContent="Agregar Trade"

}

save()
render()
form.reset()

})

function editTrade(i){

let t=trades[i]

simbolo.value=t.simbolo
fecha.value=t.fecha
hora.value=t.hora
sesion.value=t.sesion
direccion.value=t.direccion
entry.value=t.entry
sl.value=t.sl
tp.value=t.tp
risk.value=t.risk
resultado.value=t.resultado

editIndex=i

submitBtn.textContent="Actualizar Trade"

}

function deleteTrade(i){

if(confirm("¿Seguro que deseas eliminar este trade?")){

trades.splice(i,1)
save()
render()

}

}

document.getElementById("downloadPdfBtn").addEventListener("click",()=>{

if(trades.length===0){
alert("No hay registros para descargar")
return
}

const {jsPDF}=window.jspdf

let doc=new jsPDF()

let data=trades.map(t=>[
t.simbolo,
t.fecha,
t.hora,
t.sesion,
t.direccion,
t.entry,
t.sl,
t.tp,
t.risk,
t.resultado
])

doc.autoTable({

head:[["Símbolo","Fecha","Hora","Sesión","Dirección","Entry","SL","TP","Risk","Resultado"]],
body:data

})

doc.save("trading_journal.pdf")

})

if(localStorage.getItem("dark")==="true"){
document.body.classList.add("dark")
}

function updateDarkText(){

if(document.body.classList.contains("dark")){
darkBtn.textContent="☀ Clear Mode"
}else{
darkBtn.textContent="🌙 Dark Mode"
}

}

updateDarkText()

darkBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark")

localStorage.setItem("dark",document.body.classList.contains("dark"))

updateDarkText()

})

render()
