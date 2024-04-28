const mongoose = require('../config/database');

const AlunoSchema = new mongoose.Schema(
    {
        codigoAluno: { type: Number, required: true }
    }
)

module.exports = mongoose.model('Aluno', AlunoSchema);