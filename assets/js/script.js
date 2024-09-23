let listaNombreGastos = [];
let listaPrecioGastos = [];
let listaDescripcionGastos = [];

function clickBoton(){
    nombreGasto = document.getElementById("nombreGasto").value;
    precioGasto = document.getElementById("valorGasto").value;
    descripcionGasto = document.getElementById("descripcionGasto").value;

    if (modoEdicion) {
        listaNombreGastos[posicionEditar] = nombreGasto;
        listaPrecioGastos[posicionEditar] = precioGasto;
        listaDescripcionGastos[posicionEditar] = descripcionGasto;

        modoEdicion = false;
        posicionEditar = -1;
        document.getElementById("botonFormulario").textContent = "Agregar Gasto";
    } else {
        listaNombreGastos.push(nombreGasto);
        listaPrecioGastos.push(precioGasto);
        listaDescripcionGastos.push(descripcionGasto);
    }

    actualizarGastos();
}

function actualizarGastos(){
    const listaElementos = document.getElementById("listaDeGastos");
    const totalElementos = document.getElementById("totalGastos");

    let htmlLista = "";
    let totalGastos = 0;
    listaNombreGastos.forEach((elemento, posicion) => {
        precioGasto = Number(listaPrecioGastos[posicion]);
        descripcionGasto = listaDescripcionGastos[posicion];

        if (precioGasto > 150){
            alert("Se va a registrar un gasto mayor a $150");
        }

        htmlLista += `<li>${elemento} - USD ${precioGasto.toFixed(2)} - ${descripcionGasto}
                    <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                    <button onclick="modificarGasto(${posicion});">Editar</button>
                    </li>`;

        totalGastos += Number(precioGasto);
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);

    limpiar();
}

function limpiar(){
    document.getElementById("nombreGasto").value = "";
    document.getElementById("valorGasto").value = "";
    document.getElementById("descripcionGasto").value = "";
}

function eliminarGasto(posicion){
    listaNombreGastos.splice(posicion, 1);
    listaPrecioGastos.splice(posicion, 1);
    listaDescripcionGastos.splice(posicion, 1);
    actualizarGastos();
}

let modoEdicion = false;
let posicionEditar = -1;
function modificarGasto(posicion){
    document.getElementById("nombreGasto").value = listaNombreGastos[posicion];
    document.getElementById("valorGasto").value = listaPrecioGastos[posicion];
    document.getElementById("descripcionGasto").value = listaDescripcionGastos[posicion];

    modoEdicion = true;
    posicionEditar = posicion;
    document.getElementById("botonFormulario").textContent = "Guardar cambios";
}