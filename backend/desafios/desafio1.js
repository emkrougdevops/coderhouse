
class ProductManager {
    letructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(product) {
      let existingProduct = this.products.find(p => p.code === product.code);
      if (existingProduct) {
        throw new Error('El código del producto ya está en uso.');
      }
  
      let id = Math.random().toString(36).substr(2, 9); // Genera un id aleatorio
      let newProduct = { id, ...product };
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProductById(id) {
      let product = this.products.find(p => p.id === id);
      if (!product) {
        throw new Error('Producto no encontrado.');
      }
      return product;
    }
  }
  
  // Creo instancia de ProductManager
  let manager = new ProductManager();
  
  // Obtenego producto con variable vacía
  console.log('Products:', manager.getProducts());
  
  // Agregago un producto
  try {
    manager.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25
    });
  } catch (error) {
    console.error(error.message);
  }
  
  // debería contener el producto agregado
  console.log('Products:', manager.getProducts());
  
  // Al Intentar agregar el mismo producto tiene que dar error
  try {
    manager.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25
    });
  } catch (error) {
    console.error(error.message);
  }
  
  // Obtengo un producto por su ID
  try {
    let product = manager.getProductById(manager.getProducts()[0].id);
    console.log('Producto encontrado:', product);
  } catch (error) {
    console.error(error.message);
  }
  