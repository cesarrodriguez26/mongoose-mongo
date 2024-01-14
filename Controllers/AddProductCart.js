const Cart = require("../Models/Cart");
const Product = require("../Models/Products");

const addProductCart = async (req, res) => {
    const { name, img, price } = req.body;

    // Verifica si el producto está en la base de datos
    const estaEnProducts = await Product.findOne({ name });

    // Verifica si los campos name, img y price no están vacíos
    const noEstaVacio = name !== "" && img !== "" && price !== "";

    // Verifica si el producto ya está en el carrito
    const estaEnElCarrito = await Cart.findOne({ name });

    if (!estaEnProducts) {
        res.status(400).json({
            mensaje: "Este producto no se encuentra en nuestra base de datos",
        });
    } else if (noEstaVacio && !estaEnElCarrito) {
        // Crea un nuevo producto en el carrito
        const newProductInCart = new Cart({ name, img, price, amount: 1 });

        // Marca el producto como "en el carrito" en la base de datos de productos
        await Product.findByIdAndUpdate(
            estaEnProducts._id,
            { inCart: true, name, img, price },
            { new: true }
        )
        .then((product) => {
            // Guarda el producto en el carrito
            newProductInCart.save();
            res.json({
                mensaje: 'El producto fue agregado al carrito',
                product,
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                mensaje: 'Hubo un error al agregar el producto al carrito',
            });
        });
    } else if (estaEnElCarrito) {
        res.status(400).json({
            mensaje: "El producto ya está en el carrito",
        });
    }
};

module.exports = addProductCart;
