const Cart = require ("../Models/Cart");

const getProductsCart = async (req, res) => {
    const productsCart = await Cart.find();

    if (productsCart) {
        res.json({ productsCart });
    } else {
        res.json({ mensaje: "No hay Productos en el Carrito" })
    }
};

module.exports = getProductsCart;