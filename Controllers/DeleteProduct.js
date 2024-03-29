const Cart = require("../Models/Cart");
const Product = require("../Models/Products");

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    const productInCart = await Cart.findById(productId);

    const {name, img, price, _id } = await Product.findOne({
        name: productInCart.name
    });

    await Cart.findByIdAndDelete(productId);

    await Product.findByIdAndUpdate(
        _id,
        { inCart: false, name, img, price },
        { new: true }
    )
    .then((product) => {
        res.json({
            mensaje: 'El producto ${product.name} fue eliminado del carrito',
        });
    })
    .cath((error) => res.json({ mensaje: "Hubo un error"}));
};

module.exports = deleteProduct;