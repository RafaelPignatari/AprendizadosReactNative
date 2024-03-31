import { getDbConnection } from './dbservice';

function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
}

function obtemDataHora() {
    return Date.now().toString(36)
}

export async function obtemTodasVendas() {
    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM tbVendas ' +
                                             'INNER JOIN tbVendaProduto ON tbVendas.id = tbVendaProduto.idVenda ' +
                                             'INNER JOIN tbProduto ON tbVendaProduto.idProduto = tbProduto.id ' +
                                             'ORDER BY tbVendas.dataHora DESC');

    for (const registro of registros) {
        let obj = {
            id: registro.id
        }

        retorno.push(obj);
    }

    return retorno;
}

export async function adicionaVenda(produtos) {
    let dbCx = await getDbConnection();
    let idVenda = createUniqueId();

    for (const produto of produtos) {
        let query = 'insert into tbVendaProduto (id, idVenda, idProduto, quantidade) values (?,?,?,?)';

        await dbCx.runAsync(query, [createUniqueId(), idVenda, produto.id, produto.quantidade]);
    }

    let query = 'insert into tbVendas (id, datahora) values (?,?)';
    const result = await dbCx.runAsync(query, [idVenda, obtemDataHora()]);

    return result.changes == 1;
}