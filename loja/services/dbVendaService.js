import { getDbConnection, closeDbConnection } from './dbservice';

function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
}

function obtemDataHora() {
    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0'); //PadStart preenche com 0 à esquerda
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const ano = dataAtual.getFullYear();

    const horas = String(dataAtual.getHours() - 3).padStart(2, '0');
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
    await closeDbConnection(dbCx);

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

    return retorno;
}

export async function obtemVendasPorCategoria(categoria) {
    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT tbVendas.id, tp.preco, tp.descricao, tvp.quantidade, tbVendas.dataHora FROM tbVendas ' +
                                             'INNER JOIN tbVendaProduto tvp ON tbVendas.id = tvp.idVenda ' +
                                             'INNER JOIN tbProduto tp ON tvp.idProduto = tp.id ' +
                                             'WHERE tp.categoria = ?' +
                                             'ORDER BY tbVendas.dataHora DESC', [categoria]);
    await closeDbConnection(dbCx);

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
    
    return retorno;
}

export async function adicionaVenda(produtos) {
    let dbCx = await getDbConnection();
    let idVenda = createUniqueId();

    for (const produto of produtos) {
        //Executa inserção na tabela de Vendas.
        let query = 'insert into tbVendaProduto (id, idVenda, idProduto, quantidade) values (?,?,?,?)';

        console.log(produto.id, produto.quantidade)
        await dbCx.runAsync(query, [createUniqueId(), idVenda, produto.id, produto.quantidade]);

        //Executa atualização na tabela de Produtos.
        query = 'update tbProduto set quantidade = quantidade - ? where id = ?';
        await dbCx.runAsync(query, [produto.quantidade, produto.id]);
    }

    let query = 'insert into tbVendas (id, datahora) values (?,?)';
    const result = await dbCx.runAsync(query, [idVenda, obtemDataHora()]);
    await closeDbConnection(dbCx);

    return result.changes == 1;
}