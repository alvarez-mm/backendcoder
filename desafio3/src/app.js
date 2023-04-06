import express from "express";

import ProductManager from "./Managers/productManager.js";


const PORT = 8080;

const productManager = new ProductManager();


const app = express();

app.use(express.urlencoded({extended:true}))

app.listen(PORT, () => {

    console.log (`Servidor funciona en el puerto ${PORT}`)
})


app.get("/products", async (req, res) => {

    const limit = req.query.limit;
    const productos = await productManager.getProducts(limit);
    res.send(productos);
})

app.get("/products/:id", async (req, res) => {
    
    const id = req.params.id;
    const productoId = await productManager.getProductById(id);
    res.send(productoId);
})
