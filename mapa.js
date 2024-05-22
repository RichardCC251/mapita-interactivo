document.addEventListener("DOMContentLoaded", function() {
    const mapa = document.getElementById("mapa");
    const infoEstado = document.getElementById("infoEstado");
    let datosEstados; // Variable para almacenar los datos del JSON
    
    // Cargar el archivo JSON
    fetch('./mapa.json')
        .then(response => response.json())
        .then(data => {
            datosEstados = data; // Almacena los datos del JSON en la variable datosEstados
            
            // Agregar evento de clic a cada estado después de cargar el JSON
            mapa.addEventListener("click", function(event) {
                const estadoClic = event.target.id; // Obtener el ID del estado clickeado
                if (!estadoClic) return; // Si no hay ID, salir de la función
                
                // Mostrar datos del estado clickeado
                const datosEstado = obtenerDatosEstado(estadoClic);
                if (datosEstado) {
                    mostrarDatosEstado(datosEstado);
                } else {
                    mostrarEstadoNoEncontrado(estadoClic);
                }
                event.preventDefault();
            });
        });
    
    // Función para obtener los datos de un estado dado su ID
    function obtenerDatosEstado(idEstado) {
        // Buscar los datos del estado en datosEstados utilizando su ID
        const estado = datosEstados.find(estado => estado.id === idEstado);
        return estado;
    }
    
    // Función para mostrar los datos del estado en la página
    function mostrarDatosEstado(datosEstado) {
        infoEstado.innerHTML = `
            <h2>${datosEstado.nombre_estado}</h2>
            <p>Capital: ${datosEstado.capital}</p>
            <p>Población: ${datosEstado.poblacion}</p>
            <p>Clima: ${datosEstado.clima}</p>
            <p>Animal Endémico: ${datosEstado.animal_endemico}</p>
            <p>Flora y Fauna: ${datosEstado.flora_fauna}</p>
            <p>Dato 1: ${datosEstado.dato1}</p>
            <p>Dato 2: ${datosEstado.dato2}</p>
            <p>Dato 3: ${datosEstado.dato3}</p>
        `;
    }

    // Función para mostrar un mensaje cuando no se encuentran datos para el estado clickeado
    function mostrarEstadoNoEncontrado(estadoClicado) {
        infoEstado.innerHTML = `
            <p>No se encontraron datos para el estado con ID: ${estadoClicado}</p>
        `;
    }
});