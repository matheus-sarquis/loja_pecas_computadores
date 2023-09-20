import { getConexao } from './db';
import Categoria from '../modelos/categoria';

const getCategorias = () => {
  return new Promise((resolve, reject) => {
    const db = getConexao();
    db.transaction((tx) => {
      let query = 'SELECT * FROM categorias';
      tx.executeSql(query, [], (tx, categorias) => {
        var result = [];
        for (let i = 0; i < categorias.rows.length; i++) {
          const item = categorias.rows.item(i);
          const newProductModel = new Categoria(
            item.id,
            item.nome
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

const insertCategorias = (categoria) => {
  return new Promise((resolve, reject) => {
    let db = getConexao();
    let query = 'INSERT INTO categorias (id, nome) VALUES (?, ?)';

    db.transaction(tx => {
      tx.executeSql(query, [categoria.id, categoria.nome],
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

const updateCategorias = (categoria) => {
  const db = getConexao();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE categorias SET nome=? WHERE id=?',
        [categoria.nome, categoria.id],
        (_, result) => {
          const newCategoria = new Categoria(
            result.id,
            categoria.name
          );
          resolve(newCategoria);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteCategorias = (id) => {
  const db = getConexao();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM categorias WHERE id=?',
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

export { getCategorias, insertCategorias, updateCategorias, deleteCategorias };