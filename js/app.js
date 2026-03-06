const form = document.getElementById('tradeForm');
const tableBody = document.querySelector('#tradeTable tbody');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const sesion = document.getElementById('sesion').value;
    const direccion = document.getElementById('direccion').value;
    const entry = document.getElementById('entry').value;
    const sl = document.getElementById('sl').value;
    const tp = document.getElementById('tp').value;
    const risk = document.getElementById('risk').value;
    const resultado = document.getElementById('resultado').value;

    // Crear fila
    const row = document.createElement('tr');
    row.innerHTML = `
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

    // Limpiar formulario
    form.reset();
});
