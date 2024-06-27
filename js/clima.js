// 1. Obtener referencia a elementos del DOM (tabla de clima, historial de consultas, botón de vaciar historial)
const weatherTable = document.querySelector('#weatherTable tbody');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// 2. Definir función para obtener parámetros GET de la URL (ciudad seleccionada)
function obtenerParametroGET(nombreParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombreParametro);
}

// 3. Función para obtener información de clima de una ciudad desde localStorage
function obtenerInfoClima(ciudad) {
    const datosClima = JSON.parse(localStorage.getItem('datosClima'));
    const ciudadEncontrada = datosClima.ciudades.find(c => c.nombre === ciudad);
    if (ciudadEncontrada) {
        mostrarClimaEnTabla(ciudadEncontrada);
        agregarCiudadAHistorial(ciudad);
    } else {
        console.error(`No se encontró información para la ciudad ${ciudad}`);
    }
}

// 4. Función para mostrar dinámicamente el clima de la ciudad seleccionada en la tabla
function mostrarClimaEnTabla(ciudad) {
    const fila = `
        <tr>
            <td>${ciudad.nombre}</td>
            <td>${ciudad.temperatura}</td>
            <td>${ciudad.condicion}</td>
        </tr>
    `;
    weatherTable.innerHTML = fila;
}

// 5. Función para agregar una ciudad al historial en localStorage
function agregarCiudadAHistorial(ciudad) {
    let historial = JSON.parse(localStorage.getItem('historialConsultas')) || [];
    if (!historial.includes(ciudad)) {
        historial.push(ciudad);
        localStorage.setItem('historialConsultas', JSON.stringify(historial));
        actualizarHistorialEnDOM();
    }
}

// 6. Función para actualizar el historial en el DOM desde localStorage
function actualizarHistorialEnDOM() {
    historyList.innerHTML = '';
    let historial = JSON.parse(localStorage.getItem('historialConsultas')) || [];
    historial.forEach(ciudad => {
        const li = document.createElement('li');
        li.textContent = ciudad;
        historyList.appendChild(li);
    });
}

// 7. Función para vaciar el historial de consultas en localStorage y en el DOM
function vaciarHistorial() {
    localStorage.removeItem('historialConsultas');
    historyList.innerHTML = '';
}

// 8. Obtener la ciudad seleccionada desde los parámetros GET y obtener su información de clima al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const ciudadSeleccionada = obtenerParametroGET('city');
    if (ciudadSeleccionada) {
        obtenerInfoClima(ciudadSeleccionada);
    }
    actualizarHistorialEnDOM();
});

// 9. Manejar evento de clic en el botón de vaciar historial para eliminar todas las consultas anteriores
clearHistoryBtn.addEventListener('click', vaciarHistorial);
