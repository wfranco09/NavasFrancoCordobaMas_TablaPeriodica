fetch("elementos.json")
    .then(res => res.json())
    .then(elementos => {

        const tabla = document.querySelector(".tabla-grid");

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
    .catch(err => console.error("SE PUDRIÓ EL JSON:", err));