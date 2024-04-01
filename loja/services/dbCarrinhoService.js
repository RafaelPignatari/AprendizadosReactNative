import { getDbConnection, closeDbConnection } from './dbservice';

function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
}

export async function obtemCarrinho() {
    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT tp.id, tp.descricao, tp.preco, tc.quantidade, tp.categoria FROM tbCarrinho tc ' +
                                             'INNER JOIN tbProduto tp ON tc.idProduto = tp.id ');

    for (const registro of registros) {

        let obj = {
            id: registro.id,
            descricao: registro.descricao,
            preco: registro.preco,
            quantidade: registro.quantidade,
            categoria: registro.categoria
        }
        retorno.push(obj);
    }

    await closeDbConnection(dbCx);

    return retorno;
}

export async function adicionaCarrinho(produtos) {
    let dbCx = await getDbConnection();

    for (const produto of produtos) {
        let query = 'insert into tbCarrinho (id, idProduto, quantidade) values (?,?,?)';

        await dbCx.runAsync(query, [createUniqueId(), produto.id, produto.quantidade]);
    }

    await closeDbConnection(dbCx);
}

export async function alteraCarrinho(produtos) {
    let dbCx = await getDbConnection();
    let query = 'delete from tbCarrinho';
    await dbCx.runAsync(query);

    for (const produto of produtos) {
        query = 'insert into tbCarrinho (id, idProduto, quantidade) values (?,?,?)';

        await dbCx.runAsync(query, [createUniqueId(), produto.id, produto.quantidade]);
    }

    await closeDbConnection(dbCx);
}

export async function apagaProdutoCarrinho(idProduto) {
    let dbCx = await getDbConnection();
    let query = 'delete from tbCarrinho WHERE idProduto = ?';
    
    await dbCx.runAsync(query, [idProduto]);

    await closeDbConnection(dbCx);
}

export async function limpaCarrinho() {
    let dbCx = await getDbConnection();
    let query = 'delete from tbCarrinho';
    
    await dbCx.runAsync(query);

    await closeDbConnection(dbCx);
}