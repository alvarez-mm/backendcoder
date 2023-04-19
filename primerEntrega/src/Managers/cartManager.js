import fs from "fs";

const path = "./files/dbcarts.json"

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

    addCart = async () => {
        const carts = await this.getCarts();

        let carrito = {
            products: []
        };

        if (carts.length === 0) {
            carrito.id - 1;
        }else{
            carrito.id = carts [carts.length - 1].id + 1;
        }
        carts.push(carrito)

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

    agregarProdAlCart = async (idCart, idProd) => {
        const carritos = await this.getCarts();
        
        const findedCart = carritos.find((cart) => cart.id == idCart);
      
        let productosEnElCarrito = findedCart.products;

        const productoIndex = productosEnElCarrito.findIndex((prodIndex)=> prodIndex.id === idCart);

        if(productoIndex !== -1){
            productosEnElCarrito[productoIndex].quantity = productosEnElCarrito[productoIndex].quantity + 1;
        }else{
            let producto = {
                id: idProd,
                quantity: 1,
            }
            productosEnElCarrito.push(producto);
        }
        await fs.promises.writeFile(path, JSON.stringify(carritos, null, '\t'));
        return findedCart;
    };
}