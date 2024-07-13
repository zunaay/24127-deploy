const express = require("express");
const router = express.Router();

const {traerMensajes, traerUnMensaje, crearMensaje, editarMensaje, eliminarMensaje} = require("../controllers/mensajesControllers.js");

router.get("/", traerMensajes);
router.get("/:id", traerUnMensaje);
router.post("/", crearMensaje);
router.put("/:id", editarMensaje);
router.delete("/:id", eliminarMensaje);

module.exports = router;