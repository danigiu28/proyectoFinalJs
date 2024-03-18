// Cargar tareas desde el almacenamiento local
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Recuperar tareas desde el almacenamiento local
document.getElementById('recuperarTareas').addEventListener('click', function () {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    if (tareas.length) {
        const iconUrl = 'img/skullChef.png';
        fetch(iconUrl)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    Swal.fire({
                        title: 'Mise en Place',
                        html: tareas.join('<br>'),
                        iconHtml: `<img src="${base64data}">`,
                        iconColor: 'white'
                    });
                };
            })
            .catch(error => {
                console.error('Error cargando el icono:', error);
                Swal.fire({
                    title: 'Mise en Place',
                    html: tareas.join('<br>'),
                    icon: 'info'
                });
            });
    }
});

document.getElementById('login').addEventListener('submit', function (event) {
    event.preventDefault();
    let nombreChef = document.getElementById('nombreChef').value.trim();
    let partida = document.getElementById('partida').value.trim();

    if (nombreChef && partida) {
        localStorage.setItem('nombreChef', nombreChef);
        localStorage.setItem('partida', partida);

        // Mostrar el nombre del chef y la partida en el DOM
        document.getElementById('nombreChef').textContent = nombreChef;
        document.getElementById('partida').textContent = partida;

        // Mostrar mensaje de bienvenida 
        Swal.fire({
            title: 'Bienvenido, ' + nombreChef,
            icon: 'success',
            confirmButtonText: 'Continuar',
            customClass: {
                confirmButton: 'btn btn-primary'
            }
        });
    }
});


let listaTareas = {
    tareas: tareas
};

// Agregar las tareas al DOM
tareas.forEach(function (tarea, indice) {
    let li = document.createElement('li');
    li.textContent = tarea;
    li.setAttribute('dataIndice', indice);
    document.getElementById('lista').appendChild(li);
});

// Evento para agregar tareas
document.getElementById('formularioTarea').addEventListener('submit', function (event) {
    event.preventDefault();
    let tarea = document.getElementById('tarea').value.trim();

    if (tarea) {
        listaTareas.tareas.push(tarea);
        mostrarTareas();
        document.getElementById('tarea').value = '';

        // Guardar tareas en el almacenamiento local
        localStorage.setItem('tareas', JSON.stringify(listaTareas.tareas));
    }
});

document.getElementById('finalizarCarga').addEventListener('click', function () {
    let fechaHora = luxon.DateTime.local();
    localStorage.setItem('fechaHoraCarga', fechaHora.toISO());
});

// Evento para eliminar tareas
document.getElementById('lista').addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        // Obtener el elemento que se desea eliminar
        let tarea = event.target;

        // Obtener el índice del elemento que se desea eliminar
        let indice = listaTareas.tareas.indexOf(tarea.textContent);

        // Eliminar el elemento de la lista
        tarea.remove();

        // Eliminar el elemento del array
        listaTareas.tareas.splice(indice, 1);

        // Guardar tareas en el almacenamiento local
        localStorage.setItem('tareas', JSON.stringify(listaTareas.tareas));
    }
});

// Función para mostrar tareas
function mostrarTareas() {
    if (listaTareas.tareas.length === 0) return;

    let tarea = listaTareas.tareas[listaTareas.tareas.length - 1];
    let lista = document.getElementById('lista');
    let li = document.createElement('li');
    li.textContent = tarea;
    li.setAttribute('data-indice', listaTareas.tareas.length - 1);
    lista.appendChild(li);

    Toastify({
        text: tarea,
        duration: 3000
    }).showToast();
}

