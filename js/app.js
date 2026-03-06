const form = document.getElementById('tradeForm');
const tableBody = document.querySelector('#tradeTable tbody');
const darkModeBtn = document.getElementById('darkModeBtn');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');

// Agregar trade
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const simbolo = document.getElementById('simbolo').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const sesion = document.getElementById('sesion').value;
    const direccion = document.getElementById('direccion').value;
    const entry = document.getElementById('entry').value;
    const sl = document.getElementById('sl').value;
    const tp = document.getElementById('tp').value;
    const risk = document.getElementById('risk').value;
    const resultado = document.getElementById('resultado').value;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${simbolo}</td>
        <td>${fecha}</td>
        <td>${hora}</td>
        <td>${sesion}</td>
        <td>${direccion}</td>
        <td>${entry}</td>
        <td>${sl}</td>
        <td>${tp}</td>
        <td>${risk}%</td>
        <td>${resultado}</td>
    `;

    tableBody.appendChild(row);
    form.reset();
});

// Dark mode
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Descargar PDF
downloadPdfBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Historial de Trades", 14, 20);

    const rows = [];
    document.querySelectorAll('#tradeTable tbody tr').forEach(tr => {
        const row = [];
        tr.querySelectorAll('td').forEach(td => row.push(td.innerText));
        rows.push(row);
    });

    doc.autoTable({
        head: [['Símbolo','Fecha','Hora','Sesión','Dirección','Entry','SL','TP','Riesgo','Resultado']],
        body: rows,
        startY: 30
    });

    doc.save('registro_trades.pdf');
});
