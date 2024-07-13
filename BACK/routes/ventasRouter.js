const express = require("express");
const router = express.Router();

const {traerVentas, traerUnaVenta, crearVenta, actualizarVenta, eliminarVenta} = require("../controllers/ventasControllers.js");

router.get("/", traerVentas);
router.get("/:id", traerUnaVenta);
router.post("/", crearVenta);
router.put("/:id", actualizarVenta);
router.delete("/:id", eliminarVenta);

module.exports = router;