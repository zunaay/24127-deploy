const articulosModel = require("../models/articulosModel.js");

// Traer todos los articulos
const traerArticulo = async (req, res) => {
    try {
        const stock = await articulosModel.findAll();
        res.json(stock);
    } catch (error) {
        res.json({message: error.message});
    };
};

// Traer 1 articulo
const traerUnArticulo = async (req, res) => {
    try {
        const stock = await articulosModel.findByPk(req.params.id);
        res.json(stock);
    } catch (error) {
        res.json({message: error.message});
    };
};

// Crear 1 articulo (Crear tambien su stock)
const crearArticulo = async (req, res) => {
    try {
        await articulosModel.create(req.body);
        res.json({"message": "Registro creado con éxito."});    
    } catch (error) {
        res.json({message: error.message});
    };
};

// Actualizar articulo
const actualizarArticulo = async (req, res) => {
    try {
        await articulosModel.update(req.body, {
            where: {id: req.params.id}
        });
        res.json({"message": "Articulo actualizado con éxito"});

    } catch (error) {
        res.json({message: error.message});
    };
};

// Eliminar articulo (Eliminar su stock)
const eliminarArticulo = async (req, res) => {
    try {
        await articulosModel.destroy({
            where: {id: req.params.id}
        });
        res.json({"message": `Se eliminó el articulo ${req.params.id} con éxito`});
        
    } catch (error) {
        res.json({message: error.message});
    };
};

module.exports = {traerArticulo, traerUnArticulo, crearArticulo, actualizarArticulo, eliminarArticulo};