import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'plately',
  password: 'user',
  port: 5432,
});

// Get all dishes
app.get('/dishes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dishes ORDER BY type, name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT id, username, role FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add to cart endpoint
app.post('/cart/add', async (req, res) => {
  const { userId, dishId, quantity } = req.body;
  
  try {
    // Start a transaction
    await pool.query('BEGIN');
    
    // Get or create cart for user
    let cartResult = await pool.query(
      'SELECT id FROM cart WHERE user_id = $1',
      [userId]
    );
    
    let cartId;
    if (cartResult.rows.length === 0) {
      const newCartResult = await pool.query(
        'INSERT INTO cart (user_id) VALUES ($1) RETURNING id',
        [userId]
      );
      cartId = newCartResult.rows[0].id;
    } else {
      cartId = cartResult.rows[0].id;
    }
    
    // Check if dish already in cart
    const existingItem = await pool.query(
      'SELECT id, quantity FROM cart_dish WHERE cart_id = $1 AND dish_id = $2',
      [cartId, dishId]
    );
    
    if (existingItem.rows.length > 0) {
      // Update quantity if dish already in cart
      await pool.query(
        'UPDATE cart_dish SET quantity = quantity + $1 WHERE id = $2',
        [quantity, existingItem.rows[0].id]
      );
    } else {
      // Add new dish to cart
      await pool.query(
        'INSERT INTO cart_dish (cart_id, dish_id, quantity) VALUES ($1, $2, $3)',
        [cartId, dishId, quantity]
      );
    }
    
    await pool.query('COMMIT');
    res.json({ message: 'Item added to cart successfully' });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 