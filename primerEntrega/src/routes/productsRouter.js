import { Router } from "express";

import ProductManager from "../Managers/productManager.js";

const productManager = new ProductManager();

const router = Router();

const products = [];

router.get("/", async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit);
    res.send({products})

})

router.get("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const productId = await productManager.getProductById(pid);
    res.send(productId);
})

router.post("/", async (req, res) => {

    const {title, description, price, thumbnail, code, stock, category} = req.body;
    

    if (!title || !description || !price || !code || !stock || !category) {
        res.send ("Faltan datos")
        return
    }
    const product = {
        title, description, price, thumbnail, code, stock, status:true, category
    }
    const msg = await productManager.addProduct(product)
    res.send(msg)
})

router.put("/:pid", async (req, res) => {
    
    let pid = req.params.pid;
    let product = req.body;
    
    res.send(await productManager.putProductById(pid, product))
})

router.delete("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const deleteMsg = await productManager.deleteProductById(pid);
    res.send(deleteMsg);
})


export default router;