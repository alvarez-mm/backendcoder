import fs from "fs";

export default class ProductManager {
    
    constructor (path) {
        this.path = path
    }


    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path,"utf-8")
            const productos = JSON.parse(data);
            return productos;
        } else {
            return [];
        }
    }


    addProduct = async (producto) => {
        const productos = await this.getProducts();

        if (productos.length === 0) {
            producto.id = 1
        } else {
            producto.id = productos[productos.length-1].id+1;
        }
        productos.push(producto);

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))

        return producto
    }


    getProductById = async (id) => {
        const productos = await this.getProducts();
        
        let productoId = productos.find(elemento=> elemento.id == id)
        if (productoId) {
            return productoId
        } else {
            console.log("Not found")
        }
    }

    deleteProduct = async (id) => {
        const productos = await this.getProducts();
        await productos.splice(id-1,1)

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))
    }

    updateProduct = async (id, objeto) => {
        const eliminar = await this.deleteProduct(id);

        const productos = await this.getProducts();
        objeto.id = id;
        productos.splice(id-1,0,objeto);

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))
    }


}