import * as SQLite from 'expo-sqlite/next';

export function getDbConnection() {
    const cx = SQLite.openDatabaseAsync('dbContatos4.db');
    return cx;    
}

export async function createTable() {
    const query = `CREATE TABLE IF NOT EXISTS tbContatos
        (
            id text not null primary key,
            codigo text not null,
            nome text not null,
            email text not null,
            senha text not null
        )`;

    var cx = await getDbConnection();
    await cx.execAsync(query);
};

export async function obtemContato() {
    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM tbContatos LIMIT 1');

    for (const registro of registros) {

        let obj = {
            id: registro.id,
            codigo: registro.codigo,
            nome: registro.nome,
            email: registro.email,
            senha: registro.senha
        }

        retorno.push(obj);
    }

    return retorno;
}

export async function obtemTodosContatos() {
    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM tbContatos ');

    for (const registro of registros) {

        let obj = {
            id: registro.id,
            codigo: registro.codigo,
            nome: registro.nome,
            email: registro.email,
            senha: registro.senha
        }
        retorno.push(obj);
    }

    return retorno;
}

export async function adicionaContato(contato) {
    let dbCx = await getDbConnection();
    let query = 'insert into tbContatos (id, codigo, nome ,email, senha) values (?,?,?,?,?)';
    const result = await dbCx.runAsync(query, [contato.id, contato.codigo, contato.nome, contato.email, contato.senha]);

    return result.changes == 1;
}

export async function alteraContato(contato) {
    let dbCx = await getDbConnection();
    let query = 'update tbContatos set codigo=?, nome=?, email=?, senha=? where id=?';
    const result = await dbCx.runAsync(query, [contato.codigo, contato.nome, contato.email, contato.senha, contato.id]);

    return result.changes == 1;
}

export async function excluiContato(id) {
    console.log('Apagando usuario ' + id);
    let query = 'delete from tbContatos where id=?';
    var dbCx = await getDbConnection();
    const result = await dbCx.runAsync(query, id);

    return result.changes == 1;
}

export async function excluiContatos() {
    let query = 'delete from tbContatos';
    var dbCx = await getDbConnection();
    const result = await dbCx.runAsync(query);
    
    return result.changes == 1;
}