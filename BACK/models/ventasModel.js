const db = require("../data/db.js");
const {DataTypes} = require("sequelize");

const ventasModel = db.define("ventas", {
    productos: {type: DataTypes.STRING},
    cantidad: {type: DataTypes.STRING},
    talles: {type: DataTypes.STRING},
    importe:  {type: DataTypes.INTEGER}
});

module.exports = ventasModel;