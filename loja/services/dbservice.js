import * as SQLite from 'expo-sqlite/next';

export function getDbConnection() {
    const nomeBanco = 'dbLoja10.db';
    const cx = SQLite.openDatabaseAsync(nomeBanco);
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
    await insereProdutosDefault();
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

async function insereProdutosDefault() {
    let dbCx = await getDbConnection();
    let query = "INSERT INTO tbProduto (id, codigo, descricao, preco, quantidade, categoria) VALUES " + 
                "('1', '1', 'God of War 2018', '199,99', 10, '1'), ('2', '2', 'Dantes Inferno', '50,99', 5, '1'), ('3', '3', 'Tetris', '5,99', 10, '1'), " +
                "('4', '4', 'Processador', '1099,99', 10, '2'), ('5', '5', 'GTX 1050 TI 4 GB', '1500', 5, '2'), ('6', '6', 'Ferro de Solda', '15', 10, '2'), " +
                "('7', '7', 'Livro 1', '199,99', 10, '3'), ('8', '8', 'Livro 2', '50,99', 5, '3'), ('9', '9', 'Livro 3', '5,99', 10, '3'), " +
                "('10', '10', 'Ferramenta 1', '199,99', 10, '4'), ('11', '11', 'Ferramenta 2', '50,99', 5, '4'), ('12', '12', 'Ferramenta 3', '5,99', 10, '4');";
    console.log(query);
    const result = await dbCx.runAsync(query, []);

    return result.changes == 1;
}