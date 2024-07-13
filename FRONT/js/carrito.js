const port = 7070;

document.addEventListener("DOMContentLoaded", async () => {

    const fetchArticulos = async () => {

        try {
            const articulos = await axios.get(`${dbhost}/articulos`);
            mostrarCarrito(articulos.data);
    
        } catch (error) {
            console.error(`Error al cargar los productos: ${error}`);
        };

    };

    // Carga lista de articulos
    const mostrarCarrito = async (db) => {
        document.querySelector("#lista-carrito").innerHTML = "";
        
        let carrito = obtenerCarrito();

        // Dibujar articulos
        if (carrito.length != 0) {

            let suma = 0;
            const lista = document.querySelector("#lista-carrito");

            carrito.forEach(item => {

                const padre = document.createElement("div");
                padre.classList.add("articulo");

                const articulo = db.filter(v => v.id == item.id);
                
                const img = document.createElement("img");
                img.src = articulo[0].imagen;

                const cantidad = document.createElement("div");
                cantidad.classList.add("cantidad");
                cantidad.innerText = item.cantidad;

                const nombre = document.createElement("div");
                nombre.classList.add("nombre");
                nombre.innerText = articulo[0].nombre;

                const talle = document.createElement("div");
                talle.classList.add("talle");
                talle.innerText = `Talle: ${item.talle}`;

                const precio = document.createElement("div");
                precio.classList.add("precio");
                precio.innerText = `$ ${item.cantidad * articulo[0].precio}`;
                
                suma += (item.cantidad * articulo[0].precio);

                padre.appendChild(img);
                padre.appendChild(cantidad);
                padre.appendChild(nombre);
                padre.appendChild(talle);
                padre.appendChild(precio);
                lista.appendChild(padre);

            });

            document.querySelector("#precio-total").innerText = `Total: $ ${suma}`;
            document.querySelector("#boton-comprar input").classList.remove("deshabilitado");
            document.querySelector("#boton-vaciar input").classList.remove("deshabilitado");

        } else {
            const p = document.createElement("p");
            p.innerText = "El carrito está vacío.";
            document.querySelector("#lista-carrito").appendChild(p);
            document.querySelector("#boton-comprar input").classList.add("deshabilitado");
            document.querySelector("#boton-vaciar input").classList.add("deshabilitado");
        };
    };

    // Busca y devuelve elementos del almacenamiento local
    const obtenerCarrito = () => {

        let carrito = [];
        // Buscar items
        for (i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes("INDG8-")) {
                /*
                    INDG8-id=1&talle=X : 2  // cantidad
                    INDG8-id=1&talle=M : 1  // cantidad
                    INDG8-id=2&talle=M : 3  // cantidad
                */
            let cantidad = parseInt(localStorage.getItem(key)); // obtener cantidad
            let info = (key.replace("INDG8-id=","")).split("&talle="); // quitar prefijos y separar valores
            let id = parseInt(info[0]);
            let talle = info[1];

                carrito.push({id: id, talle: talle, cantidad: cantidad});
            };
        };

        return carrito;
    };

    const vaciarCarrito = () => {

        for (i = localStorage.length - 1; i >= 0; i--) {
            let key = localStorage.key(i);
            if (key.includes("INDG8-")) {
                localStorage.removeItem(key);
            };
        };
    };

    const comprarCarrito = async () => {
        const pregunta = "¿Esta seguro que desea comprar el carrito?";
        if (confirm(pregunta)) {

            try {
                // Es necesario comprobar el stock!
                const respuesta = await axios.get(`${dbhost}/stock`);
                const stock = respuesta.data;
                const respuesta2 = await axios.get(`${dbhost}/articulos`);
                const articulos = respuesta2.data;

                const carrito = obtenerCarrito();

                let compra = true;
                carrito.forEach((articulo, i) => {
                    let artStock = stock.filter(v => v.id == articulo.id);
                    

                    if (artStock[0][articulo.talle] <= articulo.cantidad) {

                        // No hay stock suficiente, consultar si desea comprar menos.

                        const nombre = document.getElementsByClassName("nombre")[i].innerText;
                        const msg = `Solo puede comprar hasta ${artStock[0][articulo.talle]} ${nombre} (${articulo.talle})\n¿Desea continuar?`;

                        if (confirm(msg)) {
                            // Reducir la cantidad
                            articulo.cantidad = artStock[0][articulo.talle];
                        } else {
                            // Cancelar compra
                            compra = false;
                        };
                    };
                });


                if (compra) {
                    // Realizar proceso de compra

                    // Variables para registrar la compra
                    let productos = [];
                    let cantidad = [];
                    let talles = [];
                    let importe = 0;

                    carrito.forEach((articulo, i) => {

                        productos.push(articulo.id);
                        cantidad.push(articulo.cantidad);
                        talles.push(articulo.talle);

                        // obtener precios
                        const infoArticulo = articulos.filter(v => v.id == articulo.id);
                        importe += (articulo.cantidad * infoArticulo[0].precio);

                    });

                    // Actualiza stock!
                    for (i = 0; i < productos.length; i++) {

                        const stockActual = stock.filter(v => v.id == productos[i]);

                        const actualizarStock = {
                            [talles[i]]: (stockActual[0][talles[i]] - cantidad[i])
                        };
        
                        try {
                            await axios.put(`${dbhost}/stock/${productos[i]}`, actualizarStock);
                        } catch (error) {
                            console.error("Error al actualizar el stock: ", error);
                        };
                    }



                    // Registrar nueva compra

                    const nuevaCompra = {
                        productos: productos.join(),
                        cantidad: cantidad.join(),
                        talles: talles.join(),
                        importe: importe
                    };

                    try {
                        await axios.post(`${dbhost}/ventas`, nuevaCompra);
                        // Vaciar carrito
                        vaciarCarrito();
                        alert("¡Muchas gracias por su compra!")
                        window.location.href = "tienda.html";
                    } catch (error) {
                        console.error("Error al comprar: ", error);
                    };

                } else {
                    alert("Compra cancelada.");
                };

            } catch (error) {
                console.error("Error al comprobar el stock: ", error);
            };

            
        };
    };

    fetchArticulos();

    // EVENTOS
    document.querySelector("#boton-comprar input").addEventListener("click", () => {comprarCarrito()});
    document.querySelector("#boton-vaciar input").addEventListener("click", () => {
        const pregunta = "¿Esta seguro que desea vaciar el carrito?\nEsta acción es irreversible.";
        if (confirm(pregunta)) {
            vaciarCarrito();
            window.location.href = "carrito.html";
        };
    });
});
