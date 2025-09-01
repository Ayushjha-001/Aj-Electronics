require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const seedDB = require('./seed/productSeeds');
const productRoutes = require('./routes/products');
const checkoutRoutes = require('./routes/checkout');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB Connected');

    try {
      await seedDB();
      console.log('🪴 Database seeded');
    } catch (err) {
      console.error('❌ Seeding error:', err);
    }
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server ready on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect root to /api-docs
app.get('/', (req, res) => {
  res.send("Welcome to Aj Electronics API")
});
// Routes
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/search', require('./routes/search'));
app.use('/api/auth', authRoutes);

module.exports = app;
