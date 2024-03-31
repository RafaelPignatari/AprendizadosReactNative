import * as SQLite from 'expo-sqlite/next';

export function getDbConnection() {
    const cx = SQLite.openDatabaseAsync('dbLoja4.db');
    return cx;    
}

export async function criaTabelas() {
    await criaTabelaProduto();
    await criaTabelaVendas();
    await criaTabelaVendaProduto();
    await criaTabelaCategoria();
};

export async function insereValoresDefault() {
    await insereCategoriasDefault();

}

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
    const query = `CREATE TABLE IF NOT EXISTS tbCategorias
        (
            id text not null primary key,
            codigo text not null,
            descricao text not null
        )`;

    var cx = await getDbConnection();
    await cx.execAsync(query);
}

async function insereCategoriasDefault() {
    let dbCx = await getDbConnection();
    let query = "INSERT INTO tbCategorias (id, codigo, descricao) VALUES ('1', '1', 'Jogos'), " + 
                "('2', '2', 'Eletrônicos'), ('3', '3', 'Livros'), ('4', '4', 'Ferramentas');";
    console.log(query);
    const result = await dbCx.runAsync(query, []);

    return result.changes == 1;
}