const express = require ("express");
const cors = require ("cors");

const db = require ("./Database");
const controllers = require ("./Controllers");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/products", controllers.getProducts);

app.get("/products-cart", controllers.getProductsCart);

app.post("/products-cart", controllers.addProductCart);

app.put("/products-cart/:productId", controllers.putProduct);

app.delete("/products-cart/:productId", controllers.deleteProduct);



app.listen(4000, () => {
    console.log("server funcionando en el puerto 4000");
    db();
});

module.exports = app;