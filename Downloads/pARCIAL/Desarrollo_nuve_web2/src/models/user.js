const mongoose = require("mongoose");

const seatSchema = mongoose.Schema({
  number: {
    type: String, // Cambiado a String para permitir valores como "A50"
    required: true,
    unique: true // Asegura que cada número de asiento sea único
  },
  isOccupied: {
    type: Boolean,
    default: false // Por defecto, todos los asientos están disponibles
  }
});

module.exports = mongoose.model('Seat', seatSchema); // Exporta el modelo Seat
