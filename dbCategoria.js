import Category from '../models/categoryModel';

// Função para listar todas as categorias
const getAllCategories = () => {

  const categories = [];
  const newCategory1 = new Category(1, "Biscoitos");
  const newCategory2 = new Category(2,"Bebidas não alcoolicas");
  const newCategory3 = new Category(3,"Bebidas alcoolicas");
  const newCategory4 = new Category(4,"Higienicos");
  const newCategory5 = new Category(5,"Bomboniere");
  const newCategory6 = new Category(6,"Congelados");
  const newCategory7 = new Category(7,"Sorvetes");
  categories.push(newCategory1, 
                  newCategory2, 
                  newCategory3, 
                  newCategory4, 
                  newCategory5, 
                  newCategory6,
                  newCategory7 );
  return categories;
};

export { getAllCategories };