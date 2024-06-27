// 1. Obtener referencia al formulario y al select de ciudades
const cityForm = document.getElementById('cityForm');
const citySelect = document.getElementById('citySelect');

// 2. Definir función para cargar dinámicamente las opciones de ciudades desde datos.json usando fetch
function cargarOpcionesCiudades() {
    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            // Almacenar los datos en localStorage para usarlos en clima.html
            localStorage.setItem('datosClima', JSON.stringify(data));
            data.ciudades.forEach(ciudad => {
                const option = document.createElement('option');
                option.value = ciudad.nombre;
                option.textContent = ciudad.nombre;
                citySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar las opciones de ciudades desde datos.json:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        });
}

// 3. Manejar evento de envío del formulario para redirigir a clima.html con la ciudad seleccionada
cityForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const ciudadSeleccionada = citySelect.value;
    window.location.href = `clima.html?city=${ciudadSeleccionada}`;
});

// 4. Cargar las opciones de ciudades al cargar la página principal
document.addEventListener('DOMContentLoaded', cargarOpcionesCiudades);
