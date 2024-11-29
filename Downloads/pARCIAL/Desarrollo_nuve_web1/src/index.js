const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user"); // Importa las rutas de asientos

// Configuraciones
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json()); // Permite el manejo de datos JSON en las solicitudes
app.use(express.static('public')); // Sirve archivos estáticos como index.html
app.use("/api", userRoute); // Define las rutas de la API con el prefijo /api

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Envía el archivo HTML cuando se accede a la raíz
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((error) => console.error("Error al conectar a MongoDB Atlas:", error));

// Escuchando en el puerto
app.listen(port, () => console.log("Servidor escuchando en el puerto", port));


////

// Ejecutar para prueba 
//http://3.85.201.114:9000/
