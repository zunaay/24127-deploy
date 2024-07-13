// DB REMOTA
const dbhost = "https://zunay.alwaysdata.net";


// Cuenta articulos en el carrito y lo muestra en el icono
const cuentaCarrito = () => {
    
    let contador = 0;

    // Buscar items del carrito
    for (i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes("INDG8-")) {
            contador += parseInt( localStorage.getItem(key) )
        };
    };

    if (contador == 0) {
        document.querySelector("#cuenta-carrito").style.display = "none";
    } else {
        document.querySelector("#cuenta-carrito").innerText = contador;
        document.querySelector("#cuenta-carrito").style.display = "block";
    };
};
