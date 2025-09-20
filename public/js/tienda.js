import { productos } from './productos.js';

const contenedor = document.getElementById("contenedor-productos");

function renderizarProductos() {
    productos.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("producto");
        card.style.backgroundImage = `url('${prod.imagen}')`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";

        card.innerHTML = `
            <div class="contenido">
                <h3>
                    <img class="icono-blanco"
                        src="${prod.categoryIcon}"
                        alt="Icono de ${prod.category}"
                        style="filter: invert(100%);"
                        width="45" height="50"/>
                </h3>
                <h4>${prod.tittle}</h4>    
            </div>
        `;

        card.addEventListener("click", () => mostrarModal(prod));
        contenedor.append(card);
    });
}
const modal = document.getElementById("modal-detalle");
const modalInfo = document.getElementById("modal-info");
const modalCerrar = document.getElementById("modal-cerrar");

function mostrarModal(prod) {
    modal.classList.remove("hidden");

    modalInfo.innerHTML = `
        
        <img src="${prod.categoryIcon}" alt="Icono de ${prod.category}" style="filter: invert(100%);" width="50" height="50" />
        <h2>${prod.tittle}</h2>
    `;

    const grupoModalidad = document.getElementById('grupo-modalidad');
    const selectModalidad = document.getElementById("modalidad-select");

    selectModalidad.innerHTML = `<option value="">Seleccioná una modalidad</option>`;

    if (prod.presentation?.presencial || prod.presentation?.online) {
        grupoModalidad.classList.remove("hidden");

        if (prod.presentation.presencial) {
            selectModalidad.innerHTML += `<option value="Presencial">Presencial</option>`;
        }
        if (prod.presentation.online) {
            selectModalidad.innerHTML += `<option value="Online">Online</option>`;
        }
    } else {
        grupoModalidad.classList.add("hidden");
    }

    document.getElementById('form-contacto').setAttribute('data-producto', prod.tittle);
    document.getElementById('producto-seleccionado').value = prod.tittle;
}

modalCerrar.addEventListener("click", () => {
    modal.classList.add("hidden");
});
const formContacto = document.getElementById('form-contacto');
const grupoModalidad = document.getElementById('grupo-modalidad');
const selectModalidad = document.getElementById("modalidad-select");

formContacto.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombre = formContacto.nombre.value.trim();
    const email = formContacto.email.value.trim();
    if (email === "") {
        Swal.fire({ icon: 'warning', title: 'Falta el email' });
        return;
    }
    const telefono = formContacto.telefono.value.trim();
    if (telefono === "") {
        Swal.fire({ icon: 'warning', title: 'Falta el teléfono' });
        return;
    }
    const mensaje = formContacto.mensaje.value.trim();
    const modalidad = selectModalidad.value;
    const producto = document.getElementById('producto-seleccionado').value;

    // Validaciones
    if (nombre === "") {
        Swal.fire({ icon: 'warning', title: 'Falta el nombre' });
        return;
    }

    if (!grupoModalidad.classList.contains('hidden') && modalidad === "") {
        Swal.fire({ icon: 'warning', title: 'Seleccioná una modalidad' });
        return;
    }

    const data = {
        nombre,
        email,
        telefono,
        mensaje,
        modalidad: grupoModalidad.classList.contains('hidden') ? 'No aplica' : modalidad,
        producto,
        _subject: `Consulta desde la web: ${producto}`,
        _template: "table"
    };

    try {
        const response = await fetch("https://formsubmit.co/ajax/laclave.fitnessclub@gmail.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Mensaje enviado correctamente',
                showConfirmButton: false,
                timer: 2000
            });

            modal.classList.add("hidden");
            formContacto.reset();
            grupoModalidad.classList.add("hidden");
        } else {
            throw new Error("Error al enviar");
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'No se pudo enviar',
            text: 'Intentá nuevamente más tarde'
        });
    }
});
function actualizarBotones() {
    const botones = document.querySelectorAll(".btn-agregar");
    botones.forEach(btn => {
        btn.addEventListener("click", agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const id = e.currentTarget.dataset.id;
    const producto = productos.find(p => p.id === id);

    const itemEnCarrito = carrito.find(p => p.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Mensaje enviado correctamente',
        showConfirmButton: false,
        timer: 1500
    });
    modal.classList.add("hidden");
}

function actualizarContador() {
    const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.textContent = total;
}

renderizarProductos();
actualizarContador();
