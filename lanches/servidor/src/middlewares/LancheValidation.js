const LancheModel = require('../model/LancheModel');

async function LancheValidation(req, res, next) {
    console.log(req.body);
    const { id, codigoAluno, data, quantidade, entregue } = req.body;

    let alteracaoRegistro = req.params.id != null;

    if (!codigoAluno)
        return res.status(400).json({ erro: 'Informe o código do aluno' });

    if (!data)
        return res.status(400).json({ erro: 'Informe a data' });

    if (!quantidade)
        return res.status(400).json({ erro: 'Informe a quantidade' });

    if (quantidade > 3 || quantidade < 1)
        return res.status(400).json({ erro: 'Quantidade invalida' });

    if (alteracaoRegistro) {
        if (id && Number.parseInt(req.params.id) != Number.parseInt(id))
            return res.status(400).json({ erro: 'Id informado no parâmetro está diferente do id informado no Json' });

        let qtde = (await LancheModel.countDocuments({ "id": req.params.id }));
        let existe = qtde >= 1;

        if (!existe)
            return res.status(400).json({ erro: 'Não há registro para o Id informado' });
    }
    else {
        if (!id)
            return res.status(400).json({ erro: 'Informe o id' });

        let existe = (await LancheModel.countDocuments({ "id": id })) >= 1;
        if (existe)
            return res.status(400).json({ erro: 'Já existe um lanche cadastrada com este id' });
    }

    return next();
}

module.exports = LancheValidation;