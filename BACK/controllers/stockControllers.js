const stockModel = require("../models/stockModel.js");

// Traer el stock de todos los articulos
const traerStock = async (req, res) => {
    try {
        const stock = await stockModel.findAll();
        res.json(stock);
    } catch (error) {
        res.json({message: error.message});
    };
};

// Traer stock de 1 articulo
const traerUnStock = async (req, res) => {
    try {
        const stock = await stockModel.findByPk(req.params.id);
        res.json(stock);
    } catch (error) {
        res.json({message: error.message});
    };
};

// Crear stock de 1 articulo (Solo cuando se crea un articulo)
const crearStock = async (req, res) => {
    try {
        await stockModel.create(req.body);
        res.json({"message": "Registro creado con éxito."});    
    } catch (error) {
        res.json({message: error.message});
    };
};

// Actualizar stock
const actualizarStock = async (req, res) => {
    try {
        await stockModel.update(req.body, {
            where: {id: req.params.id}
        });
        res.json({"message": "Stock actualizado con éxito"});

    } catch (error) {
        res.json({message: error.message});
    };
};

// Eliminar stock (Solo si el artículo fue eliminado)
const eliminarStock = async (req, res) => {
    try {
        await stockModel.destroy({
            where: {id: req.params.id}
        });
        res.json({"message": `Se eliminó el stock de ${req.params.id} con éxito`});
        
    } catch (error) {
        res.json({message: error.message});
    };
};

module.exports = {traerStock, traerUnStock, crearStock, actualizarStock, eliminarStock}