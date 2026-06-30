// ==============================
// EXPERIENCIAS
// ==============================

const experiencias = [
    {
        id: 1,
        nombre: "Trekking Laguna San Rafael",
        categoria: "Trekking",
        lugar: "Puerto Río Tranquilo",
        precio: 85000,
        imagen: "img/san-rafael.jpeg",
        descripcion: "Recorre senderos rodeados de bosques patagónicos hasta llegar a increíbles miradores de la Laguna San Rafael."
    },
    {
        id: 2,
        nombre: "Kayak Río Baker",
        categoria: "Navegación",
        lugar: "Puerto Bertrand",
        precio: 60000,
        imagen: "img/rio-baker.jpg",
        descripcion: "Navega por uno de los ríos más cristalinos de Chile acompañado por guías certificados."
    },
    {
        id: 3,
        nombre: "Pesca Deportiva",
        categoria: "Pesca",
        lugar: "Lago General Carrera",
        precio: 70000,
        imagen: "img/general-carrera.jpg",
        descripcion: "Disfruta una jornada completa de pesca recreativa con equipamiento incluido."
    },
    {
        id: 4,
        nombre: "Ruta Patrimonial",
        categoria: "Cultura",
        lugar: "Coyhaique",
        precio: 25000,
        imagen: "img/museo-coyhaique.jpeg",
        descripcion: "Conoce la historia de Aysén mediante museos, arquitectura y gastronomía local."
    },
    {
        id: 5,
        nombre: "Sendero Cerro Castillo",
        categoria: "Trekking",
        lugar: "Parque Nacional Cerro Castillo",
        precio: 95000,
        imagen: "img/cerro-castillo.jpeg",
        descripcion: "Una caminata inolvidable entre montañas, glaciares y lagunas de color turquesa."
    },
    {
        id: 6,
        nombre: "Navegación por Fiordos",
        categoria: "Navegación",
        lugar: "Puerto Chacabuco",
        precio: 90000,
        imagen: "img/fiordos.jpg",
        descripcion: "Recorre fiordos y canales patagónicos observando fauna marina y paisajes únicos."
    }
];

// ==============================
// ELEMENTOS DEL DOM
// ==============================

const contenedor = document.getElementById("listaExperiencias");
const selectExperiencia = document.getElementById("experiencia");
const formulario = document.getElementById("formReserva");
const mensaje = document.getElementById("mensaje");
const botonesFiltro = document.querySelectorAll(".filtro");

// ==============================
// RENDER DE EXPERIENCIAS
// ==============================

function mostrarExperiencias(lista) {

    contenedor.innerHTML = "";

    lista.forEach(exp => {

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta");

        const imagen = document.createElement("img");
        imagen.src = exp.imagen;
        imagen.alt = exp.nombre;

        const contenido = document.createElement("div");
        contenido.classList.add("tarjeta-contenido");

        const titulo = document.createElement("h3");
        titulo.textContent = exp.nombre;

        const categoria = document.createElement("p");
        categoria.innerHTML = `<strong>Categoría:</strong> ${exp.categoria}`;

        const lugar = document.createElement("p");
        lugar.innerHTML = `<strong>Lugar:</strong> ${exp.lugar}`;

        const precio = document.createElement("p");
        precio.innerHTML = `<strong>Precio:</strong> $${exp.precio.toLocaleString("es-CL")}`;

        const descripcion = document.createElement("p");
        descripcion.textContent = exp.descripcion;
        descripcion.classList.add("descripcion", "oculto");

        const boton = document.createElement("button");
        boton.classList.add("ver-mas");
        boton.textContent = "Ver más";

        boton.addEventListener("click", () => {

            descripcion.classList.toggle("oculto");

            if (descripcion.classList.contains("oculto")) {
                boton.textContent = "Ver más";
            } else {
                boton.textContent = "Ver menos";
            }

        });

        contenido.append(
            titulo,
            categoria,
            lugar,
            precio,
            descripcion,
            boton
        );

        tarjeta.append(imagen, contenido);

        contenedor.appendChild(tarjeta);

    });

}

// ==============================
// SELECT DEL FORMULARIO
// ==============================

function cargarSelect() {

    experiencias.forEach(exp => {

        const option = document.createElement("option");

        option.value = exp.nombre;
        option.textContent = exp.nombre;

        selectExperiencia.appendChild(option);

    });

}

// ==============================
// FILTROS
// ==============================

botonesFiltro.forEach(boton => {

    boton.addEventListener("click", () => {

        botonesFiltro.forEach(btn => btn.classList.remove("activo"));

        boton.classList.add("activo");

        const categoria = boton.dataset.categoria;

        if (categoria === "Todos") {

            mostrarExperiencias(experiencias);

        } else {

            const filtradas = experiencias.filter(exp =>
                exp.categoria === categoria
            );

            mostrarExperiencias(filtradas);

        }

    });

});

// ==============================
// VALIDAR EMAIL
// ==============================

function validarEmail(email){

    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(email);

}

// ==============================
// FORMULARIO
// ==============================

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    mensaje.className = "";
    mensaje.textContent = "";

    const nombre = document.getElementById("nombre").value.trim();

    const email = document.getElementById("email").value.trim();

    const experiencia = selectExperiencia.value;

    const personas = Number(
        document.getElementById("personas").value
    );

    if(nombre === ""){

        mensaje.classList.add("error");
        mensaje.textContent = "Debe ingresar su nombre.";

        return;

    }

    if(!validarEmail(email)){

        mensaje.classList.add("error");
        mensaje.textContent = "Correo electrónico inválido.";

        return;

    }

    if(experiencia === ""){

        mensaje.classList.add("error");
        mensaje.textContent = "Seleccione una experiencia.";

        return;

    }

    if(personas < 1){

        mensaje.classList.add("error");
        mensaje.textContent = "Debe reservar al menos para una persona.";

        return;

    }

    mensaje.classList.add("exito");

    mensaje.innerHTML = `
        ¡Reserva realizada correctamente!<br>
        Gracias <strong>${nombre}</strong> por reservar
        <strong>${experiencia}</strong> para
        <strong>${personas}</strong> persona(s).
    `;

    formulario.reset();

});

// ==============================
// INICIO
// ==============================

mostrarExperiencias(experiencias);

cargarSelect();