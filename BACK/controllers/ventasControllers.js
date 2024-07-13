const ventasModel = require("../models/ventasModel.js");

// Traer todos las ventas
const traerVentas = async (req, res) => {
    try {
        const ventas = await ventasModel.findAll();
        res.json(ventas);
    } catch (error) {
        res.json({message: error.message});
    };
};

// Traer 1 venta
const traerUnaVenta = async (req, res) => {
    try {
        const venta = await ventasModel.findByPk(req.params.id);
        res.json(venta);
        
    } catch (error) {
        res.json({message: error.message});
    };
};

// Crear 1 venta
const crearVenta = async (req, res) => {
    try {
        await ventasModel.create(req.body);
        res.json({"message": "Venta creada con éxito."});

    } catch (error) {
        res.json({message: error.message});
    };
};

// Actualizar venta
const actualizarVenta = async (req, res) => {
    try {
        await ventasModel.update(res.body, {
            where: {id: req.params.id}
        });
        res.json({"message": "Mensaje editado con éxito."});

    } catch (error) {
        res.json({message: error.message});
    };
};

// Eliminar venta
const eliminarVenta = async (req, res) => {
    try {
        await ventasModel.destroy({
            where: {id: req.params.id}
        });
        res.json({"message": `Se eliminó el mensaje ${req.params.id} con éxito`});
        
    } catch (error) {
        res.json({message: error.message});
    };
};

module.exports = {traerVentas, traerUnaVenta, crearVenta, actualizarVenta, eliminarVenta};