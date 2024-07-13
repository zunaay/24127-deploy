const db = require("../data/db.js");
const {DataTypes} = require("sequelize");

const mensajesModel = db.define("mensajes", {
    nombre: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    telefono: {type: DataTypes.STRING},
    asunto: {type: DataTypes.STRING},
    mensaje: {type: DataTypes.STRING}
});

module.exports = mensajesModel;