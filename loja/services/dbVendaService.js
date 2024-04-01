import { getDbConnection } from './dbservice';

function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
}

function obtemDataHora() {
    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0'); //PadStart preenche com 0 à esquerda
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const ano = dataAtual.getFullYear();

    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

export async function obtemTodasVendas() {
    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT tbVendas.id, tp.preco, tp.descricao, tvp.quantidade, tbVendas.dataHora FROM tbVendas ' +
                                             'INNER JOIN tbVendaProduto tvp ON tbVendas.id = tvp.idVenda ' +
                                             'INNER JOIN tbProduto tp ON tvp.idProduto = tp.id ' +
                                             'ORDER BY tbVendas.dataHora DESC');

    for (const registro of registros) {
        let obj = {
            id: registro.id,
            preco: registro.preco,
            produto: registro.descricao,
            quantidade: registro.quantidade,
            dataHora: registro.dataHora,
        }

        retorno.push(obj);
    }
    console.log(retorno);
    return retorno;
}

export async function adicionaVenda(compras) {
    let dbCx = await getDbConnection();
    let idVenda = createUniqueId();

    for (const compra of compras) {
        let query = 'insert into tbVendaProduto (id, idVenda, idProduto, quantidade) values (?,?,?,?)';

        console.log(compra.id, compra.quantidade)
        await dbCx.runAsync(query, [createUniqueId(), idVenda, compra.id, compra.quantidade]);
    }

    let query = 'insert into tbVendas (id, datahora) values (?,?)';
    const result = await dbCx.runAsync(query, [idVenda, obtemDataHora()]);

    return result.changes == 1;
}