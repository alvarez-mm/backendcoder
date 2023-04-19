import fs from "fs";

const path = "./files/dbproducts.json"

export default class ProductManager {

    getProducts = async (limit) => {
        
        if(fs.existsSync(path)) {
            const data = await fs.promises.readFile(path , "utf-8");
            const products = JSON.parse(data);
            if (limit) {
                if (limit > 0){
                    const productsLimit = products.splice(0, limit)
                    return productsLimit;
                }else{
                    return `El limite debe ser mayor a 0`
                }
            }else{
                return products;
            }
        } else {
            return [];
        }
    }

    getProductById = async (pid) => {

        const productos = await this.getProducts();
        const productId = productos.filter((prod) => {
            return prod.id == pid
        })
        return productId
    }

    addProduct = async (producto) => {
        const productos = await this.getProducts();

        let id = productos[productos.length-1].id;
        producto.id = ++id

        productos.push(producto)

        try {
            await fs.promises.writeFile(path, JSON.stringify(productos,null,"\t"))
            return "Usuario creado"
        } catch (error) {
            return error
        }
    }

    putProductById = async (pid, product) => {
        let productById = await this.getProductById(pid);

        if (!productById) {
            return "Producto no encontrado"
        }
        await this.deleteProductById(pid)
        let productsOld = await this.getProducts()
        let products = [{...product, id : id}, ...productsOld]
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
        return "Producto modificado"
    }
    

    deleteProductById = async (pid) => {
        const productos = await this.getProducts();
        const productIndex = productos.findIndex((prod) => {
            return prod.id == pid
        }) 
        productos.splice(productIndex, 1)
        try {
            await fs.promises.writeFile(path, JSON.stringify(productos,null,"\t"))
            return "Producto eliminado"
        } catch (error) {
            return error
        }
    }
}