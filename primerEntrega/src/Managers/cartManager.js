import fs from "fs";

const path = "../files/dbcarts.json"

export default class CartManager {

    getCarts = async () => {
        
        if(fs.existsSync(path)) {
            const data = await fs.promises.readFile(path , "utf-8");
            const carts = JSON.parse(data);

            return carts
        } else {
            return [];
        }
    }

    addCart = async (cart) => {
        const carts = await this.getCarts();

        let id = carts[carts.length-1].id;
        cart.id = ++id

        carts.push(cart)

        try {
            await fs.promises.writeFile(path, JSON.stringify(carts,null,"\t"))
            return "Carrito creado"
        } catch (error) {
            return error
        }
    }

    getCartById = async (cid) => {

        const carts = await this.getCarts();
        const cartId = carts.filter((cart) => {
            return cart.id == cid
        })
        return cartId
    }
}