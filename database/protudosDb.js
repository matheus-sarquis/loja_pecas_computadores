import * as SQLite from 'expo-sqlite';
import { getConexao } from './db';
import Produto from '../modelos/produto';

const getProdutos = () => {
  return new Promise((resolve, reject) => {
    const db = getConexao();
    db.transaction((tx) => {
      let query = 'SELECT * FROM produtos';
      tx.executeSql(query, [], (tx, produtos) => {
        var result = [];
        for (let i = 0; i < produtos.rows.length; i++) {
          const item = produtos.rows.item(i);
          const newProductModel = new Produto(
            item.id,
            item.idCategoria,
            item.nome,
            item.valor
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

const insertProdutos = (produto) => {
  return new Promise((resolve, reject) => {
    let db = getConexao();
    let query = 'INSERT INTO produtos (id, idCategoria, nome, valor) VALUES (?, ?, ?, ?)';

    db.transaction(tx => {
      tx.executeSql(query, [produto.id, produto.categoriaId, produto.nome, produto.valor],
        (tx, result) => {
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

const updateProdutos = (produto) => {
  const db = getConexao();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE produtos SET idCategoria=?, nome=?, valor=? WHERE id=?',
        [produto.categoriaId, produto.nome, produto.valor, produto.id],
        (_, result) => {
          const newProduto = new Produto(result.id,
            produto.idCategory,
            produto.name,
            produto.value
          );
          console.log(newProduto);
          resolve(newProduto);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteProdutos = (id) => {
  const db = getConexao();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM produtos WHERE id=?',
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export { getProdutos, insertProdutos, updateProdutos, deleteProdutos };