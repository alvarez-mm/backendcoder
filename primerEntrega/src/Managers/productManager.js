import fs from "fs";

const path = "../files/dbproducts.json"

export default class ProductManager {

    getProducts = async (limit) => {
        
        if(fs.existsSync(path)) {
            const data = await fs.promises.readFile(path , "utf-8");
            const productos = JSON.parse(data);
            if (!limit) { 
                return productos
            } else {

                for (let i = 0 ; i <= limit; i++) {
                    return productos[limit]
                }
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

    putProductById = async (pid, producto) => {
        const productos = await this.getProducts();

        const productIndex = productos.findIndex((prod) => {
            return prod.id == pid
        }) 

        productos[productIndex] = producto

        try {
            await fs.promises.writeFile(path, JSON.stringify(productos,null,"\t"))
            return "Usuario modificado"
        } catch (error) {
            return error
        }
    }
    

    deleteProductById = async (pid) => {
        const productos = await this.getProducts();
        const productIndex = productos.findIndex((prod) => {
            return prod.id == pid
        }) 
        productos.splice(productIndex, 1)
        try {
            await fs.promises.writeFile(path, JSON.stringify(productos,null,"\t"))
            return "Usuario eliminado"
        } catch (error) {
            return error
        }
    }


}