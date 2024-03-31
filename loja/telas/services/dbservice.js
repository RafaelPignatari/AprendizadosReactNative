import * as SQLite from 'expo-sqlite/next';

export function getDbConnection() {
    const cx = SQLite.openDatabaseAsync('dbLoja.db');
    return cx;    
}

export async function criaTabelas() {
    await criaTabelaProduto();
    await criaTabelaVendas();
    await criaTabelaVendaProduto();
    await criaTabelaCategoria();
};

async function criaTabelaProduto() {
    const query = `CREATE TABLE IF NOT EXISTS tbProduto
        (
            id text not null primary key,
            codigo integer not null,
            descricao text not null,
            preco text not null,
            quantidade integer not null,
            categoria text not null
        )`;

    var cx = await getDbConnection();
    await cx.execAsync(query);
}

async function criaTabelaVendas() {
    const query = `CREATE TABLE IF NOT EXISTS tbVendas
        (
            id text not null primary key,
            idVendaProduto text not null,
            dataHora text not null
        )`;

    var cx = await getDbConnection();
    await cx.execAsync(query);
}

async function criaTabelaVendaProduto() {
    const query = `CREATE TABLE IF NOT EXISTS tbVendaProduto
        (
            id text not null primary key,
            idVenda text not null,
            idProduto text not null,
            quantidade integer not null
        )`;

    var cx = await getDbConnection();
    await cx.execAsync(query);
}

async function criaTabelaCategoria() {
    const query = `CREATE TABLE IF NOT EXISTS tbCategoria
        (
            id text not null primary key,
            descricao text not null
        )`;

    var cx = await getDbConnection();
    await cx.execAsync(query);
}

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