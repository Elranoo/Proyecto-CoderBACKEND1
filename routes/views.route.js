const express = require("express");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const router = express.Router();

router.get("/", async (req, res) => {
    const page = Number(req.query.page) || 1;

    const limit = 6;

    const products = await Product.paginate({}, { page, limit });

    res.render("home", {
        products: products.docs,
        page: products.page,
        totalPages: products.totalPages,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage
    });
});

router.get("/products/:pid", async (req, res) => {
    const product = await Product.findById(req.params.pid);
    res.render("productDetail", { product });
});

router.get("/carts/:cid", async (req, res) => {
    const cart = await Cart.findById(req.params.cid).populate("products.product");

    const total = cart.products.reduce((s, item) => s + item.product.price * item.quantity, 0);

    res.render("cart", {
        cart,
        cartId: req.params.cid,
        total
    });
});

module.exports = router;