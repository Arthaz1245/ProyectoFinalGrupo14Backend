const express = require("express");
const router = express.Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const books = require("./routeBook");
const users = require("./routeUser");

router.use("/books", books);
router.use("/users", users);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
