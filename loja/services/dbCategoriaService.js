import { getDbConnection, closeDbConnection } from './dbservice';

export async function obtemCategoria() {
    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM tbCategorias LIMIT 1');

    for (const registro of registros) {

        let obj = {
            id: registro.id,
            codigo: registro.codigo,
            descricao: registro.descricao
        }

        retorno.push(obj);
    }

    await closeDbConnection(dbCx);

    return retorno;
}

export async function obtemTodasCategorias() {
    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM tbCategorias ');

    for (const registro of registros) {

        let obj = {
            id: registro.id,
            codigo: registro.codigo,
            descricao: registro.descricao
        }
        retorno.push(obj);
    }

    await closeDbConnection(dbCx);

    return retorno;
}

export async function adicionaCategoria(categoria) {
    let dbCx = await getDbConnection();
    let query = 'insert into tbCategorias (id, codigo, descricao) values (?,?,?)';
    const result = await dbCx.runAsync(query, [categoria.id, categoria.codigo, categoria.descricao]);

    await closeDbConnection(dbCx);
    return result.changes == 1;
}

export async function alteraCategoria(categoria) {
    let dbCx = await getDbConnection();
    let query = 'update tbCategorias set codigo=?, descricao=? where id=?';
    const result = await dbCx.runAsync(query, [categoria.codigo, categoria.descricao, categoria.id]);

    await closeDbConnection(dbCx);
    return result.changes == 1;
}

export async function excluiCategoria(id) {
    let query = 'delete from tbCategorias where id=?';
    var dbCx = await getDbConnection();
    const result = await dbCx.runAsync(query, id);

    await closeDbConnection(dbCx);
    return result.changes == 1;
}

export async function excluiCategorias() {
    let query = 'delete from tbCategorias';
    var dbCx = await getDbConnection();
    const result = await dbCx.runAsync(query);
    
    await closeDbConnection(dbCx);
    return result.changes == 1;
}