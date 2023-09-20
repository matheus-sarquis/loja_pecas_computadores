import * as SQLite from 'expo-sqlite';

export function getConexao() {
    const db = SQLite.openDatabase('dbInfoShop.db');
    return db;
}

export async function createTable() {
    createTableProdutos();
    createTableCategoria();
    createTableVendas();
    createTableVendasItem();
};

export async function createTableProdutos() {
    return new Promise((resolve, reject) => {
        const query = 'CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, idCategoria INTEGER, nome TEXT, valor REAL)';
        //const query = 'DROP TABLE produtos';
        let db = getConexao();

        db.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};
export async function createTableCategoria() {
    return new Promise((resolve, reject) => {
        const query = 'CREATE TABLE IF NOT EXISTS categorias (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT)';

        let db = getConexao();

        db.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};
export async function createTableVendas() {
    return new Promise((resolve, reject) => {
        const query = 'CREATE TABLE IF NOT EXISTS vendas (id INTEGER PRIMARY KEY AUTOINCREMENT, data DATE)';

        let db = getConexao();

        db.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};
export async function createTableVendasitem() {
    return new Promise((resolve, reject) => {
        const query = 'CREATE TABLE IF NOT EXISTS vendasItem (id INTEGER PRIMARY KEY AUTOINCREMENT, produtoId INTEGER, valorVenda REAL, quantidade INTEGER)';

        let db = getConexao();

        db.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};