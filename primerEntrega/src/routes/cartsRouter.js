import { Router } from "express";

import CartManager from "../Managers/cartManager.js";

const cartManager = new CartManager();

app.use(express.urlencoded({extended:true}))

const router = Router();

const carts = [];

router.post("/", (req, res) => {
    const cart = req.body;
    const msg = await cartManager.addCart(cart)
    res.send(msg)
})

router.get("/:cid", (req, res) => {
    const cid = req.params.cid;
    const cartId = await cartManager.getCartById(cid);
    res.send(cartId);
})


export default router;

