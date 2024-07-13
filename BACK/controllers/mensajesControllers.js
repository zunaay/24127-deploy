const mensajesModel = require("../models/mensajesModel.js");

// Traer todos los mensajes
const traerMensajes = async (req, res) => {
    try {
        const mensajes = await mensajesModel.findAll();
        res.json(mensajes);
    } catch (error) {
        res.json({message: error.message});
    };
};

// Traer 1 mensaje
const traerUnMensaje = async (req, res) => {
    try {
        const mensaje = await mensajesModel.findByPk(req.params.id);
        res.json(mensaje);
        
    } catch (error) {
        res.json({message: error.message});
    };
};

// Crear 1 mensaje
const crearMensaje = async (req, res) => {
    try {
        await mensajesModel.create(req.body);
        res.json({"message": "Mensaje creado con éxito."});

    } catch (error) {
        res.json({message: error.message});
    };
};

// Editar mensaje
const editarMensaje = async (req, res) => {
    try {
        await mensajesModel.update(res.body, {
            where: {id: req.params.id}
        });
        res.json({"message": "Mensaje editado con éxito."});

    } catch (error) {
        res.json({message: error.message});
    };
};

// Eliminar mensaje
const eliminarMensaje = async (req, res) => {
    try {
        await mensajesModel.destroy({
            where: {id: req.params.id}
        });
        res.json({"message": `Se eliminó el mensaje ${req.params.id} con éxito`});
        
    } catch (error) {
        res.json({message: error.message});
    };
};

module.exports = {traerMensajes, traerUnMensaje, crearMensaje, editarMensaje, eliminarMensaje};