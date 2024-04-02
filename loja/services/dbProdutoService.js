import { getDbConnection, closeDbConnection } from './dbservice';

export async function obtemProduto() {
    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM tbProduto LIMIT 1');
    await closeDbConnection(dbCx);

    for (const registro of registros) {

        let obj = {
            id: registro.id,
            codigo: registro.codigo,
            descricao: registro.descricao,
            preco: registro.preco,
            quantidade: registro.quantidade,
            categoria: registro.categoria
        }

        retorno.push(obj);
    }

    return retorno;
}

export async function obtemTodosProdutos() {
    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM tbProduto ');
    await closeDbConnection(dbCx);

    for (const registro of registros) {

        let obj = {
            id: registro.id,
            codigo: registro.codigo,
            descricao: registro.descricao,
            preco: registro.preco,
            quantidade: registro.quantidade,
            categoria: registro.categoria
        }
        retorno.push(obj);
    }

    return retorno;
}

export async function obtemProdutosPorCategoria(categoria) {
    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM tbProduto WHERE categoria = ? ', [categoria]);
    await closeDbConnection(dbCx);

    for (const registro of registros) {

        let obj = {
            id: registro.id,
            codigo: registro.codigo,
            descricao: registro.descricao,
            preco: registro.preco,
            quantidade: registro.quantidade,
            categoria: registro.categoria
        }
        retorno.push(obj);
    }

    return retorno;
}

export async function adicionaProduto(produto) {
    let dbCx = await getDbConnection();
    let query = 'insert into tbProduto (id, codigo, descricao, preco, quantidade, categoria) values (?,?,?,?,?,?)';
    const result = await dbCx.runAsync(query, [produto.id, produto.codigo, produto.descricao, produto.preco, produto.quantidade, produto.categoria]);

    await closeDbConnection(dbCx);
    return result.changes == 1;
}

export async function alteraProduto(produto) {
    let dbCx = await getDbConnection();
    let query = 'update tbProduto set codigo=?, descricao=?, preco=?, quantidade=?, categoria=? where id=?';
    const result = await dbCx.runAsync(query, [produto.codigo, produto.descricao, produto.preco, produto.quantidade, produto.categoria, produto.id]);

    await closeDbConnection(dbCx);
    return result.changes == 1;
}

export async function excluiProduto(id) {
    let query = 'delete from tbProduto where id=?';
    var dbCx = await getDbConnection();
    const result = await dbCx.runAsync(query, id);

    await closeDbConnection(dbCx);
    return result.changes == 1;
}

export async function excluiProdutos() {
    let query = 'delete from tbProduto';
    var dbCx = await getDbConnection();
    const result = await dbCx.runAsync(query);
    
    await closeDbConnection(dbCx);
    return result.changes == 1;
}