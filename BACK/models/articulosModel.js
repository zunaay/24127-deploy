const db = require("../data/db.js");
const {DataTypes} = require("sequelize");

const articulosModel = db.define("articulos", {
    nombre: {type:DataTypes.STRING},
    categoria: {type:DataTypes.STRING},
    tipo: {type:DataTypes.STRING},
    imagen: {type:DataTypes.STRING},
    precio: {type:DataTypes.INTEGER},
});

module.exports = articulosModel;