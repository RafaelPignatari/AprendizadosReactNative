import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    SQLite.enab
    const cx = SQLite.openDatabase('dbContatos1.db');
    return cx;    
}

export async function createTable() {
    return new Promise(async (resolve, reject) => {
        //Salvar a senha assim não é legal, mas é só um exemplo.
        //const query = `DROP TABLE IF EXISTS tbContatos;`
        const query = `CREATE TABLE IF NOT EXISTS tbContatos
        (
            id text not null primary key,
            codigo text not null,
            nome text not null,
            email text not null,
            senha text not null      
        )`;

        let dbCx = getDbConnection();        
        
        await dbCx.transaction(async tx => {
            await tx.executeSql(query);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export async function dropTable() {
    return new Promise((resolve, reject) => {
      const query = `DROP TABLE IF EXISTS tbContatos`;
  
      let dbCx = getDbConnection();
  
      dbCx.transaction(
        tx => {
          tx.executeSql(query);
          resolve(true);
        },
        error => {
          console.log(error);
          resolve(false);
        }
      );
    });
  }

export function obtemContato() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbContatos LIMIT 1';
            console.log('Executando a query ' + query);
            tx.executeSql(query, [],
                (tx, registros) => {
                    console.log(registros.rows.length);
                    var retorno = {
                        id : registros.rows.item(0).id,
                        codigo: registros.rows.item(0).codigo,
                        nome: registros.rows.item(0).nome,
                        email: registros.rows.item(0).email,
                        senha: registros.rows.item(0).senha,
                    }
                    console.log(retorno)
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function adicionaContato(contato) {
    console.log('Começando o método adicionaContato')
    const query = 'insert into tbContatos (id, codigo, nome , email, senha) values (?, ?, ?, ?, ?)';
    let dbCx = getDbConnection();    

    return new Promise(async (resolve, reject) => {
        dbCx.transaction(async tx => {
            await tx.executeSql(query, [contato.id.toString(), contato.codigo.toString(), contato.nome, contato.email, contato.senha],
                (_, resultSet) => {
                    resolve(true);
                },
                (_, error) => {
                    console.log('Erro ao adicionar contato:', error);
                    resolve(false);
                    return true; // Rollback transaction
                }
            );
        });
        }, error => {        
            console.log('Erro ao adicionar contato:', error)
            resolve(false);
        });
}

export function alteraContato(contato) {
    console.log('Começando o método alteraContato');
    return new Promise(async (resolve, reject) => {
        let query = 'update tbContatos set codigo=?, email=?, nome=?, senha=? where id=?';
        let dbCx = getDbConnection();
        console.log([contato.codigo.toString(), contato.email, contato.nome, contato.senha, contato.id.toString()])

        dbCx.transaction(async tx => {
            await tx.executeSql(query, [contato.codigo.toString(), contato.email, contato.nome, contato.senha, contato.id.toString()],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
        error => {
            console.log(error);
            resolve(false);
        })
    }, error => {
        console.log(error);
        resolve(false);
    });
}



export function excluiContato(codigo) {
    console.log('Apagando contato ' + codigo);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbContatos where codigo=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [codigo],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}