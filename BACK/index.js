const express = require("express");
const app = express();
const port = process.env.PORT || 7070;
const cors = require("cors");
const db = require("./data/db.js");

const articulosRouter = require("./routes/articulosRouter.js");
const mensajesRouter = require("./routes/mensajesRouter.js");
const stockRouter = require("./routes/stockRouter.js");
const ventasRouter = require("./routes/ventasRouter.js");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Estas en el home.");
});

app.use("/articulos", articulosRouter);
app.use("/mensajes", mensajesRouter);
app.use("/stock", stockRouter);
app.use("/ventas", ventasRouter);

// conexion DB
const conexionDB = async() => {
    try {
        await db.authenticate();
        console.log("Conexión OK a la base de datos");
    } catch (error) {
        console.log(`Error al conectarse con la base de datos: ${error}`);
    }
};


app.listen(port, () => {
    conexionDB();
    console.log(`Servidor OK en el puerto ${port}`);
});