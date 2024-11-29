const express = require("express");
const Seat = require("../models/user"); // Asegúrate de que este sea el nombre correcto del modelo para los asientos

const router = express.Router();

// Crear un asiento
router.post("/seats", (req, res) => {
    const seat = new Seat(req.body);
    seat
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener todos los asientos
router.get("/seats", (req, res) => {
    Seat
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener un asiento por ID
router.get("/seats/:id", (req, res) => {
    const { id } = req.params;
    Seat
        .findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Asiento no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => res.status(400).json({ message: "ID no válido" }));
});

// Actualizar un asiento por ID
router.put("/seats/:id", (req, res) => {
    const { id } = req.params;
    const { isOccupied } = req.body; // Aquí puedes incluir otras propiedades si es necesario
    Seat
        .findByIdAndUpdate(id, { isOccupied }, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Asiento no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Eliminar un asiento por ID
router.delete("/seats/:id", (req, res) => {
    const { id } = req.params;
    Seat
        .findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Asiento no encontrado" });
            }
            res.json({ message: "Asiento eliminado correctamente" });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
