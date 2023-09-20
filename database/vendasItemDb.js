import { getConexao } from './db';
import VendaItem from '../modelos/vendaItem';

const getVendasItem = () => {
    return new Promise((resolve, reject) => {
        const db = getConexao();
        db.transaction((tx) => {
            let query = 'SELECT * FROM vendasItem';
            tx.executeSql(query, [], (tx, vendas) => {
                var result = [];
                for (let i = 0; i < vendas.rows.length; i++) {
                    const item = vendas.rows.item(i);
                    const newProductModel = new VendaItem(
                        item.id,
                        item.vendaId,
                        item.produtoId,
                        item.valorVenda,
                        item.quantidade
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

const insertVendasItem = (vendaItem) => {
    return new Promise((resolve, reject) => {
        let db = getConexao();
        let query = 'INSERT INTO vendasItem (id, vendaId, produtoId, valorVenda, quantidade) VALUES (?, ?, ?, ?, ?)';

        db.transaction(tx => {
            tx.executeSql(query, [vendaItem.id, vendaItem.vendaId, vendaItem.produtoId, vendaItem.valorVenda, vendaItem.quantidade], (tx, result) => {
                resolve(console.log(result.rowsAffected > 0));
            })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    });
};

export { getVendasItem, insertVendasItem };