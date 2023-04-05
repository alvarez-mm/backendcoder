class ProductManager {
    
    constructor () {
        this.products = [];
    }

    addProduct (title, description, price, thumbnail, code, stock ) {

        let id = (this.getProducts()).length;

        let product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: ++id
        }

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.log("Todos los campos son obligatorios")
        }

        let productoId = this.products.find(elemento=> elemento.code == code)
        
        if (productoId) {
            console.log("El código ya existe")
        } else {
            this.products.push(product);
            return this.products;
        }

    }

    getProducts() {
        return this.products;
    }

    getProducById(id){
        let productoId = this.products.find(elemento=> elemento.id == id)
        if (productoId) {
            return productoId
        } else {
            console.log("Not found")
        }
    }

}


const nuevoProducto = new ProductManager();
nuevoProducto.addProduct("remera", "remera de mangas cortas", 2000, "link", 203, 10);
nuevoProducto.addProduct("campera", "campera negra", 10000, "otrolink", 204, 5 );
nuevoProducto.addProduct("pantalon", "pantalon jean largo", 8000, "otrolink", 204, 10 );
console.log(nuevoProducto.getProducts());
console.log(nuevoProducto.getProducById(2));
console.log(nuevoProducto.getProducById(3));
