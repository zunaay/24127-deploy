const express = require("express");
const router = express.Router();

const {traerStock, traerUnStock, crearStock, actualizarStock, eliminarStock} = require("../controllers/stockControllers.js");

router.get("/", traerStock);
router.get("/:id", traerUnStock);
router.post("/", crearStock);
router.put("/:id", actualizarStock);
router.delete("/:id", eliminarStock);

module.exports = router;