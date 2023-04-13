import { Router } from "express";

import ProductManager from "../Managers/productManager.js";

const productManager = new ProductManager();

const router = Router();

app.use(express.urlencoded({extended:true}))

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

    const product = req.body;
    

    if (!title || !description || !code || !price || !stock) {
        res.send ("Faltan datos")
        return
    }
    const msg = await productManager.addProduct(product)
    res.send(msg)

})

router.put("/:pid", async (req, res) => {
    
    const product = req.body;
    const pid = req.params.pid;
    
    if (!title || !description || !code || !price || !stock) {
        res.send ("Faltan datos")
        return
    }
    const msg = await productManager.putProductById(pid, product)
    res.send(msg)
})

router.delete("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const deleteMsg = await productManager.deleteProductById(pid);
    res.send(deleteMsg);
})


export default router;