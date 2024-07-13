const {Sequelize} = require("sequelize");

const db = new Sequelize("zunay_24127", "zunay", "24127_g8", {
    host: "mysql-zunay.alwaysdata.net",
    dialect: "mysql"
});

module.exports = db;
