const port = 7070;

document.addEventListener("DOMContentLoaded", () => {

    const validar = async () => {
        let validaEmail = document.getElementById("email").value;

        let emailRegex = /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;

        if (validaEmail !== "" && !emailRegex.test(validaEmail)) {
            alert("Por favor, ingrese una e-mail válido.");
            return false;
        };

        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let email = document.getElementById("email").value;
        let telefono = document.getElementById("telefono").value;
        let asunto = document.getElementById("asunto").value;
        let mensaje = document.getElementById("mensaje").value;

        if (nombre == "" || apellido == "" || email == "" || telefono == "" || asunto == "" || mensaje == "") {
            alert("Por favor, complete todos los campos obligatorios.");

        } else {
            if (!isNaN( parseInt(telefono) )) {

                const nuevoMensaje = {
                    nombre: nombre + " " + apellido,
                    email: email,
                    telefono: telefono,
                    asunto: asunto,
                    mensaje: mensaje
                };
    
                try {
                    await axios.post(`${dbhost}/mensajes/`, nuevoMensaje);
                    alert("Mensaje enviado.");
                    document.querySelector("#contact").reset();
    
                } catch (error) {
                    console.error("Error al enviar el mensaje: ", error);
                    alert("Se ha producido un error, vuelva a intentarlo.");
                };

            } else {
                alert("El teléfono debe ser un número.");
            };
        };
    };

    // EVENTO FORMULARIO
    document.querySelector("#contact").addEventListener("submit", (event) => {
        event.preventDefault();
        validar();
    });

});