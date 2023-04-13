import fs from "fs";

const path = "../src/files/bd.json"

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

    getProductById = async (id) => {

        const productos = await this.getProducts();
        const productId = productos.filter((prod) => {
            return prod.id == id
        })
        return productId
    }


}