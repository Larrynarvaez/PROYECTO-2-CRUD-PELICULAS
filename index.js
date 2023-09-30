// Variables globales
const botonEnviarUI = document.querySelector('#enviar'); // Selecciona el botón "enviar" del formulario
const descripcionUI = document.querySelector('#descripcion'); // Selecciona el campo de descripción del formulario
const peliculaUI = document.querySelector('#pelicula'); // Selecciona el campo de película del formulario
const sectionMostrarUI = document.querySelector('#mostrar'); // Selecciona la sección donde se mostrarán los elementos

// Evento Click: Agregar un escuchador de eventos al botón "enviar" que llama a la función addToDo cuando se hace clic.
botonEnviarUI.addEventListener('click', addToDo);

// Evento DOMContentLoaded: Agregar un escuchador de eventos que llama a la función imprimir cuando el contenido se ha cargado.
document.addEventListener('DOMContentLoaded', imprimir);

// Función para agregar un nuevo elemento a la lista
function addToDo(event) {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página

    // Obtener los datos almacenados en localStorage o inicializar un array vacío si no hay datos aún
    let datos = JSON.parse(localStorage.getItem('elements'));

    if (datos == null) {
        datos = [];
    }

    // Crear un objeto temporal con los valores del formulario
    const objetoTemporal = {
        pelicula: peliculaUI.value, // Obtener el valor del campo "pelicula"
        descripcion: descripcionUI.value, // Obtener el valor del campo "descripcion"
    };

    // Agregar el objeto temporal al array de datos
    datos.push(objetoTemporal);

    // Guardar los datos en localStorage como una cadena JSON
    localStorage.setItem('elements', JSON.stringify(datos));

    
    imprimir();
}

// Función para mostrar los elementos en la página
function imprimir() {
    // Obtener los datos almacenados en localStorage
    let datos = JSON.parse(localStorage.getItem('elements'));

    if (datos != null) { // Verificar si hay datos en el almacenamiento local
        // Generar HTML para mostrar los elementos en la sección de mostrar
        sectionMostrarUI.innerHTML = datos.map((dato, i) => {
            return `
            <div>
                <h2>${dato.pelicula}</h2>
                <p>${dato.descripcion}</p>
                <button class="editar" onClick="editar(${i})">editar</button>   
                <button class="eliminar" onClick="eliminar(${i})">eliminar</button>
            </div>
            `;
        }).join('<hr />'); // Unir los elementos con una línea horizontal y no en comas 
    }
}

// Función para editar un objecto existente en mi arreglo
function editar(i) {
    let datos = JSON.parse(localStorage.getItem('elements'));
    const peliculaNueva = prompt("Escribe la nueva película", datos[i].pelicula);

    if (peliculaNueva !== null) { // Verificar si cancelo el  prompt
        datos[i].pelicula = peliculaNueva; // Sobrescribir el valor de película con el nuevo valor
        const descripcionNueva = prompt("Escribe la nueva descripción", datos[i].descripcion);

        if (descripcionNueva !== null) { // Verificar si cancelo el prompt
            datos[i].descripcion = descripcionNueva; // Sobrescribir el valor de descripción con el nuevo valor
        }

        // Guardar los datos actualizados en localStorage
        localStorage.setItem('elements', JSON.stringify(datos));

        
        imprimir();
    }
}

// Función para eliminar el objeto dentro de mi arreglo
function eliminar(i) {
    let datos = JSON.parse(localStorage.getItem('elements'));
    datos.splice(i, 1); // Eliminar el elemento en la posición i del array

    // Guardar los datos actualizados en localStorage
    localStorage.setItem('elements', JSON.stringify(datos));

    // Llamar a la función imprimir para mostrar los elementos actualizados
    imprimir();
}
