// PRODUCTOS
const productos = [
  // Abrigos
  {
    id: "Escoces-01",
    titulo: "Macallan",
    imagen: "",
    categoria: {
      nombre: "Escoces",
      id: "Escoces",
    },
    precio: 1000,
  },
  {
    id: "Escoces-02",
    titulo: "jhonny Walker",
    imagen: "",
    categoria: {
      nombre: "escoces",
      id: "Escoces",
    },
    precio: 1000,
  },
  {
    id: "Escoces-03",
    titulo: "Chivas",
    imagen: "",
    categoria: {
      nombre: "Escoces",
      id: "Escoces",
    },
    precio: 1000,
  },
  {
    id: "Escoces-04",
    titulo: "Monkey",
    imagen: "",
    categoria: {
      nombre: "Escoces",
      id: "Escoces",
    },
    precio: 1000,
  },

  // irlandeses
  {
    id: "Irlandes-01",
    titulo: "Tullamore",
    imagen: "",
    categoria: {
      nombre: "Irlandes",
      id: "Irlandes",
    },
    precio: 1000,
  },
  {
    id: "Irlandes-02",
    titulo: "Jameson Black",
    imagen: "",
    categoria: {
      nombre: "Irlandes",
      id: "Irlandes",
    },
    precio: 1000,
  },
  {
    id: "Irlandes-03",
    titulo: " Loch ",
    imagen: "",
    categoria: {
      nombre: "Irlandes",
      id: "Irlandes",
    },
    precio: 1000,
  },

  // Japoneses
  {
    id: "Japones-01",
    titulo: "Suntory",
    imagen: ".",
    categoria: {
      nombre: "Japones",
      id: "Japones",
    },
    precio: 1000,
  },
  {
    id: "Japones-02",
    titulo: " Akashi",
    imagen: "",
    categoria: {
      nombre: "Japones",
      id: "Japones",
    },
    precio: 1000,
  },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;
      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumerito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito;
}
