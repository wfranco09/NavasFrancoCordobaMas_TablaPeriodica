function cargarVistaDesktop() {
    fetch("elementosdesktop.json")
        .then(res => res.json())
        .then(elementos => {
            const tabla = document.querySelector(".tabla-grid");
            tabla.innerHTML = ''; // Limpiar

            elementos.forEach(el => {
                const celda = document.createElement("a");
                celda.classList.add("celda", `seccion${el.seccion}`);
                celda.textContent = el.simbolo;
                celda.href = `https://es.wikipedia.org/wiki/${el.nombre}`;
                celda.target = "_blank";
                celda.style.gridColumn = el.col;
                celda.style.gridRow = el.row;
                tabla.appendChild(celda);
            });
        })
        .catch(err => console.error("Error cargando desktop:", err));
}

function cargarVistaResponsive() {
    fetch("elementos.json")
        .then(res => res.json())
        .then(data => {
            const tabla = document.querySelector(".tabla-grid");
            tabla.innerHTML = ''; // Limpiar

            data.secciones.forEach(seccion => {
                // Crear contenedor de sección
                const seccionDiv = document.createElement("div");
                seccionDiv.className = `seccion-grupo ${seccion.id}`;
                
                // Crear header
                const header = document.createElement("h3");
                header.className = "seccion-header";
                header.textContent = seccion.titulo;
                seccionDiv.appendChild(header);
                
                // Crear grid de elementos
                const grid = document.createElement("div");
                grid.className = "elementos-grid";
                
                // Aplicar máximo de columnas si existe
                if (seccion.maxColumnas) {
                    grid.style.gridTemplateColumns = `repeat(${seccion.maxColumnas}, 1fr)`;
                }
                
                // Crear celdas
                seccion.elementos.forEach(elemento => {
                    const celda = document.createElement("a");
                    celda.className = `celda seccion${elemento.seccion}`;
                    celda.textContent = elemento.simbolo;
                    celda.href = `https://es.wikipedia.org/wiki/${elemento.nombre}`;
                    celda.target = "_blank";
                    celda.title = elemento.nombre;
                    
                    grid.appendChild(celda);
                });
                
                seccionDiv.appendChild(grid);
                tabla.appendChild(seccionDiv);
            });
        })
        .catch(err => console.error("Error cargando responsive:", err));
}

// Función para determinar qué vista cargar
function determinarVista() {
    const ancho = window.innerWidth;
    
    if (ancho >= 601 && ancho <= 800) {
        cargarVistaResponsive();
    } else {
        cargarVistaDesktop();
    }
}

// Inicializar y escuchar cambios de tamaño
determinarVista();
window.addEventListener('resize', determinarVista);