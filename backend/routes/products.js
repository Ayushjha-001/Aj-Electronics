require('dotenv').config();
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const formattedProducts = products.map(product => ({
      ...product.toObject(),
      id: product._id,
    }));
    res.json(formattedProducts);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// GET products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});
// GET single product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


module.exports = router;
