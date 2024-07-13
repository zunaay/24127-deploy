const db = require("../data/db.js");
const {DataTypes} = require("sequelize");

const stockModel = db.define("stocks", {
    id: {type:DataTypes.INTEGER, primaryKey: true},
    XS: {type:DataTypes.INTEGER},
    S: {type:DataTypes.INTEGER},
    M: {type:DataTypes.INTEGER},
    L: {type:DataTypes.INTEGER},
    XL: {type:DataTypes.INTEGER},
    XXL: {type:DataTypes.INTEGER}
});

module.exports = stockModel;