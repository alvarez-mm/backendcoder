import { Router } from "express";

import CartManager from "../Managers/cartManager.js";

const cartManager = new CartManager();

const router = Router();

const carts = [];

router.post("/", async (req, res) => {
    const cart = req.body;
    const msg = await cartManager.addCart(cart)
    res.send(msg)
})

router.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const cartId = await cartManager.getCartById(cid);
    res.send(cartId);
})

router.post('/:cid/product/:pid', async (req,res) => {
    try{
        const idCart = req.params.cid
        const idProd = req.params.pid
        const resultado = await cartManager.agregarProdAlCart(idCart, idProd)

        res.send(resultado);
    }catch (error){
        res.status(400).send({error: "not found"})
    }
})


export default router;

