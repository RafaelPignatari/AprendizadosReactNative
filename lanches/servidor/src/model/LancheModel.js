const mongoose = require('../config/database');

const LancheSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        codigoAluno: { type: Number, required: true },
        data: {type: Date, default: Date.now(), required: true},
        quantidade: {type: Number, required: true, max: 3},
        entregue: {type: Boolean, default: false, required: true},
    }
)

module.exports = mongoose.model('Lanche', LancheSchema);