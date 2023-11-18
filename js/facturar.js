function cargarProvincias() {
    fetch('https://ubicaciones.paginasweb.cr/provincias.json')
        .then(response => response.json())
        .then(data => {
            const provinciasSelect = document.getElementById('prov');
            for (const key in data) {
                const option = document.createElement('option');
                option.text = data[key];
                option.value = key;
                provinciasSelect.appendChild(option);
            }
        })
        .catch(error => console.error('Error al cargar las provincias:', error));
}
function cargarCantones(idProvincia) {
    fetch(`https://ubicaciones.paginasweb.cr/provincia/${idProvincia}/cantones.json`)
        .then(response => response.json())
        .then(data => {
            const cantonesSelect = document.getElementById('can');
            cantonesSelect.innerHTML = '';
            for (const key in data) {
                const option = document.createElement('option');
                option.text = data[key];
                option.value = key;
                cantonesSelect.appendChild(option);
            }
        })
        .catch(error => console.error('Error al cargar los cantones:', error));
}
function cargarDistritos(idProvincia, idCanton) {
    fetch(`https://ubicaciones.paginasweb.cr/provincia/${idProvincia}/canton/${idCanton}/distritos.json`)
        .then(response => response.json())
        .then(data => {
            const distritosSelect = document.getElementById('dis');
            distritosSelect.innerHTML = '';
            for (const key in data) {
                const option = document.createElement('option');
                option.text = data[key];
                option.value = key;
                distritosSelect.appendChild(option);
            }
        })
        .catch(error => console.error('Error al cargar los distritos:', error));
}
function registrarProducto() {
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const producto = document.getElementById('producto').value;
    const tamaño = document.getElementById('tamanio').value;
    const precio = Math.floor(Math.random() * 20000) + 10000;
    let totalLinea = cantidad * precio;
    if (tamaño === 'Medium') {
        totalLinea *= 1.1;
    } else if (tamaño === 'Large') {
        totalLinea *= 1.15;
    }
    totalLinea = totalLinea.toFixed(2);
    agregarProductoATabla(cantidad, producto, tamaño, precio, totalLinea);
    const totalPagar = calcularTotalAPagar();
    document.getElementById('txtTotal').value = totalPagar.toFixed(2);
}
function agregarProductoATabla(cantidad, producto, tamaño, precio, totalLinea) {
    const tbody = document.getElementById('datos');
    const newRow = tbody.insertRow(-1);
    const cells = [
        newRow.insertCell(),
        newRow.insertCell(),
        newRow.insertCell(),
        newRow.insertCell(),
        newRow.insertCell(),
    ];
    cells[0].innerText = cantidad;
    cells[1].innerText = producto;
    cells[2].innerText = tamaño;
    cells[3].innerText = precio;
    cells[4].innerText = totalLinea;
}
function calcularTotalAPagar() {
    let totalPagar = 0;
    const rows = document.querySelectorAll('#datos tr');
    rows.forEach(row => {
        const totalLinea = parseFloat(row.cells[4].innerText);
        totalPagar += totalLinea;
    });
    const selectedProvince = document.getElementById('prov').value;
    if (selectedProvince === 'Puntarenas' || selectedProvince === 'Guanacaste' || selectedProvince === 'Limón') {
        totalPagar += 10000;
    }
    return totalPagar;
}
function cambioSelect(selectType) {
    if (selectType === 'P') {
        const provinciaSeleccionada = document.getElementById('prov').value;
        cargarCantones(provinciaSeleccionada);
    } else if (selectType === 'C') {
        const provinciaSeleccionada = document.getElementById('prov').value;
        const cantonSeleccionado = document.getElementById('can').value;
        cargarDistritos(provinciaSeleccionada, cantonSeleccionado);
    }
}
function Limpiar() {
    const tbody = document.getElementById('datos');
    tbody.innerHTML = '';
    document.getElementById('txtTotal').value = '';
}