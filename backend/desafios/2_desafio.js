const fs = require('node:fs')


class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
      const id = this.nextId++;
      const newProduct = { ...product, id };
      this.products.push(newProduct);
      return newProduct;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products[index] = { ...this.products[index], ...updatedFields };
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
  }

}

// Crear instancia de ProductManager
const productManager = new ProductManager();

// Obtener productos devuelve lista vacía
console.log('Products:',productManager.getProducts());

// Agregar producto
const newProduct = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
};
const addedProduct = productManager.addProduct(newProduct);
console.log(addedProduct);

//Agrego segundo producto para probar si se incrementa el id
const newProduct2 = {
  title: "producto prueba 2",
  description: "Este es un producto prueba 2",
  price: 300,
  thumbnail: "Sin imagen",
  code: "abc1234",
  stock: 30
};
const addedProduct2 = productManager.addProduct(newProduct2);
console.log(addedProduct2);

// Obtener productos (debe devolver el producto recién agregado)
console.log(productManager.getProducts());

// Obtener producto por ID
try {
  const productById = productManager.getProductById(addedProduct2.id);
  console.log(productById);
} catch (error) {
  console.error(error.message);
}

// Actualizar producto
try {
  const updatedProduct = productManager.updateProduct(addedProduct.id, 
    {
    title: "producto ya no es de prueba",
    description: "Este producto no es una prueba",
    price: 5000,
    thumbnail: "Con imagen",
    code: "hola1234",
    stock: 100
  });
  console.log(updatedProduct);
} catch (error) {
  console.error(error.message);
}

// Eliminar producto
try {
  productManager.deleteProduct(addedProduct2.id);
  console.log("Producto borrado exitosamente");
} catch (error) {
  console.error(error.message);
}

console.log("Productos que quedan:", productManager.getProducts());
