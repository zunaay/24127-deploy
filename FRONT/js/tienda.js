document.addEventListener("DOMContentLoaded", () => {

    const fetchArticulos = async () => {
        try {
            const respuesta = await axios.get(`${dbhost}/articulos`);
            cargarArticulos(respuesta.data);
            document.querySelector(".contenedor").style.display = "block";
            
        } catch (error) {
            console.error("Error al cargar los articulos: ", error);
        };
    };

    fetchArticulos();


    const cargarArticulos = (articulos) => {

        // Cargar articulos segun tipo
        const hombre = articulos.filter(v => v.tipo == "Hombre");
        dibujarArticulos(hombre, ".articulos.hombre .lista-articulos");
        document.querySelector("#hombre").innerText = "Hombre";
    
        const mujer = articulos.filter(v => v.tipo == "Mujer");
        dibujarArticulos(mujer, ".articulos.mujer .lista-articulos");
        document.querySelector("#mujer").innerText = "Mujer";
    
        const nino = articulos.filter(v => v.tipo == "Niños");
        dibujarArticulos(nino, ".articulos.nino .lista-articulos");
        document.querySelector("#nino").innerText = "Niños";
    
    };
    
    const dibujarArticulos = (datos, elemento) => {
    
        const padre = document.querySelector(elemento);
        padre.innerHTML = "";
    
        for (t = 0; t < datos.length; t++) {
    
            let fragmento = document.createDocumentFragment();
    
            let articulo = document.createElement("li");
            articulo.classList.add("articulo");
    
            let enlace = document.createElement("a");
            enlace.href = `producto.html?q=${datos[t].id}`;
    
            let detalle = document.createElement("div");
            detalle.classList.add("detalle");
    
            let articuloImagen = document.createElement("div");
            articuloImagen.classList.add("articulo-imagen");
    
            let imagen = document.createElement("img");
            imagen.src = datos[t].imagen;
            imagen.alt = datos[t].nombre;
    
            let info = document.createElement("div");
            info.classList.add("articulo-info");
    
            let titulo = document.createElement("p");
            titulo.classList.add("articulo-titulo");
            titulo.innerText = datos[t].nombre;
    
            let precio = document.createElement("p");
            precio.classList.add("articulo-precio");
            precio.innerText = `$ ${datos[t].precio}`;
    
            info.append(titulo, precio);
            articuloImagen.appendChild(imagen);
            detalle.append(articuloImagen, info);
            enlace.appendChild(detalle);
            articulo.appendChild(enlace);
            fragmento.appendChild(articulo);
    
            padre.appendChild(fragmento);
    
        };
    };

});
