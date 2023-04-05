import  ProductManager  from "./productManager.js";

const nuevoProducto = new ProductManager("./productos.json");

const env = async () => {

    let producto = {
        title: "camisa",
        description: "camisa",
        price: 100,
        thumbnail: "link",
        codigo: 203,
        stock: 10
    }

    let nuevo = await nuevoProducto.addProduct(producto);

    let productos = await nuevoProducto.getProducts();
    console.log(productos)

    let productoId = await nuevoProducto.getProductById(2)
    console.log(productoId)

    let eliminar = await nuevoProducto.deleteProduct(2);

    let objeto = {
        title: "zapatillas",
        description: "zapatillas blanca",
        price: 10000,
        thumbnail: "link",
        codigo: 300,
        stock: 10
    }

    let modificar = await nuevoProducto.updateProduct(3,objeto)
}

env()
