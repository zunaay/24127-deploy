document.addEventListener("DOMContentLoaded", () => {
    const tablaArticulos = document.querySelector("#seccion-articulos table tbody");
    const tablaVentas = document.querySelector("#seccion-ventas table tbody");
    const tablaMensajes = document.querySelector("#seccion-mensajes table tbody");

    // Obtener todos los datos de la API 
    const fetchArticulos = async () => {

        try {
            tablaArticulos.innerHTML = "";

            const respuesta = await axios.get(`${dbhost}/articulos`);
            const articulos = respuesta.data;

            articulos.forEach(articulo => {
                // crear una nueva fila 
                const fila = document.createElement("tr");

                // crear celdas para el titulo, contenido y acciones
                const celdaId = document.createElement("td");
                const celdaNombre = document.createElement("td");
                const celdaCategoria = document.createElement("td");
                const celdaTipo = document.createElement("td");
                const celdaImagen = document.createElement("td");
                const celdaPrecio = document.createElement("td");
                const celdaAcciones = document.createElement("td");

                celdaId.textContent = articulo.id;
                celdaNombre.textContent = articulo.nombre;
                celdaCategoria.textContent = articulo.categoria;
                celdaTipo.textContent = articulo.tipo;
                celdaPrecio.textContent = articulo.precio;

                const celdaImagenIMG = document.createElement("img");
                celdaImagenIMG.src = articulo.imagen;
                celdaImagen.appendChild(celdaImagenIMG);

                // Crear y añadir botones de acciones
                const botonStock = document.createElement("button");
                const botonEditar = document.createElement("button");
                const botonEliminar = document.createElement("button");
                botonStock.textContent = "Ver Stock";
                botonEditar.textContent = "Editar";
                botonEliminar.textContent = "Eliminar";
                botonStock.addEventListener("click", () => {mostrarStock(articulo.id)});
                botonEditar.addEventListener("click", () => {editarArticulo(articulo.id)});
                botonEliminar.addEventListener("click", () => {eliminarArticulo(articulo.id)});
                celdaAcciones.appendChild(botonStock);
                celdaAcciones.appendChild(botonEditar);
                celdaAcciones.appendChild(botonEliminar);

                // Añadir celdas a la fila
                fila.appendChild(celdaId);
                fila.appendChild(celdaNombre);
                fila.appendChild(celdaCategoria);
                fila.appendChild(celdaTipo);
                fila.appendChild(celdaImagen);
                fila.appendChild(celdaPrecio);
                fila.appendChild(celdaAcciones);

                // Agregar fila al cuerpo de la tabla
                tablaArticulos.appendChild(fila);

            });
        } catch (error) {
            console.error("Error al cargar los articulos: ", error);
        };
        
    };

    const fetchVentas = async () => {
        try {
            tablaVentas.innerHTML = "";

            const respuesta = await axios.get(`${dbhost}/ventas`);
            const ventas = respuesta.data;

            ventas.forEach(venta => {
                // crear una nueva fila 
                const fila = document.createElement("tr");

                // crear celdas para el titulo, contenido y acciones
                const celdaId = document.createElement("td");
                const celdaProductos = document.createElement("td");
                const celdaCantidades = document.createElement("td");
                const celdaTalles = document.createElement("td");
                const celdaImporte = document.createElement("td");
                const celdaAcciones = document.createElement("td");
                
                celdaId.textContent = venta.id;
                celdaProductos.textContent = venta.productos;
                celdaCantidades.textContent = venta.cantidad;
                celdaTalles.textContent = venta.talles;
                celdaImporte.textContent = venta.importe;

                // Crear y añadir botones de acciones
                const botonDetalles = document.createElement("button");
                const botonEliminar = document.createElement("button");
                botonDetalles.textContent = "Detalles";
                botonEliminar.textContent = "Eliminar";
                botonDetalles.addEventListener("click", () => {detallesVenta(venta.id)});
                botonEliminar.addEventListener("click", () => {eliminarVenta(venta.id)});
                celdaAcciones.appendChild(botonDetalles);
                celdaAcciones.appendChild(botonEliminar);

                // Añadir celdas a la fila
                fila.appendChild(celdaId);
                fila.appendChild(celdaProductos);
                fila.appendChild(celdaCantidades);
                fila.appendChild(celdaTalles);
                fila.appendChild(celdaImporte);
                fila.appendChild(celdaAcciones);

                // Agregar fila al cuerpo de la tabla
                tablaVentas.appendChild(fila);

            });
            
        } catch (error) {
            console.error("Error al cargar las ventas: ", error);
        };
    };

    const fetchMensajes = async () => {
        try {
            tablaMensajes.innerHTML = "";

            const respuesta = await axios.get(`${dbhost}/mensajes`);
            const mensajes = respuesta.data;

            mensajes.forEach(mensaje => {

                // crear una nueva fila 
                const fila = document.createElement("tr");

                // crear celdas para el titulo, contenido y acciones
                const celdaId = document.createElement("td");
                const celdaNombre = document.createElement("td");
                const celdaEmail = document.createElement("td");
                const celdaTelefono = document.createElement("td");
                const celdaAsunto = document.createElement("td");
                const celdaAcciones = document.createElement("td");
                
                celdaId.textContent = mensaje.id;
                celdaNombre.textContent = mensaje.nombre;
                celdaEmail.textContent = mensaje.email;
                celdaTelefono.textContent = mensaje.telefono;
                celdaAsunto.textContent = mensaje.asunto;

                // Crear y añadir botones de acciones
                const botonMensaje = document.createElement("button");
                const botonEliminar = document.createElement("button");
                botonMensaje.textContent = "Mensaje";
                botonEliminar.textContent = "Eliminar";
                botonMensaje.addEventListener("click", () => {mostrarMensaje(mensaje.id)});
                botonEliminar.addEventListener("click", () => {eliminarMensaje(mensaje.id)});
                celdaAcciones.appendChild(botonMensaje);
                celdaAcciones.appendChild(botonEliminar);

                // Añadir celdas a la fila
                fila.appendChild(celdaId);
                fila.appendChild(celdaNombre);
                fila.appendChild(celdaEmail);
                fila.appendChild(celdaTelefono);
                fila.appendChild(celdaAsunto);
                fila.appendChild(celdaAcciones);

                // Agregar fila al cuerpo de la tabla
                tablaMensajes.appendChild(fila);

            });
        } catch (error) {
            console.error("Error al cargar las ventas: ", error);
        };
    };

    // Cargar tablas
    fetchArticulos();
    fetchVentas();
    fetchMensajes();


    // Funciones de botones

    const mostrarStock = async (id) => {
        // Muestra popup y oculta otras secciones
        document.querySelector("#layout-popup").style.display = "flex";
        ocultarSeccionesPopup();
        document.querySelector("#mostrar-stock").removeAttribute("style");

        try {
            const respuesta = await axios.get(`${dbhost}/stock/${id}`);
            const talle = respuesta.data;

            // Obtener celdas 
            const celdaXS = document.querySelector("#celda-xs");
            const celdaS = document.querySelector("#celda-s");
            const celdaM = document.querySelector("#celda-m");
            const celdaL = document.querySelector("#celda-l");
            const celdaXL = document.querySelector("#celda-xl");
            const celdaXXL = document.querySelector("#celda-xxl");

            // Rellenar celdas
            celdaXS.textContent = talle.XS;
            celdaS.textContent = talle.S;
            celdaM.textContent = talle.M;
            celdaL.textContent = talle.L;
            celdaXL.textContent = talle.XL;
            celdaXXL.textContent = talle.XXL;

            document.querySelector("#stock-info").textContent = `Artículo # ${id}`;

        } catch (error) {
            console.error("Error al cargar el stock: ", error);
        };
    };

    const editarArticulo = async (id) => {
        // Muestra popup y oculta otras secciones
        document.querySelector("#layout-popup").style.display = "flex";
        ocultarSeccionesPopup();
        document.querySelector("#editar-articulo").removeAttribute("style");

        try {
            const resArt = await axios.get(`${dbhost}/articulos/${id}`);
            const articulo = resArt.data;
            const resStock = await axios.get(`${dbhost}/stock/${id}`);
            const stock = resStock.data;

            document.querySelector("#form-editar-articulo").setAttribute("data-articulo", id);
            document.querySelector("#editar-nombre").value = articulo.nombre;
            document.querySelector("#editar-categoria").value = articulo.categoria;
            document.querySelector("#editar-tipo").value = articulo.tipo;
            document.querySelector("#editar-imagen").value = articulo.imagen;
            document.querySelector("#editar-precio").value = articulo.precio;
            
            document.querySelector("#form-editar-stock").setAttribute("data-stock", id);
            document.querySelector("#nuevo-xs").value = stock.XS;
            document.querySelector("#nuevo-s").value = stock.S;
            document.querySelector("#nuevo-m").value = stock.M;
            document.querySelector("#nuevo-l").value = stock.L;
            document.querySelector("#nuevo-xl").value = stock.XL;
            document.querySelector("#nuevo-xxl").value = stock.XXL;

        } catch (error) {
            console.error("Error al cargar el articulo: ", error);
        };
    };

    const confirmarEdicionArticulo = async (id) => {
        const actualizarArticulo = {
            nombre: document.querySelector("#editar-nombre").value,
            categoria: document.querySelector("#editar-categoria").value,
            tipo: document.querySelector("#editar-tipo option:checked").value,
            imagen: document.querySelector("#editar-imagen").value,
            precio: document.querySelector("#editar-precio").value
        };

        try {
            await axios.put(`${dbhost}/articulos/${id}`, actualizarArticulo);
            alert("Artículo actualizado con éxito.");
            fetchArticulos();

        } catch (error) {
            console.error("Error al actualizar artículo: ", error);
        };
    };

    const confirmarEdicionStock = async (id) => {
        const actualizarStock = {
            XS: document.querySelector("#nuevo-xs").value,
            S: document.querySelector("#nuevo-s").value,
            M: document.querySelector("#nuevo-m").value,
            L: document.querySelector("#nuevo-l").value,
            XL: document.querySelector("#nuevo-xl").value,
            XXL: document.querySelector("#nuevo-xxl").value
        };

        try {
            await axios.put(`${dbhost}/stock/${id}`, actualizarStock);
            alert("Stock actualizado con éxito.");
            
        } catch (error) {
            console.error("Error al actualizar stock: ", error);
        };
    };

    const eliminarArticulo = async (id) => {
        const text = `¿Está seguro que desea eliminar este artículo?`;

        if (confirm(text)) {

            try {
                await axios.delete(`${dbhost}/articulos/${id}`);
                await axios.delete(`${dbhost}/stock/${id}`);
                alert("Artículo eliminado con éxito");
                fetchArticulos();
               
            } catch (error) {
                console.error("Error al eliminar el artículo:", error);
            };
        };
    };

    const anadirArticulo = async () => {
    
        const nuevoNombre = document.querySelector("#nuevo-nombre").value;
        const nuevaCategoria = document.querySelector("#nueva-categoria").value;
        const nuevoTipo = document.querySelector("#nuevo-tipo option:checked").value;
        const nuevaImagen = document.querySelector("#nueva-imagen").value;
        const nuevoPrecio = document.querySelector("#nuevo-precio").value;
    
        if (!isNaN(parseInt(nuevoPrecio))) {
            try {
                const nuevoArticulo = {
                    nombre: nuevoNombre,
                    categoria: nuevaCategoria,
                    tipo: nuevoTipo,
                    imagen: nuevaImagen,
                    precio: nuevoPrecio
                };
                
                // Es necesario añadir su respectivo stock !
                const nuevoStock = { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }
    
                await axios.post(`${dbhost}/articulos/`, nuevoArticulo);
                await axios.post(`${dbhost}/stock/`, nuevoStock);
                alert("Artículo añadido con éxito");
    
                // Limpiar formulario
                document.querySelector("#form-nuevo-articulo").reset();
                // Recargar lista de articulos
                fetchArticulos();
                
            } catch (error) {
                console.error("Error al añadir el articulo: ", error);
            };
    
    
    
        } else {
            alert("El precio debe ser un número");
        };
    };

    const detallesVenta = async (id) => {
        // Muestra popup y oculta otras secciones
        document.querySelector("#layout-popup").style.display = "flex";
        ocultarSeccionesPopup();
        document.querySelector("#detalles-venta").removeAttribute("style");

        document.querySelector("#venta-info").textContent = `Venta # ${id}`;

        try {
            const respuesta = await axios.get(`${dbhost}/ventas/${id}`);
            const ventas = respuesta.data;

            const articulos = ventas.productos.split(",");
            const talles = ventas.talles.split(",");
            const unidades = ventas.cantidad.split(",");

            const tablaDetallesVentas = document.querySelector("#detalles-venta table tbody");
            tablaDetallesVentas.innerHTML = "";

            let suma = 0;

            for (i = 0; i < articulos.length; i++) {

                const fila = document.createElement("tr");

                try {
                    const respArt = await axios.get(`${dbhost}/articulos/${articulos[i]}`);
                    const articulo = respArt.data;

                    const celdaID = document.createElement("td");
                    const celdaNombre = document.createElement("td");
                    const celdaTalle = document.createElement("td");
                    const celdaUnidades = document.createElement("td");
                    const celdaImporte = document.createElement("td");

                    celdaID.textContent = articulo.id;
                    celdaNombre.textContent = articulo.nombre;
                    celdaTalle.textContent = talles[i];
                    celdaUnidades.textContent = unidades[i];
                    celdaImporte.textContent = `$ ${(articulo.precio * unidades[i])}`;
                    suma += (articulo.precio * unidades[i]);

                    fila.appendChild(celdaID);
                    fila.appendChild(celdaNombre);
                    fila.appendChild(celdaTalle);
                    fila.appendChild(celdaUnidades);
                    fila.appendChild(celdaImporte);

                    tablaDetallesVentas.appendChild(fila);

                } catch (error) {
                    console.error("Error al cargar un producto: ", error);
                };

                document.querySelector("#venta-info-precio-total").textContent = `Total: $ ${suma}`;

            };

        } catch (error) {
            console.error("Error al cargar las ventas: ", error);
        };
    };

    const eliminarVenta = async (id) => {
        const text = `¿Está seguro que desea eliminar esta venta?`;

        if (confirm(text)) {

            try {
                await axios.delete(`${dbhost}/ventas/${id}`);
                alert("Venta eliminada con éxito.");
                fetchVentas();
                
            } catch (error) {
                console.error("Error al eliminar la venta:", error);
            };
        };
    };

    const mostrarMensaje = async (id) => {
        // Muestra popup y oculta otras secciones
        document.querySelector("#layout-popup").style.display = "flex";
        ocultarSeccionesPopup();
        document.querySelector("#mostrar-mensaje").removeAttribute("style");

        try {
            const respuesta = await axios.get(`${dbhost}/mensajes/${id}`);
            const mensaje = respuesta.data;

            document.querySelector("#autor-mensaje").textContent = `Mensaje de ${mensaje.nombre}:`
            document.querySelector("#ver-mensaje").value = mensaje.mensaje;
            
        } catch (error) {
            console.error("Error al cargar el mensaje: ", error);
        };
    };

    const eliminarMensaje = async (id) => {
        const text = `¿Está seguro que desea eliminar este mensaje?`;
        
        if (confirm(text)) {

            try {
                await axios.delete((`${dbhost}/mensajes/${id}`));
                alert("Mensaje eliminado con éxito.");
                fetchMensajes();

            } catch (error) {
                console.error("Error al eliminar el mensaje:", error);
            };
        };        
    };


    const ocultarSeccionesPopup = () => {
        document.querySelector("#mostrar-stock").style.display = "none";
        document.querySelector("#editar-articulo").style.display = "none";
        document.querySelector("#detalles-venta").style.display = "none";
        document.querySelector("#mostrar-mensaje").style.display = "none";
    };


    // EVENTOS FORMULARIOS

    document.querySelector("#form-nuevo-articulo").addEventListener("submit", (event) => {
        event.preventDefault();
        anadirArticulo();
    });

    document.querySelector("#form-editar-articulo").addEventListener("submit", (event) => {
        event.preventDefault();
        const id = parseInt(document.querySelector("#form-editar-articulo").getAttribute("data-articulo"));
        confirmarEdicionArticulo(id);
    });

    document.querySelector("#form-editar-stock").addEventListener("submit", (event) => {
        event.preventDefault();
        const id = parseInt(document.querySelector("#form-editar-stock").getAttribute("data-stock"));
        confirmarEdicionStock(id)
    });


    // OTROS EVENTOS 

    document.querySelector("#layout-popup").addEventListener("click", () => {
        document.querySelector("#layout-popup").style.display = "none";
    });

    document.querySelector("#popup-contenedor").addEventListener("click", (e) => {
        e.stopPropagation();
    });
});