import { getConexao } from './db';
import Venda from '../modelos/venda';

const getVendas = () => {
    return new Promise((resolve, reject) => {
        const db = getConexao();
        db.transaction((tx) => {
            let query = 'SELECT * FROM vendas';
            tx.executeSql(query, [], (tx, vendasItem) => {
                var result = [];
                for (let i = 0; i < vendasItem.rows.length; i++) {
                    const item = vendasItem.rows.item(i);
                    const newProductModel = new Venda(
                        item.id,
                        item.data
                    );
                    result.push(newProductModel);
                }
                resolve(result);
            })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    });
};

const insertVendas = (vendas) => {
    return new Promise((resolve, reject) => {
        let db = getConexao();
        let query = 'INSERT INTO vendas (id, data) VALUES (?, ?)';

        db.transaction(tx => {
            tx.executeSql(query, [vendas.id, vendas.data], (tx, result) => {
                if (result.rowsAffected > 0) {
                    const lastInsertId = result.insertId;
                    resolve(lastInsertId);
                } else {
                    resolve(null);
                }
            },
                error => {
                    console.log(error);
                    resolve(null);
                }
            )
        });
    });
};

export { getVendas, insertVendas };