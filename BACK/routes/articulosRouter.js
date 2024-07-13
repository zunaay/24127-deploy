const express = require("express");
const router = express.Router();

const {traerArticulo, traerUnArticulo, crearArticulo, actualizarArticulo, eliminarArticulo} = require("../controllers/articulosControllers");

router.get("/", traerArticulo);
router.get("/:id", traerUnArticulo);
router.post("/", crearArticulo);
router.put("/:id", actualizarArticulo);
router.delete("/:id", eliminarArticulo);

module.exports = router;