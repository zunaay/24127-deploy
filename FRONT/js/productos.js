document.addEventListener("DOMContentLoaded", () => {
    // Obtener parámetros
    const ParametrosURL = new URLSearchParams(window.location.search);
    const id = ParametrosURL.get("q");

    const fetchArticulos = async (id) => {
        try {
            const articulo = await axios.get(`${dbhost}/articulos/${id}`);

            cargarProducto(articulo.data);
            document.querySelector(".contenedor").style.display = "block";

        } catch (error) {
            console.error("Error al cargar es articulo: ", error);
        };
    };

    if (id) fetchArticulos(id);


    const cargarProducto = (producto) => {

        // Añadir categorías
        let padre = document.querySelector("ul.navegacion");
        let tipo = document.createElement("li");
        tipo.innerText = producto.tipo;

        let categoria = document.createElement("li");
        categoria.innerText = producto.categoria;
        padre.append(tipo, categoria);

        // Imagen
        let imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        document.querySelector(".imagen-contenedor").appendChild(imagen);

        // Nombre del articulo
        document.querySelector(".detalles h2").innerText = producto.nombre;

        // Precio del articulo
        document.querySelector(".detalles .precio").innerText = `$ ${producto.precio}`;

        // Añadir info en boton 
        document.querySelector("#boton-carrito").setAttribute("data-producto", producto.id);

        // Talles
        document.querySelector(".M").classList.add("activo");
        mostrarStock(producto.id);
    };

    const mostrarStock = async (id) => {
        try {
            const respuesta = await axios.get(`${dbhost}/stock/${id}`);
            const stock = respuesta.data;

            const talle = (document.querySelector(".activo").classList.value).split(" ")[0];


            if (stock[talle] == 0 || stock[talle] == null) {
                document.querySelector(".talles-info").innerText = "No disponible en este talle.";
        
                // Deshabilitar boton del carrito
                document.querySelector("#boton-carrito input").classList.add("deshabilitado");
        
            } else {
                // Habilitar boton del carrito
                document.querySelector("#boton-carrito input").classList.remove("deshabilitado");
        
                if (stock[talle] == 1) {
                    document.querySelector(".talles-info").innerText = "¡Último disponible!";
                } else {
                    document.querySelector(".talles-info").innerText = `${stock[talle]} disponibles.`;
                };
            };

            // Añadir info en boton
            document.querySelector("#boton-carrito").setAttribute("data-talle", talle);

        } catch (error) {
            console.error("Error al cargar el stock: ", error);
        };
    };

    const cambiarTalle = (talle) => {
        document.querySelector(".talles input.activo").classList.remove("activo");
        document.querySelector(`.${talle}`).classList.add("activo");

        // Obtener parámetros
        const ParametrosURL = new URLSearchParams(window.location.search);
        const id = ParametrosURL.get("q");
        mostrarStock(id);
    };

    const sumarCarrito = () => {
        /*
            INDG8-id=1&talle=x : cantidad=2
            INDG8-id=1&talle=m : cantidad=1
            INDG8-id=2&talle=m : cantidad=3
        */

        const articulo = document.querySelector("#boton-carrito").getAttribute("data-producto");
        const talle = document.querySelector("#boton-carrito").getAttribute("data-talle");

        // nombre
        let nombre = `INDG8-id=${articulo}&talle=${talle}`;
        
        // comprobar si ya fue añadino
        if (localStorage.getItem(nombre) == null) {
            // nuevo 
            localStorage.setItem(nombre, 1);

        } else {
            // sumar uno
            let cantidad = parseInt( localStorage.getItem(nombre) );
            cantidad++;
            localStorage.setItem(nombre, cantidad);
        };

        alert("Artículo añadido al carrito");

        cuentaCarrito();
    };

    // EVENTOS !

    document.querySelector(".talles .XS").addEventListener("click", () => { cambiarTalle("XS"); });
    document.querySelector(".talles .S").addEventListener("click", () => { cambiarTalle("S"); });
    document.querySelector(".talles .M").addEventListener("click", () => { cambiarTalle("M"); });
    document.querySelector(".talles .L").addEventListener("click", () => { cambiarTalle("L"); });
    document.querySelector(".talles .XL").addEventListener("click", () => { cambiarTalle("XL"); });
    document.querySelector(".talles .XXL").addEventListener("click", () => { cambiarTalle("XXL"); });

    document.querySelector("#boton-carrito input").addEventListener("click", () => {sumarCarrito()});
});
