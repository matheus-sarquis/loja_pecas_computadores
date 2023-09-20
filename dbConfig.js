import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const db = SQLite.openDatabase('dbEcommerce.db');
    return db;
}

const createTable = () => {
    return new Promise((resolve, reject) => {
        const query = 'CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price REAL)';
  
        let db = getDbConnection();        
        
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